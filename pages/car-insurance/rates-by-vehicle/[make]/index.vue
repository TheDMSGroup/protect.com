<script setup>
import { isValidMake, getMakeName, getVehicleImagePath, getMakeLogoPath } from "~/data/vehicles";
import { redirectWithParams } from "@/composables/utils.js";

const route = useRoute();
const make = route.params.make;

if (!isValidMake(make)) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page Not Found",
  });
}

const formattedMake = computed(() => getMakeName(make));

// Fetch make data from Google Sheets
const { data: makeData, error: makeError } = await useFetch(`/api/sheets/vehicle-makes`, {
  query: { slug: make },
  key: `make-${make}`,
});

// Fetch models for this make from Google Sheets
const { data: modelsData } = await useFetch(`/api/sheets/vehicles-detail`, {
  query: { make },
  key: `models-${make}`,
});

// Extract model data from the fetched data
const models = computed(() => {
  if (!modelsData.value || !Array.isArray(modelsData.value)) {
    return [];
  }
  return modelsData.value.filter(model => model.model_slug);
});

const makeDescription = computed(() => {
  return makeData.value?.['make_description'] || '';
});

// Custom FAQs from spreadsheet
const defaultFaqs = computed(() => {
  // Check if spreadsheet has custom FAQs (using faq_question_1 and faq_answer_1 format)
  const hasCustomFaqs = makeData.value?.['faq_question_1'] && makeData.value?.['faq_answer_1'];

  if (hasCustomFaqs) {
    const customFaqs = [
      {
        question: makeData.value['faq_question_1'],
        answer: makeData.value['faq_answer_1'],
      }
    ];

    if (makeData.value['faq_question_2'] && makeData.value['faq_answer_2']) {
      customFaqs.push({
        question: makeData.value['faq_question_2'],
        answer: makeData.value['faq_answer_2'],
      });
    }

    if (makeData.value['faq_question_3'] && makeData.value['faq_answer_3']) {
      customFaqs.push({
        question: makeData.value['faq_question_3'],
        answer: makeData.value['faq_answer_3'],
      });
    }

    if (makeData.value['faq_question_4'] && makeData.value['faq_answer_4']) {
      customFaqs.push({
        question: makeData.value['faq_question_4'],
        answer: makeData.value['faq_answer_4'],
      });
    }

    return customFaqs;
  }

  // Return default FAQs if no custom FAQs in spreadsheet
  return [
    {
      question: `How much does ${formattedMake.value} insurance cost?`,
      answer: `${formattedMake.value} insurance costs vary by model. Factors like your driving record, location, age, and coverage selection also significantly impact your premium. Compare quotes to find the best rate.`,
    },
    {
      question: `What factors affect ${formattedMake.value} insurance rates?`,
      answer: `Insurance rates are influenced by vehicle-specific factors (safety ratings, repair costs, theft risk, performance) and driver factors (age, driving record, credit score, location). ${formattedMake.value} vehicles with advanced safety features often qualify for discounts.`,
    },
    {
      question: `Are ${formattedMake.value} vehicles expensive to repair?`,
      answer: `Repair costs vary by model. Parts availability, labor complexity, and technology features all affect repair expenses. This directly impacts your collision and comprehensive coverage premiums.`,
    },
    {
      question: `How can I save on ${formattedMake.value} insurance?`,
      answer: `Compare quotes from multiple insurers, bundle policies, maintain a clean driving record, take advantage of safety feature discounts, consider higher deductibles, and ask about good driver, low mileage, and multi-vehicle discounts.`,
    },
  ];
});

const formatModelName = (model) => {
  return model
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");
};

// Dropdown options for SelectDropdown component
const modelDropdownOptions = computed(() => {
  return models.value.map((model) => ({
    label: model.model || formatModelName(model.model_slug),
    to: `/car-insurance/rates-by-vehicle/${make}/${model.model_slug}`,
  }));
});

// Make logo
const makeLogo = computed(() => getMakeLogoPath(make));
const logoError = ref(false);

// Track image errors for each model
const imageErrors = ref({});
const getVehicleImage = (model) => getVehicleImagePath(make, model);
const onImageError = (model) => {
  imageErrors.value[model] = true;
};

// SEO meta tags with custom values from spreadsheet
const seoTitle = computed(() => {
  return makeData.value?.['title_tag'] || `${formattedMake.value} Car Insurance - Compare Quotes | Protect.com`;
});

const seoDescription = computed(() => {
  return makeData.value?.['meta_description'] || `Find affordable ${formattedMake.value} car insurance. Compare rates for ${models.value.map(model => model.model || formatModelName(model.model_slug)).join(", ")} and more. Get your free quote today.`;
});

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
});
</script>

<template>
  <div class="vehicle-make-page">
    <section class="hero">
      <b-container>
        <nav aria-label="Breadcrumb" class="breadcrumb-nav">
          <NuxtLink to="/car-insurance">Car Insurance</NuxtLink>
          <span> / </span>
          <NuxtLink to="/car-insurance/rates-by-vehicle">Vehicles</NuxtLink>
          <span> / </span>
          <span>{{ formattedMake }}</span>
        </nav>
        <div class="hero-content">
          <h1>{{ formattedMake }} Car Insurance</h1>
          <p class="hero-subtitle">Find affordable insurance coverage for your {{ formattedMake }} vehicle</p>
          <button class="cta-button" @click="redirectWithParams('https://insure.protect.com', { vehicle1make: formattedMake.toUpperCase() })">Compare Quotes</button>
        </div>
      </b-container>
    </section>

    <section class="models-section">
      <b-container>
        <div class="section-header">
          <h2>Car Insurance for {{ formattedMake }}: By Model</h2>
          <p>Compare insurance costs and coverage options for popular {{ formattedMake }} models</p>
        </div>

        <div v-if="models.length > 0" class="models-filter">
          <SelectDropdown title="Select Model" :options="modelDropdownOptions" />
        </div>

        <div v-if="models.length > 0" class="models-grid">
          <NuxtLink
            v-for="model in models"
            :key="model.model_slug"
            :to="`/car-insurance/rates-by-vehicle/${make}/${model.model_slug}`"
            class="model-card"
          >
            <div class="model-image-wrapper">
              <NuxtImg
                v-if="!imageErrors[model.model_slug]"
                :src="getVehicleImage(model.model_slug)"
                :alt="`${formattedMake} ${model.model || formatModelName(model.model_slug)}`"
                class="model-image"
                format="webp"
                quality="80"
                loading="lazy"
                sizes="xs:100vw sm:50vw md:33vw lg:25vw xl:300px"
                :width="300"
                :height="225"
                @error="onImageError(model.model_slug)"
              />
              <div v-else class="model-placeholder">
                <i class="bi bi-car-front-fill" />
              </div>
            </div>
            <div class="model-content">
              <h3 class="model-name">{{ model.model || formatModelName(model.model_slug) }}</h3>
              <ul v-if="model.safety_feature_1 || model.safety_feature_2" class="model-features">
                <li v-if="model.safety_feature_1">{{ model.safety_feature_1 }}</li>
                <li v-if="model.safety_feature_2">{{ model.safety_feature_2 }}</li>
              </ul>
              <p v-else class="model-description">
                Get insurance quotes for the {{ model.model || formatModelName(model.model_slug) }}. Compare rates from top insurers.
              </p>
              <div v-if="model.full_coverage_annual || model.minimum_coverage_annual" class="model-pricing">
                <div v-if="model.full_coverage_annual" class="price-item">
                  <div class="price-label">Avg Annual Full Coverage</div>
                  <div class="price-value">${{ model.full_coverage_annual }}</div>
                </div>
                <div v-if="model.minimum_coverage_annual" class="price-item">
                  <div class="price-label">Avg Annual Minimum</div>
                  <div class="price-value">${{ model.minimum_coverage_annual }}</div>
                </div>
              </div>
              <span class="learn-more">Get Model Rates →</span>
            </div>
          </NuxtLink>
        </div>
        <div v-else class="no-models">
          <p>No models found for {{ formattedMake }}. Check back soon!</p>
        </div>
      </b-container>
    </section>

    <section class="about-make">
      <b-container>
        <b-row align-v="center">
          <b-col cols="12" md="8">
            <h2>About {{ formattedMake }}</h2>
            <p>{{ makeDescription }}</p>
          </b-col>
          <b-col v-if="!logoError" cols="12" md="4" class="text-center d-none d-md-block">
            <NuxtImg
              :src="makeLogo"
              :alt="`${formattedMake} logo`"
              class="about-logo"
              format="webp"
              quality="80"
              loading="lazy"
              :width="200"
              fit="inside"
              :modifiers="{ fit: 'inside' }"
            />
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="features-section">
      <b-container>
        <div class="section-header">
          <h2>Why Insurance Costs Vary by {{ formattedMake }} Model</h2>
          <p>Understanding the factors that affect your insurance premiums</p>
        </div>

        <b-row class="features-grid">
          <b-col cols="12" md="6" lg="4">
            <div class="feature-card">
              <div class="feature-icon">🛡️</div>
              <h3>Safety Features</h3>
              <p>Advanced safety technology can lower premiums, while expensive-to-repair features may increase collision coverage costs.</p>
            </div>
          </b-col>
          <b-col cols="12" md="6" lg="4">
            <div class="feature-card">
              <div class="feature-icon">⚙️</div>
              <h3>Engine Performance</h3>
              <p>Higher horsepower and performance models typically cost more to insure due to increased accident risk and repair costs.</p>
            </div>
          </b-col>
          <b-col cols="12" md="6" lg="4">
            <div class="feature-card">
              <div class="feature-icon">🔧</div>
              <h3>Repair Costs</h3>
              <p>Parts availability and repair complexity directly impact your comprehensive and collision coverage premiums.</p>
            </div>
          </b-col>
          <b-col cols="12" md="6" lg="4">
            <div class="feature-card">
              <div class="feature-icon">⭐</div>
              <h3>Safety Ratings</h3>
              <p>IIHS and NHTSA crash test ratings influence how insurers assess risk and set your rates.</p>
            </div>
          </b-col>
          <b-col cols="12" md="6" lg="4">
            <div class="feature-card">
              <div class="feature-icon">🚗</div>
              <h3>Theft Risk</h3>
              <p>Models with higher theft rates typically have increased comprehensive coverage costs to account for replacement risk.</p>
            </div>
          </b-col>
          <b-col cols="12" md="6" lg="4">
            <div class="feature-card">
              <div class="feature-icon">💰</div>
              <h3>Vehicle Value</h3>
              <p>MSRP and current market value directly affect comprehensive and collision coverage premiums.</p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section class="faq-section">
      <b-container>
        <div class="section-header">
          <h2>Frequently Asked Questions</h2>
        </div>

        <FaqAccordion :faqs="defaultFaqs" />
      </b-container>
    </section>

    <section class="cta-section">
      <b-container>
        <h2>Ready to Save on {{ formattedMake }} Insurance?</h2>
        <p>Compare quotes from top insurers in minutes</p>
        <button class="cta-button" @click="redirectWithParams('https://insure.protect.com', { vehicle1make: formattedMake.toUpperCase() })">Get Your Free Quote</button>
      </b-container>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.vehicle-make-page {
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

    .hero-content {
      text-align: center;
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

  .about-make {
    padding: 60px 0;
    background: $gray-lighter;

    h2 {
      font-size: 2.25rem;
      margin-bottom: 1.5rem;
      color: $blue;
    }

    p {
      font-size: 1.125rem;
      line-height: 1.8;
      color: $gray-dark;
      margin-bottom: 0;
    }

    .about-logo {
      max-width: 150px;
      max-height: 100px;
      object-fit: contain;
      opacity: 0.8;
    }
  }

  .models-section {
    padding: 60px 0;
  }

  .models-filter {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;

    @include media-breakpoint-down(sm) {
      width: 100%;
    }
  }

  .section-header {
    text-align: center;
    margin-bottom: 3rem;

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

  .models-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .no-models {
    text-align: center;
    padding: 3rem 1rem;
    color: $gray-dark;

    p {
      font-size: 1.125rem;
    }
  }

  .model-card {
    background: white;
    border: 1px solid $gray-light;
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
    text-decoration: none;
    color: $blue; // Use dark blue for sufficient contrast
    display: block;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

      .learn-more {
        text-decoration: underline;
      }
    }

    .model-image-wrapper {
      background: $gray-lighter;
      padding: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 160px;
    }

    .model-image {
      max-width: 100%;
      max-height: 140px;
      object-fit: contain;
    }

    .model-placeholder {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 140px;

      i {
        font-size: 4rem;
        color: $gray;
        opacity: 0.5;
      }
    }

    .model-content {
      padding: 1.5rem;
    }

    .model-name {
      font-size: 1.5rem;
      font-weight: 700;
      color: $blue;
      margin-bottom: 0.75rem;
    }

    .model-features {
      list-style: none;
      padding: 0;
      margin: 0 0 1rem 0;

      li {
        font-size: 0.95rem;
        color: $gray-dark;
        line-height: 1.5;
        margin-bottom: 0.5rem;
        padding-left: 1.25rem;
        position: relative;

        &:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: $green;
          font-weight: 700;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .model-description {
      font-size: 0.95rem;
      color: $gray-dark;
      margin-bottom: 1rem;
      line-height: 1.5;
    }

    .model-pricing {
      display: flex;
      gap: 1rem;
      margin: 1rem 0;
      padding: 1rem;
      background: $gray-lighter;
      border-radius: 8px;

      .price-item {
        flex: 1;

        .price-label {
          font-size: 0.75rem;
          color: $gray-dark;
          margin-bottom: 0.25rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .price-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: $blue;
        }
      }
    }

    .learn-more {
      display: inline-block;
      color: $green-accessible;
      font-weight: 600;
      font-size: 1rem;
    }
  }

  .features-section {
    background: $gray-lighter;
    padding: 60px 0;

    .features-grid {
      margin-top: 2rem;
    }
  }

  .feature-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    border: 1px solid $gray-light;
    margin-bottom: 1.5rem;
    height: calc(100% - 1.5rem);

    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1.25rem;
      line-height: 1;
    }

    h3 {
      font-size: 1.25rem;
      color: $blue;
      margin-bottom: 0.75rem;
    }

    p {
      color: $gray-dark;
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 0;
    }
  }

  .faq-section {
    padding: 60px 0;
    background: linear-gradient(180deg, $gray-lighter 0%, white 100%);
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
}
</style>
