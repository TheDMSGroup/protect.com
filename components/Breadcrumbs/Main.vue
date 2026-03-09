<template>
  <nav aria-label="breadcrumb" class="breadcrumbs container py-4 my-4">
    <div v-for="(link, index) in links" :key="index" class="breadcrumb-item">
      <NuxtLink v-if="link.url" :to="link.url">{{ link.label }}</NuxtLink>
      <span v-else>{{ link.label }}</span>
      <span v-if="index < links.length - 1"> / </span>
    </div>
  </nav>
</template>

<script setup>
  defineProps({
    links: {
      type: Array,
      required: true,
    },
  });
</script>

<style scoped lang="scss">
  .breadcrumbs {
    display: flex;
    flex-wrap: wrap;
    a {
      text-decoration: none;
      color: #007bff;
      &:hover {
        text-decoration: underline;
      }
    }
    a,
    span {
      padding: 0 10px;
      @include mobile {
        padding: 0 2.5px;
        font-size: 0.85rem;
      }
    }
  }
</style>
