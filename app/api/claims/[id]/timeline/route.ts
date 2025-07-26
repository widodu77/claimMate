import { NextRequest, NextResponse } from 'next/server'
import { supabase, hasValidSupabaseConfig } from '@/lib/supabase'
import { demoStorage } from '@/lib/demo-storage'
import { generateInitialClaimMessage, generateFollowUpMessage, TimelineMessage } from '@/lib/ai-message-generation'

// In-memory chat storage for demo mode
const demoChats: Record<string, TimelineMessage[]> = {}

// GET - Fetch chat messages for a claim
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Use demo storage if Supabase is not configured
        if (!hasValidSupabaseConfig) {
            try {
                const claim = await demoStorage.getClaim(params.id)
                if (!claim) {
                    return NextResponse.json(
                        { error: 'Claim not found' },
                        { status: 404 }
                    )
                }
                // Return chat history for this claim
                const chat = demoChats[params.id] || []
                return NextResponse.json({ chat, demo: true })
            } catch (error) {
                return NextResponse.json(
                    { error: 'Failed to fetch chat in demo mode' },
                    { status: 500 }
                )
            }
        }

        // Fetch chat messages from Supabase
        const { data: chat, error } = await supabase
            .from('claim_chats')
            .select('*')
            .eq('claim_id', params.id)
            .order('timestamp', { ascending: true })

        if (error) {
            console.error('Supabase error:', error)
            // If table doesn't exist or other error, fall back to demo mode
            const chat = demoChats[params.id] || []
            return NextResponse.json({ chat, demo: true, error: 'Using demo mode due to database error' })
        }

        return NextResponse.json({ chat: chat || [] })
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// POST - Save a new chat message (user or AI)
export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json()
        const { sender, content, status = 'delivered' } = body
        if (!sender || !content) {
            return NextResponse.json(
                { error: 'Missing sender or content' },
                { status: 400 }
            )
        }

        const message: TimelineMessage = {
            id: `msg-${Date.now()}`,
            type: sender === 'ai' ? 'ai_generated' : 'user_sent',
            content,
            timestamp: new Date().toISOString(),
            status
        }

        // Demo mode: store in memory
        if (!hasValidSupabaseConfig) {
            if (!demoChats[params.id]) demoChats[params.id] = []
            demoChats[params.id].push(message)
            return NextResponse.json({ message, demo: true })
        }

        // Supabase: insert into claim_chats
        const { data, error } = await supabase
            .from('claim_chats')
            .insert({
                claim_id: params.id,
                sender,
                content,
                status,
                timestamp: new Date().toISOString()
            })
            .select()
            .single()

        if (error) {
            console.error('Supabase insert error:', error)
            // If table doesn't exist or other error, fall back to demo mode
            if (!demoChats[params.id]) demoChats[params.id] = []
            demoChats[params.id].push(message)
            return NextResponse.json({ message, demo: true, error: 'Using demo mode due to database error' })
        }

        return NextResponse.json({
            message: {
                id: data.id,
                type: sender === 'ai' ? 'ai_generated' : 'user_sent',
                content: data.content,
                timestamp: data.timestamp,
                status: data.status
            }
        })
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
} 