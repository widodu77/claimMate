import { NextRequest, NextResponse } from 'next/server'
import { supabase, hasValidSupabaseConfig } from '@/lib/supabase'
import { demoStorage } from '@/lib/demo-storage'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json()

    if (!['pending', 'solved', 'opposed', 'closed'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    // Use demo storage if Supabase is not configured
    if (!hasValidSupabaseConfig) {
      try {
        const claim = await demoStorage.updateClaimStatus(params.id, status)
        if (claim) {
          return NextResponse.json({ claim, demo: true })
        } else {
          return NextResponse.json(
            { error: 'Claim not found' },
            { status: 404 }
          )
        }
      } catch (error) {
        return NextResponse.json(
          { error: 'Failed to update claim in demo mode' },
          { status: 500 }
        )
      }
    }

    const { data: claim, error } = await supabase
      .from('claims')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to update claim' },
        { status: 500 }
      )
    }

    return NextResponse.json({ claim })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Use demo storage if Supabase is not configured
    if (!hasValidSupabaseConfig) {
      try {
        const claim = await demoStorage.getClaim(params.id)
        if (claim) {
          return NextResponse.json({ claim, demo: true })
        } else {
          return NextResponse.json(
            { error: 'Claim not found' },
            { status: 404 }
          )
        }
      } catch (error) {
        return NextResponse.json(
          { error: 'Failed to fetch claim in demo mode' },
          { status: 500 }
        )
      }
    }

    const { data: claim, error } = await supabase
      .from('claims')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Claim not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ claim })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Use demo storage if Supabase is not configured
    if (!hasValidSupabaseConfig) {
      try {
        const deleted = await demoStorage.deleteClaim(params.id)
        if (!deleted) {
          return NextResponse.json(
            { error: 'Claim not found' },
            { status: 404 }
          )
        }
        return NextResponse.json({ success: true })
      } catch (error) {
        return NextResponse.json(
          { error: 'Failed to delete claim in demo mode' },
          { status: 500 }
        )
      }
    }

    const { error } = await supabase
      .from('claims')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to delete claim' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 