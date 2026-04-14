<template>
  <div class="ppc-protect-page">
    <!-- Header -->
    <header class="chat-header">
      <div class="header-content container">
        <div class="logo">
          <img src="/assets/protect_logo_white.svg" alt="Protect.com" class="logo-img" />
        </div>
      </div>
    </header>

    <DemandGenPMax />

    <AppFooter :minimal="true" />
  </div>
</template>

<script setup>
  import DemandGenPMax from "~/views/DemandGenPMax.vue";
  definePageMeta({
    layout: "chatbot",
  });
</script>

<style lang="scss" scoped>
.ppc-protect-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.chat-header {
  background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%);
  padding: 1rem;
  flex-shrink: 0;
}

.header-content {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 2rem;
  width: auto;
}
</style>
