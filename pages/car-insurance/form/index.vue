<script setup>
import { getFormType, assignABVariant, AB_TEST_VARIANTS } from '~/utils/form-router-config'
import ChatForm from '~/pages/car-insurance/chat-form.vue'
import DirectToCall from '~/pages/car-insurance/directtocall/index.vue'
import MinimalForm from '~/pages/car-insurance/form/minimal/index.vue'
import DetailedForm from '~/pages/car-insurance/form/detailed/index.vue'

definePageMeta({
  layout: false,
  gtm: false,
})

useHead({
  script: [
    { src: 'https://rttracking.protect.com/uniclick.js?attribution=lastpaid&cookiedomain=protect.com&cookieduration=90&defaultcampaignid=68c9bcd22af551454ef88733&regviewonce=false', async: true },
  ],
})


const route = useRoute()
const store = useStore()

// Read Statsig variant from SSR middleware context — hydrates automatically on client
const insurifyVariant = useState('insurifyVariant', () => {
  const event = useRequestEvent()
  return event?.context.insurifyVariant ?? ''
})
if (insurifyVariant.value) {
  store.setVisitorInfo({ variant: insurifyVariant.value })
}

// Determine form type — only call assignABVariant if no variant is already set
let formType
let variant

if (import.meta.server) {
  if (route.query.variant) {
    formType = getFormType(route.query)
    const variantEntry = Object.entries(AB_TEST_VARIANTS).find(([, type]) => type === formType)
    variant = variantEntry ? variantEntry[0] : 'A'
  } else if (store.visitorInfo.variant) {
    formType = AB_TEST_VARIANTS[store.visitorInfo.variant] || AB_TEST_VARIANTS['D']
    variant = store.visitorInfo.variant
  } else {
    const randomVariant = assignABVariant()
    formType = AB_TEST_VARIANTS[randomVariant]
    variant = randomVariant
  }
} else {
  const formTypeComputed = computed(() => {
    if (route.query.variant) {
      return getFormType(route.query)
    } else if (store.visitorInfo.variant) {
      return AB_TEST_VARIANTS[store.visitorInfo.variant] || AB_TEST_VARIANTS['D']
    } else {
      return AB_TEST_VARIANTS[assignABVariant()]
    }
  })

  formType = formTypeComputed.value

  const variantComputed = computed(() => {
    if (route.query.variant) {
      return route.query.variant.toUpperCase()
    }
    return store.visitorInfo.variant || assignABVariant()
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
      variant: insurifyVariant.value || variant,
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
