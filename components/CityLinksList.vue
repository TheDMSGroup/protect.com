<template>
  <div class="city-links-list">
    <ul class="space-y-2">
      <li v-for="city in cityLinks" :key="city.state">
        <!-- <div class="state-label">
          <strong>{{ city.state }}</strong>
        </div> -->
        <NuxtLink
          v-for="link in city.cities"
          :key="link.name"
          :to="`/car-insurance/${city.state.toLowerCase()}/${link.slug}`"
          class="text-blue-600 hover:underline"
        >
          {{ link.name }}, {{ city.state }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script setup>
  defineProps({
    cityLinks: {
      type: Array,
      required: true,
    },
  });
</script>
<style lang="scss" scoped>
  .city-links-list {
    .state-label {
      padding: 0.5rem;
      color: $blue;
      border-bottom: 2px solid $blue-light;
      margin-bottom: 2rem;
    }
    ul {
      list-style-type: none;
      padding: 0;
      column-count: 2;
      column-gap: 1rem;
      gap: 1rem;
      margin: 4rem 0;

      @include media-breakpoint-down(md) {
        column-count: 2;
      }
    }

    li {
      break-inside: avoid;

      a {
        display: block;
        margin-bottom: 1rem;
        padding: 0.25rem;
      }
    }
  }
</style>
