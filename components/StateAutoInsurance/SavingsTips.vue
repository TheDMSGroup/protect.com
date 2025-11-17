<template>
  <section class="savings-tips">
    <div class="container">
      <div class="section-header">
        <h2>Save Money on {{ state.state }} Auto Insurance</h2>
        <p>Expert tips to reduce your premiums</p>
      </div>

      <div class="tips-grid">
        <div class="tip-card">
          <div class="card">
            <div class="tip-icon">
              <i class="fas fa-percentage"></i>
            </div>
            <h3>Bundle Policies</h3>
            <p>Combine auto and home insurance for discounts up to 25%.</p>
            <div class="savings-amount">Save up to $500/year</div>
          </div>
        </div>

        <div class="tip-card">
          <div class="card">
            <div class="tip-icon driver-icon">
              <i class="fas fa-car"></i>
            </div>
            <h3>Safe Driver Discount</h3>
            <p>Maintain a clean driving record for significant savings.</p>
            <div class="savings-amount">Save up to $300/year</div>
          </div>
        </div>

        <div class="tip-card">
          <div class="card">
            <div class="tip-icon student-icon">
              <i class="fas fa-graduation-cap"></i>
            </div>
            <h3>Good Student Discount</h3>
            <p>Students with good grades can save on their parents' policy.</p>
            <div class="savings-amount">Save up to $200/year</div>
          </div>
        </div>
      </div>

      <div class="cta-section">
        <div class="cta-card">
          <img
            :src="getStateImage(state.stateAbbreviation)"
            :alt="`${state.state} landmark representing state insurance regulations`"
            class="cta-background"
          />
          <div class="cta-overlay">
            <h3>Ready to Save on {{ state.state }} Auto Insurance?</h3>
            <p>Get personalized quotes in under 2 minutes</p>
            <button class="btn btn-accent cta-button">Start Comparing Now</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SavingsTips',
  props: {
    state: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getStateImage(stateAbbr) {
      const stateImages = {
        TX: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
        CA: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
        FL: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
        NY: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
        default: 'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
      };

      return stateImages[stateAbbr.toUpperCase()] || stateImages.default;
    },
  },
};
</script>

<style lang="scss" scoped>
.savings-tips {
  background: linear-gradient(135deg, #f0fdf4 0%, #dbeafe 100%);
  padding: 4rem 0;

  .tips-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-lg);
    margin-bottom: 3rem;

    // @include mobile {
    //   grid-template-columns: 1fr;
    // }
  }

  .tip-card {
    .card {
      text-align: center;
      height: 100%;

      .tip-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto var(--spacing-md) auto;
        background: var(--success-color);

        &.driver-icon {
          background: var(--primary-color);
        }

        &.student-icon {
          background: #8b5cf6;
        }

        i {
          font-size: 1.5rem;
          color: white;
        }
      }

      h3 {
        margin-bottom: var(--spacing-sm);
      }

      p {
        margin-bottom: var(--spacing-md);
        color: var(--text-secondary);
      }

      .savings-amount {
        color: var(--success-color);
        font-weight: 700;
        font-size: 1.125rem;
      }
    }
  }

  .cta-section {
    .cta-card {
      position: relative;
      border-radius: var(--radius-lg);
      overflow: hidden;
      height: 300px;

      .cta-background {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .cta-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3));
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: var(--spacing-xl);
        color: white;

        // @include mobile {
        //   background: rgba(0, 0, 0, 0.7);
        //   text-align: center;
        // }

        h3 {
          font-size: 2rem;
          margin-bottom: var(--spacing-sm);
          color: white;

          // @include mobile {
          //   font-size: 1.5rem;
          // }
        }

        p {
          font-size: 1.125rem;
          margin-bottom: var(--spacing-lg);
          opacity: 0.9;
        }

        .cta-button {
          align-self: flex-start;
          font-size: 1.125rem;
          padding: 1rem 2rem;

          // @include mobile {
          //   align-self: center;
          // }
        }
      }
    }
  }
}
</style>
