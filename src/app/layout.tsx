import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EventOS - AI Powered Event Coordination Platform',
  description: 'Unified event management platform with AI-driven automation and real-time coordination for organizers, attendees, sponsors, and vendors.',
  keywords: ['event management', 'AI', 'coordination', 'hackathon', 'conference'],
  authors: [{ name: 'EventOS Team' }],
  openGraph: {
    title: 'EventOS - AI Powered Event Coordination',
    description: 'Transform your event planning with AI-powered automation and real-time coordination.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}
