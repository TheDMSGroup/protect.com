<template>
  <main ref="fadeCardContainer">
    <section class="hero">
      <div class="hero-content">
        <span class="hero-label">Smart Savings</span>
        <h1>Bundle {{ content.type }}.<br />Save <span class="hero-highlight">Big</span>.</h1>
        <p class="hero-subtitle">
          {{ content.subheader }}
        </p>
      </div>

      <div class="form-card">
        <h3>Get Your Bundle Quote</h3>
        <p class="form-subtitle">See how much you could save in under 2 minutes</p>

        <component :is="formComponent" v-if="formComponent" :action="content.formAction" @submit-form="handleFormSubmit" />
      </div>
    </section>

    <section class="savings-section" id="savings">
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

    <section class="ways-to-save" id="ways">
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

    <section ref="faqSection" class="faq-section" id="faq">
      <div class="section-header">
        <div class="section-label">Common Questions</div>
        <h2 class="section-title">Why Bundle Your Insurance?</h2>
      </div>

      <div class="faq-container">
        <div class="faq-item">
          <div class="faq-question">What are the benefits of bundling {{ content.type }} insurance?</div>
          <div class="faq-answer">
            <p>
              Bundling offers multiple benefits: significant cost savings averaging {{ content.stats.averageSavings }} per year, simplified policy
              management with one provider and one renewal date, streamlined claims process, potential for higher coverage limits, and enhanced
              customer service. Most customers also appreciate having a single point of contact for all their insurance needs.
            </p>
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question">How much can I actually save by bundling?</div>
          <div class="faq-answer">
            <p>
              Bundling discounts typically range from {{ content.stats.discountRange }} on your total insurance premiums. The average homeowner saves
              {{ content.stats.averageSavings }} annually, though your actual savings depend on factors like your location, coverage amounts,
              insurance provider, and claims history. Many customers find the convenience alone worth switching to a bundled policy.
            </p>
          </div>
        </div>

        <!-- Most faq in this page can be generic, but we can pass custom ones and render if we have them -->
        <div v-for="(faq, index) in content.customFaq" :key="index" class="faq-item">
          <div class="faq-question">{{ faq.question }}</div>
          <div class="faq-answer">
            <p>
              {{ faq.answer }}
            </p>
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question">Will bundling affect my coverage quality?</div>
          <div class="faq-answer">
            <p>
              Not at all. Bundling doesn't compromise coverage—you'll receive the same quality protection whether policies are bundled or separate. In
              fact, many providers offer enhanced coverage options exclusively for bundled customers. You can still customize each policy
              independently to meet your specific needs while enjoying the discount benefits.
            </p>
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question">What if I need to file a claim on one policy?</div>
          <div class="faq-answer">
            <p>
              Filing a claim on one bundled policy works just like separate policies—each policy is handled independently. However, bundled customers
              often experience faster claims processing because all their information is in one system. Additionally, having both policies with one
              provider can prevent coverage gaps and ensure smoother coordination if a single incident affects both your auto and home.
            </p>
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question">Can I switch providers if I'm already insured separately?</div>
          <div class="faq-answer">
            <p>
              Yes! Switching to bundled coverage is straightforward. Most insurance providers will help you transition both policies, often timing
              them to coincide with your current renewal dates to avoid cancellation fees. Many customers find the substantial savings make switching
              well worth any minor hassle. Just make sure you have new coverage in place before canceling existing policies.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section" id="compare">
      <div class="cta-content">
        <h2>Ready to Start Saving?</h2>
        <p>Compare quotes from top insurance providers and see how much you could save by bundling your {{ content.type }} insurance today.</p>
        <a href="#" class="cta-btn" @click.prevent="handleFormSubmit">Get Free Quotes</a>
      </div>
    </section>
  </main>
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
  const faqSection = ref(null);

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

    if (faqSection.value) {
      // FAQ Accordion
      faqSection.value.querySelectorAll(".faq-question").forEach((question) => {
        question.addEventListener("click", () => {
          const item = question.parentElement;
          const isActive = item.classList.contains("active");

          // Close all items
          faqSection.value.querySelectorAll(".faq-item").forEach((faq) => {
            faq.classList.remove("active");
          });

          // Open clicked item if it wasn't active
          if (!isActive) {
            item.classList.add("active");
          }
        });
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

  console.log("BundlePage content:", props.content);
</script>

<style scoped lang="scss">
  @import "../scss/bundlepages.scss";
  /* Hero Section */
  .hero {
    margin-top: 80px;
    min-height: 90vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    padding: 6rem 5%;
    align-items: center;
    position: relative;
    overflow: hidden;

    @include media-breakpoint-down(md) {
      margin-top: 0px;
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
  }

  h1 {
    font-family: "Cantata One", serif;
    font-weight: 400;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    color: $blue;
    animation: slideInLeft 1s ease-out 0.3s backwards;
  }

  .hero-highlight {
    color: $blue-light;
    position: relative;
    display: inline-block;
    font-family: inherit;
    font-size: inherit;
  }

  .hero-subtitle {
    font-size: 1.3rem;
    color: $gray;
    margin-bottom: 3rem;
    line-height: 1.6;
    animation: slideInLeft 1s ease-out 0.4s backwards;
  }

  /* Form Card */
  .form-card {
    background: white;
    padding: 3rem;
    border-radius: 24px;
    box-shadow: 0 20px 60px rgba(10, 22, 40, 0.12);
    position: relative;
    z-index: 2;
    animation: slideInRight 1s ease-out 0.5s backwards;

    @include media-breakpoint-down(md) {
      padding: 2rem 1.5rem;
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

  .form-card h3 {
    font-family: "Cantata One", serif;
    font-weight: 400;
    margin-bottom: 0.5rem;
    color: $blue;
  }

  .form-subtitle {
    color: $gray;
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
    background: linear-gradient(90deg, $blue, $blue-light, $blue);
  }

  .section-header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 5rem;
  }

  .section-label {
    color: $blue-light;
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
    background: rgba(255, 255, 255, 0.25);
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
      color: $blue;
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
      background: $blue-lighter;
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
      color: $gray;
      line-height: 1.6;
    }
  }

  /* FAQ Section */
  .faq-section {
    padding: 8rem 5%;
    background: linear-gradient(180deg, $gray-light 0%, white 100%);
  }

  .faq-container {
    max-width: 900px;
    margin: 0 auto;
  }

  .faq-item {
    background: white;
    border-radius: 16px;
    margin-bottom: 1.5rem;
    overflow: hidden;
    border: 2px solid #f3f4f6;
    transition: all 0.3s;
  }

  .faq-item:hover {
    border-color: $blue;
  }

  .faq-question {
    padding: 2rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    color: $blue;
    user-select: none;
  }

  .faq-question::after {
    content: "+";
    font-size: 2rem;
    color: $blue;
    transition: transform 0.3s;
  }

  .faq-item.active .faq-question::after {
    transform: rotate(45deg);
  }

  .faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease-out, padding 0.4s ease-out;
    padding: 0 2rem;
  }

  .faq-item.active .faq-answer {
    max-height: 500px;
    padding: 0 2rem 2rem 2rem;
  }

  .faq-answer p {
    color: $gray;
    line-height: 1.8;
    font-size: 1.05rem;
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
