
<template>
  <div class="insurance-app">

    <!-- Progress Steps -->
    <div class="progress-bar">
      <div class="progress-content">
        <div class="steps-container">
          <template v-for="(step, idx) in steps" :key="step.id">
            <div class="step-wrapper">
              <div class="step-item">
                <div :class="['step-icon', `step-${getStepStatus(step.id)}`]">
                  <!-- Checkmark for completed -->
                  <svg v-if="getStepStatus(step.id) === 'completed'" class="icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <!-- Vehicles - Car icon -->
                  <svg v-else-if="step.id === 'vehicles'" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-2-4H7L5 9m14 0h1a1 1 0 011 1v3a1 1 0 01-1 1h-1m-14 0H4a1 1 0 01-1-1v-3a1 1 0 011-1h1m14 0H5m14 4v3a1 1 0 01-1 1h-2a1 1 0 01-1-1v-1H9v1a1 1 0 01-1 1H6a1 1 0 01-1-1v-3" />
                    <circle cx="7.5" cy="14.5" r="1.5" fill="currentColor" />
                    <circle cx="16.5" cy="14.5" r="1.5" fill="currentColor" />
                  </svg>
                  <!-- Drivers - User icon -->
                  <svg v-else-if="step.id === 'drivers'" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <!-- Insurance - Shield icon -->
                  <svg v-else-if="step.id === 'insurance'" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <!-- Contact - Mail icon -->
                  <svg v-else-if="step.id === 'contact'" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div :class="['step-label', getStepStatus(step.id) === 'active' ? 'active' : '']">
                  {{ step.label }}
                </div>
              </div>
            </div>
            <div v-if="idx < steps.length - 1" :class="['step-connector', getStepStatus(step.id) === 'completed' ? 'completed' : '']" />
          </template>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-container">
      <div class="content-wrapper">
        <!-- Chat Section -->
        <div :class="['chat-section', { 'split-view': apiResults }]">
          <div class="chat-header">
            <h2>Chat with Us</h2>
            <p>We'll guide you through getting your quote</p>
          </div>

          <div ref="messagesContainer" class="messages-container">
            <div v-for="(msg, idx) in messages" :key="idx" :class="['message-wrapper', `align-${msg.type === 'user' ? 'end' : msg.type === 'phone' || msg.type === 'tcpa' ? 'center' : 'start'}`]">
              <!-- Phone Button -->
              <a v-if="msg.type === 'phone'" :href="`tel:${msg.number}`" class="phone-button">
                <svg class="phone-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call {{ msg.number }}
              </a>

              <!-- TCPA Consent -->
              <div v-else-if="msg.type === 'tcpa'" class="tcpa-container">
                <div class="tcpa-text">
                  By clicking "Get Auto & Home Quotes", I provide my express consent via e-signature to be contacted, for marketing purposes, by or on behalf of Quotza.com
                  <a href="https://easy.quotza.com/partners.php" target="_blank" rel="noopener noreferrer">partners</a>, by telephone, which may include artificial, generative AI, or pre-recorded voice messages and/or SMS text messages, delivered via automatic telephone dialing system at the number I provided regarding Auto & Home Insurance offers, even if my number is on a Federal, State or Company Do Not Call list. I also represent that I am the subscriber and primary user of the telephone number that I have provided above. I understand that my consent is not required to make a purchase or obtain services and that I may opt-out at any time. In order to proceed without providing consent, skip. I certify that I am a US resident over 18, and I agree to the
                  <a href="https://easy.quotza.com/privacy.php" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and
                  <a href="http://easy.quotza.com/terms.php" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>. I understand and agree that third parties, including, but not limited to, Jornaya and Active Prospect are being employed to monitor my activity on this website today.
                </div>
                <div class="tcpa-buttons">
                  <button @click="handleQuickReply('Yes, I agree')" class="tcpa-accept">
                    Get Auto & Home Quotes
                  </button>
                  <button @click="handleQuickReply('skip')" class="tcpa-skip">
                    Skip
                  </button>
                </div>
              </div>

              <!-- Regular Messages -->
              <div v-else :class="['message-bubble', `bubble-${msg.type}`, { 'celebration': msg.isCelebration, 'positive': msg.isPositive }]">
                {{ msg.text }}
              </div>
            </div>

            <!-- Typing Indicator -->
            <ChatTypingIndicator v-if="isTyping" />

            <!-- Loading -->
            <div v-if="isLoadingResults" class="loading-container">
              <div class="spinner"></div>
              <p>Finding your best quotes...</p>
            </div>

            <!-- Quick Replies -->
            <div v-if="quickReplies.length > 0 && !apiResults" class="quick-replies">
              <button
                v-for="(reply, idx) in quickReplies"
                :key="idx"
                @click="handleQuickReply(reply)"
                class="quick-reply-btn"
              >
                {{ reply }}
              </button>
            </div>

            <!-- Search Suggestions (for make/model typeahead) -->
            <div v-if="searchSuggestions.length > 0 && !apiResults" class="quick-replies">
              <button
                v-for="(suggestion, idx) in searchSuggestions"
                :key="idx"
                @click="handleQuickReply(suggestion)"
                class="quick-reply-btn"
              >
                {{ suggestion }}
              </button>
            </div>
          </div>

          <!-- Input -->
          <div v-if="!apiResults && currentQuestion?.type !== 'tcpa_consent'" class="chat-input">
            <input
              v-model="inputValue"
              @keypress.enter="handleSend"
              @input="handleSearchInput"
              @keypress="handleKeypress"
              :type="currentQuestion?.type === 'vehicle_count' ? 'tel' : 'text'"
              :inputmode="currentQuestion?.type === 'vehicle_count' ? 'numeric' : 'text'"
              :pattern="currentQuestion?.type === 'vehicle_count' ? '[0-9]*' : undefined"
              :placeholder="getInputPlaceholder()"
              class="input-field"
            />
            <button @click="handleSend" class="send-button">
              <svg class="send-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send
            </button>
          </div>
        </div>

        <!-- Results Section -->
        <MastodonFeedTopMatchStar v-if="apiResults" :results="apiResults" />

        <!-- Summary Panel -->
        <div v-if="!apiResults" class="summary-panel">
          <h2>Your Information</h2>

          <!-- Vehicles -->
          <div v-if="formData.vehicles.length > 0" class="summary-section">
            <h3>
              <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
              Vehicles ({{ formData.vehicles.length }})
            </h3>
            <div v-for="(v, idx) in formData.vehicles" :key="idx">
              <div v-if="v.year" class="summary-item">
                {{ v.year }} {{ v.make }} {{ v.model }}
              </div>
            </div>
          </div>

          <!-- Drivers -->
          <div v-if="formData.drivers.length > 0" class="summary-section">
            <h3>
              <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Drivers ({{ formData.drivers.length }})
            </h3>
            <div v-for="(d, idx) in formData.drivers" :key="idx">
              <div v-if="d.firstName" class="summary-item">
                <div class="driver-name">{{ d.firstName }} {{ d.lastName }}</div>
                <div v-if="d.dob" class="driver-dob">DOB: {{ d.dob }}</div>
              </div>
            </div>
          </div>

          <!-- Insurance -->
          <div v-if="formData.insurance.currentCompany" class="summary-section">
            <h3>
              <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Insurance
            </h3>
            <div class="summary-details">
              <div>Company: {{ formData.insurance.currentCompany }}</div>
              <div v-if="formData.insurance.coverageLength">Coverage: {{ formData.insurance.coverageLength }} years</div>
            </div>
          </div>

          <!-- Contact -->
          <div v-if="formData.contact.email" class="summary-section">
            <h3>
              <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Contact
            </h3>
            <div class="summary-details">
              <div>{{ formData.contact.email }}</div>
              <div v-if="formData.contact.phone">{{ formData.contact.phone }}</div>
            </div>
          </div>

          <!-- Discounts -->
          <div v-if="discounts.length > 0" class="summary-section">
            <h3>
              <div class="discount-icon-wrapper">
                <span class="discount-emoji">🎉</span>
                <span class="discount-badge">{{ discounts.length }}</span>
              </div>
              Discounts
            </h3>
            <div class="discount-list">
              <div v-for="(discount, idx) in discounts" :key="idx" class="discount-item">
                <span class="checkmark">✓</span>
                <span>{{ discount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, nextTick, onMounted } from 'vue'
import { useVehicleApi } from '~/composables/useVehicleApi'
import { useMastodonApi } from '~/composables/useMastodonApi'

const { getMakes, getModels, getYears, findMatch } = useVehicleApi()
const { submitLead, buildLeadPayload } = useMastodonApi()
const vehicleYears = getYears()
const availableMakes = ref([])
const availableModels = ref([])
const searchSuggestions = ref([])

const messages = ref([])
const inputValue = ref('')
const currentStep = ref('welcome')
const formData = reactive({
  vehicles: [],
  drivers: [],
  insurance: {},
  contact: {}
})
const currentQuestion = ref(null)
const quickReplies = ref([])
const awaitingAnswer = ref(true)
const apiResults = ref(null)
const isLoadingResults = ref(false)
const showMarriedMessage = ref(true)
const discounts = ref([])
const emojiIndex = ref(0)
const messagesContainer = ref(null)
const isTyping = ref(false)

const celebrationEmojis = ['🎉', '🙌', '👍', '🎊', '✨', '💰', '🌟']

const steps = [
  { id: 'vehicles', label: 'Vehicles' },
  { id: 'drivers', label: 'Drivers' },
  { id: 'insurance', label: 'Insurance' },
  { id: 'contact', label: 'Contact' }
]

// Lifecycle - use onMounted to avoid hydration mismatch
onMounted(() => {
  // Check for previewfeed URL param to show mock results immediately
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.get('previewfeed') === 'true') {
    apiResults.value = getMockResults()
  } else {
    setTimeout(() => {
      addBotMessage("Hi! I'm here to help you get a quote for your auto insurance. I'll guide you through a few questions to find you the best rate. Ready to get started?", false, ['Yes', 'No, I\'d rather talk to someone on the phone'])
      currentQuestion.value = { type: 'welcome', expecting: 'confirmation' }
    }, 500)
  }
})

watch([messages, isTyping], () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}, { deep: true })

/**
 * Convert 2-digit year to 4-digit year based on context
 * @param {number} twoDigitYear - The 2-digit year (0-99)
 * @param {string} context - 'vehicle' (past 40 years) or 'age' (15-115 years old)
 * @returns {number} - The 4-digit year
 */
const expandTwoDigitYear = (twoDigitYear, context = 'vehicle') => {
  const currentYear = new Date().getFullYear()
  const currentCentury = Math.floor(currentYear / 100) * 100 // 2000
  const lastCentury = currentCentury - 100 // 1900

  if (context === 'vehicle') {
    // Vehicles: accept past 40 years only
    const minYear = currentYear - 40
    const year2000s = currentCentury + twoDigitYear // e.g., 2023
    const year1900s = lastCentury + twoDigitYear // e.g., 1923

    // Prefer 2000s if valid, otherwise 1900s
    if (year2000s >= minYear && year2000s <= currentYear + 1) {
      return year2000s
    }
    if (year1900s >= minYear && year1900s <= currentYear + 1) {
      return year1900s
    }
    // Default to 2000s even if invalid (validation will catch it)
    return year2000s
  }

  if (context === 'age') {
    // Age: person must be 15-115 years old
    const year2000s = currentCentury + twoDigitYear
    const year1900s = lastCentury + twoDigitYear

    const age2000s = currentYear - year2000s
    const age1900s = currentYear - year1900s

    // Check which century gives a valid age (15-115)
    if (age2000s >= 15 && age2000s <= 115) {
      return year2000s
    }
    if (age1900s >= 15 && age1900s <= 115) {
      return year1900s
    }
    // Default to whichever is closer to valid range
    return age2000s >= 0 ? year2000s : year1900s
  }

  return currentCentury + twoDigitYear
}

const getStepStatus = (stepId) => {
  const stepOrder = ['vehicles', 'drivers', 'insurance', 'contact']
  const currentIndex = stepOrder.indexOf(currentStep.value)
  const stepIndex = stepOrder.indexOf(stepId)

  if (stepIndex < currentIndex) return 'completed'
  if (stepIndex === currentIndex) return 'active'
  return 'upcoming'
}

const addDiscount = (discountName) => {
  if (!discounts.value.includes(discountName)) {
    discounts.value.push(discountName)
  }
}

const getNextEmoji = () => {
  const emoji = celebrationEmojis[emojiIndex.value]
  emojiIndex.value = (emojiIndex.value + 1) % celebrationEmojis.length
  return emoji
}

const addBotMessage = (text, isPositive = false, replies = [], isCelebration = false, onComplete = null) => {
  // Show typing indicator
  isTyping.value = true

  // Random delay between 800ms and 2000ms to simulate typing
  const typingDelay = Math.floor(Math.random() * 1200) + 800

  setTimeout(() => {
    isTyping.value = false
    messages.value.push({ type: 'bot', text, isPositive, isCelebration })

    // Show quick replies after message appears
    if (replies.length > 0) {
      setTimeout(() => {
        quickReplies.value = replies
      }, 300)
    } else {
      quickReplies.value = replies
    }
    awaitingAnswer.value = true

    // Call the completion callback if provided
    if (onComplete) {
      setTimeout(() => {
        onComplete()
      }, 300)
    }
  }, typingDelay)
}

const addUserMessage = (text) => {
  messages.value.push({ type: 'user', text })
}

const handleSend = () => {
  if (!inputValue.value.trim()) return

  addUserMessage(inputValue.value)
  processResponse(inputValue.value)
  inputValue.value = ''
  quickReplies.value = []
  searchSuggestions.value = []
  awaitingAnswer.value = false
}

const handleQuickReply = (reply) => {
  addUserMessage(reply)
  processResponse(reply)
  inputValue.value = ''
  quickReplies.value = []
  searchSuggestions.value = []
  awaitingAnswer.value = false
}

const handleSearchInput = () => {
  const query = inputValue.value.trim().toLowerCase()

  // Only show suggestions for make/model questions
  if (!['vehicle_make', 'vehicle_model'].includes(currentQuestion.value?.type)) {
    searchSuggestions.value = []
    return
  }

  if (!query) {
    // Show priority makes when empty
    if (currentQuestion.value?.type === 'vehicle_make') {
      searchSuggestions.value = availableMakes.value.slice(0, 6)
    } else if (currentQuestion.value?.type === 'vehicle_model') {
      searchSuggestions.value = availableModels.value.slice(0, 6)
    }
    return
  }

  // Filter based on current question type
  let list = []
  if (currentQuestion.value?.type === 'vehicle_make') {
    list = availableMakes.value
  } else if (currentQuestion.value?.type === 'vehicle_model') {
    list = availableModels.value
  }

  // Find matches (starts with or contains)
  const startsWithMatches = list.filter(item => item.toLowerCase().startsWith(query))
  const containsMatches = list.filter(item => !item.toLowerCase().startsWith(query) && item.toLowerCase().includes(query))

  // Combine: startsWith first, then contains, limit to 6
  searchSuggestions.value = [...startsWithMatches, ...containsMatches].slice(0, 6)
}

const getInputPlaceholder = () => {
  if (currentQuestion.value?.type === 'vehicle_count') {
    return 'Enter number of vehicles...'
  }
  if (currentQuestion.value?.type === 'vehicle_year') {
    return 'e.g. 2020 or 2020 Honda Pilot...'
  }
  if (currentQuestion.value?.type === 'vehicle_make') {
    return 'Type to search makes...'
  }
  if (currentQuestion.value?.type === 'vehicle_model') {
    return 'Type to search models...'
  }
  return 'Type your answer...'
}

const handleKeypress = (event) => {
  if (currentQuestion.value?.type === 'vehicle_count') {
    // Allow letters if user is typing special phrases like "agent", "representative", etc.
    const currentInput = (inputValue.value + event.key).toLowerCase()

    // Words that could start a special phrase
    const specialWords = ['agent', 'representative', 'talk', 'speak', 'real', 'person', 'human', 'call', 'phone', 'help']

    // Check if what they're typing could be the start of a special word
    const couldBeSpecialPhrase = specialWords.some(word =>
      word.startsWith(currentInput) || currentInput.split(/\s+/).some(typed => word.startsWith(typed) || typed.startsWith(word.substring(0, typed.length)))
    )

    // Only block non-numeric if not typing a special phrase
    if (!/[0-9]/.test(event.key) && !couldBeSpecialPhrase) {
      event.preventDefault()
    }
  }
  // vehicle_year now allows letters for smart input like "2020 Honda Pilot"
}
const processResponse = async (response) => {
  const lowerResponse = response.toLowerCase()

  // Check for off-topic questions first
  if (awaitingAnswer.value) {
    const handled = handleOffTopicQuestion(response)
    if (handled) return
  }

  if (currentStep.value === 'welcome') {
    if (lowerResponse.includes('phone') || lowerResponse.includes('no')) {
      setTimeout(() => {
        addBotMessage("No problem! I'd be happy to connect you with someone. Give us a call at:")
      }, 800)
      setTimeout(() => {
        messages.value.push({ type: 'phone', number: '800-555-5555' })
      }, 1600)
      return
    }

    setTimeout(() => {
      addBotMessage("Great! Let's start with your vehicles. How many vehicles would you like to insure?", false, ['1', '2', '3', '4+'])
      currentStep.value = 'vehicles'
      currentQuestion.value = { type: 'vehicle_count' }
    }, 800)
    return
  }

  // Handle vehicles step
  if (currentStep.value === 'vehicles') {
    if (currentQuestion.value?.type === 'vehicle_count') {
      const count = response === '4+' ? 4 : parseInt(response)

      // Validate vehicle count
      if (isNaN(count) || count < 1 || count > 10) {
        setTimeout(() => {
          addBotMessage(`Please enter a valid number of vehicles (1-10).`)
        }, 400)
        return
      }

      // Initialize vehicles array
      for (let i = 0; i < count; i++) {
        formData.vehicles.push({ year: '', make: '', model: '' })
      }

      // Add multi-vehicle discount if more than 1 vehicle
      if (count > 1) {
        addDiscount('Multi-Vehicle Discount')
      }

      // Show recent years as quick replies
      const recentYears = vehicleYears.slice(0, 6).map(String)
      setTimeout(() => {
        addBotMessage(`Great! Let's get the details for vehicle 1. You can type the year, or enter your full vehicle like "2020 Honda Pilot".`, false, recentYears)
        currentQuestion.value = { type: 'vehicle_year', vehicleIndex: 0 }
      }, 800)
      return
    }

    if (currentQuestion.value?.type === 'vehicle_year') {
      const idx = currentQuestion.value.vehicleIndex
      const currentYear = new Date().getFullYear() + 1
      const minYear = currentYear - 40

      // Smart vehicle detection - check for year (4-digit or 2-digit) with optional make/model
      // Match 4-digit year (1985-2026) OR 2-digit year at start followed by text
      const fourDigitMatch = response.match(/\b(19|20)\d{2}\b/)
      const twoDigitMatch = response.match(/^(\d{1,2})\s+(.+)/)

      let year = null
      let afterYear = ''

      if (fourDigitMatch) {
        year = parseInt(fourDigitMatch[0])
        afterYear = response.substring(response.indexOf(fourDigitMatch[0]) + 4).trim()
      } else if (twoDigitMatch) {
        // "16 Honda Pilot" - expand 2-digit year
        const twoDigit = parseInt(twoDigitMatch[1])
        if (twoDigit >= 0 && twoDigit <= 99) {
          year = expandTwoDigitYear(twoDigit, 'vehicle')
          afterYear = twoDigitMatch[2].trim()
        }
      }

      if (year !== null) {
        // Validate year
        if (year < minYear || year > currentYear) {
          setTimeout(() => {
            addBotMessage(`Please enter a valid year between ${minYear} and ${currentYear}.`)
          }, 400)
          return
        }

        const words = afterYear.split(/\s+/).filter(w => w)

        if (words.length >= 1) {
          // User provided year + make (and possibly model)
          const make = words[0]
          const model = words.slice(1).join(' ') || ''

          // Validate make against API
          const makes = await getMakes(year)
          const matchedMake = findMatch(make, makes)

          if (matchedMake) {
            formData.vehicles[idx].year = year.toString()
            formData.vehicles[idx].make = matchedMake

            if (model) {
              // Validate model against API
              const models = await getModels(year, matchedMake)
              const matchedModel = findMatch(model, models)

              if (matchedModel) {
                formData.vehicles[idx].model = matchedModel

                // Check if there are more vehicles to add
                if (idx < formData.vehicles.length - 1) {
                  const recentYears = vehicleYears.slice(0, 6).map(String)
                  setTimeout(() => {
                    addBotMessage(`${getNextEmoji()} Perfect! Added your ${year} ${matchedMake} ${matchedModel}. Now let's get vehicle ${idx + 2}. Enter the year or full vehicle.`, true, recentYears)
                    currentQuestion.value = { type: 'vehicle_year', vehicleIndex: idx + 1 }
                  }, 800)
                } else {
                  setTimeout(() => {
                    addBotMessage(`${getNextEmoji()} Perfect! Added your ${year} ${matchedMake} ${matchedModel}. Now let's talk about the drivers. How many drivers will be on this policy?`, true, ['1', '2', '3', '4+'])
                    currentStep.value = 'drivers'
                    currentQuestion.value = { type: 'driver_count' }
                    searchSuggestions.value = []
                  }, 800)
                }
                return
              } else {
                // Model not found, ask for model
                const models = await getModels(year, matchedMake)
                availableModels.value = models
                setTimeout(() => {
                  addBotMessage(
                    `Got your ${year} ${matchedMake}! I couldn't find "${model}" though. What model is it?`,
                    false,
                    [],
                    false,
                    () => {
                      // Set search suggestions after message appears
                      searchSuggestions.value = models.slice(0, 6)
                    }
                  )
                  currentQuestion.value = { type: 'vehicle_model', vehicleIndex: idx }
                }, 400)
                return
              }
            } else {
              // No model provided, ask for it
              const models = await getModels(year, matchedMake)
              availableModels.value = models
              setTimeout(() => {
                addBotMessage(
                  `Got your ${year} ${matchedMake}! What model is it?`,
                  false,
                  [],
                  false,
                  () => {
                    // Set search suggestions after message appears
                    searchSuggestions.value = models.slice(0, 6)
                  }
                )
                currentQuestion.value = { type: 'vehicle_model', vehicleIndex: idx }
              }, 400)
              return
            }
          } else {
            // Make not found, ask for make
            availableMakes.value = makes
            formData.vehicles[idx].year = year.toString()
            setTimeout(() => {
              addBotMessage(
                `Got ${year}! I couldn't find "${make}" though. What make is your vehicle?`,
                false,
                [],
                false,
                () => {
                  // Set search suggestions after message appears
                  searchSuggestions.value = makes.slice(0, 6)
                }
              )
              currentQuestion.value = { type: 'vehicle_make', vehicleIndex: idx }
            }, 400)
            return
          }
        }

        // Just year provided (no make/model text after)
        formData.vehicles[idx].year = year.toString()
      } else {
        // No pattern matched - try parsing as just a number
        let yearNum = parseInt(response)
        if (isNaN(yearNum)) {
          setTimeout(() => {
            addBotMessage(`Please enter a valid year between ${minYear} and ${currentYear}.`)
          }, 400)
          return
        }

        // Convert 2-digit year to 4-digit
        if (yearNum >= 0 && yearNum <= 99) {
          yearNum = expandTwoDigitYear(yearNum, 'vehicle')
        }

        if (yearNum < minYear || yearNum > currentYear) {
          setTimeout(() => {
            addBotMessage(`Please enter a valid year between ${minYear} and ${currentYear}.`)
          }, 400)
          return
        }
        formData.vehicles[idx].year = yearNum.toString()
      }

      // Fetch makes from API (show typing indicator while loading)
      isTyping.value = true
      const makes = await getMakes(formData.vehicles[idx].year)
      availableMakes.value = makes

      // Hide typing indicator and show the question
      isTyping.value = false
      setTimeout(() => {
        addBotMessage(
          `What's the make of your ${formData.vehicles[idx].year} vehicle? Type to search or select below:`,
          false,
          [],
          false,
          () => {
            // Set search suggestions after message appears
            searchSuggestions.value = makes.slice(0, 6)
          }
        )
        currentQuestion.value = { type: 'vehicle_make', vehicleIndex: idx }
      }, 300)
      return
    }

    if (currentQuestion.value?.type === 'vehicle_make') {
      const idx = currentQuestion.value.vehicleIndex

      // Try exact match first, then auto-select if only one option available
      let matchedMake = findMatch(response, availableMakes.value)
      if (!matchedMake && searchSuggestions.value.length === 1) {
        matchedMake = searchSuggestions.value[0]
      }
      // If no input and only one make available, auto-select it
      if (!matchedMake && !response.trim() && availableMakes.value.length === 1) {
        matchedMake = availableMakes.value[0]
      }

      if (!matchedMake) {
        setTimeout(() => {
          addBotMessage(`Sorry, "${response}" isn't in our list. Please select a make from the suggestions or type to search.`)
          searchSuggestions.value = availableMakes.value.slice(0, 6)
        }, 400)
        return
      }

      formData.vehicles[idx].make = matchedMake

      // Fetch models from API (show typing indicator while loading)
      isTyping.value = true
      const models = await getModels(formData.vehicles[idx].year, formData.vehicles[idx].make)
      availableModels.value = models

      // Hide typing indicator and show the question
      isTyping.value = false
      setTimeout(() => {
        addBotMessage(
          `And what model is your ${formData.vehicles[idx].year} ${formData.vehicles[idx].make}? Type to search or select below:`,
          false,
          [],
          false,
          () => {
            // Set search suggestions after message appears
            searchSuggestions.value = models.slice(0, 6)
          }
        )
        currentQuestion.value = { type: 'vehicle_model', vehicleIndex: idx }
      }, 300)
      return
    }

    if (currentQuestion.value?.type === 'vehicle_model') {
      const idx = currentQuestion.value.vehicleIndex

      // Try exact match first, then auto-select if only one option available
      let matchedModel = findMatch(response, availableModels.value)
      if (!matchedModel && searchSuggestions.value.length === 1) {
        matchedModel = searchSuggestions.value[0]
      }
      // If no input and only one model available, auto-select it
      if (!matchedModel && !response.trim() && availableModels.value.length === 1) {
        matchedModel = availableModels.value[0]
      }

      if (!matchedModel) {
        setTimeout(() => {
          addBotMessage(`Sorry, "${response}" isn't in our list. Please select a model from the suggestions or type to search.`)
          searchSuggestions.value = availableModels.value.slice(0, 6)
        }, 400)
        return
      }

      formData.vehicles[idx].model = matchedModel

      // Clear suggestions
      searchSuggestions.value = []

      // Check if there are more vehicles to add
      if (idx < formData.vehicles.length - 1) {
        const recentYears = vehicleYears.slice(0, 6).map(String)
        setTimeout(() => {
          addBotMessage(`${getNextEmoji()} Got it! Now let's get the details for vehicle ${idx + 2}. Enter the year or full vehicle.`, true, recentYears)
          currentQuestion.value = { type: 'vehicle_year', vehicleIndex: idx + 1 }
        }, 800)
      } else {
        // Move to drivers step
        setTimeout(() => {
          addBotMessage(`${getNextEmoji()} Excellent! Now let's talk about the drivers. How many drivers will be on this policy?`, true, ['1', '2', '3', '4+'])
          currentStep.value = 'drivers'
          currentQuestion.value = { type: 'driver_count' }
          searchSuggestions.value = []
        }, 800)
      }
      return
    }
  }

  // Handle drivers step
  if (currentStep.value === 'drivers') {
    if (currentQuestion.value?.type === 'driver_count') {
      const count = response === '4+' ? 4 : parseInt(response)

      // Validate driver count
      if (isNaN(count) || count < 1 || count > 10) {
        setTimeout(() => {
          addBotMessage(`Please enter a valid number of drivers (1-10).`, false, ['1', '2', '3', '4+'])
        }, 400)
        return
      }

      // Clear existing drivers and add new ones
      formData.drivers.length = 0
      for (let i = 0; i < count; i++) {
        formData.drivers.push({ firstName: '', lastName: '', dob: '', gender: '', married: '', military: '', employed: '' })
      }

      setTimeout(() => {
        addBotMessage(`Great! What's the first name of driver 1?`)
        currentQuestion.value = { type: 'driver_firstName', driverIndex: 0 }
      }, 800)
      return
    }

    if (currentQuestion.value?.type === 'driver_firstName') {
      const idx = currentQuestion.value.driverIndex
      formData.drivers[idx].firstName = response

      setTimeout(() => {
        addBotMessage(`And ${response}'s last name?`)
        currentQuestion.value = { type: 'driver_lastName', driverIndex: idx }
      }, 800)
      return
    }

    if (currentQuestion.value?.type === 'driver_lastName') {
      const idx = currentQuestion.value.driverIndex
      formData.drivers[idx].lastName = response

      setTimeout(() => {
        addBotMessage(`What's ${formData.drivers[idx].firstName}'s date of birth? (MM/DD/YYYY)`)
        currentQuestion.value = { type: 'driver_dob', driverIndex: idx }
      }, 800)
      return
    }

    if (currentQuestion.value?.type === 'driver_dob') {
      const idx = currentQuestion.value.driverIndex

      // Parse and potentially expand 2-digit year in DOB
      let dob = response
      const dobParts = response.split('/')
      if (dobParts.length === 3) {
        let year = parseInt(dobParts[2])
        // If 2-digit year, expand it for age context
        if (year >= 0 && year <= 99) {
          year = expandTwoDigitYear(year, 'age')
          dob = `${dobParts[0]}/${dobParts[1]}/${year}`
        }
      }

      formData.drivers[idx].dob = dob

      setTimeout(() => {
        addBotMessage(`What's ${formData.drivers[idx].firstName}'s gender?`, false, ['Male', 'Female'])
        currentQuestion.value = { type: 'driver_gender', driverIndex: idx }
      }, 800)
      return
    }

    if (currentQuestion.value?.type === 'driver_gender') {
      const idx = currentQuestion.value.driverIndex
      formData.drivers[idx].gender = response

      setTimeout(() => {
        addBotMessage(`Is ${formData.drivers[idx].firstName} married?`, false, ['Yes', 'No'])
        currentQuestion.value = { type: 'driver_married', driverIndex: idx }
      }, 800)
      return
    }

    if (currentQuestion.value?.type === 'driver_married') {
      const idx = currentQuestion.value.driverIndex
      formData.drivers[idx].married = response

      if (response.toLowerCase() === 'yes') {
        addDiscount('Married Discount')
        setTimeout(() => {
          addBotMessage(`${getNextEmoji()} Great! Married drivers often qualify for lower rates.`, true)
          // Ask military question only for first driver
          if (idx === 0) {
            setTimeout(() => {
              addBotMessage(`Does anyone in your family have any military affiliation?`, false, ['Yes', 'No'])
              currentQuestion.value = { type: 'driver_military', driverIndex: idx }
            }, 800)
          } else {
            setTimeout(() => {
              addBotMessage(`Is ${formData.drivers[idx].firstName} currently employed?`, false, ['Yes', 'No'])
              currentQuestion.value = { type: 'driver_employed', driverIndex: idx }
            }, 800)
          }
        }, 800)
      } else {
        // Ask military question only for first driver
        if (idx === 0) {
          setTimeout(() => {
            addBotMessage(`Does anyone in your family have any military affiliation?`, false, ['Yes', 'No'])
            currentQuestion.value = { type: 'driver_military', driverIndex: idx }
          }, 800)
        } else {
          setTimeout(() => {
            addBotMessage(`Is ${formData.drivers[idx].firstName} currently employed?`, false, ['Yes', 'No'])
            currentQuestion.value = { type: 'driver_employed', driverIndex: idx }
          }, 800)
        }
      }
      return
    }

    if (currentQuestion.value?.type === 'driver_military') {
      const idx = currentQuestion.value.driverIndex
      formData.drivers[idx].military = response

      if (response.toLowerCase() === 'yes') {
        addDiscount('Military Discount')
        setTimeout(() => {
          addBotMessage(`${getNextEmoji()} Thank you for your service! Military families often qualify for special discounts.`, true)
          setTimeout(() => {
            addBotMessage(`Is ${formData.drivers[idx].firstName} currently employed?`, false, ['Yes', 'No'])
            currentQuestion.value = { type: 'driver_employed', driverIndex: idx }
          }, 800)
        }, 800)
      } else {
        setTimeout(() => {
          addBotMessage(`Is ${formData.drivers[idx].firstName} currently employed?`, false, ['Yes', 'No'])
          currentQuestion.value = { type: 'driver_employed', driverIndex: idx }
        }, 800)
      }
      return
    }

    if (currentQuestion.value?.type === 'driver_employed') {
      const idx = currentQuestion.value.driverIndex
      formData.drivers[idx].employed = response

      // Check if there are more drivers to add
      if (idx < formData.drivers.length - 1) {
        setTimeout(() => {
          addBotMessage(`${getNextEmoji()} Got it! Now let's get info for driver ${idx + 2}. What's their first name?`, true)
          currentQuestion.value = { type: 'driver_firstName', driverIndex: idx + 1 }
        }, 800)
      } else {
        // Move to insurance step
        setTimeout(() => {
          addBotMessage(`${getNextEmoji()} Perfect! Now a few questions about your current insurance. Do you currently have auto insurance?`, true, ['Yes', 'No'])
          currentStep.value = 'insurance'
          currentQuestion.value = { type: 'has_insurance' }
        }, 800)
      }
      return
    }
  }

  // Handle insurance step
  if (currentStep.value === 'insurance') {
    if (currentQuestion.value?.type === 'has_insurance') {
      if (lowerResponse === 'yes') {
        addDiscount('Continuous Coverage Discount')
        setTimeout(() => {
          addBotMessage(`${getNextEmoji()} Great! Continuous coverage can help you save. Who's your current insurance provider?`, true, ['GEICO', 'State Farm', 'Progressive', 'Allstate', 'Other'])
          currentQuestion.value = { type: 'current_company' }
        }, 800)
      } else {
        setTimeout(() => {
          addBotMessage(`No problem! Let's move on to your contact information. What's your email address?`)
          currentStep.value = 'contact'
          currentQuestion.value = { type: 'email' }
        }, 800)
      }
      return
    }

    if (currentQuestion.value?.type === 'current_company') {
      formData.insurance.currentCompany = response

      setTimeout(() => {
        addBotMessage(`How long have you been with ${response}?`, false, ['Less than 1 year', '1-2 years', '3-5 years', '5+ years'])
        currentQuestion.value = { type: 'coverage_length' }
      }, 800)
      return
    }

    if (currentQuestion.value?.type === 'coverage_length') {
      formData.insurance.coverageLength = response

      if (response === '3-5 years' || response === '5+ years') {
        addDiscount('Loyalty Discount')
      }

      setTimeout(() => {
        addBotMessage(`${getNextEmoji()} Almost done! Now let's get your contact information. What's your email address?`, true)
        currentStep.value = 'contact'
        currentQuestion.value = { type: 'email' }
      }, 800)
      return
    }
  }

  // Handle contact step
  if (currentStep.value === 'contact') {
    if (currentQuestion.value?.type === 'email') {
      formData.contact.email = response

      setTimeout(() => {
        addBotMessage(`And what's the best phone number to reach you?`)
        currentQuestion.value = { type: 'phone' }
      }, 800)
      return
    }

    if (currentQuestion.value?.type === 'phone') {
      formData.contact.phone = response

      setTimeout(() => {
        addBotMessage(`${getNextEmoji()} Awesome! One last step - please review our consent terms:`, true)
        currentQuestion.value = { type: 'tcpa_consent' }
        messages.value.push({ type: 'tcpa' })
      }, 800)
      return
    }

    if (currentQuestion.value?.type === 'tcpa_consent') {
      if (lowerResponse.includes('agree') || lowerResponse.includes('yes')) {
        setTimeout(() => {
          addBotMessage(`${getNextEmoji()} Thank you! Let me find the best quotes for you...`, true)
          submitToApi()
        }, 800)
      } else {
        setTimeout(() => {
          addBotMessage(`No problem! We'll still find you some great quotes.`)
          submitToApi()
        }, 800)
      }
      return
    }
  }
}
const handleOffTopicQuestion = (question) => {
  const lowerQ = question.toLowerCase()

  // Check if user wants to talk to a person
  const wantsAgent = lowerQ.includes('agent') ||
    lowerQ.includes('representative') ||
    lowerQ.includes('talk to someone') ||
    lowerQ.includes('speak to someone') ||
    lowerQ.includes('real person') ||
    lowerQ.includes('human') ||
    lowerQ.includes('call me') ||
    lowerQ.includes('phone call')

  if (wantsAgent) {
    setTimeout(() => {
      addBotMessage("No problem! I'd be happy to connect you with someone. Give us a call at:")
    }, 800)
    setTimeout(() => {
      messages.value.push({ type: 'phone', number: '800-555-5555' })
    }, 1600)
    return true
  }

  const profanityWords = ['fuck', 'shit', 'damn', 'hell', 'ass', 'bitch', 'bastard', 'crap']
  const hasProfanity = profanityWords.some(word => lowerQ.includes(word))

  if (hasProfanity) {
    setTimeout(() => {
      addBotMessage("Kiss your mother with that mouth? 😊 Let's keep things professional and get you the best rates.")
    }, 800)
    setTimeout(() => {
      repeatCurrentQuestion()
    }, 1600)
    return true
  }

  const questionWords = ['what', 'when', 'why', 'where', 'how', 'does', 'do', 'did', 'who', 'which', 'can', 'could', 'would', 'will', 'should']
  const startsWithQuestion = questionWords.some(word => lowerQ.startsWith(word + ' ') || lowerQ.startsWith(word + "'"))
  const hasQuestionMark = question.includes('?')

  if (lowerQ.includes('rate') || lowerQ.includes('price') || lowerQ.includes('cost') || lowerQ.includes('much') || lowerQ.includes('expensive') || lowerQ.includes('cheap')) {
    setTimeout(() => {
      addBotMessage("Great question! Once we finish gathering your information, you'll be matched with top insurance providers who will give you customized quotes based on your specific situation.")
    }, 800)
    setTimeout(() => {
      repeatCurrentQuestion()
    }, 1600)
    return true
  }

  if (startsWithQuestion || hasQuestionMark) {
    if (lowerQ.includes('why') && (lowerQ.includes('need') || lowerQ.includes('important') || lowerQ.includes('ask'))) {
      setTimeout(() => {
        addBotMessage("Great question! Each detail helps us match you with providers who can offer the most accurate rates for your specific situation.")
      }, 800)
      setTimeout(() => {
        repeatCurrentQuestion()
      }, 1600)
      return true
    }

    setTimeout(() => {
      addBotMessage("I'm here to help you get matched with insurance providers who will give you customized quotes!")
    }, 800)
    setTimeout(() => {
      repeatCurrentQuestion()
    }, 1600)
    return true
  }

  return false
}
const repeatCurrentQuestion = () => {
  const idx = currentQuestion.value?.vehicleIndex || currentQuestion.value?.driverIndex || 0

  switch(currentQuestion.value?.type) {
    // Vehicle questions
    case 'vehicle_count':
      addBotMessage("How many vehicles would you like to insure?", false, ['1', '2', '3', '4+'])
      break
    case 'vehicle_year':
      const recentYears = vehicleYears.slice(0, 6).map(String)
      addBotMessage(`What year is vehicle ${idx + 1}? You can also type the full vehicle like "2020 Honda Pilot".`, false, recentYears)
      break
    case 'vehicle_make':
      searchSuggestions.value = availableMakes.value.slice(0, 6)
      addBotMessage(`What's the make of your ${formData.vehicles[idx]?.year || ''} vehicle?`)
      break
    case 'vehicle_model':
      searchSuggestions.value = availableModels.value.slice(0, 6)
      addBotMessage(`What model is your ${formData.vehicles[idx]?.year || ''} ${formData.vehicles[idx]?.make || ''}?`)
      break

    // Driver questions
    case 'driver_count':
      addBotMessage("How many drivers will be on this policy?", false, ['1', '2', '3', '4+'])
      break
    case 'driver_firstName':
      if (idx === 0) {
        addBotMessage(`What's the first name of driver 1?`)
      } else {
        addBotMessage(`What's driver ${idx + 1}'s first name?`)
      }
      break
    case 'driver_lastName':
      addBotMessage(`And ${formData.drivers[idx]?.firstName || 'their'}'s last name?`)
      break
    case 'driver_dob':
      addBotMessage(`What's ${formData.drivers[idx]?.firstName || 'their'}'s date of birth? (MM/DD/YYYY)`)
      break
    case 'driver_gender':
      addBotMessage(`What's ${formData.drivers[idx]?.firstName || 'their'}'s gender?`, false, ['Male', 'Female'])
      break
    case 'driver_married':
      addBotMessage(`Is ${formData.drivers[idx]?.firstName || 'the driver'} married?`, false, ['Yes', 'No'])
      break
    case 'driver_military':
      addBotMessage(`Does anyone in your family have any military affiliation?`, false, ['Yes', 'No'])
      break
    case 'driver_employed':
      addBotMessage(`Is ${formData.drivers[idx]?.firstName || 'the driver'} currently employed?`, false, ['Yes', 'No'])
      break

    // Insurance questions
    case 'has_insurance':
      addBotMessage("Do you currently have auto insurance?", false, ['Yes', 'No'])
      break
    case 'current_company':
      addBotMessage("Who's your current insurance provider?", false, ['GEICO', 'State Farm', 'Progressive', 'Allstate', 'Other'])
      break
    case 'coverage_length':
      addBotMessage("How long have you been with them?", false, ['Less than 1 year', '1-2 years', '3-5 years', '5+ years'])
      break

    // Contact questions
    case 'email':
      addBotMessage("What's your email address?")
      break
    case 'phone':
      addBotMessage("And what's the best phone number to reach you?")
      break

    default:
      addBotMessage("Let's continue with the next question.")
  }
}


const getMockResults = () => ({
  bids: [
    {
      bid_id: 1,
      buyer_name: "Progressive",
      exclusive: true,
      headline: "Drivers who save by switching to Progressive save $946 on average",
      description: "<ul><li>Safe Driver Discount</li><li>24/7 Claims Service</li><li>Bundle & Save</li></ul>",
      display_url: "www.progressive.com",
      image_url: "https://product.impressure.io/build/images/providers/progressive.png",
      click_url: "#"
    },
    {
      bid_id: 2,
      buyer_name: "GEICO",
      exclusive: false,
      headline: "15 minutes could save you 15% or more on car insurance",
      description: "<ul><li>Multi-Policy Discount</li><li>Good Driver Discount</li><li>24/7 Service</li></ul>",
      display_url: "www.geico.com",
      image_url: "https://product.impressure.io/build/images/providers/state-farm.png",
      click_url: "#"
    }
  ]
})

const submitToApi = async () => {
  const { proxy } = useScriptGoogleTagManager();
  isLoadingResults.value = true

  try {
    // Check for mastodonoff URL parameter
    const urlParams = new URLSearchParams(window.location.search)
    const useMockData = urlParams.get('mastodonoff') === 'true'
    const rtclid = urlParams.get('rtclid') || window.rtClickId || null;

    // Build the payload from form data
    const payload = buildLeadPayload(formData, {
      rtclid
    })

    let result
    if (useMockData) {
      console.log('Using mock Mastodon API data (mastodonoff=true)')
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      result = getMockResults()
    } else {
      // Submit to Mastodon API
      result = await submitLead(payload)
    }

    console.log('Mastodon API Response:', result)

    if (result && result.bids && result.bids.length > 0) {
      apiResults.value = result
      // On mobile, scroll results section to top of screen
      nextTick(() => {
        if (window.innerWidth < 768) {
          setTimeout(() => {
            const resultsSection = document.querySelector('.results-section')
            if (resultsSection) {
              resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          }, 100)
        }
      })
    } else {
      // Fallback if no bids returned
      addBotMessage("We couldn't find any quotes at this time. Please try again later or call us for assistance.")
      messages.value.push({ type: 'phone', number: '800-555-5555' })
    }
  } catch (err) {
    console.error('Error submitting to API:', err)
    addBotMessage("Something went wrong while getting your quotes. Please try again or call us for assistance.")
    messages.value.push({ type: 'phone', number: '800-555-5555' })
  } finally {
    isLoadingResults.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap');

* {
  box-sizing: border-box;
}

.insurance-app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh;
  background-color: #f9fafb;
  font-family: "Nunito Sans", sans-serif;
  font-size: 1rem;
  overflow: hidden;
}

/* Header */
.app-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 1.5rem;
}

.header-content {
  max-width: 72rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #003B71;
  letter-spacing: -0.025em;
}

.logo-tm {
  font-size: 0.75rem;
  color: #003B71;
}

.header-subtitle {
  font-size: 1rem;
  color: #4b5563;
}

/* Progress Bar */
.progress-bar {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 0.5rem 1rem;
  flex-shrink: 0;
}

@media (min-width: 640px) {
  .progress-bar {
    padding: 0.75rem 1.5rem;
  }
}

.progress-content {
  max-width: 72rem;
  margin: 0 auto;
}

.steps-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-wrapper {
  flex: 0;
  display: flex;
  align-items: center;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  flex: 1;
}

.step-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-completed {
  background-color: #22c55e;
  color: white;
}

.step-active {
  background-color: #2563eb;
  color: white;
}

.step-upcoming {
  background-color: #e5e7eb;
  color: #9ca3af;
}

.step-icon .icon {
  width: 1.25rem;
  height: 1.25rem;
}

.step-label {
  font-size: 1rem;
  font-weight: 500;
  color: #4b5563;
  text-align: center;
}

.step-label.active {
  color: #2563eb;
}

.step-connector {
  height: 0.125rem;
  flex: 1;
  min-width: 1rem;
  max-width: 4rem;
  margin: 0 0.25rem;
  margin-bottom: 1.5rem;
  background-color: #e5e7eb;
  flex-shrink: 0;
}

.step-connector.completed {
  background-color: #22c55e;
}

/* Desktop styles */
@media (min-width: 640px) {
  .step-item {
    flex-direction: row;
    gap: 0.5rem;
  }

  .step-icon {
    width: 2rem;
    height: 2rem;
  }

  .step-label {
    font-size: 1rem;
    text-align: left;
  }

  .step-connector {
    height: 0.25rem;
    width: 3rem;
    min-width: auto;
    max-width: none;
    flex: none;
    margin: 0 0.5rem;
    margin-bottom: 0;
  }
}

/* Main Container */
.main-container {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  max-width: 72rem;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .main-container {
    overflow: hidden;
  }
}

.content-wrapper {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

@media (min-width: 768px) {
  .content-wrapper {
    flex-direction: row;
    height: 100%;
    max-height: 90%;
    gap: 1.5rem;
    padding: 1.5rem;
  }
}

/* Chat Section */
.chat-section {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: all 0.3s;
  max-height: calc(100vh - 180px);
}

@media (min-width: 768px) {
  .chat-section {
    max-height: none;
  }
}

.chat-section.split-view {
  width: 100%;
  flex: none;
  max-height: 60vh;
}

@media (min-width: 768px) {
  .chat-section.split-view {
    width: 50%;
    max-height: none;
  }
}

.chat-header {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}

@media (min-width: 640px) {
  .chat-header {
    padding: 1rem;
  }
}

.chat-header h2 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.125rem 0;
}

@media (min-width: 640px) {
  .chat-header h2 {
    font-size: 1.25rem;
    margin: 0 0 0.25rem 0;
  }
}

.chat-header p {
  font-size: 1rem;
  color: #4b5563;
  margin: 0;
}

.messages-container {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.messages-container::-webkit-scrollbar {
  width: 8px;
}

.messages-container::-webkit-scrollbar-track {
  background: #f7fafc;
  border-radius: 4px;
}

.messages-container::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 4px;
}

.message-wrapper {
  display: flex;
}

.align-start {
  justify-content: flex-start;
}

.align-end {
  justify-content: flex-end;
}

.align-center {
  justify-content: center;
}

.message-bubble {
  max-width: 28rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
}

.bubble-user {
  background-color: #2563eb;
  color: white;
}

.bubble-bot {
  background-color: #f3f4f6;
  color: #1f2937;
}

.message-bubble.celebration {
  background: linear-gradient(to right, #f0fdf4, #dcfce7);
  border: 2px solid #86efac;
  font-weight: 500;
  color: #1f2937;
}

.message-bubble.positive {
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #1f2937;
}

/* Phone Button */
.phone-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #16a34a;
  color: white;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1.125rem;
  text-decoration: none;
  transition: background-color 0.15s;
}

.phone-button:hover {
  background-color: #15803d;
}

.phone-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* TCPA */
.tcpa-container {
  max-width: 42rem;
}

.tcpa-text {
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  color: #374151;
  line-height: 1.625;
}

.tcpa-text a {
  color: #2563eb;
  text-decoration: underline;
}

.tcpa-buttons {
  display: flex;
  gap: 0.75rem;
}

.tcpa-accept {
  flex: 1;
  padding: 0.75rem 1.5rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s;
}

.tcpa-accept:hover {
  background-color: #1d4ed8;
}

.tcpa-skip {
  padding: 0.75rem 1.5rem;
  background: white;
  color: #374151;
  border: 2px solid #d1d5db;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s;
}

.tcpa-skip:hover {
  background-color: #f9fafb;
}

/* Loading */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
}

.spinner {
  width: 3rem;
  height: 3rem;
  border: 2px solid #e5e7eb;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-container p {
  color: #4b5563;
  margin: 0;
}

/* Quick Replies */
.quick-replies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-width: 28rem;
}

.quick-reply-btn {
  padding: 0.5rem 1rem;
  background: white;
  color: #2563eb;
  border: 2px solid #2563eb;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s;
}

.quick-reply-btn:hover {
  background-color: #eff6ff;
}

/* Chat Input */
.chat-input {
  flex-shrink: 0;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 0.5rem;
}

.input-field {
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
}

.input-field:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.send-button {
  padding: 0.5rem 1.5rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.15s;
}

.send-button:hover {
  background-color: #1d4ed8;
}

.send-icon {
  width: 1rem;
  height: 1rem;
}

/* Summary Panel */
.summary-panel {
  display: none;
  width: 20rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  padding: 1rem;
  overflow-y: auto;
  flex-shrink: 0;
}

@media (min-width: 1024px) {
  .summary-panel {
    display: block;
  }
}

.summary-panel > h2 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.summary-section {
  margin-bottom: 1rem;
}

.summary-section h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  margin: 0 0 0.5rem 0;
}

.section-icon {
  width: 1rem;
  height: 1rem;
}

.summary-item {
  font-size: 1rem;
  color: #4b5563;
  background-color: #f9fafb;
  padding: 0.5rem;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
}

.driver-name {
  font-weight: 500;
}

.driver-dob {
  font-size: 1rem;
}

.summary-details {
  font-size: 1rem;
  color: #4b5563;
}

.summary-details > div {
  margin-bottom: 0.25rem;
}

/* Discounts */
.discount-icon-wrapper {
  position: relative;
  display: inline-block;
}

.discount-emoji {
  font-size: 1.5rem;
}

.discount-badge {
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  background-color: #22c55e;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.discount-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.discount-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: #15803d;
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
}

.checkmark {
  font-size: 1.125rem;
}
</style>