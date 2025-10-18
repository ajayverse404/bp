import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Authentication result type for consistent error handling
 */
export type AuthResult = {
  data?: any
  error: string | null
}

/**
 * Sign up a new user with email and password (server-side)
 */
export async function signUp(email: string, password: string): Promise<AuthResult> {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  return { data, error: null }
}

/**
 * Sign in with email and password (server-side)
 */
export async function signIn(email: string, password: string): Promise<AuthResult> {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  return { data, error: null }
}

/**
 * Sign out the current user (server-side)
 */
export async function signOut() {
  const supabase = await createClient()
  
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    return { error: error.message }
  }

  redirect('/login')
}

/**
 * Get current user (server-side)
 */
export async function getUser() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

/**
 * Update user metadata (server-side)
 * Used for tracking first-time login and other user preferences
 */
export async function updateUserMetadata(metadata: Record<string, any>): Promise<AuthResult> {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.updateUser({
    data: metadata,
  })

  if (error) {
    return { error: error.message }
  }

  return { data, error: null }
}

/**
 * Check if this is the user's first login
 * Returns true if user has not seen the welcome banner
 */
export async function checkIsFirstLogin(): Promise<boolean> {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return false
  }

  // Check if user has seen the welcome banner
  const hasSeenWelcome = user.user_metadata?.has_seen_welcome
  return !hasSeenWelcome
}

/**
 * Mark user as having seen the welcome banner
 */
export async function markWelcomeAsSeen(): Promise<AuthResult> {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.updateUser({
    data: {
      has_seen_welcome: true,
      first_login_at: new Date().toISOString(),
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { data, error: null }
}
