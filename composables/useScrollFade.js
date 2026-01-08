export const useScrollFade = (target) => {
  const observer = ref(null);

  onMounted(() => {
    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    observer.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Find all fade-in elements across the entire component
    if (target.value) {
      target.value.querySelectorAll(".fade-in").forEach((el) => {
        observer.value.observe(el);
      });
    }
  });

  onBeforeUnmount(() => {
    // Clean up observers if needed
    if (observer.value) {
      observer.value.disconnect();
    }
  });
};
