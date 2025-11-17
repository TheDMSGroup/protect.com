<template>
  <section class='cost-by-age'>
    <div class='container'>
      <div class='section-header'>
        <h2>{{ state.state }} Auto Insurance Costs by Age</h2>
        <p>Annual premium estimates based on {{ state.state }} drivers</p>
      </div>

      <div class='age-groups'>
        <div
          v-for='ageGroup in ageGroups'
          :key='ageGroup.label'
          class='age-card'
        >
          <div class='card'>
            <div class='age-label'>{{ ageGroup.label }}</div>
            <div class='age-cost'>{{ formatCurrency(ageGroup.cost) }}</div>
            <div class='age-period'>per year</div>
            <div class='progress-bar'>
              <div
                class='progress-fill'
                :style='{ width: `${ageGroup.percentage}%` }'
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class='comparison-section'>
        <div class='card'>
          <h3>Compare Top {{ state.state }} Auto Insurance Providers</h3>
          <img
            src='https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600'
            alt='Auto insurance comparison chart'
            class='comparison-chart'
          />
          <div class='stats-row'>
            <div class='stat-item'>
              <div class='stat-value success'>Up to 25%</div>
              <div class='stat-label'>Average Savings</div>
            </div>
            <div class='stat-item'>
              <div class='stat-value primary'>50+</div>
              <div class='stat-label'>Insurance Companies</div>
            </div>
            <div class='stat-item'>
              <div class='stat-value primary'>2 Minutes</div>
              <div class='stat-label'>Quote Time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CostByAge',
  props: {
    state: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ageGroups() {
      const basePercentage = 100;
      return [
        {
          label: 'Age 16',
          cost: this.state.age16Cost,
          percentage: basePercentage,
        },
        {
          label: 'Age 25',
          cost: this.state.age25Cost,
          percentage: Math.round((this.state.age25Cost / this.state.age16Cost) * 100),
        },
        {
          label: 'Age 45',
          cost: this.state.age45Cost,
          percentage: Math.round((this.state.age45Cost / this.state.age16Cost) * 100),
        },
        {
          label: 'Age 65',
          cost: this.state.age65Cost,
          percentage: Math.round((this.state.age65Cost / this.state.age16Cost) * 100),
        },
      ];
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
  },
};
</script>

<style lang='scss' scoped>
.cost-by-age {
  background: var(--surface-color);
  padding: 4rem 0;

  .age-groups {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-md);
    margin-bottom: 3rem;

    // @include mobile {
    //   grid-template-columns: repeat(2, 1fr);
    // }
  }

  .age-card {
    .card {
      text-align: center;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }
    }

    .age-label {
      font-weight: 600;
      color: var(--text-secondary);
      margin-bottom: var(--spacing-sm);
    }

    .age-cost {
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: 0.25rem;

      // @include mobile {
      //   font-size: 1.75rem;
      // }
    }

    .age-period {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin-bottom: var(--spacing-md);
    }

    .progress-bar {
      height: 8px;
      background: var(--border-color);
      border-radius: 4px;
      overflow: hidden;

      .progress-fill {
        height: 100%;
        background: var(--primary-color);
        border-radius: 4px;
        transition: width 0.8s ease;
      }
    }
  }

  .comparison-section {
    h3 {
      text-align: center;
      margin-bottom: var(--spacing-lg);
    }

    .comparison-chart {
      width: 100%;
      height: auto;
      border-radius: var(--radius-md);
      margin-bottom: var(--spacing-lg);
    }

    .stats-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--spacing-md);

      // @include mobile {
      //   grid-template-columns: 1fr;
      // }
    }

    .stat-item {
      text-align: center;
      padding: var(--spacing-md);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);

      .stat-value {
        font-size: 1.75rem;
        font-weight: 700;
        margin-bottom: 0.25rem;

        &.success {
          color: var(--success-color);
        }

        &.primary {
          color: var(--primary-color);
        }
      }

      .stat-label {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
    }
  }
}
</style>
