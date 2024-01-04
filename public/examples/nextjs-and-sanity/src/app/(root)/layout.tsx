import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css'
import {PlayfairDisplay, PlayfairDisplayItalic, Nunito, NunitoItalic} from '@/utils/fonts'
// import { AtomsProvider } from '@/store';
import StoreProvider from "@/store/storeProvider";
import Link from 'next/link'

import FullScreenSlider from '@/components/FullScreenSlider'
import Header from '@/components/Header'
import Logo from '@/components/Logo'

import { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: { id: string, slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  // const id = params.id
 
  // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())
 
  // // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  console.log(params);
 
  return {
    title: 'test',
    description: 'test',
  }
}

export default function RootLayout({children, modal}: {
  children: React.ReactNode,
  modal: React.ReactNode
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={`${Nunito.variable} ${NunitoItalic.variable} ${PlayfairDisplay.variable} ${PlayfairDisplayItalic.variable} font-body text-white bg-[#12181C]`}>
          <main className="fixed top-0 left-0 h-screen w-screen p-7">
            <Header />
            <Logo />
            <FullScreenSlider />

            {children}
          </main>

          <SpeedInsights />
          {modal}
        </body>
      </html>
    </StoreProvider>
  )
}
