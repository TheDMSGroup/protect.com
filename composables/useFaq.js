import { preprocessTextForLinks } from "@/composables/utils.js";

// Fallback FAQs for when no specific FAQ data is available
const FALLBACK_FAQS = [
  {
    question: "How does Protect.com help me compare insurance quotes?",
    answer:
      "Protect.com connects you with multiple top-rated insurance providers, allowing you to compare quotes side-by-side in minutes. Our free comparison tool helps you find the best coverage at the most competitive rates without the hassle of contacting each company individually.",
  },
  {
    question: "Is it free to get insurance quotes through Protect.com?",
    answer:
      "Yes, absolutely! Using Protect.com to compare insurance quotes is completely free with no hidden fees or obligations. You can compare rates from multiple providers without any cost, and you're never required to purchase a policy.",
  },
  {
    question: "How quickly can I get insurance quotes?",
    answer:
      "Most users receive personalized insurance quotes within minutes. Simply provide some basic information about your needs, and our platform will connect you with multiple insurance providers who can offer you competitive rates. The entire process typically takes less than 5 minutes.",
  },
];

export const useFaq = (data) => {
  // Handle both reactive and non-reactive data
  const faqData = computed(() =>
    isRef(data) || isReactive(data) ? unref(data) : data
  );

  // Process FAQ items to add links - computed to ensure consistency between server and client
  const processedFaqForLinks = computed(() => {
    const currentData = faqData.value;

    // Use fallback FAQs if no data or invalid data
    let faqItems = [];
    if (!currentData?.faq || !Array.isArray(currentData.faq)) {
      faqItems = FALLBACK_FAQS;
    } else {
      faqItems = currentData.faq.filter(
        (item) => item && item.question && item.answer
      );
      // If all items were filtered out, use fallbacks
      if (faqItems.length === 0) {
        faqItems = FALLBACK_FAQS;
      }
    }

    return faqItems.map((item) => ({
      question:
        item.links && Array.isArray(item.links) && item.links.length > 0
          ? preprocessTextForLinks(item.question, item.links)
          : item.question,
      answer:
        item.links && Array.isArray(item.links) && item.links.length > 0
          ? preprocessTextForLinks(item.answer, item.links)
          : item.answer,
    }));
  });

  // generate json ld from input
  // Computed property for JSON-LD structured data
  const faqJsonLd = computed(() => {
    const currentData = faqData.value;

    // Use fallback FAQs if no data or invalid data
    let validFaqs = [];
    if (!currentData?.faq || !Array.isArray(currentData.faq)) {
      validFaqs = FALLBACK_FAQS;
    } else {
      validFaqs = currentData.faq.filter(
        (item) => item && item.question && item.answer
      );
      // If no valid FAQs, use fallbacks
      if (validFaqs.length === 0) {
        validFaqs = FALLBACK_FAQS;
      }
    }

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: validFaqs.map((item) => ({
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
