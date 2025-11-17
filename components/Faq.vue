<template>
  <section class="faq-section">
    <div class="container">
      <h2 class="text-center mb-4">Frequently Asked Questions</h2>
      <div class="faq-list">
        <div v-for="(item, index) in faq" :key="index" class="faq-item">
          <h3 v-html="preprocessText(item.question, item.links)"></h3>
          <p v-html="preprocessText(item.answer, item.links)"></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { preprocessTextForLinks, redirectWithParams } from '../mixins/utilsMixin';
import '../scss/stateautoinsurance.scss';

export default {
  name: 'FAQ',
  components: {},
  props: {
    faq: Array,
  },
  computed: {
    // create JSON-LD for FAQ schema based on incoming questions and answers
    faqJsonLd() {
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: this.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer.replaceAll(/<[^>]*>/g, ''),
          },
        })),
      };
    },
  },
  methods: {
    preprocessText(text, linkText, linkDestination) {
      return preprocessTextForLinks(text, linkText, linkDestination);
    },
  },
  mounted() {
    // Add JSON-LD script to document head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(this.faqJsonLd);
    document.head.appendChild(script);

    this.$el.querySelectorAll('a').forEach((anchor) => {
      anchor.addEventListener('click', (ev) => {
        // arrow function callback to retain "this" context (Vue Component)
        // otherwise "this" would refer to the anchor element
        ev.preventDefault();
        // Need to use .getAttribute to get the raw href without resolution, browser returns full url
        // when using ev.target.href
        redirectWithParams(ev.target.getAttribute('href'), {}, this.$router);
      });
    });
  },
};
</script>

<style lang="scss" scoped>
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
      font-family: 'Cantata One', serif;

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
