import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { LenisScroller } from "@/components/LenisScroller";

import './globals.css'
require('dotenv').config();

const Lora = localFont({ src: '../../public/Lora.woff2' })

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
      <body className={Lora.className}>
        {children}
        <SpeedInsights />
        <LenisScroller />
      </body>
    </html>
  )
}
