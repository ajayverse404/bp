import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (!error) {
        // Successfully exchanged code for session
        const forwardedHost = request.headers.get('x-forwarded-host')
        const forwardedProto = request.headers.get('x-forwarded-proto')
        const isLocalEnv = process.env.NODE_ENV === 'development'
        
        // Determine the correct redirect URL
        let redirectUrl: string
        
        if (isLocalEnv) {
          // Development environment
          redirectUrl = `${origin}${next}`
        } else if (forwardedHost) {
          // Production with load balancer (Vercel, etc.)
          const protocol = forwardedProto || 'https'
          redirectUrl = `${protocol}://${forwardedHost}${next}`
        } else {
          // Production without load balancer - use origin but ensure it's HTTPS
          const url = new URL(origin)
          if (url.protocol === 'http:' && process.env.NODE_ENV === 'production') {
            url.protocol = 'https:'
          }
          redirectUrl = `${url.toString().replace(/\/$/, '')}${next}`
        }
        
        console.log('Auth callback redirect:', { 
          isLocalEnv, 
          forwardedHost, 
          forwardedProto, 
          origin, 
          redirectUrl 
        })
        
        return NextResponse.redirect(redirectUrl)
      } else {
        console.error('Error exchanging code for session:', error)
        return NextResponse.redirect(`${origin}/login?error=Authentication failed`)
      }
    } catch (error) {
      console.error('Unexpected error in auth callback:', error)
      return NextResponse.redirect(`${origin}/login?error=Authentication failed`)
    }
  }

  // No code provided, redirect to login with error
  return NextResponse.redirect(`${origin}/login?error=No authentication code provided`)
}
