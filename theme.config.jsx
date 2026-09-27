export default {
  logo: (
    <span style={{ fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
      DIY Wealth <span style={{ color: '#10b981' }}>Framework</span>
    </span>
  ),
  head: (
    <>
      <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛡️</text></svg>" />
    </>
  ),
  project: {
    link: 'https://github.com/aa3682/diy-wealth-framework',
  },
  docsRepositoryBase: 'https://github.com/aa3682/diy-wealth-framework/tree/main',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – DIY Wealth Framework',
    }
  },
  nextThemes: {
    defaultTheme: 'dark',
    forcedTheme: 'dark',
  },
  search: {
    placeholder: 'Search the framework...',
  },
  toc: {
    title: "On This Page",
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
    )
  }
}
