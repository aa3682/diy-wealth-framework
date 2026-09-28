import { Outfit } from 'next/font/google'
import '../styles.css'

// Self-hosted via next/font: no render-blocking request to Google Fonts and
// no layout shift when the face arrives.
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-outfit',
})

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
