<template>
  <div class="directtocall-page">
    <!-- Header -->
    <header class="chat-header">
      <div class="header-content">
        <div class="logo">
          <img src="/assets/protect_logo_white.svg" alt="Protect.com" class="logo-img" />
        </div>
        <div class="priority-message">
          Inquire in the next {{ formattedCountdown }} minutes to receive priority assistance!
        </div>
      </div>
    </header>
    <div class="agent-profile-container">
      <h1>Drivers near {{ userCity }} may be eligible to unlock as much as $600 in savings!</h1>
      <div class="agent-profile">
        <img src="/assets/callcenteragent.png" alt="Emma" class="agent-photo" />
        <div class="agent-info">
          <span class="agent-name">Emma</span>
          <span class="agent-status">
            <span class="status-dot" aria-hidden="true"></span>
            Online
          </span>
        </div>
      </div>
    </div>
    <div class="chat-section">
<!-- Chat Container -->
    <main class="chat-container" role="log" aria-live="polite" aria-label="Chat messages">
      <div class="messages-wrapper">
        <!-- Connecting indicator -->
        <div v-if="isConnecting" class="connecting-indicator">
          <img src="/assets/callcenteragent.png" alt="Emma" class="avatar avatar--bot" />
          <div class="connecting-bubble">
            <span class="connecting-text">Connecting to agent</span>
            <span class="connecting-dots">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </span>
          </div>
        </div>

        <!-- Messages -->
        <div
          v-for="(msg, idx) in messages"
          :key="idx"
          :class="['message', msg.type === 'user' ? 'message--user' : 'message--bot']"
        >
          <!-- Bot Avatar -->
          <img v-if="msg.type === 'bot'" src="/assets/callcenteragent.png" alt="Emma" class="avatar avatar--bot" />
          <div class="message-bubble">
            {{ msg.text }}
          </div>
          <!-- User Avatar -->
          <div v-if="msg.type === 'user'" class="avatar avatar--user" aria-hidden="true">
            <svg class="avatar-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div v-if="isTyping" class="typing-indicator">
          <img src="/assets/callcenteragent.png" alt="Emma" class="avatar avatar--bot" />
          <div class="typing-bubble">
            <span class="typing-dots">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </span>
          </div>
        </div>

        <!-- Quick Replies -->
        <div v-if="quickReplies.length > 0" class="quick-replies" role="group" aria-label="Quick reply options">
          <button
            v-for="(reply, idx) in quickReplies"
            :key="idx"
            type="button"
            class="quick-reply-btn"
            @click="handleQuickReply(reply)"
          >
            {{ reply }}
          </button>
        </div>

        <!-- Zipcode Input -->
        <div v-if="showZipcodeInput" class="zipcode-input-wrapper">
          <form @submit.prevent="handleZipcodeSubmit" class="zipcode-form" role="form" aria-label="Zipcode entry form">
            <label for="zipcode-input" class="visually-hidden">Enter your 5-digit zipcode</label>
            <input
              id="zipcode-input"
              v-model="zipcodeInput"
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              maxlength="5"
              placeholder="12345"
              class="zipcode-field"
              aria-label="Zipcode"
              aria-required="true"
              aria-describedby="zipcode-hint"
              autocomplete="postal-code"
              required
            />
            <span id="zipcode-hint" class="visually-hidden">Enter a 5-digit US zipcode</span>
            <button
              type="submit"
              class="zipcode-submit-btn"
              :disabled="zipcodeInput.length !== 5"
              :aria-disabled="zipcodeInput.length !== 5"
            >
              Submit
            </button>
          </form>
        </div>

        <!-- Call CTA -->
        <div v-if="showCallCTA" class="call-cta-wrapper">
          <a :href="phoneNumberLink" class="call-cta-btn">
            <svg class="call-cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Now for Your Free Quote
          </a>
          <div class="countdown-timer">
            Priority assistance available for the next {{ formattedCountdown }}
          </div>
        </div>

        <!-- Follow-up Messages (appear after call button) -->
        <div
          v-for="(msg, idx) in followUpMessages"
          :key="`followup-${idx}`"
          :class="['message', 'message--bot']"
        >
          <img src="/assets/callcenteragent.png" alt="Emma" class="avatar avatar--bot" />
          <div class="message-bubble">
            {{ msg.text }}
          </div>
        </div>

        <!-- Typing Indicator for follow-up messages -->
        <div v-if="isTypingFollowUp" class="typing-indicator">
          <img src="/assets/callcenteragent.png" alt="Emma" class="avatar avatar--bot" />
          <div class="typing-bubble">
            <span class="typing-dots">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </span>
          </div>
        </div>

        <!-- Mastodon Bids Loading -->
        <div v-if="isLoadingBids" class="bids-loading">
          <img src="/assets/callcenteragent.png" alt="Emma" class="avatar avatar--bot" />
          <div class="connecting-bubble">
            <span class="connecting-text">Finding more options for you</span>
            <span class="connecting-dots">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </span>
          </div>
        </div>
        <!-- Mastodon Feed Results -->
        <MastodonFeedTopMatchStar v-if="apiResults" :results="apiResults" class="feed-results" />
      </div>
    </main>
    </div>

  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount, computed } from 'vue'
import { useMastodonApi } from '~/composables/useMastodonApi'

definePageMeta({
  layout: 'chatbot'
})

const store = useStore()
const route = useRoute()
const cityCookie = useCookie('protect_geo_city')
const { submitLead } = useMastodonApi()

const userCity = computed(() => {
  // Priority: store (live GeoIP) > cookie (SSR-accessible) > fallback
  return store.visitorInfo.city || cityCookie.value || 'your area'
})

// Get phone number from URL param or use default
const DEFAULT_PHONE_NUMBER = '8449442300'
const phoneNumber = computed(() => {
  return route.query.c2cnumber || DEFAULT_PHONE_NUMBER
})

// Format phone number for display (e.g., 844-944-2300)
const formattedPhoneNumber = computed(() => {
  const num = phoneNumber.value.replace(/\D/g, '') // Remove non-digits
  if (num.length === 10) {
    return `${num.slice(0, 3)}-${num.slice(3, 6)}-${num.slice(6)}`
  }
  return phoneNumber.value
})

// Format phone number for tel: link
const phoneNumberLink = computed(() => {
  return `tel:${phoneNumber.value.replace(/\D/g, '')}`
})

const messages = ref([])
const followUpMessages = ref([]) // Messages that appear after the call button
const quickReplies = ref([])
const isConnecting = ref(true)
const showZipcodeInput = ref(false)
const showCallCTA = ref(false)
const zipcodeInput = ref('')
const isTyping = ref(false) // Typing indicator state
const isTypingFollowUp = ref(false) // Typing indicator for follow-up messages

// Countdown timer state
const countdownSeconds = ref(300) // 5 minutes = 300 seconds
let countdownInterval = null

// Format countdown as MM:SS
const formattedCountdown = computed(() => {
  const minutes = Math.floor(countdownSeconds.value / 60)
  const seconds = countdownSeconds.value % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

// Start countdown timer
const startCountdown = () => {
  if (countdownInterval) return // Already running

  countdownInterval = setInterval(() => {
    if (countdownSeconds.value > 0) {
      countdownSeconds.value--
    } else {
      stopCountdown()
    }
  }, 1000)
}

// Stop countdown timer
const stopCountdown = () => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
    countdownInterval = null
  }
}

// Cleanup on unmount
onBeforeUnmount(() => {
  stopCountdown()
})

// Mastodon bids state
const isLoadingBids = ref(false)
const apiResults = ref(null)

// Conversation state
const conversationStep = ref('start')
const collectedData = ref({
  isInsured: null,
  livesInCity: null,
  zipcode: null,
  ownsHome: null
})

// Auto-scroll down slightly when content changes
const scrollToBottom = () => {
  nextTick(() => {
    // Only scroll to mastodon container if apiResults has data
    if (apiResults.value) {
      // Retry logic to wait for container to render
      const checkForContainer = (attempts = 0) => {
        const mastodonContainer = document.querySelector('#mastodon-results-container')

        if (mastodonContainer) {
          mastodonContainer.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else if (attempts < 10) {
          setTimeout(() => checkForContainer(attempts + 1), 100)
        }
      }

      checkForContainer()
    } else {
      // Default: scroll down 20px from current position after a brief delay
      setTimeout(() => {
        window.scrollBy({
          top: 20,
          behavior: 'smooth'
        })
      }, 150)
    }
  })
}

watch([messages, followUpMessages, quickReplies, showCallCTA, showZipcodeInput, apiResults, isTyping, isTypingFollowUp, isLoadingBids], scrollToBottom, { deep: true })

onMounted(() => {
  // Show connecting indicator, then first message
  setTimeout(() => {
    isConnecting.value = false
    addBotMessage("I'm Emma, your personal auto insurance quote finder. Let's see how much we can save you today on auto insurance!")

    // Wait for first message to complete (typingDelay + animation time), then ask second question
    setTimeout(() => {
      conversationStep.value = 'ask_insured'
      addBotMessage("Are you currently insured?", ['Yes', 'No'])
    }, 2500) // Increased delay to account for typing animation
  }, 1500)
})

const addBotMessage = (text, replies = []) => {
  // Show typing indicator
  isTyping.value = true

  // Random delay between 800ms and 2000ms to simulate typing
  const typingDelay = Math.floor(Math.random() * 1200) + 800

  setTimeout(() => {
    isTyping.value = false
    messages.value.push({ type: 'bot', text })

    // Show quick replies after message appears
    if (replies.length > 0) {
      setTimeout(() => {
        quickReplies.value = replies
      }, 300)
    }
  }, typingDelay)
}

// Add messages that appear after the call button
const addFollowUpMessage = (text) => {
  // Show typing indicator for follow-up
  isTypingFollowUp.value = true

  // Random delay between 800ms and 2000ms to simulate typing
  const typingDelay = Math.floor(Math.random() * 1200) + 800

  setTimeout(() => {
    isTypingFollowUp.value = false
    followUpMessages.value.push({ type: 'bot', text })
  }, typingDelay)
}

const handleQuickReply = (reply) => {
  quickReplies.value = []
  setTimeout(() => {
    messages.value.push({ type: 'user', text: reply })
    processResponse(reply)
  }, 100)
}

const handleZipcodeSubmit = () => {
  if (zipcodeInput.value.length !== 5) return

  showZipcodeInput.value = false
  collectedData.value.zipcode = zipcodeInput.value
  messages.value.push({ type: 'user', text: zipcodeInput.value })

  setTimeout(() => {
    conversationStep.value = 'ask_homeowner'
    addBotMessage("Do you own your home?", ['Yes', 'No'])
  }, 800)
}

const processResponse = (response) => {
  setTimeout(() => {
    switch (conversationStep.value) {
      case 'ask_insured':
        collectedData.value.isInsured = response === 'Yes'
        conversationStep.value = 'ask_city'
        addBotMessage(`Do you live in the ${userCity.value} area?`, ['Yes', 'No'])
        break

      case 'ask_city':
        if (response === 'Yes') {
          collectedData.value.livesInCity = true
          conversationStep.value = 'ask_homeowner'
          addBotMessage("Do you own your home?", ['Yes', 'No'])
        } else {
          collectedData.value.livesInCity = false
          conversationStep.value = 'ask_zipcode'
          addBotMessage("No problem! What's your zipcode so I can find the best rates in your area?")
          setTimeout(() => {
            showZipcodeInput.value = true
          }, 2500)
        }
        break

      case 'ask_homeowner':
        collectedData.value.ownsHome = response === 'Yes'
        conversationStep.value = 'complete'
        addBotMessage("I found your match! Click the button below to speak with an advisor and get your personalized quote.")
        // Wait for typing animation to complete (max typingDelay is 2000ms) + message display time
        setTimeout(() => {
          showCallCTA.value = true
          startCountdown() // Start the countdown timer

          // Wait a bit longer, then show the follow-up message and Mastodon feed
          setTimeout(() => {
            addFollowUpMessage("Not ready to talk to someone right now? That's totally fine! Here are a few other great options you can check out in the meantime:")

            // Wait for this message's typing animation to complete before showing feed
            setTimeout(() => {
              fetchMastodonBids()
            }, 2500) // Wait for typing animation of the "Not ready" message
          }, 5000) // Wait 5 seconds after button appears before starting mastodon feed
        }, 2500) // Increased to account for typing animation completion
        break
    }
  }, 800)
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

const fetchMastodonBids = async () => {
  isLoadingBids.value = true

  // Check for mastodonoff URL parameter
  const urlParams = new URLSearchParams(window.location.search)
  const useMockData = urlParams.get('mastodonoff') === 'true'

  try {
    let result
    // Build minimal payload from collected data
    const payload = {
      source_token: 'r0TV0W_hUOqv_Uow4brhX-wkx5F9TQ',
      limit: 3,
      data: {
        zipcode: collectedData.value.zipcode || store.visitorInfo.zip || '',
        currently_insured: collectedData.value.isInsured || false,
        home_ownership: collectedData.value.ownsHome || false,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        source_url: typeof window !== 'undefined' ? window.location.href : ''
      }
    }
    if (store.visitorInfo?.mst) {
      payload.source_token = store.visitorInfo.mst;
    }
    if (useMockData) {
      console.log('Using mock Mastodon API data (mastodonoff=true)')
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      result = getMockResults()
    } else {
      result = await submitLead(payload)
    }

    isLoadingBids.value = false

    if (result && result.bids && result.bids.length > 0) {
      apiResults.value = result
    }
  } catch (err) {
    console.error('Error fetching Mastodon bids:', err)
    isLoadingBids.value = false
  }
}
</script>

<style lang="scss" scoped>
.directtocall-page {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

// Header
.chat-header {
  background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%);
  padding: 1rem;
  flex-shrink: 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
}

.logo-img {
  height: 2rem;
  width: auto;
}

.phone-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2rem;
  transition: background-color 0.2s;

  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.2);
  }
}

.phone-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.phone-number {
  @media (max-width: 360px) {
    display: none;
  }
}

.priority-message {
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  text-align: right;

  @media (max-width: 640px) {
    font-size: 0.75rem;
  }
}

// Agent Profile Container
.agent-profile-container {
  background: white;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid #e5e7eb;

  h1 {
    max-width: 820px;
    text-align: center;
    font: normal normal 900 40px/54px 'Nunito Sans', sans-serif;
    letter-spacing: 0;
    color: #000000;
    margin: 0;

    @media (max-width: 767px) {
      font: normal normal 900 30px/40px 'Nunito Sans', sans-serif;
    }
  }
}

// Agent Profile
.agent-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.agent-photo {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e5e7eb;
}

.agent-info {
  display: flex;
  flex-direction: column;
}

.agent-name {
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.2;
  color: #1f2937;
}

.agent-status {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #6b7280;
}

.status-dot {
  width: 0.5rem;
  height: 0.5rem;
  background-color: #22c55e;
  border-radius: 50%;
}

// Chat Section wrapper (scrollable container)
.chat-section {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

// Chat Container
.chat-container {
  padding: 1rem;
  padding-inline: clamp(0.5rem, 3vw, 3rem);
  display: flex;
  flex-direction: column;
  background: white;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.messages-wrapper {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

// Connecting indicator
.connecting-indicator {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: flex-start;
}

.connecting-bubble {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #f0f0f0;
  border-radius: 1rem;
  border-bottom-left-radius: 0.25rem;
}

.connecting-text {
  color: #6b7280;
  font-size: 0.9375rem;
}

.connecting-dots {
  display: flex;
  gap: 0.25rem;

  .dot {
    width: 0.375rem;
    height: 0.375rem;
    background-color: #9ca3af;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;

    &:nth-child(1) {
      animation-delay: -0.32s;
    }

    &:nth-child(2) {
      animation-delay: -0.16s;
    }

    &:nth-child(3) {
      animation-delay: 0s;
    }
  }
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

// Messages
.message {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  max-width: 85%;

  &--bot {
    align-self: flex-start;
  }

  &--user {
    align-self: flex-end;
  }
}

// Avatars
.avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  flex-shrink: 0;

  &--bot {
    object-fit: cover;
  }

  &--user {
    background: #e5e7eb;
    color: #6b7280;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.avatar-icon {
  width: 1.125rem;
  height: 1.125rem;
}

.message-bubble {
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  font-size: 1rem;
  line-height: 1.5;

  .message--bot & {
    background: #f0f0f0;
    color: #1f2937;
    border-bottom-left-radius: 0.25rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .message--user & {
    background: #2d5a87;
    color: white;
    border-bottom-right-radius: 0.25rem;
  }
}

// Typing Indicator
.typing-indicator {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: flex-start;
}

.typing-bubble {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #f0f0f0;
  border-radius: 1rem;
  border-bottom-left-radius: 0.25rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  .typing-dots {
    display: flex;
    gap: 0.25rem;

    .dot {
      width: 0.375rem;
      height: 0.375rem;
      background-color: #9ca3af;
      border-radius: 50%;
      animation: bounce 1.4s infinite ease-in-out both;

      &:nth-child(1) {
        animation-delay: -0.32s;
      }

      &:nth-child(2) {
        animation-delay: -0.16s;
      }

      &:nth-child(3) {
        animation-delay: 0s;
      }
    }
  }
}

// Quick Replies
.quick-replies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding-left: 2.5rem; // Align with messages (avatar width + gap)
  scroll-margin-top: -60px;
}

.quick-reply-btn {
  padding: 0.625rem 1rem;
  background: white;
  color: #2d5a87;
  border: 2px solid #2d5a87;
  border-radius: 2rem;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover,
  &:focus {
    background: #2d5a87;
    color: white;
  }

  &:focus {
    outline: 2px solid #2d5a87;
    outline-offset: 2px;
  }
}

// Zipcode Input
.zipcode-input-wrapper {
  margin-top: 0.5rem;
  padding-left: 2.5rem;
}

.zipcode-form {
  display: flex;
  gap: 0.75rem;
  max-width: 100%;
  align-items: center;
}

.zipcode-field {
  flex: 1;
  min-width: 0;
  padding: 0.625rem 1rem;
  border: 2px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  text-align: center;
  letter-spacing: 0.1em;
  background: white;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #2d5a87;
    box-shadow: 0 0 0 3px rgba(45, 90, 135, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
    letter-spacing: normal;
  }

  &:hover:not(:focus) {
    border-color: #9ca3af;
  }
}

.zipcode-submit-btn {
  flex-shrink: 0;
  height: 60px;
  padding: 0 1.25rem;
  background: #2d5a87;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 80px;
  white-space: nowrap;
  line-height: 1.2;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: #1e3a5f;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: #9ca3af;
  }

  &:focus-visible {
    outline: 3px solid #2d5a87;
    outline-offset: 2px;
  }

  // High contrast mode support
  @media (prefers-contrast: high) {
    border: 2px solid currentColor;
  }

  // Reduced motion support
  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover:not(:disabled) {
      transform: none;
    }

    &:active:not(:disabled) {
      transform: none;
    }
  }
}

// Call CTA
.call-cta-wrapper {
  margin-top: 1rem;
  padding-left: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.call-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: #22c55e;
  color: white;
  text-decoration: none;
  border-radius: 2rem;
  font-size: 1.125rem;
  font-weight: 700;
  transition: background-color 0.2s;
  width: fit-content;

  &:hover,
  &:focus {
    background: #16a34a;
  }

  &:focus {
    outline: 2px solid #22c55e;
    outline-offset: 2px;
  }
}

.call-cta-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.countdown-timer {
  font-size: 0.875rem;
  color: #dc2626;
  font-weight: 600;
  text-align: left;
}

// Bids Loading
.bids-loading {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: flex-start;
  margin-top: 1rem;
}

// Feed Results (MastodonFeedTopMatchStar component)
.feed-results {
  max-width: 600px;
  margin: 1.5rem auto 0;
  width: 100%;
}

// Input Area
.input-area {
  background: white;
  border-top: 1px solid #e5e7eb;
  padding: 0.75rem 1rem;
  flex-shrink: 0;
}

.input-form {
  display: flex;
  gap: 0.5rem;
  max-width: 600px;
  margin: 0 auto;
}

.input-field {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 2rem;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #2d5a87;
    box-shadow: 0 0 0 3px rgba(45, 90, 135, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
}

.send-btn {
  width: 3rem;
  height: 3rem;
  background: #2d5a87;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  flex-shrink: 0;

  &:hover,
  &:focus {
    background: #1e3a5f;
  }

  &:focus {
    outline: 2px solid #2d5a87;
    outline-offset: 2px;
  }
}

.send-icon {
  width: 1.25rem;
  height: 1.25rem;
}

// Accessibility
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
