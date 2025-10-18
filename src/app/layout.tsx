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
      <body className="flex h-full flex-col" suppressHydrationWarning>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
