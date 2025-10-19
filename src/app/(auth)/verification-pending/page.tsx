import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { EmailNotice } from '@/components/EmailNotice'
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function VerificationPending() {
  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      
      <div className="mt-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <ClockIcon className="h-8 w-8 text-blue-600" aria-hidden="true" />
        </div>
        <h2 className="mt-6 text-lg font-semibold text-gray-900">
          Account Verification Pending
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          Your account is being verified. You'll receive an email once verification is complete.
        </p>
      </div>

      {/* Email Communication Notice */}
      <div className="mt-8">
        <EmailNotice />
      </div>

      {/* Verification Steps */}
      <div className="mt-8 space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Verification Steps</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">
                <strong>Email Verification:</strong> Check your email and click the verification link
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <ClockIcon className="h-5 w-5 text-yellow-500" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">
                <strong>Parent Approval:</strong> If you're a student, your parent/guardian will receive an approval request
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <ClockIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">
                <strong>Access Granted:</strong> Once verified, you'll have full access to program materials
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-8 rounded-lg bg-gray-50 p-4">
        <h3 className="text-sm font-medium text-gray-900">Need Help?</h3>
        <p className="mt-1 text-sm text-gray-600">
          If you haven't received a verification email or need assistance, please contact our support team.
        </p>
        <div className="mt-3">
          <Link
            href="mailto:support@binaryprototypes.com"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Contact Support →
          </Link>
        </div>
      </div>

      {/* Back to Login */}
      <div className="mt-8 text-center">
        <Link
          href="/login"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Sign In
        </Link>
      </div>
    </SlimLayout>
  )
}
