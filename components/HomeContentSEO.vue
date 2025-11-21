<script setup>
  const props = defineProps({
    compareRateConfig: {
      type: Object,
      default: () => ({}),
    },
    seoFaq: {
      type: Array,
      default: () => [],
    },
  });

  const { seoFaq } = props;
</script>

<template>
  <div>
    <b-container>
      <vertical-card-row
        title="Save hundreds or more on your premiums"
        description="Protect.com users save an average of
              $700 on their car insurance by comparing insurance rates from multiple companies.
              Some drivers can even cut their monthly payment in half by switching carriers while bundling
              home and auto insurance."
        button-destination="insure.protect.com"
        card-image="home-1.png"
        large-col-size="7"
        card-position="left"
      />

      <vertical-card-row
        title="The right coverage for every driver"
        description="From first-time drivers to multi-vehicle households, Protect.com digs
        deep to find the best car insurance rates for every life stage and situation. Whether
        you need liability coverage, collision coverage, or full coverage, we'll help you
        find the perfect policy."
        button-destination="insure.protect.com"
        large-col-size="7"
        card-image="home-2.png"
        card-position="right"
      />

      <vertical-card-row
        title="Safe, secure, and transparent"
        description="We'll never sell your personal information, and we'll protect it
        as if it were our own. We use real data from licensed insurance agents and carriers,
        customer reviews, and unbiased sources to help you get the complete picture of each
        insurance company and policy."
        button-destination="insure.protect.com"
        card-image="home-3.png"
        large-col-size="7"
        card-position="left"
      />
    </b-container>

    <b-container>
      <FAQ :faq="seoFaq" />
    </b-container>
  </div>
</template>
