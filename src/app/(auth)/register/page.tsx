'use client'

import { type Metadata } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { EmailNotice } from '@/components/EmailNotice'
import { signUp } from '@/lib/auth-helpers-client'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

type AccountType = 'parent' | 'student'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [accountType, setAccountType] = useState<AccountType>('parent')
  const [parentEmail, setParentEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setMessage('')

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      setIsLoading(false)
      return
    }

    if (accountType === 'student' && !parentEmail) {
      setError('Parent email is required for student accounts')
      setIsLoading(false)
      return
    }

    try {
      // Get reCAPTCHA token
      const recaptchaToken = executeRecaptcha ? await executeRecaptcha('register') : undefined
      
      // Prepare metadata
      const metadata: Record<string, any> = {
        account_type: accountType,
        full_name: fullName,
      }

      if (accountType === 'student') {
        metadata.parent_email = parentEmail
      }

      const { error: signUpError } = await signUp(email, password, recaptchaToken, metadata)
      
      if (signUpError) {
        setError(signUpError)
      } else {
        setMessage('Account created successfully! Please check your email to verify your account.')
        // Redirect to login after a short delay
        setTimeout(() => {
          router.push('/login?message=Account created successfully! Please check your email to verify your account.')
        }, 3000)
      }
    } catch (recaptchaError) {
      console.warn('reCAPTCHA error:', recaptchaError)
      // Continue without reCAPTCHA if it fails
      const metadata: Record<string, any> = {
        account_type: accountType,
        full_name: fullName,
      }

      if (accountType === 'student') {
        metadata.parent_email = parentEmail
      }

      const { error: signUpError } = await signUp(email, password, undefined, metadata)
      
      if (signUpError) {
        setError(signUpError)
      } else {
        setMessage('Account created successfully! Please check your email to verify your account.')
        setTimeout(() => {
          router.push('/login?message=Account created successfully! Please check your email to verify your account.')
        }, 3000)
      }
    }
    
    setIsLoading(false)
  }

  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Create your account
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign in
        </Link>
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

      {/* Email Communication Notice */}
      <div className="mt-6">
        <EmailNotice />
      </div>

      {/* Account Type Selection */}
      <div className="mt-6">
        <label className="text-sm font-medium text-gray-900">Account Type</label>
        <div className="mt-2 flex rounded-lg bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => setAccountType('parent')}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              accountType === 'parent'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Parent/Guardian
          </button>
          <button
            type="button"
            onClick={() => setAccountType('student')}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              accountType === 'student'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Student
          </button>
        </div>
        {accountType === 'student' && (
          <p className="mt-2 text-xs text-gray-600">
            Student accounts require parent/guardian approval before accessing program materials.
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-y-8">
        <TextField
          label="Full name"
          name="fullName"
          type="text"
          autoComplete="name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        
        <TextField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {accountType === 'student' && (
          <TextField
            label="Parent/Guardian email"
            name="parentEmail"
            type="email"
            autoComplete="email"
            required
            value={parentEmail}
            onChange={(e) => setParentEmail(e.target.value)}
            helpText="Your parent/guardian will receive an approval request"
          />
        )}
        
        <TextField
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helpText="Must be at least 6 characters long"
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

      {/* Terms and Privacy */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          By creating an account, you agree to our{' '}
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </SlimLayout>
  )
}
