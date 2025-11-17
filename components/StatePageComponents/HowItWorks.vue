<template>
  <section class="how-it-works">
    <div class="container">
      <div class="section-header">
        <h2>How Protect.com Works</h2>
        <p>Get the best auto insurance quotes in just three simple steps</p>
      </div>

      <div class="works-grid">
        <div class="work-step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>Enter Your Zip Code</h3>
            <p>Tell us where you live to find insurance providers in your area</p>
          </div>
        </div>

        <div class="work-step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>Compare Quotes</h3>
            <p>Review personalized quotes from top insurance companies</p>
          </div>
        </div>

        <div class="work-step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>Save Money</h3>
            <p>Choose the best coverage at the lowest price for your needs</p>
          </div>
        </div>
      </div>
      <div class="cta-container">
        <a :href="getQuotes" target="_blank"><button class="compare-btn">COMPARE QUOTES</button></a>
      </div>
    </div>
  </section>
</template>

<script>
import { redirectWithParams } from '../../mixins/utilsMixin';

export default {
  name: 'MoneySavingTips',
  components: {},
  props: {
    config: Object,
    stateData: Object,
  },
  data() {
    return {};
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
      }).format(value);
    },
    getQuotes() {
      redirectWithParams('https://insure.protect.com', { zipcode: this.zipcode });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/variables';
.how-it-works {
  padding: var(--spacing-4xl) 0;
  background: var(--background-color);

  .works-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-2xl);

    @include mobile {
      grid-template-columns: 1fr;
      gap: var(--spacing-xl);
    }
  }

  .work-step {
    text-align: center;
    padding: var(--spacing-xl);

    .step-number {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: var(--primary-color);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 auto var(--spacing-lg);
    }

    h3 {
      color: var(--text-primary);
      margin-bottom: var(--spacing-md);
      font-size: 1.25rem;
    }

    p {
      color: var(--text-secondary);
      line-height: 1.6;
    }
  }
}
.cta-container a {
  display: flex;
}
.compare-btn {
  background-color: #007A5F;
  color: white;
  border: none;
  padding: 22px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  outline: none;
  margin: 40px auto;
  @include mobile {
    margin: 0;
    width: 100%;
  }
}

.compare-btn:hover {
  background-color: #00896a;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.compare-btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
