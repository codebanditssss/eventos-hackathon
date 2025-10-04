-- First, create the user in auth.users
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'test@eventos.com',
  crypt('eventos123', gen_salt('bf')), -- Password is 'eventos123'
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Test User","role":"organizer"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
) RETURNING id;

-- Then, create their profile (run this after getting the id from above query)
-- Replace USER_ID with the id returned from the first query
INSERT INTO public.profiles (
  id,
  email,
  name,
  role,
  created_at,
  updated_at
) VALUES (
  'USER_ID', -- Replace this with the id from above query
  'test@eventos.com',
  'Test User',
  'organizer',
  NOW(),
  NOW()
);