<template>
  <div class="state-insurance-page">
    <div v-if="loading" class="loading">
      <div class="container">
        <div class="loading-spinner"></div>
        <p>Loading state insurance information...</p>
      </div>
    </div>
    <div v-else-if="error" class="error">
      <div class="container">
        <h1>State Not Found</h1>
        <p>We couldn't find insurance information for the requested state.</p>
        <router-link to="/" class="btn btn-primary"
          >Return to Home Page</router-link
        >
      </div>
    </div>

    <div v-else-if="stateData && stateData.state">
      <!-- State Hero Section -->
      <!-- Hero Section - Header matching screenshots -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <!-- Left Content -->
            <div class="hero-left">
              <h1>{{ stateData.state }} Car Insurance</h1>
              <p class="hero-subtitle">
                Find some of the best car insurance quotes in the
                {{ stateData.nickname }}!
              </p>

              <!-- Desktop Quote Form -->
              <div class="desktop-quote-form">
                <form @submit.prevent="getQuotes" class="quote-form-inline">
                  <div class="form-row">
                    <IconsGeoPin class="left-icon" />
                    <input
                      type="text"
                      v-model="zipcode"
                      placeholder="enter zipcode"
                      class="zipcode-input"
                      maxlength="5"
                    />
                    <button type="submit" class="compare-btn">
                      COMPARE QUOTES
                    </button>
                  </div>
                  <p class="form-disclaimer">
                    <img
                      src="/assets/shield-icon-small.png"
                      alt="shield icon"
                    />
                    No spam, just quotes.
                  </p>
                </form>
              </div>
            </div>
            <!-- Right Content - Provider Cards -->
            <StatePageComponentsHeroProviderCards
              :stateData="stateData"
              :zipcode="zipcode"
            />
          </div>
        </div>
      </section>
      <StatePageComponentsInsuranceOverview :stateData="stateData" />
      <!-- CTA Section -->
      <StatePageComponentsCtaSection
        :stateData="stateData"
        :zipcode="zipcode"
      />
      <!--Interactive Map-->
      <section v-if="props.topic === 'usa'" class="map-section">
        <b-container>
          <h2>Explore Car Insurance Rates Across the US</h2>
          <StateAutoInsuranceUSMap
            :show-links-on-desktop="true"
            :hide-legend="true"
            :hide-labels="true"
          />
        </b-container>
      </section>
      <!-- Money Saving Tips Section -->
      <StatePageComponentsMoneySavingTips
        :stateData="stateData"
        :zipcode="zipcode"
      />
      <!-- Explore CTA Section -->
      <StatePageComponentsJumpLinks :stateData="stateData" :zipcode="zipcode" />
      <!-- FAQ Section -->
      <FaqMain
        :stateData="stateData"
        :faq="stateData.faqs ? stateData.faqs : defaultFaqs"
      />
      <!-- How Protect.com Works Section -->
      <StatePageComponentsHowItWorks
        :stateData="stateData"
        :zipcode="zipcode"
      />
      <!-- Auto Rate Calculator Section -->
      <div class="calculator-section">
        <LazyAutoRateCalculator :componentProps="{ zipcode: zipcode }" />
      </div>
      <!-- City Links-->
      <section
        v-if="cityLinks && cityLinks.length > 0 && !cityLinksError"
        class="other-cities"
      >
        <b-container>
          <h2 class="text-center">
            Compare Rates In Cities Across {{ stateData.state }}
          </h2>
          <CityLinksList :city-links="cityLinks" />
        </b-container>
      </section>
      <section class="methodology">
        <div class="container">
          <div class="section-header">
            <h3>Methodology & Disclosures</h3>
          </div>
          <div>
            <p>
              Minimum car insurance rates by state provided by
              <a
                href="https://finance.yahoo.com/personal-finance/insurance/article/state-minimum-car-insurance-233457321.html"
                target="_blank"
                rel="noopener noreferrer"
                >Yahoo Finance</a
              >. Average full coverage car insurance rates by state provided by
              <a
                href="https://www.bankrate.com/insurance/car/states/"
                target="_blank"
                rel="noopener noreferrer"
                >Bankrate</a
              >. National average car insurance costs by age provided by
              <a
                href="https://wallethub.com/edu/ci/average-car-insurance-rates-by-age/69321"
                target="_blank"
                rel="noopener noreferrer"
                >WalletHub</a
              >.
            </p>
            <p>
              Car insurance rates vary by geographic region, number of drivers,
              vehicles, driving record, and many other factors. For the purposes
              of this site and the rates you see, the standard profile has been
              applied:
            </p>
            <p>
              40 year old single driver, 2023 Toyota Camry, good credit score,
              clean driving record and commutes 5 days. Rates also assume
              bundling and paperless billing discounts.
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script setup>
  import { computed, ref, onMounted } from "vue";
  import { useStore } from "../stores/store";

  const store = useStore();

  const props = defineProps({
    topic: {
      type: String,
      required: true,
    },
    title: String,
    description: String,
    dataZoneId: String,
    cityLinks: {
      type: Array,
      default: () => [],
    },
    cityLinksError: {
      type: Boolean,
      default: false,
    },
  });

  // Reactive zipcode variable
  const zipcode = ref("");

  // Fetch state insurance stats from Google Sheets API
  const {
    data: stateInsuranceStats,
    pending: statsLoading,
    error: statsError,
  } = await useFetch("/api/sheets/states");

  const error = computed(() => statsError.value);

  const loading = computed(() => {
    return statsLoading.value || !stateInsuranceStats.value;
  });

  const stateData = computed(() => {
    if (!props.topic || !stateInsuranceStats.value) {
      return null;
    }

    console.log(props.topic);
    console.log("props", props);
    const normalizedTopic = props.topic.toLowerCase().replace(/[-\s]/g, "");
    const stateStatInfo = stateInsuranceStats.value.filter((state) => {
      const stateName = state.State || state.state;
      return (
        stateName &&
        stateName.toLowerCase().replace(/[-\s]/g, "") === normalizedTopic
      );
    })[0];

    if (!stateStatInfo) {
      return null;
    }

    // Map Google Sheets column names to component property names
    const stateName = stateStatInfo.State || stateStatInfo.state;
    const mappedState = {
      state: stateName,
      stateAbbreviation: stateStatInfo["State Abbreviation"],
      nickname: stateStatInfo["State Nickname"],
      bodilyInjuryPerPerson:
        stateStatInfo["Bodily Injury Liability (per person)"],
      bodilyInjuryPerAccident:
        stateStatInfo["Bodily Injury Liability (per accident)"],
      propertyDamage: stateStatInfo["Property Damage Liability"],
      combinedSplitLimit: stateStatInfo["Combined (Split Limit)"],
      faultType: stateStatInfo["At-Fault / No-Fault State"],
      avgAnnualCost: stateStatInfo["Avg. Annual Car Insurance Cost"],
      avgMonthlyCost: stateStatInfo["Avg. Monthly Car Insurance Cost"],
      avgAnnualMinCost: stateStatInfo["Avg. Annual Minimum Coverage"],
      age16Cost: stateStatInfo["Age 16"],
      age25Cost: stateStatInfo["Age 25"],
      age45Cost: stateStatInfo["Age 45"],
      age65Cost: stateStatInfo["Age 65"],
      jumpLink: stateStatInfo["Jump Link"],
      faqs: parseFaqs(stateStatInfo["FAQs"]),
      faq1: stateStatInfo["FAQ1"],
      faq1a: stateStatInfo["FAQ1A"],
      faq2: stateStatInfo["FAQ2"],
      faq2a: stateStatInfo["FAQ2A"],
      faq3: stateStatInfo["FAQ3"],
      faq3a: stateStatInfo["FAQ3A"],
      faq4: stateStatInfo["FAQ4"],
      faq4a: stateStatInfo["FAQ4A"],
      titleTag: stateStatInfo["Title Tag"],
      metaDescription: stateStatInfo["Meta Description"],
    };

    // Parse currency values
    Object.keys(mappedState)
      .filter((key) => key.includes("Cost"))
      .forEach((key) => {
        mappedState[key] = parseCurrency(mappedState[key]);
      });

    return mappedState;
  });

  const defaultFaqs = computed(() => {
    const state = stateData.value;
    if (!state) return [];

    // Check if spreadsheet has custom FAQs (FAQ1, FAQ1A, FAQ2, FAQ2A)
    const hasCustomFaqs = state.faq1 && state.faq1a;

    if (hasCustomFaqs) {
      const customFaqs = [
        {
          question: state.faq1,
          answer: state.faq1a,
        },
      ];

      // Add second FAQ if both question and answer exist
      if (state.faq2 && state.faq2a) {
        customFaqs.push({
          question: state.faq2,
          answer: state.faq2a,
        });
      }

      // Add third FAQ if both question and answer exist
      if (state.faq3 && state.faq3a) {
        customFaqs.push({
          question: state.faq3,
          answer: state.faq3a,
        });
      }

      // Add fourth FAQ if both question and answer exist
      if (state.faq4 && state.faq4a) {
        customFaqs.push({
          question: state.faq4,
          answer: state.faq4a,
        });
      }

      return customFaqs;
    }

    // Return default template FAQs if no custom FAQs in spreadsheet
    return [
      {
        question: `What is the minimum auto insurance required in ${state.state}?`,
        answer: `${state.state} requires minimum liability coverage of ${state.combinedSplitLimit}. This means ${state.bodilyInjuryPerPerson} for bodily injury per person, ${state.bodilyInjuryPerAccident} per accident, and ${state.propertyDamage} for property damage.`,
      },
      {
        question: `How much does auto insurance cost in ${state.state}?`,
        answer: `The average annual cost of auto insurance in ${
          state.state
        } is ${formatCurrency(
          state.avgAnnualCost
        )}. However, rates vary significantly based on factors like age, driving record, location, and coverage levels.`,
      },
      {
        question: `Is ${state.state} a fault or no-fault state?`,
        answer: `${
          state.state
        } is ${state?.faultType?.toLowerCase()} state. This affects how insurance claimsare handled after an accident.`,
      },
      {
        question: `What factors affect my insurance rates in ${state.state}?`,
        answer:
          "Insurance rates are influenced by your driving record, age, location, vehicle type, credit score, coverage levels, and available discounts. Young drivers typically pay more, while experienced drivers with clean records get better rates.",
      },
      {
        question: "How often should I shop for auto insurance?",
        answer: `It's recommended to compare auto insurance rates annually or whenever you have a major life change (moving,
            new car, marriage, etc.). This ensures you're getting the best available rates.`,
      },
    ];
  });
  const formatCurrency = function (value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };
  const getQuotes = function () {
    if (zipcode?.value?.toString().length == 5) {
      const options = {
        zipcode: zipcode.value,
      };
      redirectWithParams("https://insure.protect.com", options);
    }
  };
  const parseCurrency = function (value) {
    if (!value) return 0;
    // If already a number, return it
    if (typeof value === "number") return value;
    // Remove $ and commas, convert to number
    return parseInt(String(value).replace(/[$,]/g, ""), 10) || 0;
  };

  const parseFaqs = function (value) {
    if (!value) return null;
    // If already an array, return it
    if (Array.isArray(value)) return value;
    // If string, try to parse as JSON
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : null;
      } catch (e) {
        console.error("Failed to parse FAQs JSON:", e);
        return null;
      }
    }
    return null;
  };

  // Set page meta for SEO with state-specific license plate as share image
  const getLicensePlateUrl = (stateName) => {
    if (!stateName) return "https://protect.com/img/protect-share.jpg";
    const slug = stateName.replace(/\s/g, "").toLowerCase();
    return `https://dev.protect.com/assets/states/license-plates/${slug}.jpg`;
  };

  useSeoMeta({
    title: () =>
      stateData.value
        ? stateData.value.titleTag ||
          `${stateData.value.state} Car Insurance - Compare Quotes | Protect.com`
        : "Car Insurance - Compare Quotes | Protect.com",
    description: () =>
      stateData.value
        ? stateData.value.metaDescription ||
          `Compare car insurance quotes in ${
            stateData.value.state
          }. Average annual cost: ${formatCurrency(
            stateData.value.avgAnnualCost
          )}. Find the best rates in the ${stateData.value.nickname}.`
        : "Compare car insurance quotes from top providers. Save money with Protect.com.",
    ogTitle: () =>
      stateData.value
        ? stateData.value.titleTag ||
          `${stateData.value.state} Car Insurance - Compare Quotes`
        : "Car Insurance - Compare Quotes",
    ogDescription: () =>
      stateData.value
        ? stateData.value.metaDescription ||
          `Find the best car insurance rates in ${
            stateData.value.state
          }. Average cost: ${formatCurrency(
            stateData.value.avgAnnualCost
          )}/year.`
        : "Compare car insurance quotes from top providers.",
    ogImage: () => getLicensePlateUrl(stateData.value?.state),
    ogType: "website",
    twitterCard: "summary_large_image",
    twitterImage: () => getLicensePlateUrl(stateData.value?.state),
  });

  // Mounted lifecycle hook
  onMounted(() => {
    // Get zipcode from store if available
    if (store.visitorInfo.zip) {
      zipcode.value = store.visitorInfo.zip;
    }
  });
</script>

<style lang="scss" scoped>
  @import "../scss/type.scss";
  @import "../scss/_variables.scss";
  @import "../scss/stateautoinsurance.scss";

  .state-insurance-page,
  .loading,
  .error {
  }

  .loading {
    top: 50px;
    position: relative;
    display: flex;
    justify-content: center;
    text-align: center;

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid var(--border-color);
      border-top: 4px solid var(--primary-color);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto var(--spacing-md) auto;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  }

  .calculator-section {
    padding: var(--spacing-xl) 0;
    background-color: var(--surface-light);
  }

  .other-cities {
    padding: 4rem 0;
    margin: 4rem 0;
  }

  .error {
    top: 50px;
    position: relative;
    display: flex;
    justify-content: center;
    text-align: center;

    h1 {
      margin-bottom: var(--spacing-md);
    }

    p {
      margin-bottom: var(--spacing-lg);
      color: var(--text-secondary);
    }
  }

  .left-icon {
    position: absolute;
    padding-left: 15px;
    margin-top: 15px;
    vertical-align: middle;
  }

  .desktop-quote-form {
    display: flex;
    flex-direction: column;
  }

  .methodology {
    margin: 50px;

    @include mobile {
      margin-bottom: 20px;
    }
    p {
      font-size: 1em;
    }
  }

  .map-section {
    margin: 7rem 0 3rem 0;

    @include media-breakpoint-down(md) {
      margin: 3rem 0 0;
    }
    h2 {
      margin-bottom: var(--spacing-lg);
      text-align: center;
    }
  }
  // Container custom styles
  .container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }
</style>
