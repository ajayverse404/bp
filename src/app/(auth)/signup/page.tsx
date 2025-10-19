'use client'

import { type Metadata } from 'next'
import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { signUp, signInWithGoogle } from '@/lib/auth-helpers-client'

function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check for success message from password reset
    const successMessage = searchParams.get('message')
    if (successMessage) {
      setMessage(successMessage)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setMessage('')

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    // Validate password strength
    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      setIsLoading(false)
      return
    }

    const { error: signUpError } = await signUp(email, password)
    
    if (signUpError) {
      setError(signUpError)
    } else {
      setMessage('Account created successfully! Please check your email to verify your account.')
      // Clear form
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    }
    
    setIsLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError('')
    setMessage('')

    const { error: googleError } = await signInWithGoogle()
    
    if (googleError) {
      setError(googleError)
      setIsLoading(false)
    }
    // Note: Google OAuth will redirect, so we don't need to handle success here
  }

  return (
    <SlimLayout>
      <div>
        <Link href="/" aria-label="Home" className="inline-block">
          <div className="flex items-center gap-3 mb-2">
            <Logo className="h-12 w-auto" />
            <div>
              <div className="text-xl font-bold text-gray-900">Try Catch Robotics</div>
              <div className="text-sm text-gray-500">by Binary Prototypes</div>
            </div>
          </div>
        </Link>
      </div>
      <h2 className="mt-16 text-lg font-semibold text-gray-900">
        Create your account
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign in
        </Link>{' '}
        to your account.
      </p>
      
      {message && (
        <div className="mt-4 rounded-md bg-green-50 p-4">
          <div className="text-sm text-green-700">{message}</div>
        </div>
      )}
      
      {error && (
        <div className="mt-4 rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-y-8">
        <TextField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div>
          <Button 
            type="submit" 
            variant="solid" 
            color="blue" 
            className="w-full"
            disabled={isLoading}
          >
            <span>
              {isLoading ? 'Creating account...' : 'Create account'} <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>

      {/* Divider */}
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>
      </div>

      {/* Google Sign In */}
      <div className="mt-6">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>{isLoading ? 'Signing up...' : 'Continue with Google'}</span>
        </button>
      </div>
    </SlimLayout>
  )
}

export default function Signup() {
  return (
    <Suspense fallback={
      <SlimLayout>
        <div>
          <Link href="/" aria-label="Home" className="inline-block">
            <div className="flex items-center gap-3 mb-2">
              <Logo className="h-12 w-auto" />
              <div>
                <div className="text-xl font-bold text-gray-900">Try Catch Robotics</div>
                <div className="text-sm text-gray-500">by Binary Prototypes</div>
              </div>
            </div>
          </Link>
        </div>
        <h2 className="mt-16 text-lg font-semibold text-gray-900">
          Loading...
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          Please wait while we load the signup page.
        </p>
      </SlimLayout>
    }>
      <SignupForm />
    </Suspense>
  )
}
