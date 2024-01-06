'use server'

import { SpeedInsights } from "@vercel/speed-insights/next"

import './globals.css'

import fetchData from '@/utils/fetchData'
import {PlayfairDisplay, PlayfairDisplayItalic, Nunito, NunitoItalic} from '@/utils/fonts'
import StoreProvider from "@/store/storeProvider";
import MainContent from "@/components/Main";

export async function generateMetadata(){ 
  return {
    title: 'Chalk Festival | Nov 8-10 2024',
    description: '3-D and traditional pavement art festival. Family fun, live music, food trucks, arts & crafts, and more...',
  }
}


export default async function RootLayout({children}: {
  children: React.ReactNode
}) {

  const sanitySliderData = await fetchData(`documentType=settings&fields="imageUrls":slider[].asset`);
  const sanityAnnouncementData = await fetchData(`documentType=settings&fields=announcementSlider`);

  return (
    <html lang="en">
      <body className={`${Nunito.variable} ${NunitoItalic.variable} ${PlayfairDisplay.variable} ${PlayfairDisplayItalic.variable} font-body text-white bg-[#12181C]`}>
        <StoreProvider>
            <main className="fixed top-0 left-0 h-screen w-screen p-7">
              <MainContent sanitySliderData={sanitySliderData} sanityAnnouncementData={sanityAnnouncementData} />
              {children}
            </main>

            <SpeedInsights />
            {/* {modal} */}
        </StoreProvider>
      </body>
    </html>
  )
}
