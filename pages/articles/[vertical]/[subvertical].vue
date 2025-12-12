<script setup>
  // Only handle routes like /articles/insurance/auto-insurance
  definePageMeta({
    validate: (route) => {
      // Only match if there are exactly 3 segments: /articles/[vertical]/[subvertical]
      const segments = route.path.split("/").filter(Boolean);
      if (segments.length !== 3) return false;

      // Reject routes with undefined subvertical
      if (segments[2] === "undefined" || !segments[2]) return false;

      return true;
    },
  });

  // Get route for dynamic params
  const route = useRoute();

  const domain = "protectCom";

  const articleType = "article";

  const vertical = route.params.vertical || route.query.vertical || "insurance";

  let subvertical = route.params.subvertical || route.query.subvertical || "";

  // Apply same transformation for cache key
  if (subvertical === "car-insurance") {
    subvertical = "auto-insurance";
  }
  const cacheKey = `articles-${vertical}-${subvertical}`;
  console.log("🔑 Cache key:", cacheKey);

  const nuxtApp = useNuxtApp();

  const { data: articlesResults, error } = await useAsyncData(
    cacheKey,
    async () => {
      const url = `/api/articles?domain=${domain}&articleType=${articleType}&vertical=${vertical}&subvertical=${subvertical}`;
      console.log("🌐 Making API request:", url);
      const result = await $fetch(url);
      return result;
    },
    {
      getCachedData(key) {
        const cacheHit = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
        if (cacheHit) {
          console.log("✅ Using cached data for key:", key);
        }
        return cacheHit;
      },
    }
  );
  // Create a computed that reactively gets articles from the results
  const articles = computed(() => {
    return articlesResults.value?.articles || [];
  });

  const subverticalCapitalized = subvertical
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  useHead({
    title: "Protect.com - " + subverticalCapitalized + " Articles",
    meta: [
      {
        name: "description",
        content: `Read the latest articles on ${subvertical} from Protect.com to stay informed and protected.`,
      },
      {
        name: "keywords",
        content: "article, articles," + subvertical.charAt(0).toUpperCase() + subvertical.slice(1) + ", protect.com",
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
      <ArticlesFeed :articles="articles" :vertical="vertical" :subvertical="route.params.subvertical" />
    </div>
  </div>
</template>
