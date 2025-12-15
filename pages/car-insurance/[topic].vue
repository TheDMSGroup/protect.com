<template>
  <div class='state-insurance-page'>
    <div :v-if="true">
      <component
        :is='dynamicComponent'
        :topic='topic'
        :title='title'
        :description='title'
      />
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '~/stores/store';
import StateView from '~/views/StateAutoInsurancePage.vue';

const props = defineProps({
  title: String,
  description: String,
});

const route = useRoute();
const store = useStore();
const topic = ref(route.params.topic);
// Set dynamic SEO meta tags using computed values
const seoTitle = computed(() =>
  topic.value
    ? `Get Cheap Car Insurance in ${topic.value} | Compare Quotes | Protect.com`
    : 'Car Insurance Quotes | Protect.com'
);

const seoDescription = computed(() =>
  topic
    ? `Find the cheapest full-coverage or liability only car insurance in ${topic.value} starting at $700/mo. Compare multiple quotes side-by-side & save.`
    : 'Compare car insurance quotes from top providers and save on auto insurance.'
);

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  ogImage: '/assets/og-image.jpg',
  ogUrl: () => topic ? `https://protect.com/car-insurance/${topic}` : 'https://protect.com',
  ogType: 'website',
  twitterCard: 'summary_large_image',
});
const statesMap = computed(() => store.getStateValueMap());
// use composable check icons so we can dynamically call it in safely
const dynamicComponent = computed(() => {
  switch (determineTopic(topic.value)) {
    case 'city':
      return StateView;
    case 'state':
      return StateView;
    default:
      return StateView;
  }
});

function determineTopic(variable) {
  // Normalize the input
  const cleanedVariable = variable.trim().toLowerCase();
  const matchedState = statesMap.value.find((state) => state.slug.toLowerCase() === cleanedVariable);

  // Check if the input matches any state name or abbreviation
  if (matchedState) {
    topic.value = matchedState ? matchedState.name : null;
    return 'state';
  }

  // City Name Detection (more flexible regex)
  const cityNameRegex = /^[a-z\s-]{3,50}$/;
  if (cityNameRegex.test(cleanedVariable)) {
    return 'city';
  }

  // Fallback
  return 'unknown';
}
</script>

<style lang='scss' scoped>
</style>
