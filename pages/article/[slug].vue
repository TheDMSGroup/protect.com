<script setup>
  const route = useRoute();

  const vertical = "insurance";

  //extract article data from cache or API
  const { articleResult, error } = await useArticleFromCacheOrApi();

  //reactive computed properties for article data
  const article = computed(() => articleResult.value?.response.article || {});
  const title = computed(() => article.value?.title || "");
  const excerpt = computed(() => article.value?.excerpt || "");
  //check if article has dynamic components
  const content = computed(() => {
    return articleResult.value?.contentParts || [];
  });
  const componentNames = computed(() => articleResult.value?.componentNames || []);
  const contentLinks = computed(() => articleResult.value?.contentLinks || []);
  const author = computed(() => article.value?.author || {});
  const date = computed(() => article.value?.publishedAt || "");
  const readTime = computed(() => article.value?.readTime || "");
  const relatedArticles = computed(() => article.value?.relatedArticles || []);
  const recentArticles = computed(() => article.value?.recentArticles || []);
  const coverImage = computed(() => article.value?.coverImage || null);
  const subvertical = computed(() => article.value?.subvertical || "");
  const metaKeywords = computed(() => {
    return article.value?.keywords || ["article", "protect.com", vertical, subvertical.value.split("-").join(" ")].filter(Boolean);
  });

  //inline composable to fetch article with caching
  async function useArticleFromCacheOrApi() {
    const cacheKey = computed(() => {
      const key = `articles-${vertical}-${route.params.slug}`;
      console.log("🔑 Cache key:", key);
      return key;
    });

    const nuxtApp = useNuxtApp();

    const {
      data: articleResult,
      error,
      pending,
    } = await useAsyncData(
      cacheKey,
      async () => {
        const url = `/api/article/?urlSlug=${route.params.slug}`;
        console.log("🌐 Making API request:", url);
        const result = await $fetch(url);
        return result;
      },
      {
        watch: [() => route.params.slug],
        getCachedData(key) {
          const cacheHit = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
          if (cacheHit) {
            console.log("✅ Using cached data for key:", key, cacheHit);
          }
          return cacheHit;
        },
      }
    );

    return { articleResult, error, pending };
  }

  useHead({
    title: title.value,
    meta: [
      {
        name: "description",
        content: excerpt.value,
      },
      {
        name: "keywords",
        content: metaKeywords.value.join(", "),
      },
    ],
  });
</script>
<template>
  <div v-if="error" class="alert alert-danger">
    <strong>Error loading article.</strong>
    <div v-if="error.statusMessage">{{ error.statusMessage }}</div>
  </div>
  <div v-else-if="!article || Object.keys(article).length === 0" class="alert alert-warning">
    <NoArticleResults
      :title="`Article Not Found`"
      :category="vertical"
      :subcategory="subvertical"
      :back-link="`/articles/${vertical}/${subvertical}`"
      :back-text="`Browse All ${vertical.replace(/\b\w/g, (l) => l.toUpperCase())} Articles`"
    />
  </div>
  <div v-else>
    <SingleArticle
      :article="{
        title,
        excerpt,
        content,
        author,
        date,
        readTime,
        relatedArticles,
        recentArticles,
        coverImage,
        vertical,
        subvertical,
        componentNames,
        contentLinks,
      }"
    />
  </div>
</template>
