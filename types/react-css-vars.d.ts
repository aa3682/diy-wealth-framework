import 'react'

// Allow CSS custom properties (e.g. style={{ '--min': '160px' }}) in inline styles.
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined
  }
}
