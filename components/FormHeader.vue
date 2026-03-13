<template>
  <header class="form-header">
    <div class="container">
      <div class="header-content">
        <img
          src="../public/assets/protect_logo.svg"
          alt="Protect Logo"
          class="logo-image"
        />
        <span v-if="tagline" class="tagline">{{ tagline }}</span>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  tagline: {
    type: String,
    default: 'Find competitive California car insurance rates in minutes'
  }
})
</script>

<style scoped>
.form-header {
  background: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 20px 0;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo-image {
  height: 22px;
  width: auto;
  flex-shrink: 0;
}

.tagline {
  padding: 0 0 0 0.5em;
  margin: 0 0 0 0.5em;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.2;
  color: #666;
  border-left: 1px solid #d8d8d8;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

@media screen and (max-width: 768px) {
  .logo {
    font-size: 20px;
  }

  .tagline {
    display: none;
  }
}
</style>
