<script setup>
// Check if we're on dev subdomain (works on both server and client)
let isDev = false

const { public: { gitHash, branch } } = useRuntimeConfig()
const env = branch === 'master' ? 'production' : branch === 'stage' ? 'stage' : 'development'

if (import.meta.server) {
  const event = useRequestEvent()
  const hostname = event?.node?.req?.headers?.host || ''
  isDev = hostname.startsWith('dev.')
  console.log('[version]', gitHash, '| branch:', branch, '| env:', env)
} else if (import.meta.client) {
  isDev = window.location.hostname.startsWith('dev.')
  console.log('[version]', gitHash, '| branch:', branch, '| env:', env)
}

useHead({
  meta: [
    // Add noindex for dev subdomain
    ...(isDev ? [{ name: 'robots', content: 'noindex, nofollow' }] : [])
  ],
  link: [
    { rel: 'preload', href: '/lib/geoip2.js', as: 'script' },
    // Preconnect to MaxMind GeoIP to speed up SSL handshake
    { rel: 'preconnect', href: 'https://geoip-js.com', crossorigin: 'anonymous' }
  ],
  script: [
    {
      src: '/lib/geoip2.js',
      id: 'geoip2',
      async: true
    }
  ]
})
</script>
<template>
  <div id="protectApp">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
