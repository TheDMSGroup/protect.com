<template>
  <section ref="faqSection" class="faq-section">
    <div class="container">
      <h2 class="text-center mb-4">Frequently Asked Questions</h2>
      <div class="faq-list">
        <div v-for="(item, index) in faq" :key="index" class="faq-item">
          <h3 v-html="preprocessText(item.question, item.links)" />
          <p v-html="preprocessText(item.answer, item.links)" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { preprocessTextForLinks, redirectWithParams } from "@/composables/utils.js";

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

  // Router
  const router = useRouter();

  // Template ref for accessing the component element
  const faqSection = ref(null);

  // Computed property for JSON-LD structured data
  const faqJsonLd = computed(() => {
    if (!props.faq) return null;

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: props.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer.replaceAll(/<[^>]*>/g, ""),
        },
      })),
    };
  });

  // Server-side head management for JSON-LD - critical for SEO and AI parsing
  useHead(() => {
    if (!faqJsonLd.value) return {};

    return {
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify(faqJsonLd.value),
        },
      ],
    };
  });

  // Methods
  const preprocessText = (text, linkText, linkDestination) => {
    return preprocessTextForLinks(text, linkText, linkDestination);
  };

  // Handle click events for FAQ links
  const handleLinkClick = (ev) => {
    ev.preventDefault();
    // Need to use .getAttribute to get the raw href without resolution, browser returns full url
    // when using ev.target.href
    redirectWithParams(ev.target.getAttribute("href"), {}, router);
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

<style lang="scss">
  @import "../scss/stateautoinsurance.scss";

  // FAQ Section
  .faq-section {
    padding: var(--spacing-4xl) 0;
    background: var(--background-color);

    .faq-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xl);
    }

    .faq-item {
      background: var(--surface-color);
      border-radius: var(--radius-lg);
      padding: var(--spacing-2xl);
      border: 1px solid var(--border-light);

      h3 {
        margin-bottom: var(--spacing-lg);
        color: var(--primary-color);
        font-size: 1.25rem;
        font-family: "Cantata One", serif;

        @include media-breakpoint-down(md) {
          font-size: 1.5rem;
        }
      }

      p {
        color: var(--text-secondary);
        line-height: 1.7;
        margin: 0;
        font-size: 1.125rem;

        @include media-breakpoint-down(md) {
          font-size: 1.25rem;
        }

        ol {
          padding-left: 1.5rem;
          margin-top: var(--spacing-md);
          margin-bottom: var(--spacing-md);
        }
      }
    }
  }
</style>
