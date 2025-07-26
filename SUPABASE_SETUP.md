# Supabase Setup for ClaimMate

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/login and create a new project
3. Choose a name (e.g., "claimmate")
4. Set a database password
5. Choose a region close to you

## 2. Get Your Project Credentials

1. Go to your project dashboard
2. Navigate to Settings → API
3. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon/public key** (starts with `eyJ`)

## 3. Update Environment Variables

Update your `.env` file with the Supabase credentials:

```env
# OpenAI API Key (required for chat functionality)
OPENAI_API_KEY=your-openai-api-key

# Supabase Project URL and Public Anon Key (required for auth and database)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# GitHub OAuth (required for social login)
AUTH_GITHUB_ID=your-github-client-id
AUTH_GITHUB_SECRET=your-github-client-secret

# (Optional, for Vercel/analytics features)
VERCEL_URL=localhost:3000
```

## 4. Run Database Migrations

### Option A: Using Supabase CLI (Recommended)

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

4. Run migrations:
   ```bash
   supabase db push
   ```

### Option B: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase/migrations/20241201000000_create_claims_table.sql`
4. Run the SQL

## 5. Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000/claim/new`
3. Submit a test claim
4. Visit `http://localhost:3000/claims` to see your claims

## 6. Features Available

✅ **Claim Submission**: Submit claims with text and file uploads
✅ **File Storage**: Files are stored in Supabase Storage
✅ **Claims List**: View all submitted claims
✅ **Status Management**: Update claim status (pending, solved, opposed, closed)
✅ **Real-time Updates**: Changes reflect immediately

## 7. Next Steps

- [ ] Add AI processing to extract structured data from claims
- [ ] Implement email notifications
- [ ] Add user authentication
- [ ] Create detailed claim view pages
- [ ] Add analytics and reporting

## Troubleshooting

### "Failed to fetch claims" Error
- Check your Supabase credentials in `.env`
- Ensure the database migration has been run
- Check the browser console for detailed error messages

### File Upload Issues
- Verify the storage bucket `claim-files` exists
- Check storage policies are correctly set
- Ensure file size is under 10MB

### Database Connection Issues
- Verify your Supabase project is active
- Check your IP is not blocked
- Ensure RLS policies are correctly configured 