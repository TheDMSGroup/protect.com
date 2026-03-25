<template>
  <div class="footer-legal-links">
    <p>
      <a href="https://dmsunsub.io/" target="_blank">Do Not Sell Or Share My Personal Information</a>
    </p>
    <p>
      <NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink>
      | <NuxtLink to="/terms">Terms Of Use</NuxtLink>
      | <NuxtLink to="/privacy-notice">California Privacy Notice</NuxtLink>
    </p>
    <slot />
  </div>
</template>

<style scoped>
.footer-legal-links p,
.footer-legal-links :deep(p) {
  font-size: 12px;
  text-align: center;
}
</style>
