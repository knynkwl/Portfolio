import localFont from 'next/font/local'

export const PlayfairDisplay = localFont({ 
  src: '../../public/fonts/PlayfairDisplay.woff2',
  variable: '--font-display',
})
export const PlayfairDisplayItalic = localFont({ 
  src: '../../public/fonts/PlayfairDisplay-Italic.woff2',
  variable: '--font-display-italic',
})
export const Nunito = localFont({ 
  src: '../../public/fonts/Nunito.woff2',
  variable: '--font-body',
})
export const NunitoItalic = localFont({ 
  src: '../../public/fonts/Nunito-Italic.woff2',
  variable: '--font-body-italic',
})