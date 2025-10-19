import { createClient } from '@/lib/supabase/client'

/**
 * Authentication result type for consistent error handling
 */
export type AuthResult = {
  data?: any
  error: string | null
}

/**
 * Sign up a new user with email and password
 */
export async function signUp(email: string, password: string): Promise<AuthResult> {
  const supabase = createClient()
  
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
 * Sign in with email and password
 */
export async function signIn(email: string, password: string): Promise<AuthResult> {
  const supabase = createClient()
  
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
 * Sign in with magic link (passwordless authentication)
 */
export async function signInWithMagicLink(email: string): Promise<AuthResult> {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { data, error: null }
}

/**
 * Sign in with Google OAuth
 */
export async function signInWithGoogle(): Promise<AuthResult> {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { data, error: null }
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<AuthResult> {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })

  if (error) {
    return { error: error.message }
  }

  return { data, error: null }
}

/**
 * Update user password (for password reset flow)
 */
export async function updatePassword(newPassword: string): Promise<AuthResult> {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    return { error: error.message }
  }

  return { data, error: null }
}

/**
 * Update user metadata
 */
export async function updateUserMetadata(metadata: Record<string, any>): Promise<AuthResult> {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.updateUser({
    data: metadata,
  })

  if (error) {
    return { error: error.message }
  }

  return { data, error: null }
}

/**
 * Get current user
 */
export async function getCurrentUser() {
  const supabase = createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) {
    return { user: null, error: error.message }
  }

  return { user, error: null }
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<AuthResult> {
  const supabase = createClient()
  
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    return { error: error.message }
  }

  return { error: null }
}
