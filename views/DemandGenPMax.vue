<template>
  <div class="lp-layout">
    <!-- Hero Section (Light Background) -->
    <section class="dg-hero dg-light-section mt-0">
      <div class="container">
        <div class="dg-hero-wrapper">
          <div class="dg-hero-content">
            <h1 class="dg-headline">
              The Smarter Way to Protect Your Car and Your Wallet
            </h1>
            <p class="dg-subheadline">
              Save as much as $900/year by comparing rates
            </p>

            <!-- ZIP Code Input -->
            <div class="dg-zip-input-wrapper">
              <input
                type="text"
                class="dg-zip-input"
                placeholder="Enter Your ZIP Code"
                aria-label="Enter your ZIP code"
              />
              <button class="dg-cta-btn dg-cta-primary">
                Compare Free Quotes
              </button>
            </div>

            <!-- Trust Line -->
            <p class="dg-trust-line">
              No junk mail. No spam calls. Free quotes.
            </p>
          </div>

          <!-- Hero Graphics - Brand Icons Grid -->
          <div class="dg-hero-graphics">
            <p class="graphic-header">
              Compare Rates from Trusted&nbsp;Providers
            </p>
            <div class="dg-icon-grid">
              <a
                @click.prevent="
                  redirectWithParams('https://insure.protect.com', {})
                "
                href="#"
                class="dg-icon-card"
              >
                <div class="dg-icon">
                  <img src="/assets/partners/geico-icon.gif" alt="Geico Logo" />
                </div>
                <div class="dg-icon-text-group">
                  <p class="dg-icon-partner">Geico</p>
                  <p class="dg-icon-rating">★★★★★</p>
                </div>
              </a>

              <a
                @click.prevent="
                  redirectWithParams('https://insure.protect.com', {})
                "
                href="#"
                class="dg-icon-card"
              >
                <div class="dg-icon">
                  <img
                    src="/assets/partners/progressive-icon.gif"
                    alt="Progressive Logo"
                  />
                </div>
                <div class="dg-icon-text-group">
                  <p class="dg-icon-partner">Progressive</p>
                  <p class="dg-icon-rating">★★★★★</p>
                </div>
              </a>

              <a
                @click.prevent="
                  redirectWithParams('https://insure.protect.com', {})
                "
                href="#"
                class="dg-icon-card"
              >
                <div class="dg-icon dg-icon-shield">
                  <img
                    src="/assets/partners/statefarm-icon.gif"
                    alt="State Farm Icon"
                  />
                </div>
                <div class="dg-icon-text-group">
                  <p class="dg-icon-partner">State Farm</p>
                  <p class="dg-icon-rating">★★★★★</p>
                </div>
              </a>

              <a
                @click.prevent="
                  redirectWithParams('https://insure.protect.com', {})
                "
                href="#"
                class="dg-icon-card"
              >
                <div class="dg-icon">
                  <img
                    src="/assets/partners/liberty-icon.gif"
                    alt="Liberty Icon"
                  />
                </div>
                <div class="dg-icon-text-group">
                  <p class="dg-icon-partner">Liberty Mutual</p>
                  <p class="dg-icon-rating">★★★★★</p>
                </div>
              </a>

              <a
                @click.prevent="
                  redirectWithParams('https://insure.protect.com', {})
                "
                href="#"
                class="dg-icon-card"
              >
                <div class="dg-icon">
                  <img
                    src="/assets/partners/nationwide-icon.gif"
                    alt="Nationwide Logo"
                  />
                </div>
                <div class="dg-icon-text-group">
                  <p class="dg-icon-partner">Nationwide</p>
                  <p class="dg-icon-rating">★★★★★</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Value Proposition Section (Light Background) -->
    <section class="dg-light-section dg-value-props">
      <div class="container">
        <div class="dg-value-intro text-center mb-5">
          <h2>No Headaches, Just Free Quotes</h2>
          <p>
            Americans overpay for car insurance by an estimated $21 billion per
            year, let's keep some of that money in your pocket.
          </p>
        </div>
        <div class="dg-value-grid">
          <!-- Value Prop 1 -->
          <div class="dg-value-card">
            <div class="dg-value-icon">
              <IconsIdentity />
            </div>
            <h3>Privacy First</h3>
            <p>Your information stays secure with us.</p>
          </div>

          <!-- Value Prop 2 -->
          <div class="dg-value-card">
            <div class="dg-value-icon"><IconsScales /></div>
            <h3>Insurance on Your Terms</h3>
            <p>You're never pressured to switch or buy.</p>
          </div>

          <!-- Value Prop 3 -->
          <div class="dg-value-card">
            <div class="dg-value-icon"><IconsBank /></div>
            <h3>Big Savings</h3>
            <p>
              Our users save as much as <strong>$900/year</strong> by switching.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Dark Contrast Section -->
    <section class="dg-dark-section">
      <div class="container">
        <div class="dg-dark-content">
          <div class="dg-dark-cards">
            <h2>Comprehensive Coverage, Simplified.</h2>
            <p>
              We've done the hard work of vetting 100+ insurance companies so
              you don't have to.
            </p>
          </div>
          <!-- Hero Graphics - Brand Icons Grid -->
          <div class="dg-hero-graphics">
            <div class="dg-icon-grid">
              <a
                @click.prevent="
                  redirectWithParams('https://insure.protect.com', {})
                "
                href="#"
                class="dg-icon-card"
              >
                <div class="dg-icon">
                  <img src="/assets/partners/geico-icon.gif" alt="Geico Logo" />
                </div>
                <div class="dg-icon-text-group">
                  <p class="dg-icon-partner">Geico</p>
                  <p class="dg-icon-rating">★★★★★</p>
                </div>
              </a>

              <a
                @click.prevent="
                  redirectWithParams('https://insure.protect.com', {})
                "
                href="#"
                class="dg-icon-card"
              >
                <div class="dg-icon">
                  <img
                    src="/assets/partners/progressive-icon.gif"
                    alt="Progressive Logo"
                  />
                </div>
                <div class="dg-icon-text-group">
                  <p class="dg-icon-partner">Progressive</p>
                  <p class="dg-icon-rating">★★★★★</p>
                </div>
              </a>

              <a
                @click.prevent="
                  redirectWithParams('https://insure.protect.com', {})
                "
                href="#"
                class="dg-icon-card"
              >
                <div class="dg-icon dg-icon-shield">
                  <img
                    src="/assets/partners/statefarm-icon.gif"
                    alt="State Farm Icon"
                  />
                </div>
                <div class="dg-icon-text-group">
                  <p class="dg-icon-partner">State Farm</p>
                  <p class="dg-icon-rating">★★★★★</p>
                </div>
              </a>

              <a
                @click.prevent="
                  redirectWithParams('https://insure.protect.com', {})
                "
                href="#"
                class="dg-icon-card"
              >
                <div class="dg-icon">
                  <img
                    src="/assets/partners/liberty-icon.gif"
                    alt="Liberty Icon"
                  />
                </div>
                <div class="dg-icon-text-group">
                  <p class="dg-icon-partner">Liberty Mutual</p>
                  <p class="dg-icon-rating">★★★★★</p>
                </div>
              </a>

              <a
                @click.prevent="
                  redirectWithParams('https://insure.protect.com', {})
                "
                href="#"
                class="dg-icon-card"
              >
                <div class="dg-icon">
                  <img
                    src="/assets/partners/nationwide-icon.gif"
                    alt="Nationwide Logo"
                  />
                </div>
                <div class="dg-icon-text-group">
                  <p class="dg-icon-partner">Nationwide</p>
                  <p class="dg-icon-rating">★★★★★</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="steps" class="steps-container">
      <steps
        :steps-config="[
          { text: 'Use our online tool' },
          { text: 'Compare quotes from trusted companies' },
          { text: 'Choose from the best rates available' },
        ]"
      />
    </section>

    <!-- Social Proof / Trustpilot Section (Light Background) -->
    <section class="dg-light-section dg-social-proof">
      <div class="container">
        <h2>Over <span>74 million</span> quotes and counting</h2>
        <div class="dg-review-grid">
          <div class="dg-review-card">
            <div class="dg-stars">★★★★★</div>
            <p class="dg-review-text">"Quick and easy comparison process."</p>
            <p class="dg-review-author">- Verified Customer</p>
          </div>
          <div class="dg-review-card">
            <div class="dg-stars">★★★★★</div>
            <p class="dg-review-text">"Saved me hundreds on my policy."</p>
            <p class="dg-review-author">- Verified Customer</p>
          </div>
          <div class="dg-review-card">
            <div class="dg-stars">★★★★★</div>
            <p class="dg-review-text">"Best comparison tool out there."</p>
            <p class="dg-review-author">- Verified Customer</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Bar / Insurance Brands -->
    <section class="dg-trust-bar">
      <div class="container">
        <p class="subhead text-center">
          We work with 100+ companies to find the best match for you
        </p>
        <div class="col-md-12 col-9 mx-auto">
          <InsuranceBrands :providers-config="insuranceBrands" />
        </div>
      </div>
    </section>

    <!-- Discounts Section -->
    <section class="dg-discounts-section">
      <div class="container">
        <div class="dg-discounts-intro text-center mb-5">
          <h2>Maximize Your Savings</h2>
          <p>
            Take advantage of multiple discounts that could significantly lower
            your rates
          </p>
        </div>
        <div class="dg-discounts-grid">
          <!-- Discount 1 -->
          <div class="dg-discount-card">
            <div class="dg-discount-icon-wrapper">
              <div class="dg-discount-icon">
                <span>up to</span>
                <p>25%</p>
              </div>
            </div>
            <h4>Safe Driver Discount</h4>
            <p>No accidents or violations in the past 3&nbsp;years?</p>
          </div>

          <!-- Discount 2 -->
          <div class="dg-discount-card">
            <div class="dg-discount-icon-wrapper">
              <div class="dg-discount-icon">
                <span>up to</span>
                <p>$250</p>
              </div>
            </div>
            <h4>Bundle & Save</h4>
            <p>
              Combine auto and home insurance policies for significant savings
            </p>
          </div>

          <!-- Discount 3 -->
          <div class="dg-discount-card">
            <div class="dg-discount-icon-wrapper">
              <div class="dg-discount-icon">
                <span>up to</span>
                <p>25%</p>
              </div>
            </div>
            <h4>Multi-Vehicle Discount</h4>
            <p>
              Insure multiple vehicles under one policy and reduce your premium
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Section (Light Background) -->
    <section class="dg-light-section dg-final-cta">
      <div class="container">
        <h2>Ready to start comparing rates?</h2>
        <div class="dg-zip-input-wrapper">
          <input
            type="text"
            class="dg-zip-input"
            placeholder="Enter Your ZIP Code"
            aria-label="Enter your ZIP code"
          />
          <button class="dg-cta-btn dg-cta-primary">See My Free Quotes</button>
        </div>
        <p class="dg-trust-line">No junk mail. No spam calls. Free quotes.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
  import { redirectWithParams } from "@/composables/utils.js";

  const insuranceBrands = [
    { name: "Liberty Mutual Insurance", src: "provider-liberty.png" },
    { name: "Root", src: "provider-root.png" },
    { name: "Allstate", src: "provider-allstate.png" },
    { name: "Farmers", src: "provider-farmers.png" },
    { name: "Nationwide", src: "provider-nationwide.png" },
  ];
</script>

<style scoped lang="scss">
  .lp-layout {
    @include mobile {
      padding: 0 15px;
    }
  }
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Nunito Sans", sans-serif;
    font-weight: 700;
    color: $blue;
  }
  .demand-gen-pmax {
    width: 100%;
  }

  section {
    margin: auto;
  }

  // ============================================
  // SECTIONS - LIGHT/DARK ALTERNATION
  // ============================================
  .dg-light-section {
    background-color: $white;
    padding: 4rem 0;

    @include mobile {
      padding: 2rem 0;
    }
    .dg-value-intro {
      h2 {
        margin-bottom: 2rem;
      }
      p {
        max-width: 600px;
        margin: 0 auto 1rem auto;
      }
    }
  }

  .steps-container {
    margin: 100px auto 50px auto;
    :deep(.steps .step-number) {
      border-right: 2px solid $gray;
    }
    :deep(h2) {
      font-family: "Nunito Sans", sans-serif;
      font-weight: 700;
      font-size: 2.5rem;
      color: $blue;
    }
  }

  .dg-dark-section {
    background-color: darken($blue, 15%);
    color: $white;
    padding: 4rem 0;

    @include mobile {
      padding: 2rem 0;
      margin: 0 -15px;
    }
  }

  // ============================================
  // HERO SECTION
  // ============================================
  .dg-hero {
    text-align: center;
    padding: 6rem 0 2rem;
    // background: lighten($blue-light, 48%);

    @include mobile {
      padding: 0;
    }
  }

  .dg-hero-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;

    @include tablet {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  .dg-hero-content {
    text-align: left;

    @include tablet {
      text-align: center;
    }
  }

  .dg-hero-graphics {
    position: relative;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("/assets/states/outlines/icon-shield.png") no-repeat center
      center / contain;

    flex-wrap: wrap;

    @include tablet {
      display: none;
    }

    .graphic-header {
      min-width: 100%;
      flex-basis: 100%;
      font-size: 1.15rem;
      margin: 0.5rem auto 2rem auto;
    }
  }

  .dg-icon-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    width: 100%;
    max-width: 350px;
    align-items: center;
    justify-content: center;
  }

  .dg-icon-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
    animation: fadeIn 0.6s ease forwards;
    padding: 1rem 1.25rem 1rem 0.75rem;
    background-color: $white;
    border-radius: 16px;
    border: 2px solid rgba(12, 44, 103, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    min-width: 200px;

    &:hover {
      border-color: rgba(12, 44, 103, 0.3);
      transform: translateY(-4px);
    }

    &:hover {
      border-color: rgba(12, 44, 103, 0.4);
    }
    &:nth-child(5) {
      max-width: 200px;
      margin: auto;
      grid-column: 1 / -1;
    }
    .dg-icon-partner {
      color: black;
    }
    .dg-icon-rating {
      color: $green;
    }
    .dg-icon-partner,
    .dg-icon-rating {
      font-size: 0.85rem;
      font-weight: 700;
      margin: 0;
    }
  }

  .dg-icon {
    width: 70px;
    height: 70px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    flex-shrink: 0;

    svg {
      width: 100%;
    }
  }

  .dg-icon-text-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.15rem;
    flex: 0 0 auto;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .dg-headline {
    font-size: 3rem;
    font-weight: 700;
    color: $blue;
    line-height: 1.2;
    margin-bottom: 1rem;

    @include tablet {
      font-size: 2.5rem;
    }

    @include mobile {
      font-size: 1.75rem;
    }
  }

  .dg-subheadline {
    font-size: 1.25rem;
    color: $gray-dark;
    margin-bottom: 2rem;

    @include mobile {
      font-size: 1rem;
    }
  }

  // ============================================
  // ZIP CODE INPUT & CTA
  // ============================================
  .dg-zip-input-wrapper {
    display: flex;
    gap: 0.75rem;
    max-width: 600px;
    margin: 0 auto 1.5rem;

    @include mobile {
      flex-direction: column;
    }
  }

  .dg-zip-input {
    flex: 1;
    padding: 1rem;
    border: 2px solid $gray-medium;
    border-radius: 4px;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: $blue;
      box-shadow: 0 0 0 3px rgba(12, 44, 103, 0.1);
    }

    @include mobile {
      padding: 0.875rem;
    }
  }

  .dg-cta-btn {
    padding: 1rem 2rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    @include mobile {
      padding: 0.875rem 1.5rem;
      font-size: 0.9rem;
    }
  }

  .dg-cta-primary {
    background-color: $green-accessible;
    color: $white;

    &:hover {
      background-color: darken($green-accessible, 10%);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(31, 122, 78, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }

  // ============================================
  // TRUST LINE
  // ============================================
  .dg-trust-line {
    font-size: 0.95rem;
    color: $gray-dark;
    margin-bottom: 0;

    @include mobile {
      font-size: 0.85rem;
    }
  }
  h2 {
    font-size: 2.15rem;
  }
  // ============================================
  // TRUST BAR
  // ============================================
  .dg-trust-bar {
    margin-top: 3rem;
    padding: 2rem 0;
    text-align: center;
    margin-left: auto;

    @include mobile {
      padding: 0rem 0;
    }

    :deep(.brands) {
      margin: 0 auto;
    }
  }

  // ============================================
  // VALUE PROPOSITIONS
  // ============================================
  .dg-value-props {
    padding: 5rem 0;

    @include mobile {
      padding: 0rem 0;
    }
  }

  .dg-value-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    @include tablet {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    @include mobile {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }

  .dg-value-card {
    text-align: center;
    padding: 2rem;
  }

  .dg-value-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: block;

    .elixr-icon {
      height: 100px;
      width: 100px;
      fill: $blue;

      :deep(.cls-1) {
        fill: darken($blue, 15%);
      }
      :deep(.cls-2) {
        opacity: 0.9;
      }
      :deep(.cls-2 .cls-1) {
        fill: $blue-light;
      }
    }
  }

  .dg-value-card h3 {
    font-size: 1.5rem;
    color: $blue;
    margin-bottom: 0.75rem;
    font-weight: 600;
  }

  .dg-value-card p {
    color: $gray-dark;
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0;
  }

  // ============================================
  // DARK SECTION
  // ============================================
  .dg-dark-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 6rem;
    align-items: center;

    .dg-hero-graphics {
      background: linear-gradient(
          rgba(4.0173913043, 14.7304347826, 34.4826086957, 0.75),
          rgba(4.0173913043, 14.7304347826, 34.4826086957, 0.75)
        ),
        url("/assets/states/outlines/icon-shield.png") no-repeat center center /
          contain;
    }

    @include media-breakpoint-down(md) {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    h2 {
      color: $white;
    }
    p:not(.dg-icon-partner):not(.dg-icon-rating) {
      max-width: 500px;
      color: $white;
    }
  }

  .dg-dark-text h2 {
    font-size: 2.5rem;
    line-height: 1.3;
    margin-bottom: 1rem;
    font-weight: 700;

    @include tablet {
      font-size: 2rem;
    }
  }

  .dg-dark-text p {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  // ============================================
  // SOCIAL PROOF
  // ============================================
  .dg-social-proof {
    text-align: center;
    padding: 5rem 0;

    @include mobile {
      padding: 2rem 0;
    }

    h2 {
      font-size: 2.5rem;
      color: $blue;
      margin-bottom: 3rem;

      span {
        color: $blue-light;
        font-weight: 800;
        font-size: inherit;
      }

      @include mobile {
        font-size: 1.75rem;
      }
    }
  }

  .dg-review-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    @include media-breakpoint-down(md) {
      grid-template-columns: 1fr;
    }
  }

  .dg-review-card {
    padding: 2rem;
    border-radius: 8px;
    border: 3px solid darken($blue, 4%);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }

  .dg-stars {
    color: $blue-light;
    font-size: 1.25rem;
    margin-bottom: 1rem;
    display: block;
  }

  .dg-review-text {
    font-size: 1.25rem;
    color: $blue;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.6;
    font-style: italic;
  }

  .dg-review-author {
    font-size: 0.9rem;
    color: $gray-dark;
    font-weight: 500;
    margin: 0;
  }

  // ============================================
  // DISCOUNTS SECTION
  // ============================================
  .dg-discounts-section {
    background-color: $white;
    padding: 4rem 0;

    @include mobile {
      padding: 0rem 0;
    }

    .dg-discounts-intro {
      h2 {
        margin-bottom: 1rem;
        color: darken($blue, 10%);
      }
      p {
        font-size: 1.1rem;
        color: darken($gray-dark, 10%);
        max-width: 700px;
        margin: 0 auto;
        font-weight: 500;
      }
    }
  }

  .dg-discounts-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    max-width: 1200px;
    margin: 0 auto;

    @include media-breakpoint-down(md) {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  .dg-discount-card {
    padding: 2rem 1.5rem;
    text-align: center;
    transition: all 0.3s ease;

    &:hover,
    &.is-active {
      transform: translateY(-4px);
    }
    &:nth-of-type(2) {
      border-left: 2px solid $gray-medium;
      border-right: 2px solid $gray-medium;

      @include media-breakpoint-down(md) {
        border: none;
      }
    }

    h4 {
      font-size: 1.3rem;
      font-weight: 800;
      color: darken($blue, 10%);
      margin: 1.25rem 0 0.75rem;
    }

    p {
      font-size: 1rem;
      color: darken($gray-dark, 5%);
      margin: 0;
      line-height: 1.6;
      font-weight: 400;
    }
  }

  @keyframes spin {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  .dg-discount-icon-wrapper {
    position: relative;
    width: 80px;
    height: 80px;
    margin: 0 auto;

    // &::before {
    //   content: "";
    //   position: absolute;
    //   top: 50%;
    //   left: 50%;
    //   width: 135%;
    //   height: 135%;
    //   z-index: 0;
    //   // background: conic-gradient(
    //   //     from 0deg,
    //   //     rgba($blue, 1) 0%,
    //   //     rgba($blue-light, 1) 25%,
    //   //     rgba($green, 1) 50%,
    //   //     rgba(lighten($green, 10%), 1) 75%,
    //   //     rgba($blue, 1) 100%
    //   //   ),
    //   //   radial-gradient(
    //   //     circle,
    //   //     transparent 50%,
    //   //     rgba($white, 0.2) 60%,
    //   //     rgba($white, 0.7) 80%,
    //   //     $white 92%
    //   //   );
    //   // opacity: 0;
    //   // transform: translate(-50%, -50%) rotate(0deg);
    //   // filter: blur(8px);
    //   // transition: opacity 0.3s ease;
    //   pointer-events: none;
    //   border-radius: 50%;
    // }

    .dg-discount-card:hover &,
    .dg-discount-card.is-active & {
      &::before {
        opacity: 0.7;
        animation: spin 5s linear infinite;
      }
    }
  }

  .dg-discount-icon {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
    background: darken($blue, 10%);
    color: $white;
    border-radius: 20%;
    position: relative;
    z-index: 1;

    p {
      color: $white;
      font-size: 1.55rem;
      font-weight: 800;
      transition: color 0.3s ease;
    }

    span {
      text-transform: uppercase;
      font-size: 0.75rem;
      font-weight: 600;
      margin-top: 10px;
      margin-bottom: -10px;
    }

    .dg-discount-card:hover &,
    .dg-discount-card.is-active & {
      transform: scale(1.1);

      p {
        // color: lighten($green, 10%);
      }
    }
    &::after {
      content: "$";
      position: absolute;
      width: 100%;
      height: 100%;
      top: -20%;
      left: 0;
      z-index: -1;
      color: $white;
      opacity: 0.1;
      font-size: 5rem;
      font-weight: 800;
      transform: rotate(-15deg);
    }
  }

  // ============================================
  // FINAL CTA
  // ============================================
  .dg-final-cta {
    text-align: center;
    padding: 5rem 0;
    background: linear-gradient(
      165deg,
      rgba(12, 44, 103, 0.08) 0%,
      rgba(59, 84, 186, 0.25) 100%
    );

    h2 {
      font-size: 2.5rem;
      color: $blue;
      margin-bottom: 2rem;

      @include mobile {
        font-size: 1.75rem;
      }
    }
  }

  @include mobile {
    div:has(.dg-hero-graphics) {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;

      .dg-hero-graphics {
        height: auto;
        width: 100%;
      }

      .dg-icon-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        padding: 0 15px;
        width: 100%;
        max-width: 400px;
      }
      .dg-icon-card {
        min-width: auto;
        width: 100%;
        left: 0;
        top: 0;
        grid-row: auto !important;
        gap: 0;
        padding: 10px;
        flex-direction: column;

        .dg-icon {
          width: auto;
          height: auto;
          max-width: 70px;
          max-height: 70px;
        }
        .dg-icon-partner {
          padding-top: 10px;
        }
      }
    }
  }
</style>
