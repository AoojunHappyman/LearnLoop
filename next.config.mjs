export default (phase) => ({
  distDir: phase === 'phase-development-server' ? '.next-dev' : '.next',
  output: phase === 'phase-development-server' ? undefined : 'export',
  trailingSlash: true,
  devIndicators: false,
  experimental: { cpus: 2 },
})



