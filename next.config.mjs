import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
})

export default withNextra({
  env: {
    // Inlined at build time so server and client start from the same year.
    BUILD_YEAR: String(new Date().getFullYear()),
  },
})
