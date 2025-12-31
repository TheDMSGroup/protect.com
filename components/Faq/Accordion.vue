<template>
  <div ref="faqSection">
    <div class="faq-container">
      <div v-for="(faq, index) in processedFaq" :key="index" class="faq-item">
        <div class="faq-question">{{ faq.question }}</div>
        <div class="faq-answer">
          <p v-html="faq.answer"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    content: {
      type: Object,
      required: true,
    },
  });

  const faqSection = ref(null);

  // Define FAQ data structure for composable
  const faqData = computed(() => ({
    faq: [
      {
        question: `What are the benefits of bundling ${props.content.type} insurance?`,
        answer: `Bundling offers multiple benefits: significant cost savings averaging ${props.content.stats.averageSavings} per year, simplified policy management with one provider and one renewal date, streamlined claims process, potential for higher coverage limits, and enhanced customer service. Most customers also appreciate having a single point of contact for all their insurance needs.`,
      },
      {
        question: "How much can I actually save by bundling?",
        answer: `Bundling discounts typically range from ${props.content.stats.discountRange} on your total insurance premiums. The average homeowner saves ${props.content.stats.averageSavings} annually, though your actual savings depend on factors like your location, coverage amounts, insurance provider, and claims history. Many customers find the convenience alone worth switching to a bundled policy.`,
      },
      ...(props.content.customFaq || []),
      {
        question: "Will bundling affect my coverage quality?",
        answer:
          "Not at all. Bundling doesn't compromise coverage—you'll receive the same quality protection whether policies are bundled or separate. In fact, many providers offer enhanced coverage options exclusively for bundled customers. You can still customize each policy independently to meet your specific needs while enjoying the discount benefits.",
      },
      {
        question: "What if I need to file a claim on one policy?",
        answer:
          "Filing a claim on one bundled policy works just like separate policies—each policy is handled independently. However, bundled customers often experience faster claims processing because all their information is in one system. Additionally, having both policies with one provider can prevent coverage gaps and ensure smoother coordination if a single incident affects both your auto and home.",
      },
      {
        question: "Can I switch providers if I'm already insured separately?",
        answer:
          "Yes! Switching to bundled coverage is straightforward. Most insurance providers will help you transition both policies, often timing them to coincide with your current renewal dates to avoid cancellation fees. Many customers find the substantial savings make switching well worth any minor hassle. Just make sure you have new coverage in place before canceling existing policies.",
      },
    ],
  }));

  // Use composable for SEO/JSON-LD - pass the computed directly
  const processedFaq = useFaq(faqData);

  onMounted(() => {
    if (faqSection.value) {
      // FAQ Accordion
      faqSection.value.querySelectorAll(".faq-question").forEach((question) => {
        question.addEventListener("click", () => {
          const item = question.parentElement;
          const isActive = item.classList.contains("active");

          // Close all items
          faqSection.value.querySelectorAll(".faq-item").forEach((faq) => {
            faq.classList.remove("active");
          });

          // Open clicked item if it wasn't active
          if (!isActive) {
            item.classList.add("active");
          }
        });
      });
    }
  });
</script>

<style lang="scss" scoped>
  @import "../../scss/bundlepages.scss";

  /* FAQ Section */
  .faq-section {
    padding: 8rem 5%;
    background: linear-gradient(180deg, $gray-light 0%, white 100%);
  }

  .faq-container {
    max-width: 900px;
    margin: 0 auto;
  }

  .faq-item {
    background: white;
    border-radius: 16px;
    margin-bottom: 1.5rem;
    overflow: hidden;
    border: 2px solid #f3f4f6;
    transition: all 0.3s;
  }

  .faq-item:hover {
    border-color: $blue;
  }

  .faq-question {
    padding: 2rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    color: $blue;
    user-select: none;
  }

  .faq-question::after {
    content: "+";
    font-size: 2rem;
    color: $blue;
    transition: transform 0.3s;
  }

  .faq-item.active .faq-question::after {
    transform: rotate(45deg);
  }

  .faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease-out, padding 0.4s ease-out;
    padding: 0 2rem;
  }

  .faq-item.active .faq-answer {
    max-height: 500px;
    padding: 0 2rem 2rem 2rem;
  }

  .faq-answer p {
    color: $bundle-gray;
    line-height: 1.8;
    font-size: 1.05rem;
  }
</style>
