import { type Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'

import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Binary Prototypes',
    default: 'Binary Prototypes - Empowering Young Innovators Through Robotics',
  },
  description:
    'Binary Prototypes (Try Catch Robotics) makes STEM education accessible and engaging for middle school students through hands-on robotics training. Building tomorrow\'s innovators today.',
  keywords: [
    'robotics education',
    'STEM learning',
    'middle school robotics',
    'coding for kids',
    'programming education',
    'robotics training',
    'STEM curriculum',
    'educational technology',
    'young innovators',
    'binary prototypes',
    'try catch robotics',
    'hands-on learning',
    'robotics classes',
    'coding bootcamp',
    'technology education'
  ],
  authors: [{ name: 'Binary Prototypes' }],
  creator: 'Binary Prototypes',
  publisher: 'Binary Prototypes',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://binaryprototypes.com',
    title: 'Binary Prototypes - Empowering Young Innovators Through Robotics',
    description: 'Binary Prototypes (Try Catch Robotics) makes STEM education accessible and engaging for middle school students through hands-on robotics training.',
    siteName: 'Binary Prototypes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Binary Prototypes - Empowering Young Innovators Through Robotics',
    description: 'Binary Prototypes (Try Catch Robotics) makes STEM education accessible and engaging for middle school students through hands-on robotics training.',
  },
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
        lexend.variable,
      )}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Binary Prototypes",
              "alternateName": "Try Catch Robotics",
              "description": "Binary Prototypes (Try Catch Robotics) makes STEM education accessible and engaging for middle school students through hands-on robotics training.",
              "url": "https://binaryprototypes.com",
              "logo": "https://binaryprototypes.com/logo.png",
              "sameAs": [],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service"
              },
              "offers": {
                "@type": "Offer",
                "name": "Robotics Education Program",
                "description": "Hands-on robotics training for middle school students",
                "category": "STEM Education"
              },
              "educationalLevel": "Middle School",
              "educationalUse": "Instruction",
              "learningResourceType": "Course",
              "teaches": [
                "Robotics",
                "Programming",
                "STEM",
                "Engineering",
                "Technology"
              ]
            })
          }}
        />
      </head>
      <body className="flex h-full flex-col" suppressHydrationWarning>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
