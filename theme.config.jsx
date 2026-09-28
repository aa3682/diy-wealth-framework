import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'

const SITE_NAME = 'DIY Wealth Framework'
const SITE_DESCRIPTION =
  'An open-source playbook and interactive calculators for self-directed investors: financial defense, cash flow systems, wealth accumulation, tax efficiency, retirement runway, and legacy mechanics.'

export default {
  logo: (
    <span style={{ fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
      DIY Wealth <span style={{ color: '#10b981' }}>Framework</span>
    </span>
  ),
  faviconGlyph: '🛡️',
  head: function Head() {
    const { asPath } = useRouter()
    const { frontMatter, title } = useConfig()
    const isHome = asPath === '/'
    const pageTitle = isHome || !title ? SITE_NAME : `${title} – ${SITE_NAME}`
    const description = frontMatter.description || SITE_DESCRIPTION
    return (
      <>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
      </>
    )
  },
  project: {
    link: 'https://github.com/aa3682/diy-wealth-framework',
  },
  docsRepositoryBase: 'https://github.com/aa3682/diy-wealth-framework/tree/main',
  nextThemes: {
    defaultTheme: 'dark',
    forcedTheme: 'dark',
  },
  search: {
    placeholder: 'Search the framework...',
  },
  toc: {
    title: 'On This Page',
    float: true,
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  footer: {
    content: (
      <div style={{ width: '100%', textAlign: 'center', fontSize: '0.9rem', color: '#94a3b8' }}>
        <p style={{ margin: '0 0 0.5rem 0' }}>
          <strong>AlignFlow LLC</strong> © {new Date().getFullYear()}
        </p>
        <p style={{ margin: 0, fontSize: '0.8rem' }}>
          This framework is an independent educational resource and is not affiliated with the Certified Financial Planner Board of Standards, Inc.
        </p>
      </div>
    ),
  },
}
