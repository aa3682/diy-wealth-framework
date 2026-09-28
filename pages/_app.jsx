import localFont from 'next/font/local'
import '../styles.css'

// Outfit (variable, SIL OFL: fonts/OFL.txt) is committed in fonts/ rather
// than fetched from Google Fonts at build time, so a bad response from
// Google can no longer fail a build. It is the same Latin file next/font
// downloaded from Google before, so rendering is unchanged, and next/font
// still self-hosts it with no layout shift. The Latin subset covers every
// character the site uses.
const outfit = localFont({
  src: '../fonts/outfit-latin.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-outfit',
})

/** @param {import('next/app').AppProps} props */
export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          --font-outfit: ${outfit.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
