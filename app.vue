<script setup>
// Check if we're on dev subdomain
const isDev = typeof window !== 'undefined' && window.location.hostname.startsWith('dev.')

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
});
</script>
<template>
  <div id="protectApp">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
