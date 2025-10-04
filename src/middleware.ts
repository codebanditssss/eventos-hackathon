import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  try {
    // Check for auth cookie (simple auth check)
    const isAuthenticated = req.cookies.get('eventos-auth')?.value === 'true'

    console.log('🔒 Middleware checking:', req.nextUrl.pathname)
    console.log('👤 Authenticated:', isAuthenticated)

    // Handle auth routes - allow access to login/signup even if logged in
    if (req.nextUrl.pathname.startsWith('/auth/')) {
      // Always allow access to auth pages
      return res
    }

    // Handle onboarding route
    if (req.nextUrl.pathname.startsWith('/onboarding')) {
      // Allow access to onboarding for anyone (we'll check auth inside the page)
      return res
    }

    // Protected routes (dashboard)
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      if (!isAuthenticated) {
        console.log('❌ Not authenticated, redirecting to login')
        return NextResponse.redirect(new URL('/auth/login', req.url))
      }
      console.log('✅ Authenticated, allowing access')
      return res
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    return res
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*', '/onboarding/:path*']
}