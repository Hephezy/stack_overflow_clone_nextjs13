import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'
import { Inter, Space_Grotesk } from 'next/font/google';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/context/ThemeProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter'
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-spaceGrotesk'
})

export const metadata: Metadata = {
  title: 'DevOverFlow',
  description: 'A community driven platform where you can ask and answer programming questions',
  icons: {
    icon: '/assets/images/site-logo.svg'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: 'primary-gradient',
              footerActionLink: 'primary-text-gradient hover:text-primary-500'
            }
          }}
        > <ThemeProvider>
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>

  )
}