<script setup>

  useSeoMeta({
    title: () => "Compare Auto Insurance Rates & Get Side-by-Side Quotes",
    description: () => " Get free car insurance quotes from the top companies and compare side-by-side to find the best deals. Start saving on your monthly payment with Protect.com.",
    ogTitle: () => "Compare Auto Insurance Rates & Get Side-by-Side Quotes",
    ogDescription: () => " Get free car insurance quotes from the top companies and compare side-by-side to find the best deals. Start saving on your monthly payment with Protect.com.",
    ogImage: () => "https://stage.protect.com/img/protect-share.dabdad17.jpg",
    ogType: "article",
    twitterCard: "summary_large_image",
    twitterTitle: () => "Compare Auto Insurance Rates & Get Side-by-Side Quotes",
    twitterDescription: () => " Get free car insurance quotes from the top companies and compare side-by-side to find the best deals. Start saving on your monthly payment with Protect.com.",
    twitterImage: () => "https://stage.protect.com/img/protect-share.dabdad17.jpg",
  });
  const compareRateConfig = {
    options: [
      {
        value: {
          icon: "car",
          value: "car-insurance",
        },
        text: "Car Insurance",
      },
      {
        value: {
          icon: "home",
          value: "home-insurance",
        },
        text: "Home Insurance",
      },
      {
        value: {
          icon: "health-insurance",
          value: "health-insurance",
        },
        text: "Health Insurance",
      },
    ],
    icon: "scales",
    name: "compareYourRateDropdownMain",
    placeholderText: "Compare rates for...",
  };
</script>

<template>
  <div>
    <vertical-hero
      hero-image="protect_main_hero_flat.png"
      headline="Compare car, home, and health insurance rates today"
      subheadline="Start saving money and take the stress out of finding the best insurance rates by letting us
      instantly shop the top home, health, and auto insurance companies for you."
      subheadline-type="small"
      :cta-type="'rates-dropdown'"
      :hero-class="'home-seo-hero'"
      :cta-config="{
        options: [
          {
            value: {
              icon: 'car',
              value: 'car-insurance',
            },
            text: 'Car Insurance',
          },
          {
            value: {
              icon: 'health-insurance',
              value: 'health-insurance',
            },
            text: 'Health Insurance',
          },
          {
            value: {
              icon: 'home',
              value: 'home-insurance',
            },
            text: 'Home Insurance',
          },
        ],
        icon: 'scales',
        name: 'compareYourRateDropdown',
        placeholderText: 'Compare rates for...',
        label: 'Compare Your Rate Selections',
        description: 'Select a category you would like to find more info about',
      }"
    />

    <section id="top-companies">
      <insurance-brands
        :providers-config="[
          { name: 'Progressive', src: 'provider-progressive.png' },
          { name: 'Geico', src: 'provider-geico.png' },
          { name: 'Nationwide', src: 'provider-nationwide.png' },
          { name: 'State Farm', src: 'provider-state-farm.png' },
          { name: 'Liberty Mutual Insurance', src: 'provider-liberty.png' },
        ]"
      >
        Compare personalized insurance quotes in minutes
      </insurance-brands>
    </section>

    <item-box-group first-box-text="Looking for additional coverage?" :items="compareRateConfig.options" />
    <b-container>
      <b-row class="justify-content-center mb-4 pb-4">
        <b-col cols="12" md="10" class="text-center">
          <p class="lead">
            Get personalized, free quotes from multiple insurance providers with a single click and compare premiums, deductibles, and coverage side
            by side.
          </p>
        </b-col>
      </b-row>
    </b-container>

    <HomeContentSEO />

    <div>
      <LazyActionBanner
        cta-type="rates-dropdown"
        :cta-config="compareRateConfig"
        image_top="150"
        name="calculateYourNewRate"
        headline="Calculate your new rate"
        subheadline="Discover how much you can save with Protect.com."
        image="dad-bike.png"
        image-alt="dad riding a bike with a child in a carrier on the rear and a puppy in the front basket"
        container-class="dad-bike"
        :lazy-image="true"
        image-alt-description="Dad riding a bike with a child in a carrier on the rear and a puppy in the front basket"
      />
    </div>
  </div>
</template>
