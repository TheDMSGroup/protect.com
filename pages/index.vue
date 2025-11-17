<template>
  <div>
    <!-- <Hero :compareRateConfig="compareRateConfig" /> -->
    <LazyHomeContent />
    <div class="grey-bg">
      <LazyActionBanner
        ctaType="rates-dropdown"
        :ctaConfig="compareRateConfig"
        image_top="150"
        headline="Calculate your new rate"
        subheadline="Discover how much you can save with Protect.com."
        image="dad-bike.png"
        container-class="dad-bike"
      />
    </div>
    <!-- <BlogFeed :showCategories="true" /> -->

    <JoinNewsletter />

  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String,
  keywords: String,
});

useHead({
  title: () => props.title,
  meta: [
    { name: 'description', content: () => props.description },
    { name: 'keywords', content: () => props.keywords },
    { property: 'og:description', content: () => props.description }
  ],
});

const compareRateConfig = ref({
  options: [
    {
      value: {
        icon: 'car-icon',
        value: 'insurance',
      },
      text: 'Insurance',
    },
    {
      value: {
        icon: 'home-icon',
        value: 'home-security',
      },
      text: 'Home Security',
    },
    {
      value: {
        icon: 'home-warranty-icon',
        value: 'warranty',
      },
      text: 'Warranty',
    },
    {
      value: {
        icon: 'identity-icon',
        value: 'identity',
      },
      text: 'Identity',
    },
  ],
  icon: 'scales-icon',
  name: 'compareYourRateDropdown',
  placeholderText: 'Compare rates for...',
});
</script>

<style scoped lang="scss">
@import '../scss/_variables.scss';

.grey-bg {
  background-color: #f8f8f8;
  // top: 2.5em;
  position: relative;
  // margin-bottom: 2.5em;
}
</style>
