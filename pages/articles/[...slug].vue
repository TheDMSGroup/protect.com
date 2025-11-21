<!-- Catch all route for routes like /articles or /articles/insurance -->
<script setup>
  //import { useArticlesStore } from "@/stores/articles.js";
  // Handle all article routes dynamically
  const route = useRoute();
  const slug = ref(route.params.slug[0] || "insurance");

  const vertical = computed(() => {
    return slug.value;
  });
  // Subvertical page logic
  const domain = computed(() => {
    return route.query.domain || '"protectCom"';
  });

  const articleType = computed(() => {
    return route.query.articleType || "article";
  });

  const cacheKey = computed(() => {
    const key = `articles-${vertical.value}`;
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
      const url = `/api/articles?domain=${domain.value}&articleType=${articleType.value}&vertical=${vertical.value}`;
      console.log("🌐 Making API request:", url);
      const result = await $fetch(url);
      return result;
    },
    {
      watch: [() => domain.value, () => articleType.value, () => vertical.value],
      getCachedData(key) {
        const cacheHit = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
        console.log("✅ Using cached data for key:", key, cacheHit);
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
