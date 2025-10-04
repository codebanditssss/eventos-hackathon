# 🚀 EventOS Environment Setup

## ✅ **FIXED: Supabase Error**

The app now works in **demo mode** without environment variables! However, for full functionality, you'll need to set up your `.env.local` file.

---

## 📋 **Quick Setup (2 Minutes)**

### **Step 1: Create `.env.local` file**

In your project root (`C:\Users\Khushi\eventos`), create a file named `.env.local` with the following content:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **Step 2: Get Your Supabase Keys**

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Click **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

### **Step 3: Get Your OpenAI Key**

1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy it to `OPENAI_API_KEY`

### **Step 4: Set Up Your Database**

Run the SQL schema and policies in your Supabase SQL Editor:

1. Open Supabase Dashboard → **SQL Editor**
2. Click **New Query**
3. First, paste and run the contents of `database-schema.sql`
4. Then, paste and run the contents of `supabase/policies.sql`

This sets up both your database tables and the necessary security policies.

### **Step 5: Restart Your Dev Server**

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## 🎮 **Demo Mode Features**

Without environment variables, the app works in **demo mode**:

- ✅ **Login/Signup**: Works with any email/password (stored in localStorage)
- ✅ **Dashboard**: All dashboards work with mock data
- ✅ **AI Features**: Uses fallback mock responses
- ⚠️ **Limitations**: No real database persistence, no real AI insights

Once you add your environment variables, all features will be fully functional!

---

## 📖 **Full Setup Guide**

For detailed instructions, see `SETUP_GUIDE.md`.

---

## 🆘 **Need Help?**

- Check `SETUP_GUIDE.md` for detailed instructions
- See `readme.md` for project overview
- All demo credentials work: `test@example.com` / `password`

