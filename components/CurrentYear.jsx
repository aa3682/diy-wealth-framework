import { useEffect, useState } from 'react'

/**
 * The current year, safe to prerender.
 *
 * Renders the build year first so the server HTML and the client's first
 * render match, then switches to the visitor's year after mount. A bare
 * new Date().getFullYear() in markup mismatches on hydration once the
 * calendar passes the year the site was built.
 */
export default function CurrentYear() {
  const [year, setYear] = useState(Number(process.env.BUILD_YEAR))
  useEffect(() => setYear(new Date().getFullYear()), [])
  return year
}
