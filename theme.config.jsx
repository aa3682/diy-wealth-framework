export default {
  logo: (
    <span style={{ fontWeight: 800, letterSpacing: '-0.5px', fontSize: '1.2rem' }}>
      DIY Wealth Framework
    </span>
  ),
  project: {
    link: 'https://github.com/aa3682/diy-wealth-framework',
  },
  docsRepositoryBase: 'https://github.com/aa3682/diy-wealth-framework/tree/main',
  banner: {
    key: 'gemini-assistant-banner',
    text: (
      <span>
        ⚡ Gemini-powered planning tools are now live in the Asset Allocation module.
      </span>
    )
  },
  search: {
    placeholder: 'Search framework, formulas, or rules...'
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="DIY Wealth Framework" />
      <meta property="og:description" content="Open-source financial planning, asset allocation, and tax-efficiency frameworks for the self-directed investor." />
    </>
  ),
  useNextSeoProps() {
    return {
      titleTemplate: '%s – DIY Wealth Framework',
    }
  },
  footer: {
    text: (
      <span>
        {new Date().getFullYear()} © AlignFlow LLC. Built for the self-directed investor.
      </span>
    )
  },
  primaryHue: 210,
}


