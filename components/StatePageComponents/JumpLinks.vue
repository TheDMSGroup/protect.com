<template>
  <section>
    <div class="explore-cta-section">
      <div class="cta-container">
        <div class="cta-left" aria-hidden="true" :style="{
          background: `url(${getImage(stateData.state)}) no-repeat center center / cover`,
        }">
        </div>

        <div class="cta-right">
          <h3 class="cta-title">What are the best car insurance companies in {{ stateData.stateAbbreviation }}?</h3>
          <p>
            Instead of focusing solely on the cheapest companies, we look at the full picture — offering a balance
            between the most affordable pricing, coverage types, and the provider's reputation. We prioritize providers
            known for exceptional customer service, ensuring you're not just getting a good rate, but reliable support
            when it matters most. Compare quotes today to see what {{ stateData.state }} providers are best for your car
            and wallet. </p>
          <!-- <div class="cta-items">
            <div class="cta-item">
              <div class="cta-icon quotes-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <div class="cta-content">
                <h4>Compare Quotes and Save</h4>
                <p>Get quotes from trusted, top providers in minutes.</p>
              </div>
              <div class="cta-arrow">
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>

            <div class="cta-item">
              <div class="cta-icon calculator-icon">
                <i class="fas fa-calculator"></i>
              </div>
              <div class="cta-content">
                <h4>Calculate Your Premium</h4>
                <p>Estimate your monthly Car Insurance payment.</p>
              </div>
              <div class="cta-arrow">
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>

            <div class="cta-item">
              <div class="cta-icon protect-icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <div class="cta-content">
                <h4>Learn More About PROTECT</h4>
                <p>Find great car insurance discounts in {{ stateData.state }} now!</p>
              </div>
              <div class="cta-arrow">
                <i class="fas fa-chevron-right"></i>
              </div>
            </div>
          </div> -->
        </div>
      </div>
      <div class="bottom-cta-bar" @click="getQuotes">
        <div class="bottom-cta-content">
          <div class="circular-container">
            <div class="circle-background">
              <img :src="svgPath" alt="SVG Icon" class="svg-icon" />
            </div>
          </div>
          <span>Compare and Save in {{ stateData.state }}!</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { redirectWithParams } from '../../mixins/utilsMixin';

export default {
  name: 'JumpLinks',
  components: {},
  props: {
    config: Object,
    stateData: Object,
    zipcode: String,
  },
  data() {
    return {};
  },
  computed: {
    svgPath() {
      return require(`../../assets/states/outlines/${this.stateData.state.replace(/\s/g, '').toLowerCase()}.svg`);
    },
  },
  methods: {
    getQuotes() {
      redirectWithParams('https://insure.protect.com', { zipcode: this.zipcode });
    },
    getImage(image) {
      const desiredImage = image.replace(/\s/g, '').toLowerCase();
      try {
        if (desiredImage) {
          // Attempt to load specific image
          return require('../../assets/states/license-plates/' + desiredImage + '.jpg');
        }
        // Default to shield icon if no image provided
        return require('../../assets/states/license-plates/california.jpg');
      } catch (error) {
        // Fallback if image doesn't exist
        console.warn('Image not found: ' + desiredImage + ', using default shield icon');
        return require('../../assets/states/license-plates/california.jpg');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/variables';

// Explore CTA Section
.explore-cta-section {
  background: var(--background-color);
  padding: var(--spacing-3xl) 0;

  .cta-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-3xl);
    align-items: center;
  }

  .cta-left {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .license-plate-wrapper {
    // background: url('@assets/ChatGPT Image Sep 4, 2025, 02_01_22 PM_1757525821493.png') center center;
    background-size: cover;
    border-radius: 12px;
    padding: var(--spacing-xl);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);

    img {
      width: 100%;
      height: auto;
    }
  }

  // .license-plate {
  //   background: linear-gradient(135deg, #e8e8e8 0%, #f5f5f5 100%);
  //   border: 3px solid #333;
  //   border-radius: 8px;
  //   padding: var(--spacing-lg) var(--spacing-xl);
  //   text-align: center;
  //   position: relative;
  //   min-width: 280px;
  //   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  //   font-family: 'Arial Black', Arial, sans-serif;

  //   .state-outline {
  //     position: absolute;
  //     top: var(--spacing-sm);
  //     right: var(--spacing-sm);

  //     .state-shape {
  //       width: 24px;
  //       height: 24px;
  //       opacity: 0.3;
  //       filter: invert(1);
  //     }
  //   }

  //   .plate-header {
  //     font-size: 0.875rem;
  //     font-weight: bold;
  //     color: #333;
  //     letter-spacing: 2px;
  //     margin-bottom: var(--spacing-xs);
  //   }

  //   .plate-main {
  //     font-size: 2.5rem;
  //     font-weight: 900;
  //     color: #2c5530;
  //     letter-spacing: 4px;
  //     text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  //     margin: var(--spacing-md) 0;
  //     display: flex;
  //     align-items: center;
  //     justify-content: center;
  //     gap: var(--spacing-sm);

  //     .plate-star {
  //       font-size: 2rem;
  //       color: #2c5530;
  //       text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  //     }
  //   }

  //   .plate-footer {
  //     font-size: 0.75rem;
  //     font-weight: bold;
  //     color: #333;
  //     letter-spacing: 1px;
  //     margin-top: var(--spacing-xs);
  //   }

  //   // License plate holes
  //   &::before,
  //   &::after {
  //     content: '';
  //     position: absolute;
  //     width: 8px;
  //     height: 8px;
  //     background: #666;
  //     border-radius: 50%;
  //     top: var(--spacing-sm);
  //   }

  //   &::before {
  //     left: var(--spacing-sm);
  //   }

  //   &::after {
  //     right: var(--spacing-sm);
  //   }
  // }

  .cta-right {
    .cta-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: var(--spacing-xl);
    }

    .cta-items {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .cta-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-lg);
      padding: var(--spacing-lg);
      background: white;
      border-radius: var(--radius-lg);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      }

      .cta-icon {
        width: 48px;
        height: 48px;
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        color: white;

        &.quotes-icon {
          background: var(--primary-color);
        }

        &.calculator-icon {
          background: #10b981;
        }

        &.protect-icon {
          background: #8b5cf6;
        }
      }

      .cta-content {
        flex: 1;

        h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--spacing-xs);
        }

        p {
          font-size: 0.875rem;
          color: var(--text-muted);
          line-height: 1.5;
        }
      }

      .cta-arrow {
        color: var(--text-muted);
        font-size: 1rem;
      }
    }
  }

  .bottom-cta-bar {
    &:hover {
      cursor: pointer;
    }
    background: #007A5F;

    .bottom-cta-content {
      max-width: 1200px;
      margin: 80px auto 0;
      padding: var(--spacing-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-md);
      color: white;
      font-size: 1.25rem;
      font-weight: 600;

      .state-icon {
        font-size: 1.5rem;
      }
    }
  }

  // Mobile responsive
  @include mobile {
    .cta-container {
      grid-template-columns: 1fr;
      gap: var(--spacing-xl);
      text-align: center;
    }

    .license-plate {
      min-width: 240px;
      padding: var(--spacing-md) var(--spacing-lg);

      .plate-main {
        font-size: 2rem;
      }
    }

    .cta-right .cta-title {
      font-size: 1.5rem;
    }
  }
}

.circular-container {
  display: inline-block;
  /* or block, flex, etc. */
}

.circle-background {
  width: 50px;
  /* Set your desired width */
  height: 50px;
  /* Same as width for perfect circle */
  background-color: #66c296;
  /* Your circle color */
  border-radius: 50%;
  /* Makes it a perfect circle */

  display: flex;
  justify-content: center;
  align-items: center;
}

.svg-icon {
  width: 60%;
  /* Adjust to fit nicely inside the circle */
  height: 60%;
  /* Maintain aspect ratio */
  object-fit: contain;
  /* Ensures SVG fits without distortion */
}

.svg-icon {
    filter: brightness(0) invert(1);
}
</style>
