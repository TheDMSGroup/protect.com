<template>
  <section ref="faqSection" class="faq-section">
    <div class="container">
      <h2 class="text-center mb-4">Frequently Asked Questions</h2>
      <div class="faq-list">
        <div v-for="(item, index) in processedFaq" :key="index" class="faq-item">
          <h3>{{ item.question }}</h3>
          <div class="answer-content" v-html="item.answer" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { useFaq } from "@/composables/useFaq.js";
  // Props
  const props = defineProps({
    faq: {
      type: Array,
      default: () => [],
    },
  });

  // Component name for linting
  defineOptions({
    name: "FaqSection",
  });

  // composable to manage faq data
  const processedFaq = useFaq(props);

  // Template ref for accessing the component element
  const faqSection = ref(null);

  // Handle click events for FAQ links
  const handleLinkClick = (ev) => {
    ev.preventDefault();
    // Need to use .getAttribute to get the raw href without resolution, browser returns full url
    // when using ev.target.href
    navigateTo(ev.target.getAttribute("href"));
  };

  // Lifecycle - setup link event listeners after mount
  onMounted(() => {
    if (faqSection.value) {
      faqSection.value.querySelectorAll("a").forEach((anchor) => {
        anchor.addEventListener("click", handleLinkClick);
      });
    }
  });

  // Cleanup event listeners before unmount
  onBeforeUnmount(() => {
    if (faqSection.value) {
      faqSection.value.querySelectorAll("a").forEach((anchor) => {
        anchor.removeEventListener("click", handleLinkClick);
      });
    }
  });
</script>

<style lang="scss" scoped>
  // FAQ Section
  .faq-section {
    --primary-color: #1e40af;
    --background-color: #ffffff;
    --surface-color: #f8fafc;
    --border-light: #f1f5f9;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 2.5rem;
    --spacing-4xl: 4rem;
    --radius-lg: 0.5rem;
    --spacing-md: 1rem;

    padding: var(--spacing-4xl) 0;
    background: var(--background-color);

    .container {
      @include media-breakpoint-down(sm) {
        padding: 0;
      }
    }

    .faq-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xl);
    }

    .faq-item {
      background: var(--surface-color);
      border-radius: var(--radius-lg);
      padding: var(--spacing-2xl);
      @include media-breakpoint-down(md) {
        padding: var(--spacing-lg);
      }
      border: 1px solid var(--border-light);

      a {
        color: var(--primary-color);
        text-decoration: underline;
      }

      h3 {
        margin-bottom: var(--spacing-lg);
        color: var(--primary-color);
      }

      p {
        color: black;
        line-height: 1.7;
        margin: 0;

        ol {
          padding-left: 1.5rem;
          margin-top: var(--spacing-md);
          margin-bottom: var(--spacing-md);
        }
      }
    }
  }
</style>
