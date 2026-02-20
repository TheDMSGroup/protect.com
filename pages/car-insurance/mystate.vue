<template>
  <div class="location-check">
    <div class="modal">
      <div class="spinner"></div>
      <p>Determining your location...</p>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/stores/store";

const store = useStore();

const getStateSlug = (region) => {
  if (!region) return null;
  const states = store.getStateValueMap();
  const normalizedRegion = region.toLowerCase();
  const state = states.find(
    (s) =>
      s.name.toLowerCase() === normalizedRegion ||
      s.abbreviation.toLowerCase() === normalizedRegion ||
      s.slug === normalizedRegion
  );
  return state?.slug || null;
};

onMounted(() => {
  // Watch for region changes only on client side
  watch(
    () => store.visitorInfo?.region,
    (region) => {
      if (region) {
        const slug = getStateSlug(region);
        if (slug) {
          navigateTo(`/car-insurance/${slug}`);
        } else {
          navigateTo('/car-insurance');
        }
      }
    },
    { immediate: true }
  );

  // Timeout fallback if GeoIP fails or takes too long
  setTimeout(() => {
    if (!store.visitorInfo?.region) {
      navigateTo('/car-insurance');
    }
  }, 5000);
});
</script>

<style lang="scss" scoped>
@import '../../scss/variables';
@import '../../scss/stateautoinsurance.scss';

.location-check {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: $gray-light;
}

.modal {
  background: $white;
  padding: 2rem 3rem;
  border: 1px solid $gray-medium;
  border-radius: 0.3rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 90%;
  margin: 1rem;

  p {
    margin-top: 1rem;
    color: $blue;
    font-size: 1.1rem;
    text-transform: uppercase;
    font-weight: 600;
  }
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border: 4px solid $gray-medium;
  border-top-color: $blue-light;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
