# 🔍 Debug Login Issue

## Steps to Debug:

1. **Open Browser Console:**
   - Press `F12` or `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Option+I` (Mac)
   - Go to the "Console" tab

2. **Try to Login:**
   - Go to `http://localhost:3000/auth/login`
   - Enter your credentials:
     - Email: `test@eventos.com`
     - Password: `eventos123`
   - Click "Sign In"

3. **Check Console Output:**
   Look for these messages in the console:
   - 🔐 Starting login process...
   - 📍 Redirect URL: /dashboard
   - 🔑 Attempting password login...
   - Session: (should show session object)
   - Sign in error: (should be null if successful)
   - ✅ Login successful, user ID: (should show user ID)
   - 💾 Session saved
   - 👤 Fetching user profile...
   - Profile: (should show profile object or null)
   - Profile error: (check what error appears here)
   - 🚀 Redirecting to: /dashboard

4. **Common Issues:**

   ### Issue 1: RLS Policy Error
   If you see "row-level security policy" error:
   - Run the SQL from `supabase/policies.sql` in Supabase SQL Editor

   ### Issue 2: No Profile Found
   If profile is null and you get an error:
   - Check if the profile was created during signup
   - Run this SQL to check:
     ```sql
     SELECT * FROM profiles WHERE email = 'test@eventos.com';
     ```

   ### Issue 3: Session Not Persisting
   If session is null:
   - Check if your Supabase URL and keys are correct in `.env.local`
   - Clear browser localStorage and try again

   ### Issue 4: Redirect Not Working
   If you see "🚀 Redirecting" but nothing happens:
   - Check the middleware in `src/middleware.ts`
   - The middleware might be intercepting the redirect

5. **Manual Fix:**

   If you can't login, try accessing the dashboard directly:
   ```
   http://localhost:3000/dashboard
   ```

   If this works, the issue is with the login flow, not the dashboard itself.

## Next Steps After Debugging:

Once you identify the error in the console, share it with me so I can fix the specific issue!

