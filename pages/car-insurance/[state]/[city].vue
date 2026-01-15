<template>
  <div>Hello</div>
</template>

<script setup>
  // Calculate cost comparison
  // const costComparison = computed(() => {
  //   const nationalAvg = 2700;
  //   const diff = cityData.value.avgCost - nationalAvg;
  //   const percent = Math.abs(Math.round((diff / nationalAvg) * 100));

  //   if (diff > 0) {
  //     return {
  //       text: `${percent}% Above National Average`,
  //       class: "above-average",
  //     };
  //   } else if (diff < 0) {
  //     return {
  //       text: `${percent}% Below National Average`,
  //       class: "below-average",
  //     };
  //   } else {
  //     return {
  //       text: "At National Average",
  //       class: "at-average",
  //     };
  //   }
  // });

  // FAQs
  // const faqs = computed(() => [
  //   {
  //     question: `How much is car insurance in ${cityName.value}?`,
  //     answer: `<p>The average cost of car insurance in ${cityName.value}, ${stateName.value} is $${cityData.value.avgCost} per year for full coverage. However, your actual rate will depend on factors like your age, driving record, vehicle type, and coverage levels.</p>`,
  //   },
  //   {
  //     question: `What factors affect car insurance rates in ${cityName.value}?`,
  //     answer: `<p>Rates are influenced by ${
  //       cityData.value.localFactors.length > 0 ? "local factors including " + cityData.value.localFactors[0].toLowerCase() + ", as well as" : ""
  //     } your driving record, age, vehicle type, credit score, and coverage levels.</p>`,
  //   },
  //   {
  //     question: `How can I get cheap car insurance in ${cityName.value}?`,
  //     answer: `<p>To find affordable coverage in ${cityName.value}, compare quotes from multiple providers, maintain a clean driving record, bundle policies, ask about available discounts, and consider raising your deductible if appropriate for your situation.</p>`,
  //   },
  //   {
  //     question: `What's the minimum car insurance required in ${stateName.value}?`,
  //     answer: `<p>${stateName.value} requires drivers to carry minimum liability coverage. Check with your insurance provider for specific state requirements and consider purchasing additional coverage beyond the minimum for better protection.</p>`,
  //   },
  // ]);
</script>

<style lang="scss" scoped>
  .city-insurance-page {
    .hero-section {
      position: relative;
      height: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;

      @include media-breakpoint-down(md) {
        height: 400px;
      }

      .hero-image-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;

        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
        }

        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .hero-content {
        position: relative;
        z-index: 1;

        h1 {
          font-size: 3rem;
          margin-bottom: 1rem;

          @include media-breakpoint-down(md) {
            font-size: 2rem;
          }
        }

        .hero-subheadline {
          font-size: 1.25rem;
          margin-bottom: 2rem;
        }
      }
    }

    .city-info {
      padding: 4rem 0;

      .city-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        margin-bottom: 3rem;

        @include media-breakpoint-down(md) {
          grid-template-columns: 1fr;
        }

        .stat-card {
          background: #f8f9fa;
          padding: 2rem;
          border-radius: 8px;
          text-align: center;

          .stat-label {
            display: block;
            font-size: 0.875rem;
            color: #6c757d;
            margin-bottom: 0.5rem;
          }

          .stat-value {
            display: block;
            font-size: 2rem;
            font-weight: bold;
            color: #212529;

            &.above-average {
              color: #dc3545;
            }

            &.below-average {
              color: #28a745;
            }
          }
        }
      }

      .city-description {
        h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }

        :deep(p) {
          margin-bottom: 1rem;
          line-height: 1.6;
        }
      }
    }

    .local-factors {
      background: #f8f9fa;
      padding: 4rem 0;

      h2 {
        font-size: 2rem;
        margin-bottom: 1.5rem;
      }

      .factors-intro {
        margin-bottom: 1.5rem;
        line-height: 1.6;
      }

      .factors-list {
        list-style: none;
        padding: 0;
        margin-bottom: 2rem;

        li {
          padding: 1rem;
          margin-bottom: 0.5rem;
          background: white;
          border-left: 4px solid #007bff;
          border-radius: 4px;

          &::before {
            content: "✓";
            color: #28a745;
            font-weight: bold;
            margin-right: 0.75rem;
          }
        }
      }

      .neighborhood-note {
        font-style: italic;
        color: #6c757d;
      }
    }

    .license-plate {
      padding: 4rem 0;

      .plate-wrapper {
        display: flex;
        align-items: center;
        gap: 2rem;

        @include media-breakpoint-down(md) {
          flex-direction: column;
        }

        .license-plate-image {
          width: 200px;
          height: auto;
        }

        h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
      }
    }

    .insurance-providers {
      padding: 4rem 0;

      h2 {
        font-size: 2rem;
        margin-bottom: 2rem;
        text-align: center;
      }
    }

    .faq {
      background: #f8f9fa;
      padding: 4rem 0;

      h2 {
        font-size: 2rem;
        margin-bottom: 2rem;
        text-align: center;
      }

      .faq-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;

        @include media-breakpoint-down(md) {
          grid-template-columns: 1fr;
        }

        .faq-item {
          background: white;
          padding: 2rem;
          border-radius: 8px;

          h3 {
            font-size: 1.25rem;
            margin-bottom: 1rem;
            color: #007bff;
          }

          :deep(p) {
            line-height: 1.6;
          }
        }
      }
    }

    .cta-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 4rem 0;
      text-align: center;

      h2 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      p {
        font-size: 1.25rem;
        margin-bottom: 2rem;
      }
    }
  }
</style>
