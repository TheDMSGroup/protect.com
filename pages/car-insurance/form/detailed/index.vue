<script setup>
definePageMeta({
  layout: false
})

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
onMounted(() => {
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
  // Navigate to next step or submit
  console.log('Selected year:', year)
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
          <div class="progress-fill" style="width: 12.5%"></div>
        </div>

        <!-- Form Step -->
        <div class="form-step">
          <h1 class="form-title">Select Your Vehicle Year to Begin</h1>

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

    <!-- Footer -->
    <footer class="quote-footer">
      <div class="container">
        <!-- Partner Logos -->
        <div class="partners-section">
          <p class="partners-heading">Free quotes from over 40 providers including:</p>

          <div class="partner-logos">
            <img
              src="https://product.impressure.io/build/images/providers/progressive.png"
              alt="Progressive"
              class="partner-logo"
            >
            <img
              src="https://djk97zng6lbya.cloudfront.net/2025/04/26/00/53/06/5af83923-a0b8-4126-94be-125b502b04ea.png"
              alt="Geico"
              class="partner-logo"
            >
            <img
              src="https://product.impressure.io/build/images/providers/nationwide.png"
              alt="Nationwide"
              class="partner-logo"
            >
            <img
              src="https://product.impressure.io/build/images/providers/state-farm.png"
              alt="State Farm"
              class="partner-logo"
            >
            <img
              src="https://product.impressure.io/build/images/providers/liberty.png"
              alt="Liberty Mutual"
              class="partner-logo"
            >
          </div>

          <p class="disclaimer">
            *These are Insurance companies that typically issue quotes to our users. Results may vary and are not guaranteed.
          </p>
        </div>

        <!-- Legal Links -->
        <div class="legal-section">
          <p>
            <a href="https://dmsunsub.io/">Do Not Sell Or Share My Personal Information</a>
          </p>
          <p>
            Protect.com |
            <a href="https://easy.protect.com/privacy.php" target="_blank">Privacy Policy</a> |
            <a href="https://easy.protect.com/terms.php" target="_blank">Terms Of Use</a> |
            <a href="https://easy.protect.com/california.php" target="_blank">California Privacy Notice</a>
          </p>
          <p class="disclaimer-text">
            Rates advertised are subject to availability and may not be available for all consumers. Rates vary based on factors such as driving history, location, vehicle type, coverage options, and other individual circumstances.
          </p>
          <p class="disclaimer-text">
            The specified use of this site is to accurately connect you to a licensed insurance agent in your state who can match you and provide quotes from the auto insurance companies that best meet your needs.
          </p>
        </div>
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
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

/* Main Content */
.quote-main {
  flex: 1;
  background: white;
  padding: 40px 0;
}

/* Progress Bar */
.progress-bar {
  width: 100%;
  height: 18px;
  background: #f0f0f0;
  border-radius: 10px;
  margin-bottom: 40px;
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
  max-width: 800px;
  margin: 0 auto;
}

.form-title {
  font-size: 28px;
  font-weight: 400;
  color: #333;
  margin: 0 0 40px 0;
  text-align: left;
}

/* Year Grid */
.year-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 12px;
  margin-bottom: 60px;
}

.year-button {
  background: rgb(238, 245, 250);
  border: 2px solid #f9fafb;
  font-size: 20px;
  margin: 0;
  white-space: nowrap;
  padding: 20px;
  line-height: 27px;
  font-weight: 600;
  border-radius: 4px;
  color: rgb(59, 84, 186);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  text-transform: initial;
  box-shadow: none;
  transition: 0.25s;
  cursor: pointer;
}

.year-button:hover {
  background: #e5e7eb;
  border-color: #e5e7eb;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.year-button:active {
  transform: translateY(0);
}

/* Footer */
.quote-footer {
  background: white;
  border-top: 1px solid #e0e0e0;
  padding: 40px 0 30px;
  margin-top: auto;
}

/* Partners Section */
.partners-section {
  text-align: center;
  margin-bottom: 40px;
}

.partners-heading {
  font-size: 14px;
  color: #333;
  margin: 0 0 20px 0;
  font-weight: 400;
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
  height: 35px;
  width: auto;
  object-fit: contain;
}

.disclaimer {
  font-size: 11px;
  color: #666;
  font-style: italic;
  margin: 0;
}

/* Legal Section */
.legal-section {
  text-align: center;
  font-size: 11px;
  color: #666;
  line-height: 1.6;
}

.legal-section p {
  margin: 10px 0;
}

.legal-section a {
  color: #666;
  text-decoration: none;
}

.legal-section a:hover {
  text-decoration: underline;
}

.disclaimer-text {
  margin-top: 15px;
}

/* Mobile Responsive */
@media screen and (max-width: 768px) {
  .form-title {
    font-size: 22px;
    margin-bottom: 30px;
  }

  .year-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  .year-button {
    padding: 14px 6px;
    font-size: 14px;
  }

  .partner-logos {
    gap: 20px;
  }

  .partner-logo {
    height: 28px;
  }
}

@media screen and (max-width: 480px) {
  .year-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .year-button {
    padding: 12px 4px;
    font-size: 13px;
  }
}
</style>
