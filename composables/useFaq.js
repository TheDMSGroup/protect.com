import { preprocessTextForLinks } from "@/composables/utils.js";

/**
 * Extract FAQs from spreadsheet data that uses the faq_question_N/faq_answer_N format.
 * @param {Object} data - The spreadsheet row data (can be reactive ref or plain object)
 * @param {number} maxFaqs - Maximum number of FAQs to extract (default: 4)
 * @returns {Array|null} Array of FAQ objects { question, answer } or null if no custom FAQs
 */
export const extractFaqsFromData = (data, maxFaqs = 4) => {
  if (!data) return null;

  const hasCustomFaqs = data['faq_question_1'] && data['faq_answer_1'];
  if (!hasCustomFaqs) return null;

  const faqs = [];
  for (let i = 1; i <= maxFaqs; i++) {
    const question = data[`faq_question_${i}`];
    const answer = data[`faq_answer_${i}`];
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }

  return faqs.length > 0 ? faqs : null;
};

export const useFaq = (data) => {
  // Handle both reactive and non-reactive data
  const faqData = computed(() => (isRef(data) || isReactive(data) ? unref(data) : data));

  // Process FAQ items to add links - computed to ensure consistency between server and client
  const processedFaqForLinks = computed(() => {
    const currentData = faqData.value;
    if (!currentData?.faq) return [];

    return currentData.faq.map((item) => ({
      question: item.links && Array.isArray(item.links) && item.links.length > 0 ? preprocessTextForLinks(item.question, item.links) : item.question,
      answer: item.links && Array.isArray(item.links) && item.links.length > 0 ? preprocessTextForLinks(item.answer, item.links) : item.answer,
    }));
  });

  // generate json ld from input
  // Computed property for JSON-LD structured data
  const faqJsonLd = computed(() => {
    const currentData = faqData.value;
    if (!currentData?.faq) return null;

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: currentData.faq.map((item) => ({
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

  return processedFaqForLinks;
};
