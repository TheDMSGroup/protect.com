<template>
  <div ref="faqSection">
    <div class="faq-container">
      <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
        <div class="faq-question">{{ faq.question }}</div>
        <div class="faq-answer">
          <p>{{ faq.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  faqs: {
    type: Array,
    required: true,
  },
});

const faqSection = ref(null);

// Format FAQs for useFaq composable to add JSON-LD structured data
const faqData = computed(() => {
  if (!props.faqs || !Array.isArray(props.faqs)) {
    return { faq: [] };
  }
  return {
    faq: props.faqs.map(item => ({
      question: item.question,
      answer: item.answer,
    })),
  };
});

// Use the FAQ composable to add JSON-LD structured data for SEO and AI
// The return value isn't needed since we display props.faqs directly
useFaq(faqData);

onMounted(() => {
  if (faqSection.value) {
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
.faq-container {
  max-width: 900px;
  margin: 0 auto;
}

.faq-item {
  background: white;
  border-radius: 16px;
  margin-bottom: 1.5rem;
  overflow: hidden;
  border: 2px solid $gray-light;
  transition: all 0.3s;

  &:hover {
    border-color: $blue;
  }

  &.active .faq-question::after {
    transform: rotate(45deg);
  }

  &.active .faq-answer {
    max-height: 500px;
    padding: 0 2rem 2rem 2rem;
  }

  .faq-question {
    padding: 2rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    font-size: 1.125rem;
    color: $blue;
    user-select: none;

    &::after {
      content: "+";
      font-size: 2rem;
      color: $blue;
      transition: transform 0.3s;
    }
  }

  .faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease-out, padding 0.4s ease-out;
    padding: 0 2rem;

    p {
      color: $gray-dark;
      font-size: 1.05rem;
      line-height: 1.8;
      margin-bottom: 0;
    }
  }
}
</style>
