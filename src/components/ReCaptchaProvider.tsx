'use client'

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

interface ReCaptchaProviderProps {
  children: React.ReactNode
}

export function ReCaptchaProvider({ children }: ReCaptchaProviderProps) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  if (!siteKey) {
    console.warn('reCAPTCHA site key not found. CAPTCHA protection disabled.')
    return <>{children}</>
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
      useRecaptchaNet={false}
      useEnterprise={false}
      container={{
        element: undefined,
        parameters: {
          badge: 'bottomright',
          theme: 'light',
        },
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}
