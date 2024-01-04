import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Inter } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css'

const Lora = localFont({ src: '../../public/Lora.woff2', variable: '--font-display' })
const inter = Inter({ subsets: ['latin'], variable: '--font-body' })

export const metadata: Metadata = {
  title: 'Kenyon Kowal',
  description: 'Technology Director @ PaperTiger Professional high fiver 👋 👋 I write all my code with a stylus ✍️ to improve my cursive.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${Lora.variable} ${inter.variable}`}>
        <main className="flex min-h-screen items-center justify-center bg-blue-1">
          {children}
        </main>
        <SpeedInsights />
      </body>
    </html>
  )
}
