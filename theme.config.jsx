import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'
import CurrentYear from './components/CurrentYear'
import { absoluteUrl } from './lib/site'

const SITE_NAME = 'DIY Wealth Framework'
const OG_IMAGE_ALT = 'DIY Wealth Framework: systems and interactive calculators for self-directed investors.'
const SITE_DESCRIPTION =
  'An open-source playbook and interactive calculators for self-directed investors: financial defense, cash flow systems, wealth accumulation, tax efficiency, retirement runway, and legacy mechanics.'

const themeConfig = {
  logo: (
    <span style={{ fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
      DIY Wealth <span style={{ color: '#10b981' }}>Framework</span>
    </span>
  ),
  faviconGlyph: '🛡️',
  head: function Head() {
    const { asPath, pathname } = useRouter()
    const { frontMatter, title } = useConfig()
    const isHome = asPath === '/'
    const isErrorPage = pathname === '/404' || pathname === '/500'
    const url = absoluteUrl(asPath)
    const pageTitle = isHome || !title ? SITE_NAME : `${title} – ${SITE_NAME}`
    const description = frontMatter.description || SITE_DESCRIPTION
    return (
      <>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        {!isErrorPage && <link rel="canonical" href={url} />}
        <meta property="og:type" content="website" />
        {!isErrorPage && <meta property="og:url" content={url} />}
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={absoluteUrl('/og.png')} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={OG_IMAGE_ALT} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={absoluteUrl('/og.png')} />
        <meta name="twitter:image:alt" content={OG_IMAGE_ALT} />
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
          <strong>AlignFlow LLC</strong> © <CurrentYear />
        </p>
        <p style={{ margin: 0, fontSize: '0.8rem' }}>
          This framework is an independent educational resource and is not affiliated with the Certified Financial Planner Board of Standards, Inc.
        </p>
      </div>
    ),
  },
}

export default themeConfig
