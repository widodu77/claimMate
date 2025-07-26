import { Configuration, OpenAIApi } from 'openai-edge'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export interface ExtractedClaimData {
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

export async function extractClaimInformation(
    narrative: string,
    fileTexts: string[] = []
): Promise<ExtractedClaimData> {
    try {
        if (!process.env.OPENAI_API_KEY) {
            console.warn('OpenAI API key not found, skipping AI extraction')
            return {}
        }

        // Combine narrative and file texts
        const fullText = [narrative, ...fileTexts].join('\n\n')

        const prompt = `
Please analyze the following claim text and extract key information. Return ONLY a valid JSON object with the following fields (use null if not found):

{
  "email": "email address if found",
  "phone": "phone number if found", 
  "refererPerson": "name of person making the claim or referrer",
  "claimType": "type of claim (e.g., insurance, complaint, refund, etc.)",
  "amount": "monetary amount if mentioned",
  "date": "relevant date if mentioned",
  "recipient": "who the claim is against or for",
  "description": "brief description of the claim",
  "urgency": "urgency level (low, medium, high)",
  "additionalInfo": "any other relevant information"
}

Claim text:
${fullText}

Extract and return JSON:`

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a claims processing assistant. Extract structured information from claim texts and return only valid JSON.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.1, // Low temperature for consistent extraction
            max_tokens: 500
        })

        const completion = response.choices[0]?.message?.content
        if (!completion) {
            throw new Error('No response from OpenAI')
        }

        // Try to parse the JSON response
        try {
            const extracted = JSON.parse(completion.trim())
            return extracted as ExtractedClaimData
        } catch (parseError) {
            console.error('Failed to parse OpenAI response as JSON:', completion)
            return {}
        }

    } catch (error) {
        console.error('AI extraction error:', error)
        return {}
    }
}

// Helper function to extract text from files (basic implementation)
export async function extractTextFromFile(file: File): Promise<string> {
    // For now, we'll return the filename as a placeholder
    // In a full implementation, you'd want to:
    // - For PDFs: Use a PDF parsing library
    // - For images: Use OCR (Tesseract.js or cloud OCR service)
    // - For text files: Read the content directly

    if (file.type === 'text/plain') {
        return await file.text()
    }

    // For other file types, return filename for now
    return `File: ${file.name} (${file.type})`
} 