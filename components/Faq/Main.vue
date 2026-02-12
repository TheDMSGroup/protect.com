<template>
  <section ref="faqSection" class="faq-section">
    <div class="container">
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
    .container {
      @include media-breakpoint-down(sm) {
        padding: 0;
      }
    }

    .faq-list {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .faq-item {
      background: $gray-lighter;
      border-radius: 0.5rem;
      padding: 2.5rem;
      @include media-breakpoint-down(md) {
        padding: 1.5rem;
      }
      border: 1px solid $gray-light;

      a {
        color: $blue;
        text-decoration: underline;
      }

      h3 {
        margin-bottom: 1.5rem;
        color: $blue;
        font-weight: 600;
      }

      p {
        color: black;
        line-height: 1.7;
        margin: 0;

        ol {
          padding-left: 1.5rem;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
      }
    }
  }
</style>
