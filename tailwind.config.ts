import type { Config } from 'tailwindcss'
import { addDynamicIconSelectors } from '@iconify/tailwind'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF2851',

        light: '#fafafd',
        dark: '#212022',
        lightBackground: '#f0f0f6',
        darkBackground: '#212022',
      }
    },
  },
  plugins: [
    addDynamicIconSelectors()
  ],
}
export default config
