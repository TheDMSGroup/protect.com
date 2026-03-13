<script setup>
// Check if we're on dev subdomain (works on both server and client)
const isDev = computed(() => {
  if (import.meta.server) {
    // Server-side: use request URL
    const event = useRequestEvent()
    const hostname = event?.node?.req?.headers?.host || ''
    return hostname.startsWith('dev.')
  } else {
    // Client-side: use window
    return typeof window !== 'undefined' && window.location.hostname.startsWith('dev.')
  }
})

useHead(() => ({
  meta: [
    // Add noindex for dev subdomain
    ...(isDev.value ? [{ name: 'robots', content: 'noindex, nofollow' }] : [])
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
}))
</script>
<template>
  <div id="protectApp">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
