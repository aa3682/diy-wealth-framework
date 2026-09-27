export default {
  logo: (
    <span style={{ fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.02em' }}>
      DIY Wealth <span style={{ color: '#10b981' }}>Framework</span>
    </span>
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
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  footer: {
    text: (
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
