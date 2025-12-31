<template>
  <div v-if="error">
    <p>Error loading bundle data: {{ error.message }}</p>
  </div>
  <div v-else>
    <BundlePage :content="bundleResult" />
  </div>
</template>

<script setup>
  const route = useRoute();
  const slug = "auto-" + (route.params.slug || "home");

  const { bundleResult, error } = await useBundleFromCacheOrApi();

  async function useBundleFromCacheOrApi() {
    const cacheKey = `bundles-${slug}`;
    console.log("🔑 Cache key:", cacheKey);

    const nuxtApp = useNuxtApp();

    const {
      data: bundleResult,
      error,
      pending,
    } = await useAsyncData(
      cacheKey,
      async () => {
        const url = `/api/bundle/?slug=${slug}`;
        console.log("🌐 Making API request:", url);
        const result = await $fetch(url);
        return result;
      },
      {
        server: true,
        lazy: false,
        //watch: [() => route.params.slug],
        getCachedData(key) {
          const cacheHit = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
          if (cacheHit) {
            console.log("✅ Using cached data for key:", key, cacheHit);
          }
          return cacheHit;
        },
      }
    );

    return { bundleResult, error, pending };
  }
</script>
