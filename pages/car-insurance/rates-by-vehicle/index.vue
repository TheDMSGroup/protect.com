<script setup>
import { getAllMakes, getMakeLogoPath } from "~/data/vehicles";
import { redirectWithParams } from "@/composables/utils.js";

const makes = computed(() => getAllMakes());

// Track logo errors for each make
const logoErrors = ref({});
const getMakeLogo = (makeSlug) => getMakeLogoPath(makeSlug);
const onLogoError = (makeSlug) => {
  logoErrors.value[makeSlug] = true;
};

useSeoMeta({
  title: "Car Insurance by Vehicle Make & Model | Protect.com",
  description: "Find affordable car insurance for your vehicle. Compare rates by make and model, learn about coverage options, and get your free quote today.",
});

const faqData = [
  {
    question: "How does my vehicle affect insurance rates?",
    answer: "Your vehicle's make, model, and year significantly impact insurance costs. Factors include safety ratings, repair costs, theft rates, vehicle value, and performance characteristics. Safer, more reliable vehicles with lower repair costs typically have lower premiums.",
  },
  {
    question: "Which vehicles are cheapest to insure?",
    answer: "Generally, mid-size sedans and minivans with excellent safety ratings and moderate repair costs are cheapest to insure. Vehicles from brands known for reliability like Honda and Toyota often have competitive insurance rates.",
  },
  {
    question: "Do safety features lower insurance costs?",
    answer: "Yes, many insurers offer discounts for vehicles equipped with advanced safety features like automatic emergency braking, lane departure warning, blind spot monitoring, and adaptive cruise control.",
  },
  {
    question: "How can I find the best rate for my vehicle?",
    answer: "Compare quotes from multiple insurers, as rates can vary significantly by company. Also consider bundling policies, maintaining a clean driving record, and asking about all available discounts for your specific vehicle.",
  },
];
</script>

<template>
  <div class="vehicles-page">
    <section class="hero">
      <b-container>
        <nav aria-label="Breadcrumb" class="breadcrumb-nav">
          <NuxtLink to="/car-insurance">Car Insurance</NuxtLink>
          <span> / </span>
          <span>Vehicles</span>
        </nav>
        <div class="hero-content">
          <h1>Car Insurance by Vehicle</h1>
          <p class="hero-subtitle">Find affordable insurance coverage for your specific make and model</p>
          <button class="cta-button" @click="redirectWithParams('https://insure.protect.com', {})">Compare Quotes</button>
        </div>
      </b-container>
    </section>

    <section class="makes-section">
      <b-container>
        <div class="section-header">
          <h2>Browse by Make</h2>
          <p>Select your vehicle manufacturer to find model-specific insurance information</p>
        </div>

        <div class="makes-grid">
          <NuxtLink
            v-for="makeItem in makes"
            :key="makeItem.slug"
            :to="`/car-insurance/rates-by-vehicle/${makeItem.slug}`"
            class="make-card"
          >
            <div class="make-logo-wrapper">
              <img
                v-if="!logoErrors[makeItem.slug]"
                :src="getMakeLogo(makeItem.slug)"
                :alt="`${makeItem.name} logo`"
                class="make-logo"
                @error="onLogoError(makeItem.slug)"
              >
              <div v-else class="make-logo-placeholder">
                <i class="bi bi-car-front-fill" />
              </div>
            </div>
            <div class="make-content">
              <h3 class="make-name">{{ makeItem.name }}</h3>
              <p class="make-description">
                Compare insurance rates for {{ makeItem.name }} vehicles
              </p>
              <span class="learn-more">View {{ makeItem.name }} Rates By Model &rarr;</span>
            </div>
          </NuxtLink>
        </div>
      </b-container>
    </section>

    <section class="info-section">
      <b-container>
        <div class="section-header">
          <h2>Why Vehicle Type Affects Insurance Rates</h2>
          <p>Understanding how your car impacts your premium</p>
        </div>

        <b-row class="info-grid">
          <b-col cols="12" md="6" lg="4">
            <div class="info-card">
              <div class="info-icon">🛡️</div>
              <h3>Safety Ratings</h3>
              <p>Vehicles with higher IIHS and NHTSA safety ratings often qualify for lower insurance premiums due to reduced injury risk.</p>
            </div>
          </b-col>
          <b-col cols="12" md="6" lg="4">
            <div class="info-card">
              <div class="info-icon">🔧</div>
              <h3>Repair Costs</h3>
              <p>The cost of parts and labor for your specific vehicle directly impacts collision and comprehensive coverage rates.</p>
            </div>
          </b-col>
          <b-col cols="12" md="6" lg="4">
            <div class="info-card">
              <div class="info-icon">💰</div>
              <h3>Vehicle Value</h3>
              <p>Higher-value vehicles typically cost more to insure because replacement and repair costs are greater.</p>
            </div>
          </b-col>
          <b-col cols="12" md="6" lg="4">
            <div class="info-card">
              <div class="info-icon">🚗</div>
              <h3>Theft Rates</h3>
              <p>Some vehicles are targeted by thieves more often, which increases comprehensive coverage premiums.</p>
            </div>
          </b-col>
          <b-col cols="12" md="6" lg="4">
            <div class="info-card">
              <div class="info-icon">⚙️</div>
              <h3>Performance</h3>
              <p>High-performance vehicles with more horsepower typically have higher insurance rates due to accident risk.</p>
            </div>
          </b-col>
          <b-col cols="12" md="6" lg="4">
            <div class="info-card">
              <div class="info-icon">⭐</div>
              <h3>Technology</h3>
              <p>Advanced driver assistance features can lower rates, but expensive tech can increase repair costs.</p>
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
        <FaqMain :faq="faqData" />
      </b-container>
    </section>

    <section class="cta-section">
      <b-container>
        <h2>Find the Best Rate for Your Vehicle</h2>
        <p>Compare quotes from top insurers in minutes</p>
        <button class="cta-button" @click="redirectWithParams('https://insure.protect.com', {})">Get Your Free Quote</button>
      </b-container>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.vehicles-page {
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
      margin-bottom: 1rem;
      color: white;
    }

    .hero-subtitle {
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

  .makes-section {
    padding: 60px 0;
  }

  .section-header {
    text-align: center;
    margin-bottom: 3rem;

    h2 {
      margin-bottom: 1rem;
    }
  }

  .makes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .make-card {
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

    .make-logo-wrapper {
      background: $gray-lighter;
      padding: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100px;
    }

    .make-logo {
      max-width: 100px;
      max-height: 60px;
      object-fit: contain;
    }

    .make-logo-placeholder {
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        font-size: 3rem;
        color: $gray;
        opacity: 0.5;
      }
    }

    .make-content {
      padding: 1.5rem;
    }

    .make-name {
      margin-bottom: 0.75rem;
    }

    .make-description {
      margin-bottom: 1rem;
    }

    .learn-more {
      display: inline-block;
      color: $green-accessible;
      font-weight: 600;
      font-size: 1rem;
    }
  }

  .info-section {
    background: $gray-lighter;
    padding: 60px 0;
  }

  .info-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    border: 1px solid $gray-light;
    margin-bottom: 1.5rem;
    height: calc(100% - 1.5rem);

    .info-icon {
      font-size: 2.5rem;
      margin-bottom: 1.25rem;
      color: $blue;
    }

    h3 {
      margin-bottom: 0.75rem;
    }

    p {
      margin-bottom: 0;
    }
  }

  .cta-section {
    background: linear-gradient(135deg, $blue 0%, lighten($blue, 15%) 100%);
    color: white;
    padding: 80px 0;
    text-align: center;

    h2 {
      margin-bottom: 1rem;
      color: white;
    }

    p {
      margin-bottom: 2rem;
      color: white;
    }
  }
}
</style>
