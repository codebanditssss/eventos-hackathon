# 🚀 EventOS Setup Guide - Supabase Integration

## Prerequisites
✅ You already have:
- Supabase MCP configured in `.cursor/mcp.json`
- Supabase libraries installed (`@supabase/supabase-js`, `@supabase/ssr`)
- Database schema ready in `database-schema.sql`

---

## Step 1: Create Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Fill in:
   - **Name**: EventOS
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to you
4. Click "Create new project"
5. Wait 2-3 minutes for setup to complete

---

## Step 2: Get Your Supabase Credentials

1. In your Supabase project, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
   - **service_role** key (starts with `eyJ...`) - Keep this secret!

---

## Step 3: Create Environment Variables File

Create a file named `.env.local` in the root of your project:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your_anon_key
SUPABASE_SERVICE_ROLE_KEY=eyJ...your_service_role_key

# OpenAI Configuration (optional for AI features)
OPENAI_API_KEY=sk-...your_openai_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_random_string_here
NEXTAUTH_URL=http://localhost:3000
```

**To generate NEXTAUTH_SECRET**, run in terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Step 4: Set Up Database Schema

### Option A: Using Supabase Dashboard (Recommended)

1. In Supabase Dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `database-schema.sql`
4. Paste into the SQL Editor
5. Click "Run" (or press Ctrl+Enter)
6. Wait for success message: "Success. No rows returned"

### Option B: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link your project
supabase link --project-ref your_project_ref

# Run migrations
supabase db push
```

---

## Step 5: Enable Row Level Security (RLS) Policies

After running the schema, the RLS policies are already set up! They include:

✅ **Users can read their own profile**
✅ **Organizers can manage their events**
✅ **Attendees can view published events**
✅ **Vendors/Sponsors can view events they're associated with**

---

## Step 6: Test Your Connection

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Step 7: Create Your First User (Authentication)

You have 2 options:

### Option A: Enable Email Authentication (Simple)

1. In Supabase Dashboard → **Authentication** → **Providers**
2. Enable "Email" provider
3. Configure email templates (optional)
4. Users can sign up with email/password

### Option B: Enable Social Authentication (Google, GitHub, etc.)

1. In Supabase Dashboard → **Authentication** → **Providers**
2. Enable your preferred provider (Google, GitHub, etc.)
3. Add OAuth credentials from the provider
4. Configure redirect URLs

---

## Step 8: Seed Some Test Data (Optional)

Once authenticated, you can add test data through the Supabase Dashboard:

1. Go to **Table Editor**
2. Select `profiles` table
3. Manually add test users
4. Add test events, sessions, etc.

Or create a seed script (I can help with this!)

---

## 🎯 What's Next?

Now that Supabase is set up, we can:

1. ✅ **Add Authentication** to your dashboards
2. ✅ **Replace mock data** with real Supabase queries
3. ✅ **Enable real-time updates** (live data sync)
4. ✅ **Add file uploads** (avatars, event images)
5. ✅ **Implement role-based access control**

---

## 🔧 Troubleshooting

### "Missing environment variables" error
- Make sure `.env.local` exists in the root directory
- Restart your dev server after creating `.env.local`

### "Failed to fetch" error
- Check your Supabase project is running
- Verify your `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check your API keys are correct

### Database connection issues
- Verify your database schema ran successfully
- Check Supabase project is active (not paused)

---

## 📚 Useful Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase + Next.js Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

## 🆘 Need Help?

If you encounter any issues:
1. Check the Supabase Dashboard logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Restart your development server

Let me know which step you'd like help with! 🚀


