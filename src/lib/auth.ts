import { supabase, isSupabaseConfigured } from './supabase'

export interface UserProfile {
  id: string
  email: string
  name: string
  role: 'organizer' | 'attendee' | 'vendor' | 'sponsor' | 'volunteer'
  organization?: string
  avatar_url?: string
  created_at: string
}

export async function signUp(email: string, password: string, name: string, role: string) {
  try {
    // Demo mode: Simulate successful signup
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - using demo mode')
      const mockUser = {
        id: 'demo-user-' + Date.now(),
        email,
        user_metadata: { name, role }
      }
      // Store in localStorage for demo
      if (typeof window !== 'undefined') {
        localStorage.setItem('demo-user', JSON.stringify(mockUser))
      }
      return { user: mockUser as any, error: null }
    }

    // Real Supabase signup
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role
        }
      }
    })

    if (authError) throw authError

    // Create profile
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email,
          name,
          role
        })

      if (profileError) {
        // If it's an RLS error, we can still proceed as the user was created
        if (profileError.message.includes('row-level security')) {
          console.warn('RLS error creating profile - proceeding with auth only')
          return { user: authData.user, error: null }
        }
        throw profileError
      }
    }

    return { user: authData.user, error: null }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}

export async function signIn(email: string, password: string) {
  try {
    // Demo mode: Simulate successful login
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured - using demo mode')
      const mockUser = {
        id: 'demo-user-khushi',
        email,
        user_metadata: { name: 'Khushi Diwan', role: 'organizer' }
      }
      // Store in localStorage for demo
      if (typeof window !== 'undefined') {
        localStorage.setItem('demo-user', JSON.stringify(mockUser))
      }
      return { user: mockUser as any, error: null }
    }

    // Real Supabase login
    const { data: { user, session }, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    if (!user) throw new Error('No user returned from login')

    // Set session in localStorage
    if (session) {
      supabase.auth.setSession(session)
    }

    // Verify profile exists
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      // Create profile if it doesn't exist
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([{
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || user.email?.split('@')[0],
          role: user.user_metadata?.role || 'user'
        }])

      if (insertError && !insertError.message.includes('row-level security')) {
        console.error('Profile creation error:', insertError)
      }
    }

    return { user, error: null }
  } catch (error: any) {
    console.error('Sign in error:', error)
    return { user: null, error: error.message }
  }
}

export async function signOut() {
  // Demo mode: Clear localStorage
  if (!isSupabaseConfigured()) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('demo-user')
    }
    return { error: null }
  }

  // Real Supabase logout
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getCurrentUser() {
  // Demo mode: Get from localStorage
  if (!isSupabaseConfigured()) {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('demo-user')
      if (stored) {
        return JSON.parse(stored)
      }
    }
    return null
  }

  // Real Supabase user fetch
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }

  return data
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  return { data, error }
}

