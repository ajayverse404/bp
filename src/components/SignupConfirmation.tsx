export function SignupConfirmation() {
  return (
    <div className="mx-auto max-w-4xl py-8">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Thank you for signing up!
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Welcome to BinaryPrototypes
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {/* Feature 1: Profile Review */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Profile Review in Progress
              </h3>
              <p className="mt-1 text-gray-600">
                We are reviewing your profile. One of our core team members will communicate with you via email about the next steps.
              </p>
            </div>
          </div>

          {/* Feature 2: Contact Information */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Have Questions?
              </h3>
              <p className="mt-1 text-gray-600">
                If you have any other questions, please don't hesitate to email us at{' '}
                <a 
                  href="mailto:binaryprototypes@gmail.com" 
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  binaryprototypes@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 rounded-lg bg-blue-50 p-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                What happens next?
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Our team will review your application and get back to you within 1-2 business days. 
                  In the meantime, feel free to explore our platform and reach out if you have any questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
