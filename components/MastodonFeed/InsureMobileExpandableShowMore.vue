<template>
  <div class="results-section">
    <span v-if="!hideHeader">
      <!-- Header for multiple quotes -->
      <div v-if="results.bids && results.bids.length >= 2" class="offer-head">
        <h2 class="main-heading">
          Hi {{ firstName }}, we've matched you with great offers in {{ city }}!
        </h2>
        <p>
          <i class="fa-solid fa-circle-check"></i>
          Click on <span>2 or more offers</span> below to compare quotes and maximize your savings.
        </p>
      </div>

      <!-- Header for single quote -->
      <div v-else class="offer-head">
        <h2 class="main-heading">
          Hi {{ firstName }}, we've matched you with a top offer in {{ city }}!
        </h2>
        <p>
          <i class="fa-solid fa-circle-check"></i>
          Click on the <span>recommended match</span> to get a quote and maximize your savings.
        </p>
      </div>
    </span>
    <div id="mastodon-results-container" :data-mastodon-auction-id="results.auction_id || ''">
      <template v-for="(bid, index) in displayedBids" :key="bid.bid_id">
        <!-- Offer Card -->
        <div
          :id="`offer-${index}`"
          class="offer-container"
          :class="{ featured: index < featuredCount }"
          @click="openOffer(bid.click_url)"
        >
          <div class="banner-wrapper"></div>
          <div class="logo-wrapper">
            <img
              :src="validateImgUrl(bid.image_url)"
              :alt="`${bid.buyer_name} logo`"
              class="offer-image"
              @error="(e) => e.target.style.display = 'none'"
            />
          </div>
          <div class="offer-description">
            <h4 class="headline">{{ bid.headline || bid.buyer_name }}</h4>
            <div class="description" v-html="sanitizeHTML(bid.description)" />
          </div>
          <div class="button-wrapper">
            <button type="button">{{ buttonText }}</button>
          </div>
        </div>

        <!-- Mobile Description (expandable) -->
        <div
          class="mobile-description"
          :class="{ featured: index < featuredCount }"
          :id="`mobile-description-${index}`"
        >
          <a
            class="toggle-link"
            :id="`toggle-link-${index}`"
            href="javascript:;"
            @click.prevent="toggleDescription(index)"
          >
            {{ expandedDescriptions[index] ? 'Less' : 'More' }}
          </a>
          <div
            class="mobile-description-text"
            :id="`description-${index}`"
            v-show="expandedDescriptions[index]"
          >
            <h4 class="headline">{{ bid.headline || bid.buyer_name }}</h4>
            <div class="mobile-description-body" v-html="sanitizeHTML(bid.description)" />
          </div>
        </div>

        <!-- Pixel wrapper for tracking -->
        <div v-if="bid.impression_html" class="pixel-wrapper" v-html="getPixelHtml(bid, index)" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  results: {
    type: Object,
    required: true
  },
  firstName: {
    type: String,
    default: 'Friend'
  },
  city: {
    type: String,
    default: 'your area'
  },
  limit: {
    type: Number,
    default: 5
  },
  featuredCount: {
    type: Number,
    default: 1
  },
  isPaidTraffic: {
    type: Boolean,
    default: true
  },
  hideHeader: {
    type: Boolean,
    default: false
  }
})

// Track which descriptions are expanded
const expandedDescriptions = ref({})

// Computed: displayed bids based on limit
const displayedBids = computed(() => {
  if (!props.results.bids) return []
  return props.results.bids.slice(0, props.limit)
})

// Computed: button text based on traffic type
const buttonText = computed(() => {
  return props.isPaidTraffic ? 'See My Quote' : 'View Now'
})

// Sanitize HTML to prevent XSS
const sanitizeHTML = (html) => {
  if (!html) return ''
  return html.replace(/<script\b[^<]*(?:(?!\/script>)<[^<]*)*<\/script>/gi, '')
}

// Validate image URL
const validateImgUrl = (url) => {
  if (!url) return ''
  return url.startsWith('http://') || url.startsWith('https://') ? url : `https:${url}`
}

// Get pixel HTML with position
const getPixelHtml = (bid, index) => {
  if (!bid.impression_html) return ''
  return bid.impression_html.replace(/{position}/g, index + 1)
}

// Toggle mobile description visibility
const toggleDescription = (index) => {
  expandedDescriptions.value[index] = !expandedDescriptions.value[index]
}

// Open offer in new tab
const openOffer = (url) => {
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}
</script>

<style scoped>
.results-section {
  width: 100%;
  counter-reset: item;
}

/* Offer Header */
.offer-head h2 {
  margin-bottom: 5px;
}

.offer-head p {
  font-style: italic;
  margin-bottom: 25px;
}

.offer-head p span {
  font-weight: bold;
}

.offer-head :deep(.fa-circle-check) {
  color: #00a57e;
}

/* Offer Container */
#mastodon-results-container {
  counter-reset: item;
}

.offer-container {
  border: 2px solid #ddd;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  padding: 30px 30px 20px;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  position: relative;
  counter-increment: item;
  cursor: pointer;
  margin-bottom: 15px;
}

.offer-container button {
  background: #0076bb;
  color: white;
  padding: 10px 30px;
  border-radius: 30px;
  border: none;
  font-weight: 600;
  cursor: pointer;
}

.offer-container button:hover {
  background: #005a8f;
}

.offer-container .logo-wrapper {
  text-align: center;
}

.logo-wrapper img {
  max-width: 130px;
  max-height: 90px;
}

.offer-description {
  flex: 60% 0 0;
}

.offer-description h4.headline {
  font-weight: 600;
  font-size: 18px;
  margin: 0 0 5px 0;
}

.button-wrapper {
  text-align: right;
}

/* Banner/Number indicator */
.banner-wrapper {
  border-style: solid;
  border-width: 20px;
  border-color: #ddd transparent transparent #ddd;
  width: 0;
  height: 0;
  border-radius: 2px;
  position: absolute;
  top: 0;
  left: 0;
}

.banner-wrapper::before {
  content: counter(item) "";
  position: absolute;
  top: -17px;
  left: -15px;
  font-weight: bold;
  font-size: 13px;
}

/* Featured offer styling */
.offer-container.featured {
  border-color: #448efc;
  padding-top: 30px;
}

.offer-container.featured .banner-wrapper {
  background: linear-gradient(130deg, #00a57e 85%, transparent 85%);
  top: 5px;
  width: 120px;
  height: 20px;
  border: none;
  border-radius: 0;
}

.offer-container.featured .banner-wrapper::before {
  content: "Recommended";
  color: white;
  top: 0;
  left: 5px;
}

.offer-container.featured button {
  background: #448efc;
}

.offer-container.featured button:hover {
  background: #2d75e0;
}

.pixel-wrapper {
  height: 10px;
}

/* Mobile description - hidden on desktop */
.mobile-description {
  display: none;
}

/* Description content styling */
.offer-description :deep(ul) {
  margin: 0;
  padding-left: 20px;
}

.offer-description :deep(li) {
  margin-bottom: 3px;
}

/* Responsive - Mobile */
@media screen and (max-width: 768px) {
  .offer-head h2 {
    font-size: 1.25em;
    font-weight: 600;
    text-align: center;
  }

  .offer-head p {
    text-align: center;
  }

  .offer-container {
    flex-wrap: wrap;
    border-radius: 5px 5px 0 0;
    padding: 30px 10px 20px;
    margin-bottom: 0;
  }

  .offer-container > div {
    flex: 48% 0 0;
  }

  .offer-description {
    display: none;
  }

  .mobile-description {
    display: block;
    flex: 100% 0 0;
    padding: 5px 10px;
    border: 2px solid #ddd;
    border-radius: 0 0 5px 5px;
    border-top: 1px dotted #ddd;
    background: #fff;
    position: relative;
    top: -2px;
    margin-bottom: 10px;
  }

  .mobile-description.featured {
    border-color: #448efc;
  }

  .offer-container button {
    padding: 10px 15px;
  }

  .mobile-description h4.headline {
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 5px;
    font-weight: 600;
  }

  .mobile-description-body {
    font-size: 14px;
  }

  .mobile-description-body :deep(ul) {
    padding-left: 15px;
    margin: 0;
  }

  .toggle-link {
    font-size: 14px;
    color: #0076bb;
    text-decoration: none;
  }

  .toggle-link:hover {
    text-decoration: underline;
  }
}
</style>
