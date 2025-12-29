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
        <div v-if="index === 0 || bid.exclusive" class="banner-wrapper">
          <p>Featured Offer</p>
        </div>
        <div class="logo-wrapper">
          <img
            :src="bid.image_url"
            :alt="`${bid.buyer_name} logo`"
            class="offer-image"
            @error="(e) => e.target.style.display = 'none'"
          />
        </div>
        <div class="offer-description">
          <h4 class="headline">{{ bid.headline || bid.buyer_name }}</h4>
          <div class="description" v-html="bid.description" />
        </div>
        <div class="button-wrapper">
          <a
            :href="bid.click_url"
            target="_blank"
            rel="noopener noreferrer"
            class="offer-button"
            @click.stop
          >
            View Now
          </a>
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
}

.offer-container {
  padding: 38px 20px 20px 20px;
  border: 1px solid #009073;
  margin-bottom: 20px;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

.offer-container div {
  display: inline-block;
}

.offer-container.featured {
  border-color: #009073;
}

.offer-container.featured .banner-wrapper {
  background-color: #009073;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 3px 3px 0px 0px;
}

.offer-container.featured .banner-wrapper p {
  color: #fff;
  margin: 0;
  padding: 0;
  text-align: left;
  font-weight: 600;
  margin-left: 10px;
}

.logo-wrapper {
  display: inline-block;
  background-color: #fff;
  padding: 5px;
  border: 1px solid #c9c9c9;
  border-radius: 2px;
  box-shadow: 2px 2px #c9c9c9;
  vertical-align: top;
  width: 20%;
  margin-left: 15px;
}

.offer-image {
  width: 100%;
  vertical-align: middle;
}

.offer-description {
  width: 42%;
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
  margin: 5px 0 0;
}

.button-wrapper {
  width: 20%;
}

.button-wrapper .offer-button {
  display: block;
  width: 100%;
  height: 45px;
  padding: 0;
  color: #fff;
  font-weight: 800;
  border-radius: 5px;
  border: 1px solid var(--mainColor);
  background-color: var(--mainColor);
  cursor: pointer;
  letter-spacing: -1px;
  text-decoration: none;
  text-align: center;
  line-height: 45px;
  font-size: 14px;
}

.button-wrapper .offer-button:hover {
  background-color: #007a62;
  border-color: #007a62;
}

.pixel-wrapper {
  height: 1px;
  display: block;
}

@media screen and (max-width: 768px) {
  .offer-container {
    flex-direction: column;
  }

  .offer-container .button-wrapper,
  .offer-container .button-wrapper .offer-button {
    width: 100%;
  }

  .offer-container .offer-description {
    display: none;
  }

  .logo-wrapper {
    padding: 5px;
    border: 1px solid #c9c9c9;
    border-radius: 2px;
    width: 100%;
    box-shadow: none;
    margin: 0;
  }
}
</style>
