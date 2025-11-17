<template>
  <section class="top-providers">
    <div class="container">
      <div class="section-header">
        <h2>Top Rated Insurance Providers in {{ state.state }}</h2>
        <p>Compare quotes from leading insurers</p>
      </div>

      <div class="providers-grid">
        <div
          v-for="(provider, index) in displayProviders"
          :key="provider.id"
          class="provider-card"
          :style="{ animationDelay: index * 0.1 + 's' }"
        >
          <div class="card">
            <div class="provider-logo">
              <h4>{{ provider.name }}</h4>
              <div class="rating">
                <span class="rating-score">{{ provider.rating }}</span>
                <i class="fas fa-star"></i>
              </div>
            </div>

            <div class="provider-reviews">
              <div class="detail-row">
                <span class="detail-label">Monthly from:</span>
                <span class="detail-value primary">{{ formatCurrency(provider.monthlyRate) }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Claims satisfaction:</span>
                <span class="detail-value">{{ provider.satisfaction }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Discounts available:</span>
                <span class="detail-value success">{{ provider.discounts }}</span>
              </div>
            </div>

            <div class="provider-action">
              <button class="btn btn-primary get-quote-btn">See Quotes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { fetchProvidersByState } from '../../services/api';

export default {
  name: 'TopProviders',
  props: {
    state: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      providers: [],
      loading: true,
    };
  },
  computed: {
    displayProviders() {
      if (this.providers.length > 0) {
        return this.providers;
      }

      // Sample providers if none exist in the database
      return [
        {
          id: '1',
          name: 'State Farm',
          rating: '4.5',
          monthlyRate: 65,
          satisfaction: 'Excellent',
          discounts: 'Up to 25%',
        },
        {
          id: '2',
          name: 'GEICO',
          rating: '4.3',
          monthlyRate: 58,
          satisfaction: 'Very Good',
          discounts: 'Up to 20%',
        },
        {
          id: '3',
          name: 'Progressive',
          rating: '4.2',
          monthlyRate: 72,
          satisfaction: 'Good',
          discounts: 'Up to 30%',
        },
        {
          id: '4',
          name: 'Allstate',
          rating: '4.4',
          monthlyRate: 68,
          satisfaction: 'Very Good',
          discounts: 'Up to 22%',
        },
        {
          id: '5',
          name: 'Liberty Mutual',
          rating: '4.1',
          monthlyRate: 75,
          satisfaction: 'Good',
          discounts: 'Up to 18%',
        },
        {
          id: '6',
          name: 'USAA',
          rating: '4.7',
          monthlyRate: 55,
          satisfaction: 'Excellent',
          discounts: 'Up to 28%',
        },
      ];
    },
  },
  async mounted() {
    try {
      const providers = await fetchProvidersByState(this.state.stateAbbreviation);
      this.providers = providers;
    } catch (error) {
      console.warn('Could not load providers from API, using sample data');
    } finally {
      this.loading = false;
    }
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
.top-providers {
  padding: 4rem 0;

  .providers-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-2xl);
    animation: grid-contract 1.2s ease-out;

    // @include mobile {
    //   grid-template-columns: 1fr;
    // }

    // @include tablet {
    //   grid-template-columns: repeat(2, 1fr);
    // }
  }

  // Animation: start spaced apart, then pull in tight
  @keyframes grid-contract {
    0% {
      gap: var(--spacing-4xl);
      transform: scale(1.1);
      opacity: 0.7;
    }
    100% {
      gap: var(--spacing-2xl);
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes card-slide-in {
    0% {
      transform: translateY(20px) scale(0.95);
      opacity: 0;
    }
    100% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }

  .provider-card {
    animation: card-slide-in 0.6s ease-out forwards;
    opacity: 0;

    .card {
      height: 100%;
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }
    }

    // Logo section with padding
    .provider-logo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      margin-bottom: 8px;

      h4 {
        margin: 0;
        color: var(--text-primary);
      }

      .rating {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: var(--accent-color);
        font-weight: 600;

        .rating-score {
          font-size: 0.875rem;
        }

        i {
          font-size: 0.875rem;
        }
      }
    }

    // Reviews section with padding
    .provider-reviews {
      flex: 1;
      padding: 8px 0;
      margin-bottom: 8px;

      .detail-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0;

        .detail-label {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .detail-value {
          font-weight: 600;

          &.primary {
            color: var(--primary-color);
            font-size: 1.125rem;
          }

          &.success {
            color: var(--success-color);
          }
        }
      }
    }

    // Button section with padding and no wrap
    .provider-action {
      padding: 8px 0;
      margin-top: auto;
    }

    .get-quote-btn {
      width: 100%;
      white-space: nowrap;
      font-size: 0.875rem;
      font-weight: 600;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
