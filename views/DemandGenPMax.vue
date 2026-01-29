<template>
  <div class="demand-gen-pmax">
    <!-- Hero Section (Light Background) -->
    <section class="dg-hero dg-light-section">
      <div class="container">
        <div class="dg-hero-wrapper">
          <div class="dg-hero-content">
            <h1 class="dg-headline">
              The Smarter Way to Protect Your Car and Your Wallet
            </h1>
            <p class="dg-subheadline">
              Save Over $900 Per Year by Comparing Rates from Top Companies
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
                See My Free Quotes
              </button>
            </div>

            <!-- Trust Line -->
            <p class="dg-trust-line">
              No junk mail. No spam calls. Free quotes.
            </p>
          </div>

          <!-- Hero Graphics - Brand Icons Grid -->
          <div class="dg-hero-graphics">
            <div class="dg-icon-grid">
              <div class="dg-icon-card">
                <div class="dg-icon">
                  <img src="/assets/partners/geico-icon.gif" alt="Geico Logo" />
                </div>
                <div class="dg-icon-text-group">
                  <p class="dg-icon-partner">Geico</p>
                  <p class="dg-icon-rating">★★★★★</p>
                </div>
              </div>

              <div class="dg-icon-card">
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
              </div>

              <div class="dg-icon-card">
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
              </div>

              <div class="dg-icon-card">
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
              </div>

              <div class="dg-icon-card">
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
              </div>
            </div>
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
        <InsuranceBrands :providers-config="insuranceBrands" />
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
            <h3>Instant Savings</h3>
            <p>
              Our users save as much as <strong>$940/year</strong> by switching.
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
              We've done the hard work of vetting 200+ insurance companies so
              you don't have to.
            </p>
          </div>
          <!-- Hero Graphics - Brand Icons Grid -->
          <div class="dg-hero-graphics">
            <div class="dg-icon-grid">
              <div class="dg-icon-card">
                <div class="dg-icon">
                  <img src="/assets/partners/geico-icon.gif" alt="Geico Logo" />
                </div>
                <div class="dg-icon-text-group">
                  <p class="dg-icon-partner">Geico</p>
                  <p class="dg-icon-rating">★★★★★</p>
                </div>
              </div>

              <div class="dg-icon-card">
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
              </div>

              <div class="dg-icon-card">
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
              </div>

              <div class="dg-icon-card">
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
              </div>

              <div class="dg-icon-card">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Proof / Trustpilot Section (Light Background) -->
    <section class="dg-light-section dg-social-proof">
      <div class="container">
        <h2>Over 74 million quotes and counting</h2>
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
  const insuranceBrands = [
    { name: "Liberty Mutual Insurance", src: "provider-liberty.png" },
    { name: "Root", src: "provider-root.png" },
    { name: "Allstate", src: "provider-allstate.png" },
    { name: "Farmers", src: "provider-farmers.png" },
    { name: "Insurify", src: "provider-insurify.png" },
  ];
</script>

<style scoped lang="scss">
  .demand-gen-pmax {
    width: 100%;
  }

  section {
    margin: 50px auto;
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

  .dg-dark-section {
    background-color: #001f3f;
    color: $white;
    padding: 4rem 0;

    @include mobile {
      padding: 2rem 0;
    }
  }

  // ============================================
  // HERO SECTION
  // ============================================
  .dg-hero {
    text-align: center;
    padding: 6rem 0 4rem;
    background: lighten($blue-light, 48%);

    @include mobile {
      padding: 3rem 0 2rem;
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

    @include tablet {
      display: none;
    }
  }

  .dg-icon-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
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
    box-shadow: 0 4px 16px rgba(12, 44, 103, 0.1);

    &:hover {
      border-color: rgba(12, 44, 103, 0.3);
      transform: translateY(-4px);
    }

    &:nth-child(1) {
      animation-delay: 0.1s;
      left: 20px;
    }
    &:nth-child(2) {
      animation-delay: 0.2s;
      left: 50px;
    }
    &:nth-child(3) {
      animation-delay: 0.3s;
      grid-row: 1 / 3;

      &:hover {
        border-color: rgba(12, 44, 103, 0.4);
        box-shadow: 0 12px 32px rgba(12, 44, 103, 0.15);
      }
    }
    &:nth-child(4) {
      animation-delay: 0.4s;
      left: 30px;
      top: -60px;
    }
    &:nth-child(5) {
      animation-delay: 0.5s;
      left: 20px;
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

  .dg-icon-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: $gray-dark;
    text-align: center;
    margin: 0;
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

    :deep(.brands) {
      margin: 0 auto;
    }
  }

  .dg-trust-text {
    font-size: 1rem;
    color: $gray-dark;
    margin-bottom: 1.5rem;
    font-weight: 500;
  }

  .dg-logo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1.5rem;
    align-items: center;

    @include mobile {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  }

  .dg-logo-placeholder {
    padding: 1rem;
    background-color: $white;
    border-radius: 4px;
    font-size: 0.9rem;
    color: $gray-dark;
    text-align: center;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // ============================================
  // VALUE PROPOSITIONS
  // ============================================
  .dg-value-props {
    padding: 5rem 0;
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
        fill: black;
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

    @include tablet {
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
    font-size: 1rem;
    line-height: 1.6;
    opacity: 0.95;
  }

  .dg-dark-cards {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .dg-floating-card {
    background-color: rgba($white, 0.95);
    color: $blue;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
    }
  }

  // ============================================
  // SOCIAL PROOF
  // ============================================
  .dg-social-proof {
    text-align: center;
    padding: 5rem 0;

    h2 {
      font-size: 2.5rem;
      color: $blue;
      margin-bottom: 3rem;

      @include mobile {
        font-size: 1.75rem;
      }
    }
  }

  .dg-review-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    @include tablet {
      grid-template-columns: 1fr;
    }
  }

  .dg-review-card {
    background: linear-gradient(
      135deg,
      rgba(12, 44, 103, 0.06) 0%,
      rgba(59, 84, 186, 0.1) 100%
    );
    padding: 2rem;
    border-radius: 8px;
    border-left: 4px solid $green-accessible;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 6px 16px rgba(12, 44, 103, 0.2);
      transform: translateY(-2px);
    }
  }

  .dg-stars {
    color: $green-accessible;
    font-size: 1.25rem;
    margin-bottom: 1rem;
    display: block;
  }

  .dg-review-text {
    font-size: 1rem;
    color: $gray-dark;
    margin-bottom: 1rem;
    line-height: 1.6;
    font-style: italic;
  }

  .dg-review-author {
    font-size: 0.9rem;
    color: $gray;
    font-weight: 500;
    margin: 0;
  }

  // ============================================
  // FINAL CTA
  // ============================================
  .dg-final-cta {
    text-align: center;
    padding: 5rem 0;
    background: linear-gradient(
      135deg,
      rgba(12, 44, 103, 0.08) 0%,
      rgba(59, 84, 186, 0.12) 100%
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
</style>
