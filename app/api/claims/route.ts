import { NextRequest, NextResponse } from 'next/server'
import { supabase, hasValidSupabaseConfig } from '@/lib/supabase'
import { demoStorage } from '@/lib/demo-storage'
import { extractClaimInformation, extractTextFromFile } from '@/lib/ai-extraction'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const narrative = formData.get('narrative') as string
    const files = formData.getAll('files') as File[]

    if (!narrative) {
      return NextResponse.json(
        { error: 'Narrative is required' },
        { status: 400 }
      )
    }

    // Use demo storage if Supabase is not configured
    if (!hasValidSupabaseConfig) {
      try {
        const claim = await demoStorage.createClaim(narrative, files)
        return NextResponse.json({
          success: true,
          claim,
          message: 'Claim submitted successfully (Demo Mode)',
          demo: true
        })
      } catch (error) {
        return NextResponse.json(
          { error: 'Failed to save claim in demo mode' },
          { status: 500 }
        )
      }
    }

    // Upload files to Supabase Storage
    const fileUrls: string[] = []

    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`
      const { data, error } = await supabase.storage
        .from('claim-files')
        .upload(fileName, file)

      if (error) {
        console.error('File upload error:', error)
        continue
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('claim-files')
        .getPublicUrl(fileName)

      fileUrls.push(urlData.publicUrl)
    }

    // Extract text from uploaded files
    const fileTexts: string[] = []
    for (const file of files) {
      try {
        const fileText = await extractTextFromFile(file)
        fileTexts.push(fileText)
      } catch (error) {
        console.error('Error extracting text from file:', file.name, error)
      }
    }

    // Use AI to extract structured information from narrative and files
    const extractedData = await extractClaimInformation(narrative, fileTexts)
    
    console.log('AI extracted data:', extractedData)

    // Save claim to database
    const { data: claim, error } = await supabase
      .from('claims')
      .insert({
        narrative,
        files: fileUrls,
        status: 'pending',
        extracted_data: extractedData,
        user_id: null // Set to null for now since we're not using auth
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to save claim' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      claim,
      message: 'Claim submitted successfully'
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Use demo storage if Supabase is not configured
    if (!hasValidSupabaseConfig) {
      try {
        const claims = await demoStorage.getClaims()
        return NextResponse.json({
          claims,
          demo: true
        })
      } catch (error) {
        return NextResponse.json(
          { error: 'Failed to fetch claims in demo mode' },
          { status: 500 }
        )
      }
    }

    const { data: claims, error } = await supabase
      .from('claims')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch claims' },
        { status: 500 }
      )
    }

    return NextResponse.json({ claims })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 