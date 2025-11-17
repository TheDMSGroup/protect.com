<template>
  <section class="faq">
    <div class="container">
      <div class="section-header">
        <h2>Frequently Asked Questions</h2>
        <p>Get answers about {{ state.state }} auto insurance</p>
      </div>

      <div class="faq-list">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="faq-item"
        >
          <div class="card">
            <button
              class="faq-question"
              @click="toggleFAQ(index)"
              :class="{ 'active': openFAQ === index }"
            >
              <h3>{{ faq.question }}</h3>
              <i
                class="fas"
                :class="openFAQ === index ? 'fa-chevron-up' : 'fa-chevron-down'"
              ></i>
            </button>

            <div
              v-if="openFAQ === index"
              class="faq-answer"
            >
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FAQ',
  props: {
    state: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      openFAQ: null,
    };
  },
  computed: {
    faqs() {
      return [
        {
          question: `What is the minimum auto insurance required in ${this.state.state}?`,
          answer: `${this.state.state} requires minimum liability coverage of ${this.state.combinedSplitLimit}, which means ${this.state.bodilyInjuryPerPerson} per person for bodily injury, ${this.state.bodilyInjuryPerAccident} per accident for bodily injury, and ${this.state.propertyDamage} for property damage.`,
        },
        {
          question: `Is ${this.state.state} a no-fault state?`,
          answer: `${this.state.state} is ${this.state.faultType === 'At-fault' ? 'an at-fault' : 'a no-fault'} state. ${this.state.faultType === 'At-fault' ? 'This means the driver who causes an accident is responsible for damages.' : 'This means your own insurance covers your injuries regardless of who caused the accident.'}`,
        },
        {
          question: `What factors affect auto insurance rates in ${this.state.state}?`,
          answer: `Auto insurance rates in ${this.state.state} are affected by factors including your age, driving record, credit score, location, type of vehicle, coverage limits, and deductibles. Young drivers typically pay more, with 16-year-olds averaging $${this.state.age16Cost.toLocaleString()} annually.`,
        },
        {
          question: `How can I lower my auto insurance premiums in ${this.state.state}?`,
          answer: 'You can lower your premiums by maintaining a clean driving record, bundling policies, taking defensive driving courses, installing safety features, choosing higher deductibles, and comparing quotes from multiple insurers. Many drivers save up to 25% by shopping around.',
        },
        {
          question: `What is the average cost of auto insurance in ${this.state.state}?`,
          answer: `The average annual cost of auto insurance in ${this.state.state} is $${this.state.avgAnnualCost.toLocaleString()}, with minimum coverage averaging $${this.state.avgAnnualMinCost.toLocaleString()} per year or about $${this.state.avgMonthlyCost} per month.`,
        },
      ];
    },
  },
  methods: {
    toggleFAQ(index) {
      this.openFAQ = this.openFAQ === index ? null : index;
    },
  },
};
</script>

<style lang="scss" scoped>
.faq {
  padding: 4rem 0;

  .faq-list {
    max-width: 800px;
    margin: 0 auto;
  }

  .faq-item {
    margin-bottom: var(--spacing-md);
    .card {
      padding: 0;
      overflow: hidden;
    }

    .faq-question {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-lg);
      background: none;
      border: none;
      text-align: left;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: var(--surface-color);
      }

      &.active {
        background: var(--surface-color);
      }

      h3 {
        margin: 0;
        color: var(--text-primary);
        font-size: 1.125rem;
        font-weight: 600;
      }

      i {
        color: var(--text-secondary);
        font-size: 1rem;
        transition: transform 0.3s ease;
      }

      &.active i {
        transform: rotate(180deg);
      }
    }

    .faq-answer {
      padding: 0 var(--spacing-lg) var(--spacing-lg);
      border-top: 1px solid var(--border-color);
      background: var(--surface-color);
      animation: slideDown 0.3s ease;

      p {
        color: #3A4655;
        line-height: 1.7;
        margin: var(--spacing-md) 0 0 0;
      }
    }
  }
}

@keyframes slideDown {
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 200px;
    opacity: 1;
  }
}
</style>
