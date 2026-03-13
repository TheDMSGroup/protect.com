<script setup>
import { getFormType, assignABVariant, AB_TEST_VARIANTS } from '~/utils/form-router-config'

definePageMeta({
  layout: false
})

const route = useRoute()

// Determine form type reactively
const formType = computed(() => {
  // If no variant in URL, randomly assign one
  if (!route.query.variant) {
    const randomVariant = assignABVariant()
    return AB_TEST_VARIANTS[randomVariant]
  } else {
    return getFormType(route.query)
  }
})

// Determine variant letter for customization
const variant = computed(() => {
  if (route.query.variant) {
    return route.query.variant.toUpperCase()
  }
  // Map form type back to variant letter
  const variantEntry = Object.entries(AB_TEST_VARIANTS).find(([, type]) => type === formType.value)
  return variantEntry ? variantEntry[0] : 'A'
})

// Provide variant to child components
provide('formVariant', variant)

// Track form router event
onMounted(() => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'form_router',
      form_type: formType.value,
      variant: variant.value,
      utm_source: route.query.utm_source || '',
      utm_medium: route.query.utm_medium || '',
      utm_campaign: route.query.utm_campaign || ''
    })
  }
})

// Import the form components dynamically based on variant
const formComponent = computed(() => {
  switch (formType.value) {
    case 'chat-form':
      return defineAsyncComponent(() => import('~/pages/car-insurance/chat-form.vue'))
    case 'directtocall':
      return defineAsyncComponent(() => import('~/pages/car-insurance/directtocall/index.vue'))
    case 'forms-minimal':
      return defineAsyncComponent(() => import('~/pages/car-insurance/form/minimal/index.vue'))
    case 'forms-detailed':
      return defineAsyncComponent(() => import('~/pages/car-insurance/form/detailed/index.vue'))
    default:
      return defineAsyncComponent(() => import('~/pages/car-insurance/chat-form.vue'))
  }
})
</script>

<template>
  <div class="forms-container">
    <!-- Render the selected form component dynamically -->
    <component :is="formComponent" />
  </div>
</template>

<style scoped>
.forms-container {
  min-height: 100vh;
}
</style>
