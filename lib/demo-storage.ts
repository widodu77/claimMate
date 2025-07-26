// Simple in-memory storage for demo purposes when Supabase is not configured
import { extractClaimInformation, extractTextFromFile } from './ai-extraction'

interface DemoClaim {
    id: string
    created_at: string
    updated_at: string
    narrative: string
    status: 'pending' | 'solved' | 'opposed' | 'closed'
    files: string[]
    extracted_data?: any
}

class DemoStorage {
    private claims: DemoClaim[] = []
    private nextId = 1

    async createClaim(narrative: string, files: File[] = []): Promise<DemoClaim> {
        const now = new Date().toISOString()
        
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

        // Use AI to extract structured information
        const extractedData = await extractClaimInformation(narrative, fileTexts)
        
        const claim: DemoClaim = {
            id: `demo-${this.nextId++}`,
            created_at: now,
            updated_at: now,
            narrative,
            status: 'pending',
            files: files.map(file => `demo-file-${Date.now()}-${file.name}`),
            extracted_data: extractedData
        }

        this.claims.unshift(claim) // Add to beginning
        return claim
    }

    async getClaims(): Promise<DemoClaim[]> {
        return [...this.claims]
    }

    async updateClaimStatus(id: string, status: DemoClaim['status']): Promise<DemoClaim | null> {
        const claim = this.claims.find(c => c.id === id)
        if (claim) {
            claim.status = status
            claim.updated_at = new Date().toISOString()
            return claim
        }
        return null
    }

    async getClaim(id: string): Promise<DemoClaim | null> {
        return this.claims.find(c => c.id === id) || null
    }

    async deleteClaim(id: string): Promise<boolean> {
        const index = this.claims.findIndex(c => c.id === id)
        if (index !== -1) {
            this.claims.splice(index, 1)
            return true
        }
        return false
    }
}

export const demoStorage = new DemoStorage() 