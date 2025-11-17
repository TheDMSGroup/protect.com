<template>
  <section class="state-hero">
    <div
      class="hero-background"
      :style="{ backgroundImage: `url('${getStateImage(state.stateAbbreviation)}')` }"
    ></div>
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <div class="state-badge">
            <i class="fas fa-map-marker-alt"></i>
            {{ state.state }} - {{ state.nickname }}
          </div>

          <h1>
            Best Auto Insurance Rates in
            <span class="highlight">{{ state.state }}</span>
          </h1>

          <p class="hero-subtitle">
            Compare top-rated insurance providers and save up to
            <span class="savings-highlight">{{ formatCurrency(potentialSavings) }}</span>
            annually on your auto insurance in {{ state.state }}.
          </p>

          <div class="hero-buttons">
            <a href="#quote" class="btn btn-accent">
              <i class="fas fa-calculator"></i>
              Get Free Quote
            </a>
            <a href="#providers" class="btn btn-secondary">
              Compare Providers
            </a>
          </div>
        </div>

        <div class="hero-card">
          <div class="card">
            <h3>{{ state.state }} Insurance Overview</h3>
            <div class="stats-grid">
              <div class="stat">
                <div class="stat-value primary">{{ formatCurrency(state.avgAnnualCost) }}</div>
                <div class="stat-label">Avg. Annual Cost</div>
              </div>
              <div class="stat">
                <div class="stat-value success">{{ formatCurrency(state.avgMonthlyCost) }}</div>
                <div class="stat-label">Monthly Minimum</div>
              </div>
              <div class="stat">
                <div class="stat-value">{{ state.faultType }}</div>
                <div class="stat-label">State Type</div>
              </div>
              <div class="stat">
                <div class="stat-value">{{ state.combinedSplitLimit }}</div>
                <div class="stat-label">Min. Coverage</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'StateHero',
  props: {
    state: {
      type: Object,
      required: true,
    },
  },
  computed: {
    potentialSavings() {
      return Math.round(this.state.avgAnnualCost * 0.25);
    },
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
      }).format(value);
    },
    getStateImage(stateAbbr) {
      const stateImages = {
        TX: 'https://images.unsplash.com/photo-1571768414938-14d4d0c1e2d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        CA: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        FL: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        NY: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        default: 'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      };

      return stateImages[stateAbbr.toUpperCase()] || stateImages.default;
    },
  },
};
</script>

<style lang="scss" scoped>
.state-hero {
  position: relative;
  background: linear-gradient(135deg, var(--primary-color) 0%, #1e40af 100%);
  color: white;
  padding: 4rem 0;
  overflow: hidden;

  // @include mobile {
  //   padding: 2rem 0;
  // }

  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.1;
  }

  .hero-content {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xl);
    align-items: center;

    // @include mobile {
    //   grid-template-columns: 1fr;
    //   gap: var(--spacing-lg);
    //   text-align: center;
    // }
  }

  .state-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    background: rgba(255, 255, 255, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 0.875rem;
    margin-bottom: var(--spacing-md);
    backdrop-filter: blur(10px);
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: var(--spacing-md);
    line-height: 1.2;
    color: white;

    // @include mobile {
    //   font-size: 2rem;
    // }

    .highlight {
      color: var(--accent-color);
    }
  }

  .hero-subtitle {
    font-size: 1.125rem;
    margin-bottom: var(--spacing-xl);
    opacity: 0.9;
    line-height: 1.6;

    .savings-highlight {
      color: var(--accent-color);
      font-weight: 700;
    }
  }

  .hero-buttons {
    display: flex;
    gap: var(--spacing-md);
    flex-wrap: wrap;

    // @include mobile {
    //   justify-content: center;
    // }
  }

  .hero-card {
    .card {
      background: rgba(255, 255, 255, 0.95);
      color: var(--text-primary);
      backdrop-filter: blur(10px);
    }

    h3 {
      text-align: center;
      margin-bottom: var(--spacing-lg);
      color: var(--text-primary);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-md);
    }

    .stat {
      text-align: center;

      .stat-value {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.25rem;

        &.primary {
          color: var(--primary-color);
        }

        &.success {
          color: var(--success-color);
        }
      }

      .stat-label {
        font-size: 0.75rem;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }
  }
}
</style>
