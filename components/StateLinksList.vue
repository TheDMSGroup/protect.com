<template>
  <div :class="`state-links-list ${linksClass}`">
    <NuxtLink
      v-for="link in props.stateLinks"
      :key="link.name"
      :to="link.url"
      class="text-blue-600 hover:underline"
    >
      {{ link.name }}
    </NuxtLink>
  </div>
</template>
<script setup>
  const props = defineProps({
    stateLinks: {
      type: Array,
      default: null,
    },
  });

  const linksClass = computed(() => {
    const count = props.stateLinks ? props.stateLinks.length : 0;
    if (count >= 20) return "column-display";
    return "grid-display";
  });
</script>
<style lang="scss" scoped>
  .state-links-list {
    padding: 4rem;

    @include mobile {
      padding: 2rem;
    }

    &.column-display {
      column-count: 4;
      column-gap: 1rem;

      @include media-breakpoint-down(lg) {
        column-count: 3;
      }
      @include media-breakpoint-down(md) {
        column-count: 2;
      }
    }
    &.grid-display {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      align-items: center;
      @include media-breakpoint-down(md) {
        grid-template-columns: 1fr;
      }
      a {
        text-align: center;
      }
    }

    .state-label {
      padding: 0.5rem;
      color: $blue;
      border-bottom: 2px solid $blue-light;
      margin-bottom: 2rem;
    }
    a {
      display: block;
      padding: 0.25rem;
    }
  }
</style>
