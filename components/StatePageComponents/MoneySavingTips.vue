<template>
  <section class="money-saving-tips">
    <div class="container">
      <div class="section-header">
        <h2>How to Save Money on Auto Insurance in {{ stateData.state }}</h2>
        <p>Expert tips to reduce your insurance premiums</p>
      </div>

      <div class="tips-grid">
        <div class="tip-card clickable" @click="openQuotes">
          <div class="tip-star-overlay">
            <IconsStars classes="star-icon golden"></IconsStars>
          </div>
          <div class="tip-icon">
            <img :src="getImage('chart-simple-solid-full.svg')" alt="SVG Icon" class="svg-icon" loading="lazy" />
          </div>
          <h3>Compare Regularly</h3>
          <p>Shop around annually to ensure you're getting the best rates</p>
        </div>
        <div class="tip-card">
          <div class="tip-icon">
            <img :src="getImage('money-bill-wave-solid.svg')" alt="SVG Icon" class="svg-icon" loading="lazy" />
          </div>
          <h3>Bundle Policies</h3>
          <p>Combine auto and home insurance for discounts up to 25%</p>
        </div>

        <div class="tip-card">
          <div class="tip-icon">
            <img :src="getImage('car-solid-full.svg')" alt="SVG Icon" class="svg-icon" loading="lazy" />
          </div>
          <h3>Safe Driver Discounts</h3>
          <p>Maintain a clean driving record to qualify for lower rates</p>
        </div>

        <div class="tip-card">
          <div class="tip-icon">
            <img :src="getImage('mobile-button-solid-full.svg')" alt="SVG Icon" class="svg-icon" loading="lazy" />
          </div>
          <h3>Usage-Based Programs</h3>
          <p>Save up to 30% with telematics and safe driving apps</p>
        </div>

        <div class="tip-card">
          <div class="tip-icon">
            <img :src="getImage('graduation-cap-solid-full.svg')" alt="SVG Icon" class="svg-icon" loading="lazy" />
          </div>
          <h3>Education Discounts</h3>
          <p>Students and alumni may qualify for education-based savings</p>
        </div>

        <div class="tip-card">
          <div class="tip-icon">
            <img :src="getImage('shield-halved-solid-full.svg')" alt="SVG Icon" class="svg-icon" loading="lazy" />
          </div>
          <h3>Safety Features</h3>
          <p>Anti-theft devices and safety features can lower premiums</p>
        </div>
      </div>
      <div class="cta-container">
        <ClientOnly>
          <a :href="getQuotes" target="_blank"><button class="compare-btn">COMPARE QUOTES</button></a>
        </ClientOnly>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from "../stores/store";
const store = useStore();

const props = defineProps({
  config: Object,
  stateData: Object,
  zipcode: String,
});

const getQuotes = computed(() => {
  var options = {};
  if (props.zipcode?.length === 5) {
    options.zipcode = props.zipcode;
    if (store.visitorInfo?.ueid) {
      options.ueid = store.visitorInfo.ueid;
    }
    if (store.visitorInfo?.mst) {
      options.mst = store.visitorInfo.mst;
    }
  }
  return generateRedirectUrl("https://insure.protect.com", options);
});

const openQuotes = () => {
  window.open(getQuotes.value, '_blank');
};

const getImage = (image) => {
  const desiredImage = image.replace(/\s/g, '').toLowerCase();
  // In Nuxt 3, assets should be in the public folder or imported
  return `/assets/${desiredImage}`;
};
</script>

<style lang="scss" scoped>
@import '../../scss/variables';

// Money saving tips section
.money-saving-tips {
  padding: var(--spacing-4xl) 0;
  .tips-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-2xl);
    margin-top: var(--spacing-3xl);

    @include mobile {
      grid-template-columns: 1fr;
      gap: var(--spacing-xl);
    }
  }

// Icon styling
.tip-icon {
  height: 50px;
  max-width: 50px;
  margin: auto;
  margin-bottom: var(--spacing-lg);
  img {
    filter: invert(14%) sepia(89%) saturate(3242%) hue-rotate(214deg) brightness(94%) contrast(87%);
  }
}
  .tip-card {
    background: white;
    border-radius: var(--radius-xl);
    padding: var(--spacing-2xl);
    box-shadow: var(--shadow-md);
    text-align: center;
    border: 1px solid var(--border-light);
    transition: all 0.3s ease;

    &.clickable {
      cursor: pointer;
    }

    &:hover {
      box-shadow: var(--shadow-lg);
      transform: translateY(-2px);
    }

    h3 {
      font-size: 1.25rem;
      margin-bottom: var(--spacing-md);
      color: var(--text-primary);
    }

    p {
      color: var(--text-secondary);
      line-height: 1.6;
      margin: 0;
    }
  }
  @include mobile {
    padding-bottom: 0px;
  }
}
.tip-card {
  position: relative;
}

.tip-star-overlay {
  position: absolute;
  top: 15px;
  left: 5px;
  width: 60px;
  height: 60px;
  z-index: 10;
}

.star-icon {
  width: 36px;
  height: 100%;
  object-fit: contain;
  animation: subtleRotate 2s ease-in-out infinite;
  animation-delay: 2s;
}
@keyframes subtleRotate {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(25deg); }
  100% { transform: rotate(0deg); }
}
.cta-container a {
  display: flex;
}
.compare-btn {
  background-color: #007A5F;
  color: white;
  border: none;
  padding: 22px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  outline: none;
  margin: 40px auto;
  @include mobile {
    margin: 30px auto;
    width: 100%;
  }

}

.compare-btn:hover {
  background-color: #00896a;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.compare-btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
