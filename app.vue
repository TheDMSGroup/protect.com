<script setup>
useHead({
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
