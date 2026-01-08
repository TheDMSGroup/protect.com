<template>
  <div class="results-section">
    <div class="results-header">
      <h2>Your Personalized Quotes</h2>
      <p>Click any card to get started with that provider</p>
    </div>

    <div id="mastodon-results-container" :data-mastodon-auction-id="results.auction_id || ''">
      <div
        v-for="(bid, index) in results.bids"
        :key="bid.bid_id"
        class="offer-container"
        :class="{ featured: index === 0 || bid.exclusive }"
        @click="openOffer(bid.click_url)"
      >
        <div class="banner-wrapper">
          <template v-if="index === 0 || bid.exclusive">
            <i class="fa-solid fa-star"></i>
            <p>TOP MATCH</p>
          </template>
        </div>
        <div class="logo-wrapper">
          <img
            :src="bid.image_url"
            :alt="`${bid.buyer_name} logo`"
            class="offer-image"
            @error="(e) => e.target.style.display = 'none'"
          />
          <div class="stars-container">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
        </div>
        <div class="offer-description">
          <h4 class="headline">{{ bid.headline || bid.buyer_name }}</h4>
          <div class="description" v-html="bid.description" />
        </div>
        <div class="button-wrapper">
          <button
            type="button"
            @click.stop="openOffer(bid.click_url)"
          >
            View Now
          </button>
        </div>
        <div v-if="bid.pixel" class="pixel-wrapper" v-html="bid.pixel" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  results: {
    type: Object,
    required: true
  }
})

const openOffer = (url) => {
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}
</script>

<style scoped>
.results-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  overflow-y: auto;
  flex-shrink: 0;
  margin-bottom: 80px;
}

@media (min-width: 768px) {
  .results-section {
    width: 50%;
    flex-shrink: 1;
    margin-bottom: 0;
  }
}

.results-header {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f0fdf4;
}

.results-header h2 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.results-header p {
  font-size: 1rem;
  color: #4b5563;
  margin: 0;
}

#mastodon-results-container {
  padding: 1rem;
  --mainColor: #009073;
  --featuredOfferBg: #0090730d;
  --offerBorder: 1px solid var(--mainColor);
  --offerBorderRadius: 4px;
  --ctaBg: #132cbd;
  --ctaNotificationBg: #f28900;
  --starsColor: #ffc400;
  font-family: "Nunito Sans", sans-serif;
}

.offer-container {
  padding: 38px 20px 20px 20px;
  border: var(--offerBorder);
  margin-bottom: 20px;
  border-radius: var(--offerBorderRadius);
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  gap: 15px;
}

.offer-container.featured {
  background: var(--featuredOfferBg);
}

.offer-container.featured .banner-wrapper {
  background-color: #009073;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 0;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  border-radius: 3px 3px 0px 0px;
}

.offer-container.featured .banner-wrapper i {
  margin-left: 10px;
  margin-top: -3px;
}

.offer-container.featured .banner-wrapper p {
  color: #fff;
  margin: 0;
  padding: 0;
  text-align: left;
  font-weight: 600;
  margin-left: 7px;
}

.offer-container.featured .banner-wrapper .fa-solid {
  color: #fff;
  position: relative;
  top: 4px;
}

.logo-wrapper {
  display: inline-block;
  padding: 5px;
  border-radius: 2px;
  vertical-align: top;
  width: 20%;
  margin-left: 15px;
}

.logo-wrapper img {
  max-width: 125px;
  width: 100%;
  margin: auto;
  display: block;
}

.offer-image {
  width: 100%;
  vertical-align: middle;
}

.stars-container {
  color: var(--starsColor);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
}

.offer-description {
  display: flex;
  flex-direction: column;
  margin: 10px 0 0 0;
}

.offer-description .headline {
  font-family: "Nunito Sans", sans-serif;
  font-size: 18px;
  margin: 0;
  padding: 0;
  color: #009073;
  font-weight: 600;
}

.offer-description .description {
  font-size: 13px;
  padding: 0;
  margin: 5px auto;
}

.offer-container :deep(.description ul) {
  list-style-type: none;
  padding-inline-start: 0;
}

.offer-container :deep(.description ul li) {
  position: relative;
  margin-left: 22px;
}

.offer-container :deep(.description ul li::before) {
  content: "";
  background: url("https://djk97zng6lbya.cloudfront.net/2025/10/06/17/56/00/ddce9074-95ce-424d-880f-687a42394a41.png")
    no-repeat center center / contain;
  color: var(--mainColor);
  width: 20px;
  height: 10px;
  position: absolute;
  top: 5px;
  left: -24px;
}

.button-wrapper button {
  height: 65px;
  font-size: 22px;
  padding: 0 !important;
  color: #fff;
  font-weight: 800;
  border-radius: 5px;
  border: 1px solid var(--ctaBg);
  background-color: var(--ctaBg);
  cursor: pointer;
  letter-spacing: -1px;
  position: relative;
  width: 100%;
}

.button-wrapper button:hover::after {
  animation: bounce-wiggle 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

.button-wrapper button:hover {
  background-color: #0e2499;
}

@keyframes bounce-wiggle {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(10deg);
  }
  75% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.button-wrapper button::after {
  content: "1";
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  padding: 0px 5px 5px 2px;
  background-color: var(--ctaNotificationBg);
  border: 2px solid white;
  font-size: 15px;
  position: absolute;
  top: -10px;
  right: -10px;
}

.pixel-wrapper {
  height: 1px;
  display: block;
}

/* Always use stacked/mobile layout */
.offer-container {
  flex-direction: column;
}

.offer-container .button-wrapper,
.offer-container .button-wrapper button {
  width: 100%;
}

.logo-wrapper {
  padding: 5px;
  width: 100%;
  box-shadow: none;
  margin: 0;
}

.offer-description {
  width: 100%;
  text-align: left;
  margin: 20px;
}
</style>
