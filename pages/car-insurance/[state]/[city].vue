<template>
  <div v-if="error || !cityName" class="error-state">
    <div class="state-container">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="#dc2626">
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
        />
      </svg>
      <h2>Unable to Load Data</h2>
      <p>
        We're having trouble loading the insurance information. Please try again
        later.
      </p>
      <NuxtLink to="/car-insurance" class="compare-btn primary">
        Back to Car Insurance
      </NuxtLink>
    </div>
  </div>
  <div v-else-if="pending" class="loading-state">
    <div class="state-container">
      <div class="spinner"></div>
      <h2>Loading Insurance Data</h2>
      <p>Please wait while we gather the latest information...</p>
    </div>
  </div>
  <div v-else class="state-insurance-page">
    <!-- Hero Section -->
    <section class="hero hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <nav aria-label="Breadcrumb" class="breadcrumb-nav pb-4 m-auto">
              <NuxtLink to="/car-insurance">Car Insurance</NuxtLink>
              <span> / </span>
              <NuxtLink :to="`/car-insurance/${stateNameSlug}`">{{
                stateName
              }}</NuxtLink>
              <span> / </span>
              <span>{{ cityName }}</span>
            </nav>
            <h1>{{ cityName }} Car Insurance</h1>
            <p class="subtitle">
              Compare quotes from top providers in {{ cityName }},
              {{ stateName }}
            </p>
            <div class="hero-features">
              <div class="feature-item">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span>Compare rates instantly</span>
              </div>
              <div class="feature-item">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span>No spam, just quotes</span>
              </div>
              <div class="feature-item">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span>Save up to $500/year</span>
              </div>
            </div>
            <button
              class="compare-btn primary"
              :disabled="false"
              @click="
                redirectWithParams('https://insure.protect.com', {
                  zipcode: computedZipCode,
                })
              "
            >
              Compare Quotes
            </button>
            <div class="rate-output-text">
              <p v-if="rateComparison.comparison.comparisonStatus === 'above'">
                <strong>💡 Good News:</strong> Despite higher area rates, you
                can still find competitive prices. Compare quotes now to unlock
                your best rate!
              </p>
              <p
                v-else-if="
                  rateComparison.comparison.comparisonStatus === 'below'
                "
              >
                <strong>💰 Save Big:</strong> {{ cityName }} drivers are already
                enjoying lower rates. Get your personalized quote and start
                saving today!
              </p>
              <p v-else>
                <strong>🎯 Hidden Savings:</strong> Average rates don't mean
                average savings. Compare quotes to discover how much you could
                be saving!
              </p>
            </div>
          </div>
          <div class="hero-visual">
            <div class="hero-facts-grid">
              <div class="fact-card rate">
                <h2>${{ coverageRateAnnual }}</h2>
                <p>Average {{ cityName }} Annual Cost</p>
                <span
                  :class="`${rateComparison.comparison.comparisonStatus}-average`"
                >
                  {{ capitalize(rateComparison.comparison.text) }}
                </span>
              </div>

              <div class="fact-card rate">
                <h2>${{ coverageRateMonthly }}</h2>
                <p>Average {{ cityName }} Monthly Cost</p>
              </div>

              <div class="fact-card">
                <h2>{{ stateFaultType }}</h2>
                <p>{{ stateName }} Fault Type</p>
              </div>

              <div class="fact-card">
                <h2>{{ stateMinCoverage }}</h2>
                <p>{{ stateName }} Min. Coverage</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StatePageComponentsCtaSection :zipcode="computedZipCode" />
    </section>
    <!-- How to Save Money Section -->
    <section class="savings-tips">
      <div class="container">
        <h2>How to Save Money on Car Insurance in {{ cityName }}</h2>
        <p>Expert tips to reduce your insurance premiums</p>

        <div class="tips-grid">
          <div class="tip-card">
            <svg width="48" height="48" viewBox="0 0 24 24">
              <path
                d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
              />
            </svg>
            <h3 class="headline">Compare Regularly</h3>
            <p>Shop around annually to ensure you're getting the best rates</p>
          </div>

          <div class="tip-card">
            <svg width="48" height="48" viewBox="0 0 24 24">
              <path
                d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
              />
            </svg>
            <h3 class="headline">Bundle Policies</h3>
            <p>Combine auto and home insurance for discounts up to 25%</p>
          </div>

          <div class="tip-card">
            <svg width="48" height="48" viewBox="0 0 24 24">
              <path
                d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"
              />
            </svg>
            <h3 class="headline">Safe Driver Discounts</h3>
            <p>Maintain a clean driving record to qualify for lower rates</p>
          </div>

          <div class="tip-card">
            <svg width="48" height="48" viewBox="0 0 24 24">
              <path
                d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"
              />
            </svg>
            <h3 class="headline">Usage-Based Programs</h3>
            <p>Save up to 30% with telematics and safe driving apps</p>
          </div>

          <div class="tip-card">
            <svg width="48" height="48" viewBox="0 0 24 24">
              <path
                d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"
              />
            </svg>
            <h3 class="headline">Education Discounts</h3>
            <p>Students and alumni may qualify for education-based savings</p>
          </div>

          <div class="tip-card">
            <svg width="48" height="48" viewBox="0 0 24 24">
              <path
                d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"
              />
            </svg>
            <h3 class="headline">Safety Features</h3>
            <p>Anti-theft devices and safety features can lower premiums</p>
          </div>
        </div>

        <div class="cta-center">
          <button
            class="compare-btn"
            :disabled="false"
            @click="
              redirectWithParams('https://insure.protect.com', {
                zipcode: computedZipCode,
              })
            "
          >
            Compare Quotes
          </button>
        </div>
      </div>
    </section>

    <!-- City-Specific Fast Facts -->
    <section class="fast-facts">
      <div class="container">
        <div class="cta-box">
          <div class="col-2 mx-auto">
            <NuxtImg
              src="/assets/states/outlines/icon-shield.png"
              alt="Shield Icon"
              class="cta-icon"
            />
          </div>
          <h3>Compare Top Providers in {{ cityName }}</h3>
          <p class="subtext">Ready to see what you can save?</p>
          <button
            class="compare-btn"
            :disabled="false"
            @click="
              redirectWithParams('https://insure.protect.com', {
                zipcode: computedZipCode,
              })
            "
          >
            Compare Quotes
          </button>
          <p class="trust-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path
                d="M12 2L4 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-8-5z"
              />
            </svg>
            No spam, just quotes
          </p>
        </div>
      </div>
    </section>

    <!-- Local Insights Section -->
    <section class="local-insights">
      <div class="container">
        <div class="insight-box">
          <img
            :src="'/assets/states/license-plates/' + stateNameSlug + '.jpg'"
            alt="{{stateName}} license plate"
          />
          <div class="insight-content">
            <h3>
              What are the best car insurance companies in {{ cityName }}?
            </h3>
            <p>
              Instead of focusing solely on the cheapest companies, we look at
              the full picture — offering a balance between affordable pricing,
              coverage types, and the provider's reputation. We prioritize
              providers known for exceptional customer service in the
              {{ cityName }} area, ensuring you're not just getting a good rate,
              but reliable support when it matters most. Local agents can
              provide personalized guidance for navigating {{ stateName }}'s
              unique insurance requirements, including no-fault coverage.
            </p>
            <p>
              Compare quotes today to see which {{ cityName }} providers are
              best for your car and wallet.
            </p>
          </div>
        </div>

        <div class="insight-box">
          <img
            :src="'/assets/states/outlines/' + stateNameSlug + '.svg'"
            :alt="`${stateName} outline`"
          />
          <div class="insight-content">
            <h3>Compare and Save in {{ cityName }}!</h3>
            <p>
              {{ cityName }} drivers have access to all major national insurance
              providers, plus several regional carriers that specialize in
              {{ stateName }}'s unique driving conditions. Whether you're
              commuting through downtown, or taking a Sunday drive, finding the
              right coverage at the best price is essential.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq">
      <div class="container">
        <FaqMain :faq="faq" />
      </div>
    </section>

    <!-- How Protect.com Works -->
    <section class="how-it-works">
      <div class="container">
        <h2>How Protect.com Works</h2>
        <p>Get the best car insurance quotes in just three simple steps</p>

        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <h3>Enter Your Zip Code</h3>
            <p>
              Tell us where you live in the {{ cityName }} area to find
              insurance providers
            </p>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <h3>Compare Quotes</h3>
            <p>
              Review personalized quotes from top insurance companies serving
              your area
            </p>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <h3>Save Money</h3>
            <p>Choose the best coverage at the lowest price for your needs</p>
          </div>
        </div>

        <div class="cta-center">
          <button
            class="compare-btn"
            :disabled="false"
            @click="
              redirectWithParams('https://insure.protect.com', {
                zipcode: computedZipCode,
              })
            "
          >
            Compare Quotes
          </button>
        </div>
      </div>
    </section>

    <!-- Rate Calculator -->
    <section class="rate-calculator">
      <div class="container">
        <AutoRateCalculator :initial-zip="computedZipCode" />
      </div>
    </section>

    <section class="other-cities">
      <div class="container">
        <div class="cities-grid">
          <div v-for="city in otherCities" :key="city" class="city-card">
            <NuxtLink
              :to="`/car-insurance/${stateNameSlug}/${city
                .toLowerCase()
                .replace(/ /g, '-')}`"
              class="city-link"
            >
              {{ city }} Car Insurance
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Methodology -->
    <section class="methodology">
      <div class="container">
        <h3>Methodology & Disclosures</h3>
        <p>
          Minimum car insurance rates by state provided by
          <a
            href="https://finance.yahoo.com/personal-finance/insurance/article/state-minimum-car-insurance-233457321.html"
            >Yahoo Finance</a
          >. Average full coverage car insurance rates by state provided by
          <a href="https://www.bankrate.com/insurance/car/states/">Bankrate</a>.
          National average car insurance costs by age provided by
          <a
            href="https://wallethub.com/edu/ci/average-car-insurance-rates-by-age/69321"
            >WalletHub</a
          >.
        </p>
        <p>
          Car insurance rates vary by geographic region, number of drivers,
          vehicles, driving record, and many other factors. For the purposes of
          this site and the rates you see, the standard profile has been
          applied: 40 year old single driver, 2023 Toyota Camry, good credit
          score, clean driving record and commutes 5 days. Rates also assume
          bundling and paperless billing discounts.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
  import { useStore } from "@/stores/store";

  definePageMeta({
    middleware: "city-validation",
  });

  const route = useRoute();
  const stateNameSlug = route.params.state;
  const cityNameSlug = route.params.city;

  const zipCode = ref("");
  const computedZipCode = computed(() => zipCode.value.trim());

  const {
    error,
    pending,
    cityName,
    stateName,
    coverageRateAnnual,
    coverageRateMonthly,
    stateMinCoverage,
    stateFaultType,
    faq,
    rateComparison,
    otherCities,
  } = await useCityDataFromCacheOrApi();

  console.log("otherCities:", otherCities);

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
        console.log("hitting api for city data:", stateNameSlug, cityNameSlug);
        const url = `/api/state/city/?state=${stateNameSlug}&city=${cityNameSlug}`;
        const result = await $fetch(url);
        return result;
      },
      {
        server: true,
        lazy: false,
        getCachedData(key) {
          const cacheHit =
            nuxtApp.payload.data[key] || nuxtApp.static.data[key];
          console.log("Cache hit for", key, ":", cacheHit);
          return cacheHit;
        },
      }
    );

    // Helper function for number formatting
    function useNumberFormatter(num) {
      const formatter = new Intl.NumberFormat("en-US");
      return formatter.format(num);
    }

    // All computed properties
    const cityInfo = computed(() => {
      if (
        response.value &&
        response.value.data &&
        response.value.data.length > 0
      ) {
        return response.value.data[0];
      }
      return null;
    });

    const cityName = computed(() => {
      return cityInfo.value ? cityInfo.value.name : "";
    });

    const stateName = computed(() => {
      return cityInfo.value ? cityInfo.value.stateName : "";
    });

    const stateCode = computed(() => {
      return cityInfo.value ? cityInfo.value.stateCode : "";
    });

    const cityState = computed(() => {
      return cityInfo.value ? cityInfo.value.cityState : "";
    });

    const metroArea = computed(() => {
      //format metro area into a nice sentence, with the last metro name preceded by "and"
      let str = cityInfo.value.metroArea.split(",")[0];
      str = str.split("-");
      str = str.map((word, i, s) => {
        if (i < s.length - 1) {
          return `${capitalize(word.trim())},`;
        } else {
          return `and ${word.trim()}`;
        }
      });
      return str.join(" ");
    });

    const population = computed(() => {
      return cityInfo.value
        ? useNumberFormatter(cityInfo.value.population)
        : "";
    });

    const licensedDrivers = computed(() => {
      return cityInfo.value
        ? useNumberFormatter(cityInfo.value.licensedDrivers)
        : "";
    });

    const licenseShare = computed(() => {
      return cityInfo.value ? cityInfo.value.licenseShare : "";
    });

    const licenseSharePercent = computed(() => {
      return cityInfo.value
        ? `${Math.round(cityInfo.value.licenseShare * 100)}%`
        : "";
    });

    const primaryZip = computed(() => {
      return cityInfo.value ? cityInfo.value.primaryZip : "";
    });

    const rateComparison = computed(() =>
      useCarInsuranceRateComparison(
        cityInfo.value ? cityInfo.value.coverageRates.monthly : null,
        cityInfo.value ? cityInfo.value.coverageRates.annual : null
      )
    );
    console.log("rateComparison:", rateComparison.value);
    const coverageRateAnnual = computed(() => {
      return cityInfo.value
        ? useNumberFormatter(cityInfo.value.coverageRates.annual)
        : "";
    });

    const coverageRateMonthly = computed(() => {
      return cityInfo.value
        ? useNumberFormatter(cityInfo.value.coverageRates.monthly)
        : "";
    });

    const stateMinCoverage = computed(() => {
      return cityInfo.value ? cityInfo.value.stateMinCoverage : "";
    });

    const stateFaultType = computed(() => {
      return cityInfo.value ? cityInfo.value.stateFaultType : "";
    });

    const cityDescription = computed(() => {
      return cityInfo.value ? cityInfo.value.cityDescription : "";
    });

    const faq = computed(() => {
      const faqs = cityInfo.value ? cityInfo.value.faq : [];
      const formattedFaqArray = faqs.map((faqString) => {
        const [question, answer] = faqString.split("\\n");
        return {
          question,
          answer,
        };
      });
      return formattedFaqArray;
    });

    const cityPosition = computed(() => {
      return cityInfo.value ? cityInfo.value.cityPosition : "";
    });

    const zipCodeUrl = computed(() => {
      return "/get-quote";
    });
    const otherCities = computed(() => {
      return cityInfo.value ? cityInfo.value.otherCities : [];
    });

    return {
      error,
      pending,
      cityInfo,
      cityName,
      stateName,
      stateCode,
      cityState,
      metroArea,
      population,
      licensedDrivers,
      licenseShare,
      licenseSharePercent,
      primaryZip,
      coverageRateAnnual,
      coverageRateMonthly,
      stateMinCoverage,
      stateFaultType,
      cityDescription,
      cityPosition,
      faq,
      zipCodeUrl,
      rateComparison,
      otherCities,
    };
  }

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  useSeoMeta({
    title: () =>
      `${cityName.value} Car Insurance - Compare Quotes in ${stateName.value}`,
    description: () =>
      `Get free car insurance quotes in ${cityName.value}, ${stateName.value}. Compare rates from top providers and save up to $500/year. Fast, easy, and no spam.`,
    ogTitle: () =>
      `${cityName.value} Car Insurance - Compare Quotes in ${stateName.value}`,
    ogDescription: () =>
      `Get free car insurance quotes in ${cityName.value}, ${stateName.value}. Compare rates from top providers and save up to $500/year. Fast, easy, and no spam.`,
    ogImage: () => "https://stage.protect.com/img/protect-share.dabdad17.jpg",
    ogType: "article",
    twitterCard: "summary_large_image",
    twitterTitle: () =>
      `${cityName.value} Car Insurance - Compare Quotes in ${stateName.value}`,
    twitterDescription: () =>
      `Get free car insurance quotes in ${cityName.value}, ${stateName.value}. Compare rates from top providers and save up to $500/year. Fast, easy, and no spam.`,
    twitterImage: () =>
      "https://stage.protect.com/img/protect-share.dabdad17.jpg",
  });
  onMounted(() => {
    const store = useStore();
    zipCode.value = store.visitorInfo.zip || "";
  });
</script>

<style lang="scss" scoped>
  @import "@/scss/stateautoinsurance.scss";

  // ==================== ERROR & LOADING STATES ====================
  .error-state,
  .loading-state {
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;

    .state-container {
      text-align: center;
      max-width: 500px;
      padding: 48px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

      svg {
        margin-bottom: 24px;
      }

      h2 {
        font-size: 24px;
        color: $blue;
        margin-bottom: 16px;
        font-weight: 600;
      }

      p {
        font-size: 16px;
        color: #64748b;
        line-height: 1.6;
        margin: 0;
      }
    }
  }

  .loading-state {
    .spinner {
      width: 48px;
      height: 48px;
      margin: 0 auto 24px;
      border: 4px solid #e5e7eb;
      border-top-color: $blue;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  section {
    padding: 60px 0;

    @include mobile {
      padding: 40px 0;
    }

    .compare-btn {
      background: #007a5f;
      color: white;
      border: none;
      padding: 14px 20px;
      border-radius: 3px;
      font-weight: 700;
      font-size: 1.25rem;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 275px;
      height: 65px;
    }
  }

  // ==================== HERO SECTION ====================
  .hero {
    color: $blue;
    padding: 60px 0;
    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);

    @include mobile {
      padding: 40px 0;
    }

    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;

      @include tablet {
        grid-template-columns: 1fr;
        gap: 40px;
        text-align: center;
      }

      @include mobile {
        grid-template-columns: 1fr;
        gap: 30px;
        text-align: center;
      }

      .compare-btn {
        max-width: 480px;
        width: 100%;
      }
    }

    .hero-text {
      .breadcrumb-nav {
        a {
          text-decoration: underline;
          color: $gray-dark;
        }
        span {
          color: $gray-dark;
        }
      }
      h1 {
        font-size: 52px;
        font-weight: 700;
        margin-bottom: 20px;
        line-height: 1.1;
        color: $blue;

        @include tablet {
          font-size: 42px;
        }

        @include mobile {
          font-size: 36px;
        }
      }

      .subtitle {
        font-size: 20px;
        margin-bottom: 32px;
        color: #64748b;
        line-height: 1.6;
      }

      .hero-features {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 32px;

        @include tablet {
          max-width: 75%;
          margin: 0 auto 30px auto;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #475569;
          font-size: 16px;

          svg {
            color: $green;
            flex-shrink: 0;
          }
        }
      }
    }

    .hero-visual {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 20px;
      height: 100%;

      @include mobile {
        padding: 0;
        justify-content: flex-start;
      }
    }

    .hero-facts-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      width: 100%;
      max-width: 600px;
      margin: auto;
      height: 90%;

      @include mobile {
        max-width: 100%;
        grid-template-columns: 1fr;
        gap: 16px;
        margin-top: 0;
      }

      .fact-card {
        background: white;
        padding: 28px 24px;
        border-radius: 12px;
        text-align: center;
        border: 2px solid #e5e7eb;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 165px;

        h2 {
          font-family: inherit;
          font-size: 36px;
          color: $blue;
          font-weight: 700;

          @include mobile {
            font-size: 28px;
            font-family: inherit;
          }
        }

        @include mobile {
          padding: 24px 20px;
          min-height: auto;
        }

        &:hover {
          border-color: $blue-light;
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(12, 44, 103, 0.15);
        }

        h3 {
          font-size: 32px;
          color: $blue;
          font-weight: 700;
          margin-bottom: 8px;
        }

        p {
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
          margin-bottom: 8px;
          max-width: 157px;
          margin: 0 auto;
        }
      }
    }

    .rate-output-text {
      margin-top: 24px;
      background: linear-gradient(
        135deg,
        rgba(59, 130, 246, 0.15) 0%,
        rgba(59, 130, 246, 0.08) 100%
      );
      color: darken(#2563eb, 15%);
      border: 2px solid #3b82f6;
      border-radius: 12px;
      padding: 18px 24px;
      position: relative;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
      max-width: 480px;
      width: 100%;

      @include tablet {
        margin: 32px auto 0 auto;
      }

      @include mobile {
        margin-top: 32px;
        padding: 16px 20px;
      }

      p {
        margin: 0;
        font-size: 15px;
        line-height: 1.5;
        color: darken(#2563eb, 20%);
        font-weight: 500;

        strong {
          font-weight: 700;
          font-size: 16px;
          display: block;
          margin-bottom: 4px;
          color: darken(#2563eb, 25%);
        }
      }
    }
  }

  .trust-badge {
    margin-top: 20px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    opacity: 0.9;
    color: white;

    img {
      width: 16px;
      height: 16px;
      display: inline-block;
    }
  }

  .compare-btn {
    display: inline-block;
    background: $green;
    color: white;
    padding: 18px 48px;
    font-size: 18px;
    font-weight: 600;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: none;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 12px rgba(102, 194, 150, 0.3);

    &.primary {
      font-size: 20px;
      padding: 20px 56px;
    }

    &:hover {
      background: $green-dark;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 194, 150, 0.4);
      text-decoration: none;
    }
  }

  // ==================== FAST FACTS ====================
  .fast-facts {
    background: white;

    h2 {
      font-size: 36px;
      color: #0c2c67;
      text-align: center;
      margin-bottom: 12px;
      font-weight: 700;
    }

    .intro {
      text-align: center;
      color: #6b7280;
      font-size: 18px;
      margin-bottom: 40px;
    }
  }

  .fact-card {
    background: #f9fafb;
    padding: 32px;
    border-radius: 12px;
    text-align: center;
    border: 2px solid #e5e7eb;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.rate {
      justify-content: space-between;
      height: 100%;
    }

    &:hover {
      border-color: #0c2c67;
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(12, 44, 103, 0.1);
    }

    h3 {
      font-size: 42px;
      color: #0c2c67;
      font-weight: 700;
      margin-bottom: 8px;
    }

    p {
      font-size: 16px;
      color: #6b7280;
      font-weight: 500;
      margin-bottom: 8px;
    }

    .below-average,
    .above-average,
    .at-average {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      border-radius: 4px;
      font-size: 13px;
      font-weight: 600;
      margin-top: 8px;
      position: relative;
      padding: 5px 10px 5px 28px;

      &::before {
        content: "";
        position: absolute;
        left: 8px;
        top: 50%;
        transform: translateY(-50%);
        width: 12px;
        height: 12px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
    }

    .below-average {
      background: rgba(102, 194, 150, 0.12);
      color: darken($green-dark, 20%);
      border: 1px solid darken($green-dark, 20%);

      &::before {
        background-image: url('data:image/svg+xml;utf8,<svg width="12" height="12" viewBox="0 0 24 24" fill="%23275c42" xmlns="http://www.w3.org/2000/svg"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>');
      }
    }

    .above-average {
      background: rgba(239, 68, 68, 0.1);
      color: darken(#dc2626, 15%);
      border: 1px solid rgba(239, 68, 68, 0.3);

      &::before {
        background-image: url('data:image/svg+xml;utf8,<svg width="12" height="12" viewBox="0 0 24 24" fill="%239c1919" xmlns="http://www.w3.org/2000/svg"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>');
      }
    }

    .at-average {
      background: rgba(59, 130, 246, 0.1);
      color: darken(#2563eb, 15%);
      border: 1px solid rgba(59, 130, 246, 0.3);

      &::before {
        background-image: url('data:image/svg+xml;utf8,<svg width="12" height="12" viewBox="0 0 24 24" fill="%231043b3" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>');
      }
    }
  }

  .cta-box {
    background: linear-gradient(135deg, #0c2c67 0%, #1a4a8a 100%);
    color: white;
    padding: 48px;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 8px 24px rgba(12, 44, 103, 0.15);

    @include mobile {
      padding: 32px 20px;
    }

    img {
      width: 41px;
      height: 48px;
      margin: 0 auto 16px;
    }

    h3 {
      font-size: 28px;
      margin-bottom: 8px;
      color: white;
    }

    p {
      font-size: 18px;
      margin-bottom: 8px;
      opacity: 0.95;
      color: white;
    }

    .subtext {
      font-size: 16px;
      margin-bottom: 24px;
      opacity: 0.85;
      color: white;
    }

    .trust-badge {
      color: white;
      opacity: 0.9;
    }
  }

  // ==================== SAVINGS TIPS ====================
  .savings-tips {
    background: #f9fafb;

    h2 {
      font-size: 36px;
      color: #0c2c67;
      text-align: center;
      margin-bottom: 12px;
      font-weight: 700;
    }

    > .container > p {
      text-align: center;
      color: #6b7280;
      font-size: 18px;
      margin-bottom: 48px;
    }
  }

  .tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 32px;
    margin-bottom: 48px;
  }

  .tip-card {
    background: white;
    padding: 32px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 2px solid transparent;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    svg {
      fill: $green;
    }
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
      border-color: $blue-light;
    }

    img {
      width: 48px;
      height: 48px;
      margin: 0 auto 16px;
      filter: invert(15%) sepia(52%) saturate(2621%) hue-rotate(201deg)
        brightness(92%) contrast(96%);
    }

    .headline {
      color: #0c2c67;
      margin-bottom: 12px;
      font-weight: 600;
      font-size: 28px;
    }

    p {
      font-size: 16px;
      color: #6b7280;
      line-height: 1.6;
      margin-bottom: 16px;
    }
  }

  .cta-center {
    text-align: center;
  }

  // ==================== LOCAL INSIGHTS ====================
  .local-insights {
    background: white;
  }

  .insight-box {
    display: flex;
    gap: 40px;
    margin-bottom: 40px;
    padding: 40px;
    background: #f9fafb;
    border-radius: 12px;
    align-items: center;

    @include mobile {
      flex-direction: column;
      padding: 20px;
    }

    img {
      width: 200px;
      height: auto;
      border-radius: 8px;
      flex-shrink: 0;
    }
  }

  .insight-content {
    h3 {
      font-size: 24px;
      color: #0c2c67;
      margin-bottom: 16px;
      font-weight: 600;
    }

    p {
      font-size: 16px;
      line-height: 1.8;
      color: #4b5563;
      margin-bottom: 16px;
    }
  }

  // ==================== FAQ SECTION ====================
  .faq {
    background: #f9fafb;

    h2 {
      font-size: 36px;
      color: #0c2c67;
      text-align: center;
      margin-bottom: 48px;
      font-weight: 700;
    }
  }

  // ==================== HOW IT WORKS ====================
  .how-it-works {
    background: white;

    h2 {
      font-size: 36px;
      color: #0c2c67;
      text-align: center;
      margin-bottom: 12px;
      font-weight: 700;
    }

    > .container > p {
      text-align: center;
      color: #6b7280;
      font-size: 18px;
      margin-bottom: 48px;
    }
  }

  .steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 40px;
    margin-bottom: 48px;

    @include tablet {
      grid-template-columns: repeat(2, 1fr);

      .step:nth-child(3) {
        grid-column: 1 / -1;
        max-width: 50%;
        margin: 0 auto;
      }
    }
  }

  .step {
    text-align: center;
    position: relative;

    h3 {
      font-size: 22px;
      color: #0c2c67;
      margin-bottom: 12px;
      font-weight: 600;
    }

    p {
      font-size: 16px;
      color: #6b7280;
      line-height: 1.6;
    }
  }

  .step-number {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #0c2c67 0%, #1a4a8a 100%);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: 700;
    margin: 0 auto 24px;
    box-shadow: 0 4px 12px rgba(12, 44, 103, 0.3);
  }

  // ==================== RATE CALCULATOR ====================
  .rate-calculator {
    background: #f9fafb;

    h2 {
      font-size: 36px;
      color: #0c2c67;
      text-align: center;
      margin-bottom: 12px;
      font-weight: 700;
    }

    > .container > p {
      text-align: center;
      color: #6b7280;
      font-size: 18px;
      margin-bottom: 40px;
    }
  }

  // ==================== METHODOLOGY ====================
  .methodology {
    background: white;
    border-top: 1px solid #e5e7eb;
    padding: 40px 0;

    h3 {
      font-size: 20px;
      color: #0c2c67;
      margin-bottom: 16px;
      font-weight: 600;
    }

    p {
      font-size: 14px;
      color: #6b7280;
      line-height: 1.8;
      margin-bottom: 12px;
    }
    a {
      font-size: 14px;
      text-decoration: underline;
    }
  }

  .other-cities {
    .city-link {
      font-size: 0.95rem;
      text-decoration: underline;
      color: $blue-light;
    }
  }
</style>
