<script setup>
import { isValidMake, isValidModel, getMakeName, getModelsForMake, getVehicleImagePath, getMakeLogoPath } from "~/data/vehicles";
import { redirectWithParams } from "@/composables/utils.js";

const route = useRoute();
const make = route.params.make;
const model = route.params.model;

if (!isValidMake(make) || !isValidModel(make, model)) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

const formattedMake = computed(() => getMakeName(make));

// Fetch model data from Google Sheets first so we can use it in formattedModel
const { data: modelData } = await useFetch(`/api/sheets/vehicles-detail`, {
  query: { make, model },
  key: `model-${make}-${model}`,
});

const formattedModel = computed(() => {
  // Use the 'model' column from spreadsheet if available, otherwise format the slug
  if (modelData.value && modelData.value['model']) {
    return modelData.value['model'];
  }
  return model
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");
});

// Vehicle image path
const vehicleImage = computed(() => getVehicleImagePath(make, model));
const imageError = ref(false);
const onImageError = () => {
  imageError.value = true;
};

// Track image errors for other models
const otherModelImageErrors = ref({});
const getOtherModelImage = (modelSlug) => getVehicleImagePath(make, modelSlug);
const onOtherModelImageError = (modelSlug) => {
  otherModelImageErrors.value[modelSlug] = true;
};

// Make logo
const makeLogo = computed(() => getMakeLogoPath(make));
const logoError = ref(false);
const onLogoError = () => {
  logoError.value = true;
};

// Fetch all models for this make to get display names
const { data: allModelsData } = await useFetch(`/api/sheets/vehicles-detail`, {
  query: { make },
  key: `all-models-${make}`,
});

const otherModels = computed(() => {
  // Only show models that exist in the spreadsheet
  if (allModelsData.value && Array.isArray(allModelsData.value)) {
    return allModelsData.value
      .filter((m) => m.model_slug && m.model_slug !== model)
      .map((m) => m.model_slug);
  }
  return [];
});

const formatModelName = (modelSlug) => {
  return modelSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");
};

// Helper to get display name for a model slug
const getModelDisplayName = (modelSlug) => {
  if (allModelsData.value && Array.isArray(allModelsData.value)) {
    const modelInfo = allModelsData.value.find(m => m.model_slug === modelSlug);
    if (modelInfo && modelInfo.model) {
      return modelInfo.model;
    }
  }
  return formatModelName(modelSlug);
};

// Vehicle stats from spreadsheet with fallback
const vehicleStats = computed(() => {
  if (modelData.value) {
    return {
      fullCoverageAnnual: modelData.value['full_coverage_annual'] || "1,850",
      minimumCoverageAnnual: modelData.value['minimum_coverage_annual'] || "620",
      msrp: modelData.value['msrp'] || "26,500",
      nhtsaRating: modelData.value['nhtsa_rating'] || "5/5 Stars",
    };
  }
  return {
    fullCoverageAnnual: "1,850",
    minimumCoverageAnnual: "620",
    msrp: "26,500",
    nhtsaRating: "5/5 Stars",
  };
});

// Parse safety features from spreadsheet columns (Safety Feature 1-5 with descriptions)
const safetyFeatures = computed(() => {
  if (!modelData.value) {
    // Fallback safety features
    return [
      { title: "Collision Mitigation Braking", description: "Automatically applies brakes to help avoid or reduce the severity of a collision." },
      { title: "Lane Keeping Assist", description: "Helps keep you centered in your lane with gentle steering corrections." },
      { title: "Adaptive Cruise Control", description: "Maintains a set following distance from the vehicle ahead." },
      { title: "Blind Spot Monitoring", description: "Alerts you when vehicles are in your blind spots during lane changes." },
      { title: "Road Departure Mitigation", description: "Helps prevent unintended road departures with steering and braking assistance." },
    ];
  }

  const features = [];
  for (let i = 1; i <= 5; i++) {
    const title = modelData.value[`safety_feature_${i}`];
    const description = modelData.value[`safety_feature_${i}_desc`];
    if (title && description) {
      features.push({ title, description });
    }
  }

  // Return fallback if no features found in spreadsheet
  if (features.length === 0) {
    return [
      { title: "Collision Mitigation Braking", description: "Automatically applies brakes to help avoid or reduce the severity of a collision." },
      { title: "Lane Keeping Assist", description: "Helps keep you centered in your lane with gentle steering corrections." },
      { title: "Adaptive Cruise Control", description: "Maintains a set following distance from the vehicle ahead." },
      { title: "Blind Spot Monitoring", description: "Alerts you when vehicles are in your blind spots during lane changes." },
      { title: "Road Departure Mitigation", description: "Helps prevent unintended road departures with steering and braking assistance." },
    ];
  }

  return features;
});

// Parse insurance factors from spreadsheet columns (Insurance Factor 1-5 with descriptions)
const insuranceFactors = computed(() => {
  if (!modelData.value) {
    // Fallback insurance factors
    return [
      { title: "Safety Ratings Impact", description: "Higher safety ratings typically result in lower insurance premiums due to reduced injury risk in accidents." },
      { title: "Repair Cost Considerations", description: "Parts availability and labor costs for repairs directly affect comprehensive and collision coverage rates." },
      { title: "Theft Statistics", description: "Vehicle theft rates in your area and for this specific model influence comprehensive coverage costs." },
      { title: "Driver Demographics", description: "Your age, driving history, and location significantly impact your personalized insurance rate." },
      { title: "Coverage Level Selection", description: "Choosing higher deductibles or liability-only coverage can substantially reduce your premium." },
    ];
  }

  const factors = [];
  for (let i = 1; i <= 5; i++) {
    const title = modelData.value[`insurance_factor_${i}`];
    const description = modelData.value[`insurance_factor_${i}_desc`];
    if (title && description) {
      factors.push({ title, description });
    }
  }

  // Return fallback if no factors found in spreadsheet
  if (factors.length === 0) {
    return [
      { title: "Safety Ratings Impact", description: "Higher safety ratings typically result in lower insurance premiums due to reduced injury risk in accidents." },
      { title: "Repair Cost Considerations", description: "Parts availability and labor costs for repairs directly affect comprehensive and collision coverage rates." },
      { title: "Theft Statistics", description: "Vehicle theft rates in your area and for this specific model influence comprehensive coverage costs." },
      { title: "Driver Demographics", description: "Your age, driving history, and location significantly impact your personalized insurance rate." },
      { title: "Coverage Level Selection", description: "Choosing higher deductibles or liability-only coverage can substantially reduce your premium." },
    ];
  }

  return factors;
});

// Model description from spreadsheet
const modelDescription = computed(() => {
  if (modelData.value && modelData.value['model_description']) {
    return modelData.value['model_description'];
  }
  return `The ${formattedMake.value} ${formattedModel.value} is a popular choice among drivers seeking reliability, fuel efficiency, and value. Known for its excellent safety ratings and low maintenance costs, the ${formattedModel.value} offers a great balance of features and affordability that can also translate to competitive insurance rates.`;
});

// Ratings data from spreadsheet
const ratingsData = computed(() => {
  if (modelData.value) {
    return {
      jdPower: modelData.value['jd_power_rating'],
      iihs: modelData.value['iihs_rating'],
      carDriver: modelData.value['car_driver_review'],
    };
  }
  return {};
});

// Custom FAQs from spreadsheet (using faq_question_1 and faq_answer_1 format)
const customFaqs = computed(() => {
  if (!modelData.value) {
    return null;
  }

  const hasCustomFaqs = modelData.value['faq_question_1'] && modelData.value['faq_answer_1'];
  if (!hasCustomFaqs) {
    return null;
  }

  const faqs = [
    {
      question: modelData.value['faq_question_1'],
      answer: modelData.value['faq_answer_1'],
    }
  ];

  if (modelData.value['faq_question_2'] && modelData.value['faq_answer_2']) {
    faqs.push({
      question: modelData.value['faq_question_2'],
      answer: modelData.value['faq_answer_2'],
    });
  }

  if (modelData.value['faq_question_3'] && modelData.value['faq_answer_3']) {
    faqs.push({
      question: modelData.value['faq_question_3'],
      answer: modelData.value['faq_answer_3'],
    });
  }

  if (modelData.value['faq_question_4'] && modelData.value['faq_answer_4']) {
    faqs.push({
      question: modelData.value['faq_question_4'],
      answer: modelData.value['faq_answer_4'],
    });
  }

  return faqs;
});

// Default FAQs if no custom FAQs
const defaultFaqs = computed(() => [
  {
    question: `How much does ${formattedMake.value} ${formattedModel.value} insurance cost?`,
    answer: `The average annual cost for full coverage on a ${formattedMake.value} ${formattedModel.value} is around $${vehicleStats.value.fullCoverageAnnual}, while minimum coverage averages $${vehicleStats.value.minimumCoverageAnnual}. Your actual rate depends on factors like your driving record, location, age, and coverage selections.`,
  },
  {
    question: `Is the ${formattedMake.value} ${formattedModel.value} expensive to insure?`,
    answer: `The ${formattedMake.value} ${formattedModel.value} is generally affordable to insure compared to other vehicles in its class. Its strong safety ratings, reasonable repair costs, and good reliability record help keep insurance premiums competitive.`,
  },
  {
    question: `What factors affect ${formattedMake.value} ${formattedModel.value} insurance rates?`,
    answer: `Key factors include the vehicle's safety ratings, repair costs, theft rates, your driving history, age, location, credit score, and the coverage levels you choose. Bundling policies and maintaining a clean driving record can help lower your rates.`,
  },
  {
    question: `Does the ${formattedMake.value} ${formattedModel.value} qualify for safety discounts?`,
    answer: `Yes, the ${formattedMake.value} ${formattedModel.value}'s advanced safety features like collision mitigation braking, lane keeping assist, and adaptive cruise control often qualify for insurance discounts. Ask your insurer about available safety feature discounts.`,
  },
  {
    question: `How can I save on ${formattedMake.value} ${formattedModel.value} insurance?`,
    answer: `Compare quotes from multiple insurers, bundle with home or renters insurance, maintain a clean driving record, consider higher deductibles, ask about available discounts (safe driver, low mileage, multi-vehicle), and review your coverage annually.`,
  },
]);

// Use custom FAQs if available, otherwise use defaults
const displayFaqs = computed(() => {
  const custom = customFaqs.value;
  if (custom && Array.isArray(custom) && custom.length > 0) {
    return custom;
  }
  return defaultFaqs.value;
});

// SEO meta tags with custom values from spreadsheet
const seoTitle = computed(() => {
  if (modelData.value && modelData.value['title_tag']) {
    return modelData.value['title_tag'];
  }
  return `${formattedMake.value} ${formattedModel.value} Car Insurance Cost & Considerations | Protect.com`;
});

const seoDescription = computed(() => {
  if (modelData.value && modelData.value['meta_description']) {
    return modelData.value['meta_description'];
  }
  return `Find affordable ${formattedMake.value} ${formattedModel.value} car insurance. Compare rates, learn about coverage options, and get your free quote today.`;
});

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
});
</script>

<template>
  <div class="vehicle-model-page">
    <section class="hero">
      <b-container>
        <nav aria-label="Breadcrumb" class="breadcrumb-nav">
          <NuxtLink to="/car-insurance">Car Insurance</NuxtLink>
          <span> / </span>
          <NuxtLink to="/car-insurance/rates-by-vehicle">Vehicles</NuxtLink>
          <span> / </span>
          <NuxtLink :to="`/car-insurance/rates-by-vehicle/${make}`">{{ formattedMake }}</NuxtLink>
          <span> / </span>
          <span>{{ formattedModel }}</span>
        </nav>
        <b-row class="hero-row" align-v="center">
          <b-col cols="12" lg="6" class="hero-content">
            <h1>{{ formattedMake }} {{ formattedModel }} Car Insurance</h1>
            <p class="hero-subtitle">
              Get comprehensive coverage for your {{ formattedMake }} {{ formattedModel }}. Compare quotes from top insurers and find the best rates available.
            </p>
            <button class="cta-button" @click="redirectWithParams('https://insure.protect.com', { vehicle1make: formattedMake.toUpperCase(), vehicle1model: formattedModel.toUpperCase() })">Compare Quotes</button>
          </b-col>
          <b-col cols="12" lg="6" class="hero-image-col">
            <div class="vehicle-image-wrapper">
              <NuxtImg
                v-if="!imageError"
                :src="vehicleImage"
                :alt="`${formattedMake} ${formattedModel}`"
                class="vehicle-image"
                format="webp"
                quality="80"
                loading="eager"
                sizes="xs:100vw sm:100vw md:50vw lg:50vw xl:600px"
                :width="600"
                :height="450"
                @error="onImageError"
              />
              <div v-else class="vehicle-placeholder">
                <i class="bi bi-car-front-fill" />
                <span>{{ formattedMake }} {{ formattedModel }}</span>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="stats-section">
      <b-container>
        <div class="stats-bar">
          <b-row class="stats-grid">
            <b-col cols="6" md="3">
              <div class="stat-item">
                <div class="stat-label">Avg Annual Full Coverage</div>
                <div class="stat-value">${{ vehicleStats.fullCoverageAnnual }}</div>
              </div>
            </b-col>
            <b-col cols="6" md="3">
              <div class="stat-item">
                <div class="stat-label">Avg Annual Minimum</div>
                <div class="stat-value">${{ vehicleStats.minimumCoverageAnnual }}</div>
              </div>
            </b-col>
            <b-col cols="6" md="3">
              <div class="stat-item">
                <div class="stat-label">Starting MSRP</div>
                <div class="stat-value">${{ vehicleStats.msrp }}</div>
              </div>
            </b-col>
            <b-col cols="6" md="3">
              <div class="stat-item">
                <div class="stat-label">NHTSA Rating</div>
                <div class="stat-value">{{ vehicleStats.nhtsaRating }}</div>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-container>
    </section>

    <section class="about-section">
      <b-container>
        <h2>About the {{ formattedMake }} {{ formattedModel }}</h2>
        <p>{{ modelDescription }}</p>
      </b-container>
    </section>

    <section class="ratings-section">
      <b-container>
        <div class="section-header">
          <h2>Ratings & Rankings</h2>
          <p>How the {{ formattedMake }} {{ formattedModel }} performs according to industry experts</p>
        </div>

        <b-row class="ratings-grid">
          <b-col cols="12" md="4">
            <div class="rating-card">
              <h3>
                <span>🏆</span> Car & Driver
              </h3>
              <p>{{ ratingsData.carDriver || 'Praised for its reliability, fuel efficiency, and overall value in its class.' }}</p>
            </div>
          </b-col>
          <b-col cols="12" md="4">
            <div class="rating-card">
              <h3>
                <span>⭐</span> J.D. Power
                <span v-if="ratingsData.jdPower" class="rating-badge">{{ ratingsData.jdPower }}</span>
                <span v-else class="rating-badge">82/100</span>
              </h3>
              <p>Above average ratings for quality and reliability based on owner feedback.</p>
            </div>
          </b-col>
          <b-col cols="12" md="4">
            <div class="rating-card">
              <h3>
                <span>🛡️</span> Safety Ratings
              </h3>
              <p>
                <strong>IIHS:</strong> {{ ratingsData.iihs || 'Top Safety Pick' }}<br>
                <strong>NHTSA:</strong> {{ vehicleStats.nhtsaRating }}
              </p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="safety-section">
      <b-container>
        <div class="section-header">
          <h2>Safety Features</h2>
          <p>Advanced safety technology protecting you and your passengers</p>
        </div>

        <div class="safety-grid">
          <div v-for="feature in safetyFeatures" :key="feature.title" class="safety-item">
            <h3><span class="safety-icon">✓</span> {{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </b-container>
    </section>

    <section class="factors-section">
      <b-container>
        <div class="section-header">
          <h2>Factors That Impact Insurance Costs</h2>
          <p>What affects your {{ formattedMake }} {{ formattedModel }} insurance premium</p>
        </div>

        <div class="factors-list">
          <div v-for="factor in insuranceFactors" :key="factor.title" class="factor-item">
            <h3>{{ factor.title }}</h3>
            <p>{{ factor.description }}</p>
          </div>
        </div>
      </b-container>
    </section>

    <section class="faq-section">
      <b-container>
        <div class="section-header">
          <h2>Frequently Asked Questions</h2>
        </div>

        <FaqAccordion :faqs="displayFaqs" />
      </b-container>
    </section>

    <section v-if="otherModels.length > 0" class="similar-section">
      <b-container>
        <div class="section-header">
          <NuxtImg
            v-if="!logoError"
            :src="makeLogo"
            :alt="`${formattedMake} logo`"
            class="section-logo"
            format="webp"
            quality="80"
            loading="lazy"
            :width="120"
            fit="inside"
            :modifiers="{ fit: 'inside' }"
            @error="onLogoError"
          />
          <h2>Other {{ formattedMake }} Models</h2>
          <p>Compare insurance options for other {{ formattedMake }} vehicles</p>
        </div>

        <div class="similar-grid">
          <NuxtLink
            v-for="otherModel in otherModels"
            :key="otherModel"
            :to="`/car-insurance/rates-by-vehicle/${make}/${otherModel}`"
            class="similar-card"
          >
            <h3>{{ getModelDisplayName(otherModel) }}</h3>
          </NuxtLink>
        </div>
      </b-container>
    </section>

    <section class="cta-section">
      <b-container>
        <h2>Ready to Save on {{ formattedMake }} {{ formattedModel }} Insurance?</h2>
        <p>Compare quotes from top insurers and find the best rate for your vehicle</p>
        <button class="cta-button" @click="redirectWithParams('https://insure.protect.com', { vehicle1make: formattedMake.toUpperCase(), vehicle1model: formattedModel.toUpperCase() })">Get Your Free Quote</button>
      </b-container>
    </section>

    <div class="rates-disclaimer">
      <b-container>
        <p>
          Rates shown are for a 30-year-old male with full coverage and a clean driving record in 2025. Your actual costs will vary based on your vehicle's trim, modifications, and driving history.
        </p>
      </b-container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vehicle-model-page {
  .breadcrumb-nav {
    margin-bottom: 1rem;
    font-size: 0.9rem;

    a {
      color: white;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    span {
      color: rgba(255, 255, 255, 0.9);
    }
  }

  .hero {
    background: linear-gradient(135deg, $blue 0%, lighten($blue, 15%) 100%);
    color: white;
    padding: 60px 0;

    .hero-row {
      @include media-breakpoint-down(lg) {
        flex-direction: column-reverse;
      }
    }

    .hero-content {
      @include media-breakpoint-up(lg) {
        text-align: left;
      }

      @include media-breakpoint-down(lg) {
        text-align: center;
        margin-top: 2rem;
      }
    }

    .hero-image-col {
      text-align: center;
    }

    .vehicle-image-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .vehicle-image {
      max-width: 100%;
      max-height: 300px;
      object-fit: contain;
      filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
    }

    .vehicle-placeholder {
      background: rgba(255, 255, 255, 0.15);
      border: 2px dashed rgba(255, 255, 255, 0.4);
      border-radius: 12px;
      padding: 3rem 4rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;

      i {
        font-size: 5rem;
        opacity: 0.7;
      }

      span {
        font-size: 1.25rem;
        font-weight: 600;
        opacity: 0.9;
      }
    }

    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      font-weight: 700;
      color: white;

      @include media-breakpoint-down(md) {
        font-size: 2.25rem;
      }
    }

    .hero-subtitle {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      color: white;
    }
  }

  .cta-button {
    background: $green-accessible;
    color: white;
    padding: 1rem 2.5rem;
    border: none;
    border-radius: 6px;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: background 0.3s;

    &:hover {
      background: darken($green, 10%);
      color: white;
    }
  }

  .stats-section {
    padding: 60px 0;
    background: $gray-lighter;
  }

  .stats-bar {
    background: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    padding: 30px;
  }

  .stat-item {
    text-align: center;
    padding: 10px;
  }

  .stat-label {
    font-size: 0.8rem;
    color: $gray-dark;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
  }

  .stat-value {
    font-size: 1.75rem;
    font-weight: 700;
    color: $blue;

    @include media-breakpoint-down(sm) {
      font-size: 1.5rem;
    }
  }

  .about-section {
    padding: 60px 0;

    h2 {
      font-size: 2.25rem;
      margin-bottom: 1.5rem;
      color: $blue;
    }

    p {
      font-size: 1.125rem;
      line-height: 1.8;
      color: $gray-dark;
    }
  }

  .section-header {
    text-align: center;
    margin-bottom: 3rem;

    .section-logo {
      max-width: 80px;
      max-height: 50px;
      object-fit: contain;
      margin-bottom: 1rem;
      opacity: 0.7;
    }

    h2 {
      font-size: 2.25rem;
      color: $blue;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.125rem;
      color: $gray-dark;
    }
  }

  .ratings-section {
    background: $gray-lighter;
    padding: 60px 0;
  }

  .rating-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid $gray-light;
    height: 100%;
    margin-bottom: 1.5rem;

    h3 {
      font-size: 1.25rem;
      color: $blue;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;

      i {
        color: $green-accessible;
      }
    }

    .rating-badge {
      background: $green-accessible;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 600;
    }

    p {
      color: $gray-dark;
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 0;
    }
  }

  .safety-section {
    padding: 60px 0;
  }

  .safety-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }

  .safety-item {
    padding: 1.5rem;
    background: $gray-lighter;
    border-radius: 8px;
    border-left: 4px solid $green;

    h3 {
      font-size: 1rem;
      color: $blue;
      margin-bottom: 0.5rem;

      i {
        color: $green-accessible;
        margin-right: 0.5rem;
      }
    }

    p {
      font-size: 0.9rem;
      color: $gray-dark;
      margin-bottom: 0;
      line-height: 1.5;
    }
  }

  .factors-section {
    background: white;
    padding: 60px 0;
  }

  .factors-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .factor-item {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 0;
    border: 1px solid $gray-light;
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    h3 {
      font-size: 1.25rem;
      color: $blue;
      margin-bottom: 0.75rem;
      font-weight: 700;
    }

    p {
      font-size: 0.95rem;
      color: $gray-dark;
      line-height: 1.6;
      margin-bottom: 0;
    }
  }

  .faq-section {
    padding: 60px 0;
    background: linear-gradient(180deg, $gray-lighter 0%, white 100%);
  }

  .similar-section {
    background: $gray-lighter;
    padding: 60px 0;
  }

  .similar-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .similar-card {
    background: white;
    border-radius: 8px;
    border: 1px solid $gray-light;
    text-align: center;
    text-decoration: none;
    color: inherit;
    transition: all 0.2s;
    padding: 1.25rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: $gray-lighter;
      border-color: $blue;

      h3 {
        color: darken($blue, 10%);
      }
    }

    h3 {
      font-size: 1rem;
      color: $blue;
      margin: 0;
      font-weight: 600;
      transition: color 0.2s;
    }
  }

  .cta-section {
    background: linear-gradient(135deg, $blue 0%, lighten($blue, 15%) 100%);
    color: white;
    padding: 80px 0;
    text-align: center;

    h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: white;

      @include media-breakpoint-down(md) {
        font-size: 2rem;
      }
    }

    p {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      color: white;
    }

  }

  .rates-disclaimer {
    padding: 1.5rem 0;
    text-align: center;

    p {
      font-size: 0.85rem;
      color: $gray-dark;
      margin-bottom: 0;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>
