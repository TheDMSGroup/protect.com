<template>
  <div class="state-insurance-page">
    <StateView
      :topic="topic"
      :city-links="cityLinks"
      :city-links-error="cityLinksError"
    />
    <BreadcrumbsMain
      :links="[
        { label: 'Car Insurance', url: '/car-insurance' },
        { label: 'Car Insurance Rates by State', url: '/car-insurance/usa' },
        {
          label: `${
            states.find((state) => state.slug === topic)?.name
          } Car Insurance`,
        },
      ]"
    />
  </div>
</template>
<script setup>
  import { ref, computed } from "vue";
  import { useRoute } from "vue-router";
  import StateView from "~/views/StateAutoInsurancePage.vue";
  import { states } from "~/utils/redirect-config";

  const route = useRoute();
  const topic = ref(route.params.state);
  // Set dynamic SEO meta tags using computed values
  const seoTitle = computed(() =>
    topic.value
      ? `Get Cheap Car Insurance in ${topic.value} | Compare Quotes | Protect.com`
      : "Car Insurance Quotes | Protect.com"
  );

  const seoDescription = computed(() =>
    topic.value
      ? `Find the cheapest full-coverage or liability only car insurance in ${topic.value} starting at $700/mo. Compare multiple quotes side-by-side & save.`
      : "Compare car insurance quotes from top providers and save on auto insurance."
  );

  const cityLinksCacheKey = computed(() => `cities-${topic.value}`);

  const { cityListResult, cityLinksError } = await useCityLinksApi({
    state: topic.value,
    cacheKey: cityLinksCacheKey.value,
  });

  const cityLinks = computed(() => {
    return cityListResult.value?.data || [];
  });

  useSeoMeta({
    title: seoTitle,
    description: seoDescription,
    ogTitle: seoTitle,
    ogDescription: seoDescription,
    ogImage: "/assets/og-image.jpg",
    ogUrl: () =>
      topic.value
        ? `https://protect.com/car-insurance/${topic.value}`
        : "https://protect.com",
    ogType: "website",
    twitterCard: "summary_large_image",
  });
</script>

<style lang="scss" scoped>
  .breadcrumbs {
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
    }
  }
</style>
