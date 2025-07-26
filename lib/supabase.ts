import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Check if we have valid Supabase credentials
export const hasValidSupabaseConfig = supabaseUrl !== 'https://placeholder.supabase.co' &&
    supabaseAnonKey !== 'placeholder-key' &&
    supabaseUrl.startsWith('https://') &&
    (supabaseAnonKey.startsWith('eyJ') || supabaseAnonKey.startsWith('sb_anon_'))

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: false // Disable session persistence to avoid warnings
    }
})

// Database types
export interface Claim {
    id: string
    created_at: string
    updated_at: string
    narrative: string
    status: 'pending' | 'solved' | 'opposed' | 'closed'
    files: string[] // Array of file URLs
    extracted_data?: any // AI extracted structured data
}

export interface CreateClaimRequest {
    narrative: string
    files?: File[]
} 