export default (phase) => ({
  distDir: phase === 'phase-development-server' ? '.next-dev' : '.next',
  output: 'export',
  trailingSlash: true,
  devIndicators: false,
  experimental: { cpus: 2 },
})


