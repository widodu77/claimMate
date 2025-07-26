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