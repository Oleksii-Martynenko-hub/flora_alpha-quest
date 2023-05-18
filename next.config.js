const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants')

/** @type {import('next').NextConfig} */

const nextConfig = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environment variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  // when `next build` or `npm run build` is used
  const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)

  const env = {
    API_URL: (() => {
      if (isDev) return 'http://localhost:3000/api'
      if (isProd) {
        return 'https://oleksii-martynenko-hub.github.io/flora_alpha-quest/api'
      }
      if (isStaging) return 'http://localhost:11639/api'
    })(),
  }

  return {
    env,
  }
}

module.exports = nextConfig
