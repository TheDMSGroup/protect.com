<template>
  <section class="faq-section">
    <div class="container">
      <div class="section-header">
        <h2>Frequently Asked Questions</h2>
        <p>Common questions about auto insurance in {{ stateData.state }}</p>
      </div>

      <div class="faq-list">
        <div class="faq-item">
          <h3>What is the minimum auto insurance required in {{ stateData.state }}?</h3>
          <p>{{ stateData.state }} requires minimum liability coverage of {{ stateData.combinedSplitLimit }}. This means
            {{ stateData.bodilyInjuryPerPerson }} for bodily injury per person, {{ stateData.bodilyInjuryPerAccident }}
            per accident, and {{ stateData.propertyDamage }} for property damage.</p>
        </div>

        <div class="faq-item">
          <h3>How much does auto insurance cost in {{ stateData.state }}?</h3>
          <p>The average annual cost of auto insurance in {{ stateData.state }} is {{
            formatCurrency(stateData.avgAnnualCost) }}. However, rates vary significantly based on factors like age,
            driving record, location, and coverage levels.</p>
        </div>

        <div class="faq-item">
          <h3>Is {{ stateData.state }} a fault or no-fault state?</h3>
          <p>{{ stateData.state }} is {{ stateData.faultType.toLowerCase() }} state. This affects how insurance claims
            are handled after an accident.</p>
        </div>

        <div class="faq-item">
          <h3>What factors affect my insurance rates in {{ stateData.state }}?</h3>
          <p>Insurance rates are influenced by your driving record, age, location, vehicle type, credit score, coverage
            levels, and available discounts. Young drivers typically pay more, while experienced drivers with clean
            records get better rates.</p>
        </div>

        <div class="faq-item">
          <h3>How often should I shop for auto insurance?</h3>
          <p>It's recommended to compare auto insurance rates annually or whenever you have a major life change (moving,
            new car, marriage, etc.). This ensures you're getting the best available rates.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

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
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/variables';
// FAQ Section
.faq-section {
  padding: var(--spacing-4xl) 0;
  background: var(--background-color);

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
  }

  .faq-item {
    background: var(--surface-color);
    border-radius: var(--radius-lg);
    padding: var(--spacing-2xl);
    border: 1px solid var(--border-light);

    h3 {
      margin-bottom: var(--spacing-lg);
      color: var(--primary-color);
      font-size: 1.125rem;
    }

    p {
      color: var(--text-secondary);
      line-height: 1.7;
      margin: 0;
    }
  }
}
</style>
