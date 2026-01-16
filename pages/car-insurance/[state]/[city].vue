<!-- {cityState : "New Haven, CT" licenseShare : "0.74" licensedDrivers : "426771" name : "New Haven" population : "576718" stateCode : "CT" stateName :
"Connecticut"} -->

<template>
  <div class="city-insurance-page">
    <section class="hero-section">
      <div class="hero-image-wrapper">
        <img :src="cityImage" :alt="`${cityName}, ${stateName} skyline`" class="hero-image" />
      </div>
      <div class="hero-content container">
        <h1>Car Insurance in {{ cityName }}, {{ stateName }}</h1>
        <p class="hero-subheadline">Quiuckly compare rates in your city</p>
        <zip-code-form :action="zipCodeUrl" />
      </div>
    </section>

    <section class="insurance-providers container">
      <h2>Compare Car Insurance Quotes From Top Companies</h2>
      <p>Get quotes from leading car insurance providers in {{ cityName }} and find the best coverage at the most affordable rates.</p>
      <insurance-brands
        :providers-config="[
          { name: 'Progressive', src: 'provider-progressive.png' },
          { name: 'Geico', src: 'provider-geico.png' },
          { name: 'Nationwide', src: 'provider-nationwide.png' },
          { name: 'State Farm', src: 'provider-state-farm.png' },
          { name: 'Liberty Mutual Insurance', src: 'provider-liberty.png' },
        ]"
      />
    </section>
    <section class="city-info container">
      <div class="city-stats">
        <div class="stat-card">
          <span class="stat-label">Metro Population</span>
          <span class="stat-value">{{ population }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Average Annual Cost</span>
          <span class="stat-value">${{ cityData.avgCost }}</span>
        </div>
        <!-- <div class="stat-card">
          <span class="stat-label">vs. National Average</span>
          <span class="stat-value" :class="costComparison.class">
            <span class="stat-value">{{ costComparison.text }}</span>
            <span :class="costComparison.class">{{ costComparison.text }}</span>
          </span>
        </div> -->
        <div class="stat-card">
          <span class="stat-label">Licensed Drivers</span>
          <span class="stat-value">{{ licensedDrivers }}</span>
        </div>
      </div>
    </section>

    <section class="local-factors container">
      <h2>What Affects Car Insurance Rates in {{ cityName }}?</h2>
      <p class="factors-intro">
        Insurance rates in {{ cityName }} are influenced by your driving record, age, vehicle type, credit score, specific ZIP code, coverage levels,
        and available discounts. Local factors unique to {{ cityName }} include:
      </p>
      <ul class="factors-list">
        <li v-for="(factor, index) in cityData.localFactors" :key="index">
          {{ factor }}
        </li>
      </ul>
      <p v-if="cityData.neighborhoodNote" class="neighborhood-note">
        {{ cityData.neighborhoodNote }}
      </p>
    </section>

    <!-- <section class="license-plate container" v-if="stateData.licensePlateImage">
      <div class="plate-wrapper">
        <img :src="stateData.licensePlateImage" :alt="`${stateName} license plate`" class="license-plate-image" />
        <div class="plate-content">
          <h3>{{ stateName }} License Plate Requirements</h3>
          <p>{{ stateData.plateInfo }}</p>
        </div>
      </div>
    </section> -->

    <section class="faq container">
      <FaqMain :faq="faqs" />
    </section>

    <section class="cta-section">
      <div class="container">
        <h2>Get Your {{ cityName }} Car Insurance Quote</h2>
        <p>Compare rates from top providers in minutes</p>
        <zip-code-form :action="zipCodeUrl" />
      </div>
    </section>
  </div>
</template>

<script setup>
  const route = useRoute();
  const stateNameSlug = route.params.state;
  const cityNameSlug = route.params.city;
  console.log("Route params - state:", stateNameSlug, "city:", cityNameSlug);
  const { cityData, error, pending } = await useCityDataFromCacheOrApi();

  const cityInfo = computed(() => {
    if (cityData.value && cityData.value.data && cityData.value.data.length > 0) {
      return cityData.value.data[0];
    }
    return null;
  });

  const cityName = computed(() => {
    return cityInfo.value ? cityInfo.value.name : "";
  });

  const stateName = computed(() => {
    return cityInfo.value ? cityInfo.value.stateName : "";
  });

  const population = computed(() => {
    return cityInfo.value ? useNumberFormatter().formatNumber(cityInfo.value.population) : "";
  });

  const licensedDrivers = computed(() => {
    return cityInfo.value ? useNumberFormatter().formatNumber(cityInfo.value.licensedDrivers) : "";
  });

  function useNumberFormatter() {
    const formatter = new Intl.NumberFormat("en-US");
    function formatNumber(value) {
      return formatter.format(value);
    }
    return { formatNumber };
  }

  async function useCityDataFromCacheOrApi() {
    const cacheKey = `${stateNameSlug}-${cityNameSlug}-car-insurance-data`;
    const nuxtApp = useNuxtApp();

    const {
      data: response,
      error,
      pending,
    } = await useAsyncData(
      cacheKey,
      async () => {
        const url = `/api/state/city/?state=${stateNameSlug}&city=${cityNameSlug}`;
        console.log("🌐 Making API request:", url);
        const result = await $fetch(url);
        return result;
      },
      {
        server: true,
        lazy: false,
        //watch: [() => route.params.slug],
        getCachedData(key) {
          const cacheHit = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
          if (cacheHit) {
            console.log("✅ Using cached data for key:", key, cacheHit);
          }
          return cacheHit;
        },
      }
    );

    return { cityData: response, error, pending };
  }
  // Calculate cost comparison
  // const costComparison = computed(() => {
  //   const nationalAvg = 2700;
  //   const diff = cityData.value.avgCost - nationalAvg;
  //   const percent = Math.abs(Math.round((diff / nationalAvg) * 100));

  //   if (diff > 0) {
  //     return {
  //       text: `${percent}% Above National Average`,
  //       class: "above-average",
  //     };
  //   } else if (diff < 0) {
  //     return {
  //       text: `${percent}% Below National Average`,
  //       class: "below-average",
  //     };
  //   } else {
  //     return {
  //       text: "At National Average",
  //       class: "at-average",
  //     };
  //   }
  // });

  // FAQs
  const faqs = computed(() => [
    {
      question: `How much is car insurance in ${cityName.value}?`,
      answer: `<p>The average cost of car insurance in ${cityName.value}, ${stateName.value} is $${cityData.value.avgCost} per year for full coverage. However, your actual rate will depend on factors like your age, driving record, vehicle type, and coverage levels.</p>`,
    },
    {
      question: `What factors affect car insurance rates in ${cityName.value}?`,
      answer: `<p>Rates are influenced by your driving record, age, vehicle type, credit score, and coverage levels.</p>`,
    },
    {
      question: `How can I get cheap car insurance in ${cityName.value}?`,
      answer: `<p>To find affordable coverage in ${cityName.value}, compare quotes from multiple providers, maintain a clean driving record, bundle policies, ask about available discounts, and consider raising your deductible if appropriate for your situation.</p>`,
    },
    {
      question: `What's the minimum car insurance required in ${stateName.value}?`,
      answer: `<p>${stateName.value} requires drivers to carry minimum liability coverage. Check with your insurance provider for specific state requirements and consider purchasing additional coverage beyond the minimum for better protection.</p>`,
    },
  ]);
</script>

<style lang="scss" scoped>
  .city-insurance-page {
    section {
      padding: 4rem;
    }
    .hero-section {
      position: relative;
      height: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;

      @include media-breakpoint-down(md) {
        height: 400px;
      }

      .hero-image-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;

        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
        }

        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .hero-content {
        position: relative;
        z-index: 1;

        h1 {
          font-size: 3rem;
          margin-bottom: 1rem;

          @include media-breakpoint-down(md) {
            font-size: 2rem;
          }
        }

        .hero-subheadline {
          font-size: 1.25rem;
          margin-bottom: 2rem;
        }
      }
    }

    .city-info {
      .city-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        margin-bottom: 3rem;

        @include media-breakpoint-down(md) {
          grid-template-columns: 1fr;
        }

        .stat-card {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;

          .stat-label {
            display: block;
            font-size: 0.875rem;
            color: #6c757d;
            margin-bottom: 0.5rem;
          }

          .stat-value {
            display: block;
            font-size: 2rem;
            font-weight: bold;
            color: #212529;

            &.above-average {
              color: #dc3545;
            }

            &.below-average {
              color: #28a745;
            }
          }
        }
      }

      .city-description {
        h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }

        :deep(p) {
          margin-bottom: 1rem;
          line-height: 1.6;
        }
      }
    }

    .local-factors {
      background: #f8f9fa;

      h2 {
        font-size: 2rem;
        margin-bottom: 1.5rem;
      }

      .factors-intro {
        margin-bottom: 1.5rem;
        line-height: 1.6;
      }

      .factors-list {
        list-style: none;
        padding: 0;
        margin-bottom: 2rem;

        li {
          padding: 1rem;
          margin-bottom: 0.5rem;
          background: white;
          border-left: 4px solid #007bff;
          border-radius: 4px;

          &::before {
            content: "✓";
            color: #28a745;
            font-weight: bold;
            margin-right: 0.75rem;
          }
        }
      }

      .neighborhood-note {
        font-style: italic;
        color: #6c757d;
      }
    }

    .license-plate {
      .plate-wrapper {
        display: flex;
        align-items: center;
        gap: 2rem;

        @include media-breakpoint-down(md) {
          flex-direction: column;
        }

        .license-plate-image {
          width: 200px;
          height: auto;
        }

        h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
      }
    }

    .insurance-providers {
      h2 {
        font-size: 2rem;
        margin-bottom: 2rem;
        text-align: center;
      }
    }

    .faq {
      background: #f8f9fa;
      padding: 4rem 0;

      h2 {
        font-size: 2rem;
        margin-bottom: 2rem;
        text-align: center;
      }

      .faq-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;

        @include media-breakpoint-down(md) {
          grid-template-columns: 1fr;
        }

        .faq-item {
          background: white;
          padding: 2rem;
          border-radius: 8px;

          h3 {
            font-size: 1.25rem;
            margin-bottom: 1rem;
            color: #007bff;
          }

          :deep(p) {
            line-height: 1.6;
          }
        }
      }
    }

    .cta-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;

      h2 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      p {
        font-size: 1.25rem;
        margin-bottom: 2rem;
      }
    }
  }
</style>
