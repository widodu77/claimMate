-- Create claims table
create table "public"."claims" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "narrative" text not null,
    "status" text not null default 'pending' check (status in ('pending', 'solved', 'opposed', 'closed')),
    "files" text[] default '{}',
    "extracted_data" jsonb default '{}',
    "user_id" uuid null default auth.uid()
);

-- Create primary key
CREATE UNIQUE INDEX claims_pkey ON public.claims USING btree (id);
alter table "public"."claims" add constraint "claims_pkey" PRIMARY KEY using index "claims_pkey";

-- Add foreign key constraint
alter table "public"."claims" add constraint "claims_user_id_fkey" 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;
alter table "public"."claims" validate constraint "claims_user_id_fkey";

-- Enable RLS
alter table "public"."claims" enable row level security;

-- Create policies
create policy "Allow full access to own claims"
on "public"."claims"
as permissive
for all
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));

create policy "Allow public read for demo purposes"
on "public"."claims"
as permissive
for select
to public
using (true);

-- Create storage bucket for claim files
insert into storage.buckets (id, name, public) 
values ('claim-files', 'claim-files', true);

-- Create storage policy for claim files
create policy "Allow public access to claim files"
on storage.objects
as permissive
for all
to public
using (bucket_id = 'claim-files')
with check (bucket_id = 'claim-files');

-- Create function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create trigger to automatically update updated_at
create trigger update_claims_updated_at
    before update on claims
    for each row
    execute function update_updated_at_column(); 