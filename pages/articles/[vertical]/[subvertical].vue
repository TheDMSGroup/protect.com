<script setup>
  // Only handle routes like /articles/insurance/auto-insurance
  definePageMeta({
    validate: (route) => {
      // Only match if there are exactly 4 segments: /articles/[vertical]/[subvertical]
      const segments = route.path.split("/").filter(Boolean);
      return segments.length === 3; // ['articles', 'vertical', 'subvertical']
    },
  });

  // Get route for dynamic params
  const route = useRoute();

  // Create computed properties that gracefully handle route params
  const domain = computed(() => {
    return route.query.domain || '"protectCom"';
  });

  const articleType = computed(() => {
    return route.query.articleType || "article";
  });

  const vertical = computed(() => {
    return route.params.vertical || route.query.vertical || "insurance";
  });

  const subvertical = computed(() => {
    return route.params.subvertical || route.query.subvertical || "";
  });

  console.log("Subvertical page - params:", { vertical: vertical.value, subvertical: subvertical.value });

  const cacheKey = computed(() => {
    const key = `articles-${vertical.value}-${subvertical.value}`;
    console.log("🔑 Cache key:", key);
    return key;
  });

  const nuxtApp = useNuxtApp();

  const {
    data: articlesResults,
    error,
    pending,
  } = await useAsyncData(
    cacheKey,
    async () => {
      const url = `/api/articles?domain=${domain.value}&articleType=${articleType.value}&vertical=${vertical.value}&subvertical=${subvertical.value}`;
      console.log("🌐 Making API request:", url);
      const result = await $fetch(url);
      return result;
    },
    {
      watch: [() => domain.value, () => articleType.value, () => vertical.value, () => subvertical.value],
      getCachedData(key) {
        const cacheHit = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
        if (cacheHit) {
          console.log("✅ Using cached data for key:", key, cacheHit);
        }
        return cacheHit;
      },
    }
  );
  // Create a computed that reactively gets articles from the results
  const articles = computed(() => {
    return articlesResults.value?.articles || [];
  });

  // Create extended pending state to prevent flashing
  const extendedPending = ref(false);
  const minLoadingTime = 800; // milliseconds

  // Watch for pending state changes
  watch(
    pending,
    (isPending) => {
      if (isPending) {
        // Start loading immediately
        extendedPending.value = true;
      } else {
        // Delay hiding loading state
        setTimeout(() => {
          extendedPending.value = false;
        }, minLoadingTime);
      }
    },
    { immediate: true }
  );

  const subverticalCapitalized = computed(() => {
    return subvertical.value
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  });
  useHead({
    title: "Protect.com - " + subverticalCapitalized.value + " Articles",
    meta: [
      {
        name: "description",
        content: `Read the latest articles on ${subvertical.value} from Protect.com to stay informed and protected.`,
      },
      {
        name: "keywords",
        content: "article, articles," + subvertical.value.charAt(0).toUpperCase() + subvertical.value.slice(1) + ", protect.com",
      },
    ],
  });
</script>

<template>
  <div>
    <!-- Error and loading states -->
    <div v-if="error" class="alert alert-danger">
      <strong>Error loading articles.</strong>
      <div v-if="error.statusMessage">{{ error.statusMessage }}</div>
      <div v-else>{{ error.message || String(error) }}</div>
    </div>

    <div v-else-if="extendedPending" class="loading">
      <LoadingSkeletonArticleGrid />
    </div>
    <div v-else-if="articles.length === 0" class="no-articles">
      <NoArticleResults
        :title="`No ${subvertical.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())} Articles Found`"
        :category="vertical"
        :subcategory="subvertical"
        :back-link="`/articles/${vertical}`"
        :back-text="`Browse All ${vertical.replace(/\b\w/g, (l) => l.toUpperCase())} Articles`"
      />
    </div>
    <div v-else>
      <ArticlesFeed :articles="articles" :vertical="vertical" :subvertical="subvertical" />
    </div>
  </div>
</template>
