import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    fontFamily: {
      body: ['var(--font-body)'],
      display: ['var(--font-display)'],
    },
    colors: {
      white: '#fff',
      blue: {
        1: '#010309',
        2: '#00081D',
        3: '#4877FF',
        4: '#020614',
      }
    }
  },
  plugins: [],
}
export default config
