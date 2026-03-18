<script setup>
import { getFormType, assignABVariant, AB_TEST_VARIANTS } from '~/utils/form-router-config'
import ChatForm from '~/pages/car-insurance/chat-form.vue'
import DirectToCall from '~/pages/car-insurance/directtocall/index.vue'
import MinimalForm from '~/pages/car-insurance/form/minimal/index.vue'
import DetailedForm from '~/pages/car-insurance/form/detailed/index.vue'

definePageMeta({
  layout: false
})

const route = useRoute()

// Determine form type (works on both server and client)
let formType
let variant

if (import.meta.server) {
  // Server-side: determine form type once
  if (!route.query.variant) {
    const randomVariant = assignABVariant()
    formType = AB_TEST_VARIANTS[randomVariant]
    variant = randomVariant
  } else {
    formType = getFormType(route.query)
    const variantEntry = Object.entries(AB_TEST_VARIANTS).find(([, type]) => type === formType)
    variant = variantEntry ? variantEntry[0] : 'A'
  }
} else {
  // Client-side: use reactive computed
  const formTypeComputed = computed(() => {
    if (!route.query.variant) {
      const randomVariant = assignABVariant()
      return AB_TEST_VARIANTS[randomVariant]
    } else {
      return getFormType(route.query)
    }
  })

  formType = formTypeComputed.value

  const variantComputed = computed(() => {
    if (route.query.variant) {
      return route.query.variant.toUpperCase()
    }
    const variantEntry = Object.entries(AB_TEST_VARIANTS).find(([, type]) => type === formTypeComputed.value)
    return variantEntry ? variantEntry[0] : 'A'
  })

  variant = variantComputed.value
}

// Provide variant to child components
provide('formVariant', ref(variant))

// Track form router event (client-side only)
onMounted(() => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'form_router',
      form_type: formType,
      variant: variant,
      utm_source: route.query.utm_source || '',
      utm_medium: route.query.utm_medium || '',
      utm_campaign: route.query.utm_campaign || ''
    })
  }
})

// Select the form component based on form type (works in SSR)
const formComponent = (() => {
  switch (formType) {
    case 'chat-form':
      return ChatForm
    case 'directtocall':
      return DirectToCall
    case 'forms-minimal':
      return MinimalForm
    case 'forms-detailed':
      return DetailedForm
    default:
      return ChatForm
  }
})()
</script>

<template>
  <div class="forms-container">
    <!-- Render the selected form component (SSR-compatible) -->
    <component :is="formComponent" />
  </div>
</template>

<style scoped>
.forms-container {
  min-height: 100vh;
}
</style>
