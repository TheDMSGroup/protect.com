<script setup>
useHead({
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
