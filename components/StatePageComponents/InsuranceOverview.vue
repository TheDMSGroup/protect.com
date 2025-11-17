<template>
  <section class="insurance-overview">
    <div class="container">
      <div class="section-header">
        <h2>{{ stateData.state }} Auto Insurance Fast Facts</h2>
        <p>Key insurance statistics and requirements for {{ stateData.state }}</p>
      </div>

      <div class="overview-grid">
        <div class="overview-stat">
          <div class="stat-value primary">{{ formatCurrency(stateData.avgAnnualCost) }}</div>
          <div class="stat-label">Average Annual Cost</div>
        </div>
        <div class="overview-stat">
          <div class="stat-value success">{{ formatCurrency(stateData.avgMonthlyCost) }}</div>
          <div class="stat-label">Monthly Minimum</div>
        </div>
        <div class="overview-stat">
          <div class="stat-value">{{ stateData.faultType }}</div>
          <div class="stat-label">State Type</div>
        </div>
        <div class="overview-stat">
          <div class="stat-value">{{ stateData.combinedSplitLimit }}</div>
          <div class="stat-label">Min. Coverage</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'InsuranceOverview',
  components: {},
  props: {
    config: Object,
    stateData: Object,
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

// Insurance Overview Section
.insurance-overview {
  padding: var(--spacing-4xl) 0;
  background: var(--surface-color);

  .overview-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-2xl);

    @include mobile {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-lg);
    }
  }

  .overview-stat {
    text-align: center;
    background: var(--background-color);
    padding: var(--spacing-2xl);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border-light);

    @include mobile {
      padding: 15px 5px;
    }
    .stat-value {
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: var(--spacing-sm);

      &.primary {
        color: var(--primary-color);
      }

      &.success {
        color: var(--success-color);
      }
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
    }
  }
}

</style>
