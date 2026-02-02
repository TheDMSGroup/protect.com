<template>
  <div class="state-insurance-page">
    <StateView :topic="topic" />
  </div>
</template>
<script setup>
  import { ref, computed } from "vue";
  import { useRoute } from "vue-router";
  import { useStore } from "~/stores/store";
  import StateView from "~/views/StateAutoInsurancePage.vue";

  const route = useRoute();
  const store = useStore();
  const topic = ref(route.params.state);
  // Set dynamic SEO meta tags using computed values
  const seoTitle = computed(() =>
    topic.value ? `Get Cheap Car Insurance in ${topic.value} | Compare Quotes | Protect.com` : "Car Insurance Quotes | Protect.com"
  );

  const seoDescription = computed(() =>
    topic.value
      ? `Find the cheapest full-coverage or liability only car insurance in ${topic.value} starting at $700/mo. Compare multiple quotes side-by-side & save.`
      : "Compare car insurance quotes from top providers and save on auto insurance."
  );

  useSeoMeta({
    title: seoTitle,
    description: seoDescription,
    ogTitle: seoTitle,
    ogDescription: seoDescription,
    ogImage: "/assets/og-image.jpg",
    ogUrl: () => (topic.value ? `https://protect.com/car-insurance/${topic.value}` : "https://protect.com"),
    ogType: "website",
    twitterCard: "summary_large_image",
  });
  const statesMap = computed(() => store.getStateValueMap());
  // use composable check icons so we can dynamically call it in safely
</script>

<style lang="scss" scoped></style>
