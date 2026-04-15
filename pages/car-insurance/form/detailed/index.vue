<script setup>
import { redirectWithParams } from '~/composables/utils'

definePageMeta({
  layout: false,
  gtm: false,
})

useHead({
  link: [{ rel: 'preload', href: '/assets/protect_logo.svg', as: 'image' }]
})

const { proxy: ga } = useScriptGoogleAnalytics({ id: 'G-NGMYQLELL2' }, { trigger: 'onNuxtReady' })

const store = useStore()
const currentStep = ref(1)
const formData = ref({
  vehicleYear: ''
})

// Inject variant from parent router
const formVariant = inject('formVariant', ref('D'))

// Get user's state from GeoIP or wait for it to load
const userState = ref(null)
const isGeoLoaded = ref(false)

// Watch for GeoIP data to load
onNuxtReady(() => {
  console.log('page loaded nitro plugin');
})

onMounted(() => {
  ga.gtag('event', 'landing')

  // Set initial value if already loaded
  if (store.visitorInfo.region) {
    userState.value = store.visitorInfo.region.charAt(0).toUpperCase() + store.visitorInfo.region.slice(1)
    isGeoLoaded.value = true
  }

  // Watch for changes
  watch(() => store.visitorInfo.region, (newRegion) => {
    if (newRegion) {
      userState.value = newRegion.charAt(0).toUpperCase() + newRegion.slice(1)
    } else {
      userState.value = 'Your State'
    }
    isGeoLoaded.value = true
  }, { immediate: true })

  // Fallback timeout - show "Your State" after 2 seconds if GeoIP hasn't loaded
  setTimeout(() => {
    if (!isGeoLoaded.value) {
      userState.value = 'Your State'
      isGeoLoaded.value = true
    }
  }, 2000)
})

// Customize tagline based on variant
const taglineText = computed(() => {
  if (!isGeoLoaded.value) {
    return '' // Return empty string until GeoIP loads
  }

  switch (formVariant.value) {
    case 'A':
      return `Compare rates from top ${userState.value} insurers`
    case 'B':
      return 'Get your personalized quote in minutes'
    case 'C':
      return 'Save up to $500 on car insurance'
    case 'D':
    default:
      return `Find competitive ${userState.value} car insurance rates in minutes`
  }
})

const years = computed(() => {
  const currentYear = new Date().getFullYear()
  return Array.from({ length: 32 }, (_, i) => currentYear - i)
})

const selectYear = (year) => {
  formData.value.vehicleYear = year
  ga.gtag('event', 'year_selected', { vehicle_year: year })

  // redirectWithParams will automatically append rtclid and other tracking params from the store
  const options = {
    vehicle1year: year,
  }

  redirectWithParams("https://insure.protect.com", options, {
    'fbpb_auto': 'https://quote.protect.com',
  });
}
</script>

<template>
  <div class="quote-page">
    <!-- Header -->
    <FormHeader :tagline="taglineText" />

    <!-- Main Content -->
    <main class="quote-main">
      <div class="container">
        <!-- Progress Bar -->
        <div class="progress-bar">
          <div class="progress-fill" style="width: 4%"></div>
        </div>

        <!-- Form Step -->
        <div class="form-step">
          <label class="question-label">
            <h2>Select Your Vehicle Year to Begin</h2>
          </label>

          <!-- Year Grid -->
          <div class="year-grid">
            <button
              v-for="year in years"
              :key="year"
              class="year-button"
              @click="selectYear(year)"
            >
              {{ year }}
            </button>
          </div>
        </div>
      </div>
    </main>

    <footer class="form-footer">
      <div class="partners-section">
        <p class="partners-heading">Free quotes from over 40 providers including:</p>
        <div class="partner-logos">
          <img src="/assets/providers/progressive.png" alt="Progressive" class="partner-logo" loading="lazy">
          <img src="/assets/providers/geico.png" alt="Geico" class="partner-logo" loading="lazy">
          <img src="/assets/providers/nationwide.png" alt="Nationwide" class="partner-logo" loading="lazy">
          <img src="/assets/providers/state-farm.png" alt="State Farm" class="partner-logo" loading="lazy">
          <img src="/assets/providers/liberty.png" alt="Liberty Mutual" class="partner-logo" loading="lazy">
        </div>
        <p class="disclaimer">*These are Insurance companies that typically issue quotes to our users. Results may vary and are not guaranteed.</p>
      </div>
      <div class="privacy-policies">
        <FooterLegal>
          <p>
            Rates advertised are subject to availability and may not be available for all consumers. Rates vary based on factors such as driving history, location, vehicle type, coverage options, and other individual circumstances.
          </p>
          <p>
            The specified use of this site is to accurately connect you to a licensed insurance agent in your state who can match you and provide quotes from the auto insurance companies that best meet your needs. We are not a licensed agency or insurer and do not provide insurance or quotes for insurance. We do not represent any particular insurance carriers. We are a top online marketplace for  those seeking auto insurance and as such connect you directly to licensed local agents who will provide quotes from various insurance companies licensed in your state. If you do not receive a quote from a specific insurer you were searching for we recommend that you contact that insurer or one of its agents directly to obtain a quote. We are not responsible for any actions taken by any licensed agents or insurers. Any trademarks and/or copyrighted material displayed are the property of their respective owners.
            Protect.com® and its logos are trademarks or registered trademarks of Digital Media Solutions, LLC. All rights reserved.
          </p>
        </FooterLegal>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Reset and Base */
* {
  box-sizing: border-box;
}

.quote-page {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: #333;
  background: rgb(238, 245, 250);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0;
  width: 100%;
}

/* Main Content */
.quote-main {
  flex: 1;
  background: white;
  padding: 20px;
}

/* Progress Bar */
.progress-bar {
  width: 100%;
  height: 18px;
  background: #F5F8F7;
  border: 1px solid #efefef;
  border-radius: 50px;
  margin: 10px 0;
  overflow: hidden;
}

.progress-fill {
  height: 1.1em;
  display: inline-block;
  border-radius: 50px;
  background: #66c296;
  position: relative;
  top: -1px;
  transition: width 0.3s ease;
}

/* Form Step */
.form-step {
  margin: 0;
}

.question-label h2{
    font-size: 2em;
    color: #333;
    margin: 5px auto 20px;
    padding: 5px 0;
    position: relative;
    line-height: 1.2;
    font-family: "Nunito Sans", sans-serif;
    font-weight: normal;
}

/* Year Grid */
.year-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 12px;
  margin-bottom: 30px;
}

.year-button {
  background: rgb(238, 245, 250);
  border: 2px solid #f9fafb;
  font-size: 20px;
  margin: 0;
  white-space: nowrap;
  padding: 20px;
  line-height: 27px;
  border-radius: 4px;
  color: rgb(59, 84, 186);
  font-family: "Nunito Sans", sans-serif;
  text-transform: initial;
  box-shadow: none;
  transition: 0.25s;
  cursor: pointer;
  font-weight: 600;
}

.year-button:hover {
  border: 2px solid rgb(59, 84, 186);
}

.year-button:active {
  transform: translateY(0);
}

.form-footer {
  padding: 20px;
  background: white;
}

.partners-section {
  text-align: center;
  margin-bottom: 40px;
  display: none;
}

@media screen and (min-width: 768px) {
  .partners-section {
    display: block;
  }
}

.partners-heading {
  font-size: 21px;
  color: #666;
  margin: 0 0 20px 0;
  font-weight: bold;
  font-family: "Nunito Sans", sans-serif;
}

.partner-logos {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.partner-logo {
  width: 156px;
  object-fit: contain;
}

.disclaimer {
  font-size: 11px;
  color: #666;
  font-style: italic;
  margin: 0;
}

/* Mobile Responsive */
@media screen and (max-width: 768px) {
  .year-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  .year-button {
    padding: 14px 6px;
    font-size: 14px;
  }
}

@media screen and (max-width: 480px) {
  .year-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .year-button {
    padding: 20px;
    font-size: 20px;
  }
}
</style>
