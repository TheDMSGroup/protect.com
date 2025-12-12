<!-- Catch all route for routes like /articles or /articles/insurance -->
<script setup>
  // Only match routes with 1 or 2 segments after /articles
  definePageMeta({
    validate: (route) => {
      const segments = route.path.split("/").filter(Boolean);
      // Match /articles or /articles/vertical (1 or 2 segments)
      // But NOT /articles/vertical/subvertical (that's handled by [subvertical].vue)
      return segments.length >= 1 && segments.length <= 2;
    },
  });
  console.log("In [...slug].vue");
  //import { useArticlesStore } from "@/stores/articles.js";
  // Handle all article routes dynamically
  const route = useRoute();
  const slug = ref((route.params.slug && route.params.slug[0]) || "insurance");

  const vertical = computed(() => {
    return slug.value || "insurance";
  });

  // Subvertical page logic
  const domain = computed(() => {
    return route.query.domain || '"protectCom"';
  });

  let cacheKey = `articles`;
  let url = `/api/articles?domain=${domain.value}`;
  if (vertical.value) {
    cacheKey += `-${vertical.value}`;
    url += `&vertical=${vertical.value}`;
  }
  console.log("🔑 [...slug].vue Cache key:", cacheKey);

  const nuxtApp = useNuxtApp();
  const {
    data: articlesResults,
    error,
    pending,
  } = await useAsyncData(
    cacheKey,
    async () => {
      console.log("🌐 Making API request:", url);
      const result = await $fetch(url);
      return result;
    },
    {
      server: true,
      lazy: false,
      //watch: [() => domain.value, () => articleType.value, () => vertical.value],
      getCachedData(key) {
        const cacheHit = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
        if (cacheHit) {
          console.log("✅ Using cached data for key:", key);
        }
        return cacheHit;
      },
    }
  );
  // Create a computed that reactively gets articles from the API response
  const articles = computed(() => {
    return articlesResults.value?.articles || [];
  });
  console.log(articles.value);
  // Create extended pending state to prevent flashing
  const extendedPending = ref(false);
  const minLoadingTime = 800; // milliseconds

  // Watch for pending state changes
  watch(
    pending,
    (isPending) => {
      if (isPending) {
        extendedPending.value = true;
      } else {
        setTimeout(() => {
          extendedPending.value = false;
        }, minLoadingTime);
      }
    },
    { immediate: true }
  );

  useHead({
    title: "Protect.com - " + vertical.value.charAt(0).toUpperCase() + vertical.value.slice(1) + " Articles",
    meta: [
      {
        name: "description",
        content: `Read the latest articles on ${vertical.value} from Protect.com to stay informed and protected.`,
      },
      {
        name: "keywords",
        content: "article, articles, auto insurance, home insurance, life insurance, protect.com",
      },
    ],
  });
</script>

<template>
  <div>
    <!-- Subvertical page (e.g., /articles/insurance/auto-insurance) -->
    <div v-if="vertical">
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
          :title="`No ${vertical.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())} Articles Found`"
          :category="vertical"
          :back-link="`/articles/${vertical}`"
          :back-text="`Browse All ${vertical.replace(/\b\w/g, (l) => l.toUpperCase())} Articles`"
        />
      </div>

      <div v-else>
        <ArticlesFeed :articles="articles" :vertical="vertical" />
      </div>
    </div>

    <!-- Vertical page (e.g., /articles/insurance) -->
    <div v-else>
      <h1>{{ vertical }} Articles</h1>
      <p>This would show all articles for {{ vertical }}</p>
    </div>
  </div>
</template>
