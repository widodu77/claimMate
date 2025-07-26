# Supabase Chat Setup

To enable persistent chat storage, run this SQL in your Supabase SQL Editor:

```sql
-- Create claim_chats table for storing chat messages
create table if not exists claim_chats (
  id uuid primary key default gen_random_uuid(),
  claim_id uuid references claims(id) on delete cascade,
  sender text not null check (sender in ('user', 'ai')),
  content text not null,
  timestamp timestamptz not null default now(),
  status text default 'delivered'
);

-- Index for fast lookup by claim_id
create index if not exists idx_claim_chats_claim_id on claim_chats(claim_id);

-- Enable RLS
alter table claim_chats enable row level security;

-- RLS policies (for now, allow all operations - you can restrict this later)
create policy "Allow all operations on claim_chats" on claim_chats
  for all using (true);
```

## How it works:

1. **Without the table**: The app will use demo mode (in-memory storage)
2. **With the table**: The app will persist all chat messages in Supabase
3. **Fallback**: If there's any database error, it automatically falls back to demo mode

## Features:

- ✅ Persistent chat storage
- ✅ Demo mode fallback
- ✅ Error handling
- ✅ Real-time message saving
- ✅ Chat history preservation

The chat will now save all messages and persist them between sessions! 