'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Loader2 } from 'lucide-react'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleAuthCallback = async () => {
      const code = searchParams.get('code')
      const next = searchParams.get('next') || '/dashboard'

      // If no code, this isn't an auth callback
      if (!code) {
        router.replace('/auth/login')
        return
      }

      try {
        // Exchange code for session
        const { data: { session }, error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
        
        if (sessionError) {
          console.error('Auth callback error:', sessionError)
          router.replace('/auth/login?error=Unable to sign in')
          return
        }

        if (!session) {
          router.replace('/auth/login?error=No session found')
          return
        }

        // Get user profile to ensure it exists
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (profileError || !profile) {
          // Create profile if it doesn't exist
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([{
              id: session.user.id,
              email: session.user.email,
              full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
              role: session.user.user_metadata?.role || 'user'
            }])

          if (insertError && !insertError.message.includes('row-level security')) {
            console.error('Profile creation error:', insertError)
          }
        }

        // Redirect to the intended destination
        router.replace(next)
      } catch (error) {
        console.error('Auth callback error:', error)
        router.replace('/auth/login?error=Unable to sign in')
      }
    }

    handleAuthCallback()
  }, [router, searchParams])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Signing you in...</h2>
            <p className="text-gray-600">Please wait while we complete the authentication process.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
