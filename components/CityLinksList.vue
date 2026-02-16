<template>
  <div :class="`city-links-list ${linksClass}`">
    <NuxtLink
      v-for="link in allLinks"
      :key="link.name"
      :to="`/car-insurance/${link.state.toLowerCase()}/${link.slug}`"
      class="text-blue-600 hover:underline"
    >
      {{ link.name }}, {{ link.stateCode }}
    </NuxtLink>
  </div>
</template>
<script setup>
  const props = defineProps({
    cityLinks: {
      type: Array,
      required: true,
    },
  });
  const allLinks = computed(() => {
    return props.cityLinks.reduce((acc, cityObj) => {
      const cityLinks = cityObj.cities.map((city) => ({
        name: city.name,
        stateCode: city.stateCode,
        slug: city.slug,
        state: cityObj.state,
      }));
      return [...acc, ...cityLinks];
    }, []);
  });

  const linksClass = computed(() => {
    const count = allLinks.value.length;
    if (count >= 20) return "column-display";
    return "grid-display";
  });

  console.log("All city links:", allLinks.value);
</script>
<style lang="scss" scoped>
  .city-links-list {
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
