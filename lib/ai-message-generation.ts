import { Configuration, OpenAIApi } from 'openai-edge'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export interface TimelineMessage {
    id: string
    type: 'ai_generated' | 'user_sent' | 'received' | 'system'
    content: string
    timestamp: string
    status: 'draft' | 'sent' | 'delivered' | 'read'
    recipient?: string
    subject?: string
}

export interface ClaimData {
    narrative: string
    extracted_data?: {
        email?: string
        phone?: string
        refererPerson?: string
        claimType?: string
        amount?: string
        date?: string
        recipient?: string
        description?: string
        urgency?: string
        additionalInfo?: string
    }
    files?: string[]
}

export async function generateInitialClaimMessage(claimData: ClaimData): Promise<TimelineMessage> {
    try {
        if (!process.env.OPENAI_API_KEY) {
            console.warn('OpenAI API key not found, using fallback message')
            return createFallbackMessage(claimData)
        }

        const prompt = `
You are an AI claims assistant. Generate a conversational initial message to start a chat with the user about their claim.

Claim Information:
- Narrative: ${claimData.narrative}
- Claim Type: ${claimData.extracted_data?.claimType || 'Not specified'}
- Amount: ${claimData.extracted_data?.amount || 'Not specified'}
- Date: ${claimData.extracted_data?.date || 'Not specified'}
- Recipient: ${claimData.extracted_data?.recipient || 'Not specified'}
- Urgency: ${claimData.extracted_data?.urgency || 'Not specified'}

Generate a friendly, conversational message that:
1. Introduces yourself as an AI assistant
2. Acknowledges their claim submission
3. Shows understanding of their situation
4. Offers to help them with their claim
5. Asks how you can assist them
6. Is warm and supportive, not formal

Keep it conversational and friendly, like starting a helpful chat.`

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a friendly AI claims assistant. Generate warm, conversational, and helpful messages to assist users with their claims.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 500
        })

        const completion = response.choices[0]?.message?.content
        if (!completion) {
            throw new Error('No response from OpenAI')
        }

        return {
            id: `msg-${Date.now()}`,
            type: 'ai_generated',
            content: completion.trim(),
            timestamp: new Date().toISOString(),
            status: 'delivered'
        }

    } catch (error) {
        console.error('AI message generation error:', error)
        return createFallbackMessage(claimData)
    }
}

function createFallbackMessage(claimData: ClaimData): TimelineMessage {
    const subject = `Claim Chat Started`

    let content = `Hi there! 👋

I'm your AI claims assistant, and I can see you've submitted a claim for ${claimData.extracted_data?.claimType || 'your situation'}. 

I understand this can be a stressful time, and I'm here to help make the process as smooth as possible for you. I can see the details of your claim and I'm ready to assist you with any questions or concerns you might have.

What would you like to know about your claim, or how can I help you today?`

    return {
        id: `msg-${Date.now()}`,
        type: 'ai_generated',
        content,
        timestamp: new Date().toISOString(),
        status: 'delivered'
    }
}

export async function generateFollowUpMessage(
    claimData: ClaimData,
    previousMessages: TimelineMessage[]
): Promise<TimelineMessage> {
    try {
        if (!process.env.OPENAI_API_KEY) {
            return createFallbackFollowUp(claimData)
        }

        const lastMessage = previousMessages[previousMessages.length - 1]
        const prompt = `
Generate a professional follow-up message for a claim that has not received a response.

Previous message sent: ${lastMessage?.timestamp || 'Unknown'}
Claim urgency: ${claimData.extracted_data?.urgency || 'Standard'}

Claim Information:
- Narrative: ${claimData.narrative}
- Claim Type: ${claimData.extracted_data?.claimType || 'Not specified'}
- Amount: ${claimData.extracted_data?.amount || 'Not specified'}
- Date: ${claimData.extracted_data?.date || 'Not specified'}

Generate a polite but firm follow-up message that:
1. References the previous communication
2. Reiterates the importance of the matter
3. Requests a response or update
4. Maintains a professional tone
5. Is appropriate for the urgency level

Return the message in a professional business format.`

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional claims management assistant. Generate appropriate follow-up messages.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 400
        })

        const completion = response.choices[0]?.message?.content
        if (!completion) {
            throw new Error('No response from OpenAI')
        }

        return {
            id: `msg-${Date.now()}`,
            type: 'ai_generated',
            content: completion.trim(),
            timestamp: new Date().toISOString(),
            status: 'draft',
            subject: `Follow-up: ${claimData.extracted_data?.claimType || 'Claim'}`
        }

    } catch (error) {
        console.error('AI follow-up generation error:', error)
        return createFallbackFollowUp(claimData)
    }
}

function createFallbackFollowUp(claimData: ClaimData): TimelineMessage {
    return {
        id: `msg-${Date.now()}`,
        type: 'ai_generated',
        content: `Dear ${claimData.extracted_data?.recipient || 'Sir/Madam'},

I am writing to follow up on my previous communication regarding the claim for ${claimData.extracted_data?.amount || 'the specified amount'}.

I have not yet received a response and would appreciate an update on the status of this matter. Please let me know if you need any additional information to process this claim.

Thank you for your attention to this matter.

Best regards,
${claimData.extracted_data?.refererPerson || 'Claimant'}`,
        timestamp: new Date().toISOString(),
        status: 'draft',
        subject: `Follow-up: ${claimData.extracted_data?.claimType || 'Claim'}`
    }
} 