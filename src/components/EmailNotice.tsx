import { InformationCircleIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

interface EmailNoticeProps {
  variant?: 'info' | 'warning' | 'success'
  className?: string
}

export function EmailNotice({ variant = 'info', className = '' }: EmailNoticeProps) {
  const baseClasses = "rounded-md p-4 border-l-4"
  
  const variantClasses = {
    info: "bg-blue-50 border-blue-400 text-blue-700",
    warning: "bg-yellow-50 border-yellow-400 text-yellow-700", 
    success: "bg-green-50 border-green-400 text-green-700"
  }

  const iconClasses = {
    info: "text-blue-400",
    warning: "text-yellow-400",
    success: "text-green-400"
  }

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <EnvelopeIcon className={`h-5 w-5 ${iconClasses[variant]}`} aria-hidden="true" />
        </div>
        <div className="ml-3">
          <div className="text-sm">
            <p className="font-medium">
              Email Communications
            </p>
            <div className="mt-1">
              <p>
                We use email for all communications including login links, account updates, and program materials. 
                Please check your spam folder if you don't receive expected emails.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SpamFolderReminder({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-md bg-blue-50 p-3 border border-blue-200 ${className}`}>
      <div className="flex items-start">
        <InformationCircleIcon className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
        <div className="ml-2">
          <p className="text-xs text-blue-700">
            <strong>Can't find the email?</strong> Check your spam folder or contact us if you need assistance.
          </p>
        </div>
      </div>
    </div>
  )
}
