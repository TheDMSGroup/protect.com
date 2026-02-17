<template>
  <div class="breadcrumbs">
    <div class="container">
      <span class="links">
        <NuxtLink to="/car-insurance/discounts/">Discounts</NuxtLink>
        <span class="arrow">></span>
        <NuxtLink :to="`/car-insurance/discounts/bundle`" class="article-slug">Bundle</NuxtLink>
      </span>
    </div>
  </div>
  <div ref="fadeCardContainer">
    <b-container>
      <section class="hero">
        <div class="hero-content">
          <span class="hero-label">Smart Savings</span>
          <h1 class="d-none d-md-block">
            <span>Bundle {{ content.type }} Insurance.</span>
            <span> Save <span class="hero-highlight">Big</span>.</span>
          </h1>
          <p class="lead">
            {{ content.subheader }}
          </p>
        </div>
        <h1 class="d-block d-md-none">
          <span>Bundle {{ content.type }} Insurance.</span>
          <span> Save <span class="hero-highlight">Big</span>.</span>
        </h1>
        <div class="form-content">
          <div class="form-card">
            <h2 class="form-header">Get Your Bundle Quote</h2>
            <p class="form-subtitle">See how much you could save in under 2 minutes</p>
            <BundlesAutoHomeBundleForm :action="content.formAction" @submit-form="handleFormSubmit" />

            <!--Dynmically render component based on bundle type, it tanked pagespeed so using static for now-->
            <!-- <component :is="formComponent" :action="content.formAction" @submit-form="handleFormSubmit" /> -->
          </div>
        </div>
      </section>
    </b-container>

    <section id="savings" class="savings-section">
      <div class="section-header">
        <div class="section-label">The Bundle Advantage</div>
        <h2>{{ upperCaseDescriptor }} Save More When They Bundle</h2>
        <p class="lead">
          Combining your {{ content.type }} isn't just convenient—it's one of the smartest ways to reduce your insurance costs significantly.
        </p>
      </div>

      <div class="savings-grid">
        <div class="savings-card">
          <div class="savings-icon">💰</div>
          <div class="savings-amount">$850</div>
          <h3>Average Annual Savings</h3>
          <p>
            {{ upperCaseDescriptor }} who bundle their {{ content.type }} save an average of {{ content.stats.averageSavings }} per year compared to
            separate policies.
          </p>
        </div>

        <div class="savings-card">
          <div class="savings-icon">📊</div>
          <div class="savings-amount">{{ content.stats.discountRange }}</div>
          <h3>Discount Range</h3>
          <p>
            Most insurance providers offer bundling discounts between {{ content.stats.discountRange }} on your total premiums when you combine
            policies.
          </p>
        </div>

        <div class="savings-card">
          <div class="savings-icon">⏱️</div>
          <div class="savings-amount">78%</div>
          <h3>Customer Satisfaction</h3>
          <p>Nearly 8 out of 10 bundled policyholders report higher satisfaction due to simplified management and lower costs.</p>
        </div>
      </div>
    </section>

    <section id="ways" class="ways-to-save">
      <div class="section-header">
        <div class="section-label">Maximize Your Savings</div>
        <h2>Other Ways to Save on Insurance</h2>
        <p class="lead">Beyond bundling, discover additional opportunities to reduce your insurance premiums.</p>
      </div>

      <b-container>
        <div class="ways-grid">
          <div class="way-card">
            <div class="way-icon">🎖️</div>
            <h3>Military Discounts</h3>
            <p>Active duty, veterans, and military families often qualify for special discounts ranging from 5% to 15%.</p>
          </div>

          <div class="way-card">
            <div class="way-icon">🛡️</div>
            <h3>Safe Driver Rewards</h3>
            <p>Maintain a clean driving record and qualify for safe driver discounts that can save you up to 20% on premiums.</p>
          </div>

          <div class="way-card">
            <div class="way-icon">📱</div>
            <h3>Usage-Based Insurance</h3>
            <p>Install a telematics device or use a mobile app to track your driving habits and save up to 30% with safe driving.</p>
          </div>

          <div class="way-card">
            <div class="way-icon">👥</div>
            <h3>Multiple Drivers</h3>
            <p>Adding multiple drivers to your policy can result in multi-car discounts of 10% to 25% per vehicle.</p>
          </div>

          <div class="way-card">
            <div class="way-icon">🏠</div>
            <h3>Home Security Systems</h3>
            <p>Protect your home with security systems and smoke detectors to earn discounts of 5% to 20% on home insurance.</p>
          </div>

          <div class="way-card">
            <div class="way-icon">💳</div>
            <h3>Pay in Full</h3>
            <p>Pay your annual premium upfront instead of monthly installments to save on administrative fees and earn discounts.</p>
          </div>
        </div>
      </b-container>
    </section>

    <section id="faq" class="faq-section mb-4 pb-4">
      <b-container>
        <div class="section-header">
          <div class="section-label">Common Questions</div>
          <h2>Why Bundle Your Insurance?</h2>
        </div>
        <FaqMain :faq="faqData" />
      </b-container>
    </section>

    <section id="compare" class="cta-section mt-4">
      <div class="cta-content">
        <h2>Ready to Start Saving?</h2>
        <p>Compare quotes from top insurance providers and see how much you could save by bundling your {{ content.type }} insurance today.</p>
        <a :href="content.formAction ?? 'https://insure.protect.com/'" class="cta-btn" @click.prevent="handleFormSubmit">Get Free Quotes</a>
      </div>
    </section>
  </div>
</template>

<script setup>
  import { useBundleComponentLoader } from "@/composables/useBundleComponentLoader.js";
  // import { useScrollFade } from "@/composables/useScrollFade.js";
  import { redirectWithParams } from "@/composables/utils.js";

  const props = defineProps({
    content: {
      type: Object,
      required: true,
    },
  });

  const formComponent = shallowRef(null);

  const loadFormComponent = async () => {
    if (props.content.formComponent) {
      try {
        const componentRef = await useBundleComponentLoader(props.content.formComponent);
        formComponent.value = componentRef;
      } catch (error) {
        console.error(`❌ Failed to load form component ${props.content.formComponent}:`, error);
      }
    }
  };

  loadFormComponent();

  const upperCaseDescriptor = computed(() => {
    return props.content.descriptor.charAt(0).toUpperCase() + props.content.descriptor.slice(1);
  });

  // Define FAQ data structure for composable
  const faqData = computed(() => [
    {
      question: `What are the benefits of bundling ${props.content.type} insurance?`,
      answer: `Bundling offers multiple benefits: significant cost savings averaging ${props.content.stats.averageSavings} per year, simplified policy management with one provider and one renewal date, streamlined claims process, potential for higher coverage limits, and enhanced customer service. Most customers also appreciate having a single point of contact for all their insurance needs.`,
    },
    {
      question: "How much can I actually save by bundling?",
      answer: `Bundling discounts typically range from ${props.content.stats.discountRange} on your total insurance premiums. The average homeowner saves ${props.content.stats.averageSavings} annually, though your actual savings depend on factors like your location, coverage amounts, insurance provider, and claims history. Many customers find the convenience alone worth switching to a bundled policy.`,
    },
    ...(props.content.customFaq || []),
    {
      question: "Will bundling affect my coverage quality?",
      answer:
        "Not at all. Bundling doesn't compromise coverage—you'll receive the same quality protection whether policies are bundled or separate. In fact, many providers offer enhanced coverage options exclusively for bundled customers. You can still customize each policy independently to meet your specific needs while enjoying the discount benefits.",
    },
    {
      question: "What if I need to file a claim on one policy?",
      answer:
        "Filing a claim on one bundled policy works just like separate policies—each policy is handled independently. However, bundled customers often experience faster claims processing because all their information is in one system. Additionally, having both policies with one provider can prevent coverage gaps and ensure smoother coordination if a single incident affects both your auto and home.",
    },
    {
      question: "Can I switch providers if I'm already insured separately?",
      answer:
        "Yes! Switching to bundled coverage is straightforward. Most insurance providers will help you transition both policies, often timing them to coincide with your current renewal dates to avoid cancellation fees. Many customers find the substantial savings make switching well worth any minor hassle. Just make sure you have new coverage in place before canceling existing policies.",
    },
  ]);

  const fadeCardContainer = ref(null);

  // useScrollFade(fadeCardContainer);

  const handleFormSubmit = (formData) => {
    redirectWithParams(props.content.formAction ?? "https://insure.protect.com/", formData);
  };
</script>

<style scoped lang="scss">
  @import "../scss/bundlepages.scss";

  .breadcrumbs {
    position: relative;
    background-color: $white;
    width: 100%;
    bottom: 0;
    height: 80px;
    text-transform: capitalize;
    background-color: $gray-light;
    display: flex;
    align-items: center;

    @include media-breakpoint-down(md) {
      height: auto;
      padding: 1em 0.5em;
      font-size: 0.875em;
    }
    @include media-breakpoint-down(xs) {
      position: relative;
    }

    a {
      color: $gray-dark;
    }

    .container {
      display: flex;
      flex-wrap: wrap;

      .links {
        width: 85%;
        position: relative;

        @include media-breakpoint-down(md) {
          width: 100%;
        }
        .arrow {
          margin: 0 8px;
        }

        .custom-select {
          border: 0;
          background-color: $gray-light;
          color: $gray-dark;
        }
      }
    }
  }
  .container {
    @include media-breakpoint-down(md) {
      padding: 0 1.25rem;
    }

    section {
      .container {
        padding: 0;
      }
    }
  }
  /* Hero Section */
  .hero {
    min-height: 60vh;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 3rem;
    padding: 7rem 0;
    align-items: center;
    position: relative;

    @include media-breakpoint-down(md) {
      margin-top: 0px;
      padding: 3.5rem 0;
      gap: 1.5rem;
      display: flex;
      flex-direction: column;
    }

    .hero-content {
      @include media-breakpoint-down(md) {
        display: flex;
        flex-direction: column;
        order: 2;
      }
    }

    h1 {
      span {
        display: block;
        font-family: inherit;
        font-size: inherit;
        color: inherit;
      }
      .hero-highlight {
        display: inline-block;
        color: $blue-light;
        position: relative;
      }
    }
  }

  // .hero::before {
  //   content: "";
  //   position: absolute;
  //   top: -50%;
  //   right: -20%;
  //   width: 800px;
  //   height: 800px;
  //   background: radial-gradient(circle, $blue 0%, transparent 70%);
  //   opacity: 0.08;
  //   animation: float 20s ease-in-out infinite;
  // }

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
    50% {
      transform: translate(-50px, 50px) rotate(10deg);
    }
  }

  .hero-content {
    position: relative;
    z-index: 2;
    // animation: slideInLeft 1s ease-out;
  }

  .hero-label {
    display: inline-block;
    background: $blue-light;
    color: white;
    padding: 0.5rem 1.2rem;
    border-radius: 30px;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    // animation: slideInLeft 1s ease-out 0.2s backwards;

    @include media-breakpoint-down(md) {
      max-width: 170px;
    }
  }

  h1 {
    color: $blue;
  }

  /* Form Card */
  .form-content {
    --gradientSpacing: -5px;
    overflow: hidden;
    padding: calc(var(--gradientSpacing) * -1);
    border-radius: 26px;

    .form-card {
      min-height: 425px;
      border-radius: 24px;
      box-shadow: 0 20px 60px rgba(10, 22, 40, 0.12);
      position: relative;
      // animation: slideInRight 1s ease-out 0.5s backwards;
      padding: 2rem 2.5rem;
      position: relative;
      background: white;

      @include media-breakpoint-down(md) {
        padding: 1rem;
        min-height: 400px;
      }

      &::before {
        content: "";
        position: absolute;
        width: 200%;
        height: 200%;
        top: -50%;
        left: -50%;
        background: radial-gradient(
          circle at top left,
          lighten($bundle-blue-light, 40%),
          $bundle-blue-light,
          $bundle-blue,
          $blue,
          darken($blue, 10%)
        );
        background-size: 100% 100%;
        border-radius: 100%;
        z-index: -1;
        animation: gradientShift 6s ease infinite 0.5s backwards, fadeInBorder 1s ease-out 1.5s backwards;

        @include media-breakpoint-down(md) {
          width: 1020px;
          height: 1020px;
        }
      }
    }

    .form-card .form-header {
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: $bundle-blue;
      font-size: 2.5rem;
      display: block;
      margin: 10px auto;
    }

    .form-subtitle {
      color: $bundle-gray;
      margin-bottom: 2rem;
      font-size: 1rem;
    }
  }

  /* Savings Section */
  .savings-section {
    padding: 8rem 5%;
    background: $blue;
    color: white;
    position: relative;
    overflow: hidden;

    .lead {
      color: white;
    }
  }

  .savings-section::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, $blue, $bundle-blue-light, $blue);
  }

  .section-header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 5rem;
  }

  .section-label {
    color: $bundle-blue-light;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .savings-section {
    h2 {
      color: white;
    }
    .section-label {
      color: $bundle-blue-lighter;
    }
  }

  h2 {
    color: $blue;
  }

  .savings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 3rem;
    max-width: 1200px;
    margin: 0 auto;

    @include media-breakpoint-down(md) {
      grid-template-columns: 1fr;
    }
  }

  .savings-card {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    padding: 3rem;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.4s;

    &:hover {
      transform: translateY(-8px);
      background: rgba(255, 255, 255, 0.08);
      border-color: $blue-light;
    }

    .savings-icon {
      font-size: 3rem;
      margin-bottom: 1.5rem;
    }
    .savings-amount {
      font-family: "Cantata One", serif;
      font-size: 3.5rem;
      font-weight: 400;
      color: #7caaff;
      margin-bottom: 0.5rem;

      @include media-breakpoint-down(sm) {
        font-size: 2rem;
      }
    }
    h3 {
      color: white;
    }
  }

  .savings-card p {
    color: rgba(255, 255, 255, 0.7);
  }

  /* Ways to Save Section */
  .ways-to-save {
    padding: 8rem 5%;
    background: white;
  }

  .ways-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;

    @include media-breakpoint-down(md) {
      grid-template-columns: 1fr;
    }
  }

  .way-card {
    background: $gray-light;
    padding: 2.5rem;
    border-radius: 16px;
    transition: all 0.3s;
    border: 2px solid transparent;

    &:hover {
      transform: translateY(-5px);
      border-color: $blue;
      box-shadow: 0 12px 32px rgba(12, 44, 103, 0.1);
    }

    .way-icon {
      width: 60px;
      height: 60px;
      background: lighten($bundle-blue-lighter, 3%);
      border: 2px solid $blue-light;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
    }

    h3 {
      margin-bottom: 1rem;
      color: $blue;
    }

    p {
      color: $bundle-gray;
      line-height: 1.6;
    }
  }

  /* CTA Section */
  .cta-section {
    padding: 8rem 5%;
    background: $blue;
    position: relative;
    overflow: hidden;
  }

  .cta-section::before {
    content: "";
    position: absolute;
    bottom: -50%;
    left: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, $green 0%, transparent 70%);
    opacity: 0.1;
  }

  .cta-content {
    max-width: 700px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    z-index: 2;
  }

  .cta-content h2 {
    color: white;
  }

  .cta-content p {
    color: rgba(255, 255, 255, 0.8);
  }

  .cta-btn {
    display: inline-block;
    padding: 1.5rem 4rem;
    background: $blue-light;
    color: white;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 700;
    font-size: 1.1rem;
    transition: all 0.3s;
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 0 12px 32px rgba(0, 102, 204, 0.4);

    @include media-breakpoint-down(sm) {
      padding: 1.2rem 3rem;
      font-size: 1rem;
    }

    &:hover {
      background: lighten($blue-light, 5%);
      box-shadow: 0 16px 40px rgba(0, 102, 204, 0.5);
      transform: translateY(-2px);
    }
  }
</style>
