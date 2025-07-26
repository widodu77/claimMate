import { NextRequest, NextResponse } from 'next/server'
import { supabase, hasValidSupabaseConfig } from '@/lib/supabase'
import { demoStorage } from '@/lib/demo-storage'
import { formatActionMessage, EmailAction, ActionResult } from '@/lib/email-actions'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

async function generateEmail(
    claimData: any,
    userRequest: string,
    chatHistory: any[]
): Promise<EmailAction> {
    try {
        const prompt = `
You are an AI assistant helping with insurance claims. Based on the claim information and user request, generate a professional email.

CLAIM INFORMATION:
- Narrative: ${claimData.narrative}
- Status: ${claimData.status}
- Created: ${claimData.created_at}
- Extracted Data: ${JSON.stringify(claimData.extracted_data || {}, null, 2)}

USER REQUEST: ${userRequest}

CHAT CONTEXT: ${chatHistory.slice(-5).map(msg => `${msg.type}: ${msg.content}`).join('\n')}

Generate a professional email with:
1. Appropriate recipient (extract from claim data or use a default)
2. Clear subject line
3. Professional, empathetic content
4. Context about why this email is being sent

Respond in JSON format:
{
  "recipient": "email@example.com or 'Insurance Company' if no email found",
  "subject": "Professional subject line",
  "content": "Professional email content with proper greeting, body, and closing",
  "context": "Brief explanation of why this email is being sent"
}
`

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
        })

        const result = JSON.parse(response.choices[0].message.content || '{}')

        return {
            type: 'email',
            recipient: result.recipient || 'Insurance Company',
            subject: result.subject || 'Regarding Your Claim',
            content: result.content || 'Professional email content would be generated here.',
            context: result.context || 'Email generated based on user request'
        }
    } catch (error) {
        console.error('Error generating email:', error)
        return {
            type: 'email',
            recipient: 'Insurance Company',
            subject: 'Regarding Your Claim',
            content: 'I would like to follow up on my recent claim submission. Please let me know if you need any additional information.',
            context: 'Fallback email due to generation error'
        }
    }
}

async function sendEmail(emailAction: EmailAction): Promise<ActionResult> {
    try {
        // In a real implementation, you would integrate with an email service like:
        // - SendGrid
        // - AWS SES
        // - Nodemailer with SMTP
        // - Resend

        // For now, we'll simulate sending the email
        console.log('Simulating email send:', emailAction)

        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        return {
            success: true,
            action: emailAction,
            message: `Email sent successfully to ${emailAction.recipient}`,
            timestamp: new Date().toISOString()
        }
    } catch (error) {
        console.error('Error sending email:', error)
        return {
            success: false,
            action: emailAction,
            message: `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`,
            timestamp: new Date().toISOString()
        }
    }
}

// POST - Execute an action (like sending an email)
export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json()
        const { action, userMessage, chatHistory } = body

        // Get claim data
        let claim
        if (!hasValidSupabaseConfig) {
            claim = await demoStorage.getClaim(params.id)
        } else {
            const { data, error } = await supabase
                .from('claims')
                .select('*')
                .eq('id', params.id)
                .single()

            if (error) throw new Error('Claim not found')
            claim = data
        }

        if (!claim) {
            return NextResponse.json(
                { error: 'Claim not found' },
                { status: 404 }
            )
        }

        // Handle different action types
        if (action === 'send_email') {
            // Generate the email using AI
            const emailAction = await generateEmail(claim, userMessage, chatHistory || [])

            // Send the email
            const result = await sendEmail(emailAction)

            // Format the response message
            const responseMessage = formatActionMessage(result)

            return NextResponse.json({
                success: result.success,
                message: responseMessage,
                action: result.action,
                timestamp: result.timestamp
            })
        }

        return NextResponse.json(
            { error: 'Unknown action type' },
            { status: 400 }
        )

    } catch (error) {
        console.error('Action API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
} 