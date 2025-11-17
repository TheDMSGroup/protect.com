<template>
  <section class="footer-cta-section">
    <!-- Blue CTA Section -->
    <div class="cta-primary">
      <div class="container">
        <div class="cta-primary-content">
          <div class="cta-left">
            <div class="cta-icon">
              <img :src="svgPath" alt="SVG Icon" class="svg-icon" />
            </div>
            <div class="cta-text">
              <h3>Save On Car Insurance!</h3>
              <p>Compare Top Providers in Your Area</p>
            </div>
          </div>

          <div class="cta-right">
            <div class="cta-form">
              <div class="form-group">
                <label>Ready to see what you can save?</label>
                <div class="form-row">
                  <geo-pin-icon class="left-icon" />
                  <input type="text" v-model="zipcode" placeholder="Zip Code" class="zipcode-input" maxlength="5" />
                  <button @click="getQuotes" class="compare-btn">COMPARE QUOTES</button>
                </div>
                <div class="form-disclaimer">
                  <span>
                    <img :src="svgPath" alt="SVG Icon" class="cta-icon-inline svg-icon" />No spam, just quotes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { redirectWithParams } from '../../mixins/utilsMixin';
import GeoPinIcon from '../../assets/icons/geo-pin.vue';

export default {
  name: 'CtaSection',
  components: {
    GeoPinIcon,
  },
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
      return require('../../assets/states/outlines/icon-shield.png');
    },
  },
  methods: {
    getQuotes() {
      if (this.zipcode.length === 5) {
        redirectWithParams('https://insure.protect.com', { zipcode: this.zipcode });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/variables';

// Footer CTA Section
.footer-cta-section {
  .cta-primary {
    background: #0C2C67;
    padding: var(--spacing-3xl) 0;

    @include mobile {
      padding: var(--spacing-xl) 0;
    }
    .cta-primary-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--spacing-lg);
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-3xl);
      align-items: center;

      .cta-left {
        display: flex;
        align-items: center;
        gap: var(--spacing-lg);

        .cta-icon {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
          flex-shrink: 0;
          img {
            height: 100%;
            padding: 20%;
            filter: invert(0);
          }

          @include mobile {
            display: none;
          }
        }

        .cta-text {
          h3 {
            color: white;
            font-size: 1.875rem;
            font-weight: 700 !important;
            margin-bottom: var(--spacing-xs);
            font-family: 'Nunito Sans', sans-serif;
          }

          p {
            color: rgba(255, 255, 255, 0.9);
            font-size: 1rem;
            margin: 0;
          }
        }
      }

      .cta-right {
        .cta-form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
              color: white;

          .form-section {
            text-align: center;

            p {
              color: white;
              font-size: 1.125rem;
              margin-bottom: var(--spacing-md);
            }

            .input-group {
              display: flex;
              gap: var(--spacing-sm);

              input {
                flex: 1;
                padding: var(--spacing-md);
                border: none;
                border-radius: var(--radius-md);
                font-size: 1rem;

                &:focus {
                  outline: 2px solid #fff;
                  outline-offset: 2px;
                }
              }

              button {
                background: #10b981;
                color: white;
                border: none;
                padding: var(--spacing-md) var(--spacing-xl);
                border-radius: var(--radius-md);
                font-weight: 700;
                font-size: 1rem;
                cursor: pointer;
                transition: background-color 0.3s ease;
                white-space: nowrap;

                &:hover {
                  background: #059669;
                }
              }
            }

            .disclaimer {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: var(--spacing-xs);
              margin-top: var(--spacing-md);
              color: rgba(255, 255, 255, 0.8);
              font-size: 0.875rem;

              .check-icon {
                color: #10b981;
                font-size: 1rem;
              }
            }
          }
        }
      }

      @include mobile {
        grid-template-columns: 1fr;
        text-align: center;
        gap: var(--spacing-xl);

        .cta-left {
          justify-content: center;
          gap: 10px;

          .cta-text h3 {
            font-size: 1.5rem;
          }
        }

        // .cta-right .cta-form .form-section .input-group {
        //   flex-direction: column;
        // }
        .form-row {
          display: flex;
          gap: 5px;
          flex-direction: column;
          width: 100%;
          input {
            margin: 0;
          }
        }
          .cta-icon-inline {
            margin-bottom: 4px;
          }
      }
    }
  }

  .cta-companies {
    background: #f8f9fa;
    padding: var(--spacing-2xl) 0;

    .companies-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--spacing-lg);
      text-align: center;

      h4 {
        color: #666;
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: var(--spacing-lg);
        font-family: 'Nunito Sans', sans-serif;
      }

      .companies-logos {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: var(--spacing-2xl);
        margin-bottom: var(--spacing-lg);
        flex-wrap: wrap;

        .company-logo {
          font-weight: bold;
          font-size: 1.125rem;

          &:nth-child(1) span {
            color: #1e40af; // Progressive blue
            font-style: italic;
          }

          &:nth-child(2) span {
            color: #059669; // GEICO green
            font-weight: 800;
          }

          &:nth-child(3) span {
            color: #1e40af; // Nationwide blue
            font-weight: 700;
          }

          &:nth-child(4) span {
            color: #dc2626; // State Farm red
            font-weight: 700;
          }

          &:nth-child(5) span {
            color: #1e40af; // Liberty Mutual blue
            font-weight: 600;
          }
        }

        @include mobile {
          gap: var(--spacing-lg);

          .company-logo {
            font-size: 1rem;
          }
        }
      }

      .companies-disclaimer {
        color: #888;
        font-size: 0.75rem;
        line-height: 1.4;
        max-width: 800px;
        margin: 0 auto;
      }
    }
  }
}

    .zipcode-input {
      flex: 1;
      border: 2px solid var(--border-color);
      padding: 10px 40px;
      border-radius: 3px;
      font-size: 1rem;
      background: white;
      color: var(--text-primary);
      margin-right: 10px;

      &::placeholder {
        color: var(--text-muted);
        font-style: italic;
      }

      &:focus {
        outline: none;
        border-color: var(--primary-color);
      }
    }
    .compare-btn {
      background: #007A5F;
      color: white;
      border: none;
      padding: 14px 20px;
      border-radius: 3px;
      font-weight: 700;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: var(--accent-hover);
        transform: translateY(-1px);
      }
    }
    .form-disclaimer {
      margin-top: 10px;
    }
    img.cta-icon-inline {
        height: 15px;
        padding-right: 5px;
    }
  .left-icon {
    position: absolute;
    padding-left: 15px;
    margin-top: 13px;
    vertical-align: middle;
  }

</style>
