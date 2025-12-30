<template>
  <BundlePage :content="content" />
</template>

<script setup>
  const route = useRoute();
  const slug = "auto-" + (route.params.slug || "home");
  const content = ref(null);

  const useBundleController = () => {
    // Placeholder for bundle controller logic

    switch (slug) {
      case "auto-renters":
        content.value = {
          type: "Auto & Renters",
          descriptor: "renters",
          subheader: "Save on both your auto and renters insurance when you bundle them together with a single provider.",
          stats: {
            averageSavings: "$850",
            discountRange: "15-25%",
            customerSatisfaction: "78%",
          },
        };
        break;
      case "auto-life":
        content.value = {
          type: "Auto & Life",
          descriptor: "life insurance holders",
          subheader: "Protect what matters most by bundling your auto and life insurance for comprehensive coverage and savings.",
          stats: {
            averageSavings: "$850",
            discountRange: "15-25%",
            customerSatisfaction: "78%",
          },
        };
        break;
      default:
        content.value = {
          type: "Auto & Home",
          descriptor: "homeowners",
          subheader:
            "Join thousands of homeowners who are saving an average of $850 per year by bundling their auto and home insurance with one trusted provider.",
          stats: {
            averageSavings: "$850",
            discountRange: "15-25%",
            customerSatisfaction: "78%",
          },
          formComponent: "AutoHomeBundleForm",
          formAction: "https://insure.protect.com/",
          customFaq: [
            {
              question: "Can I bundle if I rent my home instead of owning?",
              answer:
                "Absolutely! While Auto & Home insurance protects the structure you own, renters can bundle their auto insurance with renters insurance for similar savings. Renters insurance covers your personal belongings, liability, and additional living expenses. Most providers offer bundling discounts of 10% to 20% when you combine auto and renters policies.",
            },
          ],
        };
    }
  };

  useBundleController();
</script>
