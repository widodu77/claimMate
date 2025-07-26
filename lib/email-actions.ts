export interface EmailAction {
    type: 'email'
    recipient: string
    subject: string
    content: string
    context: string // Why this email is being sent
}

export interface ActionResult {
    success: boolean
    action: EmailAction
    message: string
    timestamp: string
}

export function detectActionIntent(message: string): boolean {
    const actionKeywords = [
        'send email',
        'email them',
        'contact them',
        'reach out',
        'follow up',
        'send a message',
        'write to them',
        'notify them'
    ]

    const lowerMessage = message.toLowerCase()
    return actionKeywords.some(keyword => lowerMessage.includes(keyword))
}

export function formatActionMessage(result: ActionResult): string {
    if (result.success) {
        return `✅ **Action Completed**

**Email Sent Successfully**
- **To:** ${result.action.recipient}
- **Subject:** ${result.action.subject}
- **Context:** ${result.action.context}

The email has been sent and they should receive it shortly. I'll continue monitoring for any responses.`
    } else {
        return `❌ **Action Failed**

**Email Send Failed**
- **To:** ${result.action.recipient}
- **Subject:** ${result.action.subject}
- **Error:** ${result.message}

I was unable to send the email. Please check the recipient details or try again later.`
    }
} 