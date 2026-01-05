<template>
  <div ref="discountsPage" class="discounts-page">
    <!-- Hero Section -->
    <section class="hero-section row">
      <b-col cols="12" lg="7" class="text-lg-left hero-content">
        <h1>Maximize Your Savings: The Ultimate List of Car Insurance Discounts in&nbsp;2026</h1>
        <p class="intro-text">
          Most drivers are eligible for at least three to five different discounts, yet many never claim them. Whether you've recently improved your
          credit score, bought a car with advanced safety features, or simply maintained a clean driving record, you could be sitting on hundreds of
          dollars in annual&nbsp;savings.
        </p>
        <p class="intro-text">
          The challenge is that every insurance provider offers different incentives. That's where Protect.com comes in. Our advanced quote tool does
          the heavy lifting for you, scanning top-rated providers to see exactly who can offer the deepest discounts on your current&nbsp;rate.
        </p>
        <a href="https://insure.protect.com/" class="cta-button primary" @click.prevent="goToForm()">Get Your Free Quotes</a>
      </b-col>

      <b-col cols="12" lg="5" class="hero-img d-flex align-items-center justify-content-center">
        <NuxtImg
          class="hero-image"
          :src="buildImageUrl('mobile-phone-quotes.png')"
          alt="Car Insurance Discounts"
          loading="eager"
          decoding="async"
          :preload="true"
          format="webp"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </b-col>
    </section>

    <!-- Video Section -->
    <section class="video-container mt-4 pt-4 fade-in">
      <YouTubeEmbed :video-id="'VUeM2v_CLzg'" class="video-container" />
    </section>

    <!-- Discounts List Section -->
    <section class="discounts-section fade-in">
      <h2>List of Common Car Insurance Discounts</h2>

      <NavigationTabs
        :tabs="[
          { label: 'Policy & Loyalty', target: 'policy-loyalty' },
          { label: 'Safe Driving & Habits', target: 'safe-driving' },
          { label: 'Driver Profile & Lifestyle', target: 'driver-profile' },
          { label: 'Vehicle Equipment & Technology', target: 'vehicle-equipment' },
        ]"
        :active-tab="currentTab"
        :previous-tab="'policy-loyalty'"
        @update:active-tab="switchTab"
      />

      <!-- Category 1: Policy & Loyalty Discounts -->
      <Transition name="fade" mode="out-in">
        <div v-if="currentTab === 'policy-loyalty'" id="policy-loyalty" class="discount-category">
          <h3>1. Policy & Loyalty Discounts</h3>
          <p class="category-description">These savings are based on how you manage your account and how long you've been a customer.</p>

          <div class="discount-list">
            <div class="discount-item">
              <NuxtLink to="/car-insurance/discounts/bundle">
                <h4>📦 Multi-Policy (Bundling Auto & Home)</h4>
                <p>Save up to <strong>25%</strong> by combining auto with home, renters, or life insurance.</p>
              </NuxtLink>
            </div>

            <div class="discount-item">
              <h4>🚗 Multi-Vehicle</h4>
              <p>Insuring more than one car under the same policy.</p>
            </div>

            <div class="discount-item">
              <h4>💵 Paid-in-Full</h4>
              <p>A discount for paying your 6 or 12-month premium upfront.</p>
            </div>

            <div class="discount-item">
              <h4>🐦 Early Quote/Early Bird</h4>
              <p>Getting a quote and signing your policy 7–10 days before your current one expires.</p>
            </div>

            <div class="discount-item">
              <h4>🔄 Continuous Coverage</h4>
              <p>Rewarding you for having no gaps in your insurance history.</p>
            </div>

            <div class="discount-item">
              <h4>💳 Paperless & Auto-Pay</h4>
              <p>Small discounts for choosing digital billing and automatic bank transfers.</p>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Category 2: Safe Driving & Habits Discounts -->
      <Transition name="fade" mode="out-in">
        <div v-if="currentTab === 'safe-driving'" id="safe-driving" class="discount-category">
          <h3>2. Safe Driving & Habits Discounts</h3>
          <p class="category-description">Your behavior on the road is the biggest factor in your premium cost.</p>

          <div class="discount-list">
            <div class="discount-item">
              <h4>✅ Safe Driver</h4>
              <p>For those with no accidents or moving violations for 3–5 years.</p>
            </div>

            <div class="discount-item">
              <h4>📱 Telematics (Usage-Based)</h4>
              <p>Programs like Progressive's Snapshot or State Farm's Drive Safe & Save track your braking and speed for up to 30% savings.</p>
            </div>

            <div class="discount-item">
              <h4>📏 Low-Mileage</h4>
              <p>For those who drive less than 7,500 miles per year (common for remote workers).</p>
            </div>

            <div class="discount-item">
              <h4>🎓 Defensive Driving Course</h4>
              <p>Completing an approved safety course (mandatory discounts in many states).</p>
            </div>

            <div class="discount-item">
              <h4>🛡️ Accident Forgiveness</h4>
              <p>
                While not a "discount" per se, if you're a good driver, it prevents your first at-fault accident from raising your rates which is a
                discount from otherwise higher rates.
              </p>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Category 3: Driver Profile & Lifestyle Discounts -->
      <Transition name="fade" mode="out-in">
        <div v-if="currentTab === 'driver-profile'" id="driver-profile" class="discount-category">
          <h3>3. Driver Profile & Lifestyle Discounts</h3>
          <p class="category-description">Who you are, where you work, and your life milestones can trigger lower rates.</p>

          <div class="discount-list">
            <div class="discount-item">
              <h4>📚 Good Student</h4>
              <p>For full-time students (high school or college) maintaining a 3.0 GPA (B average) or higher.</p>
            </div>

            <div class="discount-item">
              <h4>🎒 Student Away at School</h4>
              <p>For students living 100+ miles away from home without a car.</p>
            </div>

            <div class="discount-item">
              <h4>🏡 Homeowner Discount</h4>
              <p>Many insurers offer a discount simply for owning a home, even if you don't bundle.</p>
            </div>

            <div class="discount-item">
              <h4>👔 Occupational/Affinity</h4>
              <p>Special rates for teachers, nurses, first responders, military, and alumni associations.</p>
            </div>

            <div class="discount-item">
              <h4>🎖️ Military/Federal Employee</h4>
              <p>Dedicated discounts for active duty, veterans, and government workers.</p>
            </div>

            <div class="discount-item">
              <h4>👴 Mature/Senior Driver</h4>
              <p>For drivers over 55 who complete a senior driving safety course.</p>
            </div>

            <div class="discount-item">
              <h4>💍 Newly Married</h4>
              <p>Statistics show married drivers are lower risk, leading to lower premiums.</p>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Category 4: Vehicle Equipment & Technology Discounts -->
      <Transition name="fade" mode="out-in">
        <div v-if="currentTab === 'vehicle-equipment'" id="vehicle-equipment" class="discount-category">
          <h3>4. Vehicle Equipment & Technology Discounts</h3>
          <p class="category-description">The safety and security features of your car can work in your favor.</p>

          <div class="discount-list">
            <div class="discount-item">
              <h4>🔒 Anti-Theft Devices</h4>
              <p>For factory-installed alarms, GPS trackers (like LoJack), or kill switches.</p>
            </div>

            <div class="discount-item">
              <h4>🛟 Safety Features</h4>
              <p>Discounts for anti-lock brakes (ABS), airbags, and daytime running lights.</p>
            </div>

            <div class="discount-item">
              <h4>✨ New Vehicle</h4>
              <p>Cars that are less than 3 years old are often eligible for a 10–15% credit.</p>
            </div>

            <div class="discount-item">
              <h4>🌱 Green Vehicle (Hybrid/EV)</h4>
              <p>Incentives for driving eco-friendly or alternative-fuel vehicles.</p>
            </div>

            <div class="discount-item">
              <h4>🎚️ Passive Restraint</h4>
              <p>For cars with automatic seatbelts or side-curtain airbags.</p>
            </div>

            <div class="discount-item">
              <h4>🏠 Garage Parking</h4>
              <p>
                If you park your car in a safe location, like a garage, insurance carriers will often reward you with a lower rate than if you were to
                park on the street.
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <b-container>
        <h2>Take the Guess Work out of Car Insurance Discounts and Start Saving with Protect.com</h2>
        <p>
          Finding which company offers the specific "Good Student" or "Safe Driver" discount tailored to YOUR lifestyle can take hours of manual
          searching.
        </p>
        <p>
          Why wait? Use the <a href="https://insure.protect.com/" @click.prevent="goToForm()">Protect.com quote tool</a> to instantly compare dozens
          of providers. We help you identify the specific car insurance companies that can offer a discount on your current rate, ensuring you never
          pay a penny more than you have to.
        </p>

        <div class="how-it-works">
          <h3>How it Works:</h3>
          <ol>
            <li class="fade-in"><strong>Enter Your Zip Code:</strong> Start with your location to see local availability.</li>
            <li class="fade-in"><strong>Compare in Real-Time:</strong> See quotes from the nation's top insurers side-by-side.</li>
            <li class="fade-in">
              <strong>Unlock Hidden Discounts:</strong> Our tool identifies the providers most likely to reward your specific driving profile.
            </li>
          </ol>
        </div>

        <a href="https://insure.protect.com/" class="cta-button primary" @click.prevent="goToForm()">Get Your Free Quotes</a>
      </b-container>
    </section>
  </div>
</template>

<script setup>
  import { redirectWithParams } from "@/composables/utils.js";
  import { useScrollFade } from "@/composables/useScrollFade.js";

  useSeoMeta({
    title: "Maximize Your Savings: The Ultimate List of Car Insurance Discounts in 2026 | Protect.com",
    description:
      "Discover every car insurance discount available, from safe driver rewards to multi-policy bundles. Use Protect.com's quote tool to find the best rates and hidden discounts today!",
    keywords: [
      "car insurance discounts",
      "auto insurance savings",
      "bundle insurance",
      "safe driver discount",
      "multi-policy discount",
      "insurance discounts",
      "car insurance discounts 2026",
      "telematics discount",
      "good student discount",
    ],
  });

  const currentTab = ref("policy-loyalty");
  const previousTab = ref(null);

  const discountsPage = ref(null);
  useScrollFade(discountsPage);

  const switchTab = (tab) => {
    previousTab.value = currentTab.value;
    currentTab.value = tab;
  };

  const goToForm = () => {
    redirectWithParams("https://insure.protect.com/", {}, null);
  };
</script>

<style scoped lang="scss">
  @import "../../../scss/bundlepages.scss";
  section {
    max-width: 1100px;
    width: 90%;
    margin: 0 auto;
  }

  .discounts-page {
    @include media-breakpoint-up(md) {
      padding: 4rem 0;
    }
  }

  .hero-section {
    padding: 4rem 0;
    max-width: 1600px;
    margin: 0 auto;

    @include media-breakpoint-down(md) {
      padding: 2rem 0;
    }
    h1 {
      margin-bottom: 2rem;

      @include media-breakpoint-up(md) {
        max-width: 700px;
        font-size: 3.75rem;
      }
    }
    .hero-content {
      animation: slideInLeft 1s ease-out;
    }

    .intro-text {
      font-size: 1.1rem;
      line-height: 1.7;
      color: $gray-dark;
      margin-bottom: 1.5rem;

      @include media-breakpoint-up(md) {
        max-width: 700px;
      }
    }

    .cta-button {
      display: inline-block;
      padding: 1rem 2.5rem;
      background: $blue-light;
      color: white;
      text-decoration: none;
      border-radius: 50px;
      font-weight: 700;
      font-size: 1.1rem;
      transition: all 0.3s;

      &:hover {
        background: darken($blue-light, 10%);
        transform: translateY(-2px);
      }
    }

    .hero-image {
      width: 100%;
      max-width: 500px;
      height: auto;
      margin: 0 auto;
      display: block;
      animation: slideInRight 1s ease-out;

      @include mobile {
        display: none;
      }
    }

    .video-container {
      margin: 3rem 0;

      .video-placeholder {
        background: $gray-light;
        padding: 4rem;
        border-radius: 12px;
        border: 2px dashed $gray-medium;

        p {
          color: $gray-dark;
          font-size: 1.2rem;
          margin: 0;
        }
      }
    }
  }

  .discounts-section {
    padding: 4rem 0;

    h2 {
      color: $blue;
      margin-bottom: 3rem;
      text-align: center;
    }
  }

  .discount-category {
    margin-bottom: 4rem;
    background: $gray-lighter;
    padding: 3rem;
    border-radius: 16px;

    @include mobile {
      padding: 2rem 1.5rem;
    }

    h3 {
      font-family: "Cantata One", serif;
      font-size: 1.75rem;
      color: $blue;
      margin-bottom: 1rem;
    }

    .category-description {
      font-size: 1.1rem;
      color: $gray-dark;
      margin-bottom: 2rem;
      font-style: italic;
    }
  }

  .discount-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .discount-item {
    background: lighten($blue-light, 45%);
    padding: 1.5rem;
    border-radius: 12px;
    transition: all 0.3s;

    &:hover {
      transform: translateX(8px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    h4 {
      font-size: 1.25rem;
      color: $blue;
      margin-bottom: 0.5rem;
      font-weight: 700;
    }

    p {
      color: $gray-dark;
      line-height: 1.6;
      margin: 0;
    }
  }

  .cta-section {
    background: $blue;
    color: white;
    padding: 4rem;
    margin: 4rem 0;
    text-align: center;
    width: 100%;
    min-width: 100%;

    @include mobile {
      padding: 3rem 2rem;
    }

    .container {
      @include media-breakpoint-up(md) {
        max-width: 800px;
      }
    }
    a {
      color: white;
      text-decoration: underline;
    }

    h2 {
      margin-bottom: 1.5rem;
      color: white;
    }

    p {
      font-size: 1.1rem;
      line-height: 1.7;
      margin-bottom: 1.5rem;
      color: white;
      max-width: 900px;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
    }

    .how-it-works {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      padding: 3rem;
      border-radius: 16px;
      margin: 3rem auto;
      max-width: 800px;
      text-align: left;
      border: 1px solid rgba(255, 255, 255, 0.2);

      @include mobile {
        padding: 2rem 1.5rem;
      }

      h3 {
        font-family: "Cantata One", serif;
        color: white;
        text-align: center;
      }

      ol {
        padding-left: 0;
        list-style: none;
        counter-reset: step-counter;

        li {
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 1.5rem;
          padding-left: 3rem;
          position: relative;
          counter-increment: step-counter;
          color: rgba(255, 255, 255, 0.95);

          &::before {
            content: counter(step-counter);
            color: white;
            position: absolute;
            left: 0;
            top: 0;
            width: 2rem;
            height: 2rem;
            background: $blue;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.1rem;
          }

          strong {
            color: white;
            display: block;
            margin-bottom: 0.25rem;
            font-weight: 700;
          }
        }
      }
    }

    .cta-button {
      display: inline-block;
      padding: 1rem 2.5rem;
      background: $blue-light;
      color: white;
      text-decoration: none;
      border-radius: 50px;
      font-weight: 700;
      font-size: 1.1rem;
      margin-top: 2rem;
      transition: all 0.3s;

      &:hover {
        background: darken($blue-light, 10%);
        transform: translateY(-2px);
      }
    }
  }

  // Transition animations
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .fade-enter-from {
    opacity: 0;
    transform: translateX(-30px);
  }

  .fade-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>
