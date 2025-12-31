<template>
  <div ref="fadeCardContainer">
    <b-container>
      <section class="hero">
        <div class="hero-content">
          <span class="hero-label">Smart Savings</span>
          <h1>
            <span>Bundle {{ content.type }}.</span>
            <span> Save <span class="hero-highlight">Big</span>.</span>
          </h1>
          <p class="hero-subtitle">
            {{ content.subheader }}
          </p>
        </div>

        <div class="form-card">
          <div class="form-content">
            <h5 class="form-header">Get Your Bundle Quote</h5>
            <p class="form-subtitle">See how much you could save in under 2 minutes</p>
            <component :is="formComponent" :action="content.formAction" @submit-form="handleFormSubmit" />
          </div>
        </div>
      </section>
    </b-container>

    <section id="savings" class="savings-section">
      <div class="section-header">
        <div class="section-label">The Bundle Advantage</div>
        <h2 class="section-title">{{ upperCaseDescriptor }} Save More When They Bundle</h2>
        <p class="section-description">
          Combining your {{ content.type }} isn't just convenient—it's one of the smartest ways to reduce your insurance costs significantly.
        </p>
      </div>

      <div class="savings-grid">
        <div class="savings-card fade-in">
          <div class="savings-icon">💰</div>
          <div class="savings-amount">$850</div>
          <h3>Average Annual Savings</h3>
          <p>
            {{ upperCaseDescriptor }} who bundle their {{ content.type }} save an average of {{ content.stats.averageSavings }} per year compared to
            separate policies.
          </p>
        </div>

        <div class="savings-card fade-in">
          <div class="savings-icon">📊</div>
          <div class="savings-amount">{{ content.stats.discountRange }}</div>
          <h3>Discount Range</h3>
          <p>
            Most insurance providers offer bundling discounts between {{ content.stats.discountRange }} on your total premiums when you combine
            policies.
          </p>
        </div>

        <div class="savings-card fade-in">
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
        <h2 class="section-title">Other Ways to Save on Insurance</h2>
        <p class="section-description">Beyond bundling, discover additional opportunities to reduce your insurance premiums.</p>
      </div>

      <div class="ways-grid">
        <div class="way-card fade-in">
          <div class="way-icon">🎖️</div>
          <h3>Military Discounts</h3>
          <p>Active duty, veterans, and military families often qualify for special discounts ranging from 5% to 15%.</p>
        </div>

        <div class="way-card fade-in">
          <div class="way-icon">🛡️</div>
          <h3>Safe Driver Rewards</h3>
          <p>Maintain a clean driving record and qualify for safe driver discounts that can save you up to 20% on premiums.</p>
        </div>

        <div class="way-card fade-in">
          <div class="way-icon">📱</div>
          <h3>Usage-Based Insurance</h3>
          <p>Install a telematics device or use a mobile app to track your driving habits and save up to 30% with safe driving.</p>
        </div>

        <div class="way-card fade-in">
          <div class="way-icon">👥</div>
          <h3>Multiple Drivers</h3>
          <p>Adding multiple drivers to your policy can result in multi-car discounts of 10% to 25% per vehicle.</p>
        </div>

        <div class="way-card fade-in">
          <div class="way-icon">🏠</div>
          <h3>Home Security Systems</h3>
          <p>Protect your home with security systems and smoke detectors to earn discounts of 5% to 20% on home insurance.</p>
        </div>

        <div class="way-card fade-in">
          <div class="way-icon">💳</div>
          <h3>Pay in Full</h3>
          <p>Pay your annual premium upfront instead of monthly installments to save on administrative fees and earn discounts.</p>
        </div>
      </div>
    </section>

    <section id="faq" class="faq-section">
      <div class="section-header">
        <div class="section-label">Common Questions</div>
        <h2 class="section-title">Why Bundle Your Insurance?</h2>
      </div>
      <b-container>
        <FaqAccordion :content="content" />
      </b-container>
    </section>

    <section id="compare" class="cta-section">
      <div class="cta-content">
        <h2>Ready to Start Saving?</h2>
        <p>Compare quotes from top insurance providers and see how much you could save by bundling your {{ content.type }} insurance today.</p>
        <a href="#" class="cta-btn" @click.prevent="handleFormSubmit">Get Free Quotes</a>
      </div>
    </section>
  </div>
</template>

<script setup>
  import { useBundleComponentLoader } from "@/composables/useBundleComponentLoader.js";
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

  const fadeCardContainer = ref(null);

  const handleFormSubmit = (formData) => {
    redirectWithParams(props.content.formAction ?? "https://insure.protect.com/", formData);
  };

  onMounted(() => {
    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Find all fade-in elements across the entire component
    if (fadeCardContainer.value) {
      fadeCardContainer.value.querySelectorAll(".fade-in").forEach((el) => {
        observer.observe(el);
      });
    }
  });

  // // Smooth scrolling
  // document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  //   anchor.addEventListener("click", function (e) {
  //     e.preventDefault();
  //     const target = document.querySelector(this.getAttribute("href"));
  //     if (target) {
  //       target.scrollIntoView({
  //         behavior: "smooth",
  //         block: "start",
  //       });
  //     }
  //   });
  // });
</script>

<style scoped lang="scss">
  @import "../scss/bundlepages.scss";

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
    animation: slideInLeft 1s ease-out;
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
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
    animation: slideInLeft 1s ease-out 0.2s backwards;

    @include media-breakpoint-down(md) {
      max-width: 170px;
    }
  }

  h1 {
    font-family: "Cantata One", serif;
    font-weight: 400;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    color: $blue;
    animation: slideInLeft 1s ease-out 0.3s backwards;
  }

  .hero-subtitle {
    font-size: 1.3rem;
    color: $bundle-gray;
    margin-bottom: 3rem;
    line-height: 1.6;
    animation: slideInLeft 1s ease-out 0.4s backwards;
  }

  /* Form Card */
  .form-card {
    background: white;
    padding: 2rem;
    min-height: 457px;
    border-radius: 24px;
    box-shadow: 0 20px 60px rgba(10, 22, 40, 0.12);
    position: relative;
    animation: slideInRight 1s ease-out 0.5s backwards;

    @include media-breakpoint-down(md) {
      padding: 2rem 1.5rem;
    }

    --gradientSpacing: -5px;

    .form-content::before {
      content: "";
      position: absolute;
      top: var(--gradientSpacing);
      left: var(--gradientSpacing);
      right: var(--gradientSpacing);
      bottom: var(--gradientSpacing);
      background: linear-gradient(120deg, $bundle-blue-light, darken($bundle-blue, 10%));
      background-size: 200% 200%;
      border-radius: 28px;
      z-index: -1;
      animation: gradientShift 6s ease infinite alternate 0.5s backwards, fadeInBorder 1s ease-out 1.5s backwards;
    }
  }

  @keyframes fadeInBorder {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 100% 0%;
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .form-card .form-header {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: $bundle-blue;
    display: block;
    margin: 10px auto;
  }

  .form-subtitle {
    color: $bundle-gray;
    margin-bottom: 2rem;
    font-size: 1rem;
  }

  /* Savings Section */
  .savings-section {
    padding: 8rem 5%;
    background: $blue;
    color: white;
    position: relative;
    overflow: hidden;

    .section-description {
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
    .section-title {
      color: white;
    }
    .section-label {
      color: $bundle-blue-lighter;
    }
  }

  .section-title {
    font-family: "Cantata One", serif;
    font-weight: 400;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    color: $blue;
  }

  .section-description {
    font-size: 1.2rem;
    line-height: 1.7;
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
        font-size: 3rem;
      }
    }
    h3 {
      margin-bottom: 1rem;
      color: white;
      font-family: inherit;
      font-weight: bold !important;
    }
  }

  .savings-card p {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
  }

  /* Ways to Save Section */
  .ways-to-save {
    padding: 8rem 5%;
    background: white;
  }

  .ways-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
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
    font-family: "Cantata One", serif;
    font-weight: 400;
    color: white;
    margin-bottom: 2rem;
    line-height: 1.2;
  }

  .cta-content p {
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 3rem;
    line-height: 1.7;
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

  /* Responsive */
  @media (max-width: 968px) {
    .hero {
      grid-template-columns: 1fr;
      padding: 4rem 5%;
    }

    .section-title {
    }

    .savings-amount {
    }
  }

  /* Scroll Animations */
  .fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s, transform 0.8s;
  }

  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>
