<template>
  <div :class="{'hero-right': true, [stateData.stateAbbreviation.toLowerCase()]: true}"
    :style="{
      backgroundImage: `url(${svgPath})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'contain',
    }"
    >

    <!-- Preload critical images -->
    <link rel="preload" :href="svgPath" as="image" type="image/svg+xml" fetchpriority="high">
    <link rel="preload" href="../../assets/progressive-logo.png" as="image" type="image/png">
    <link rel="preload" href="../../assets/geico-logo.png" as="image" type="image/png">
    <link rel="preload" href="../../assets/statefarm-logo.png" as="image" type="image/png">

    <div class="provider-cards-stack hero-provider-stack" @click="goTo">
      <div class="provider-card hero-provider-card" :style="{ animationDelay: '.2s' }">
        <div class="hero-provider-logo">
          <img src="../../assets/progressive-logo.png" alt="Progressive" class="provider-logo-img"
            loading="eager"
            fetchpriority="high" >
        </div>
        <div class="hero-provider-rating">
          <span class="reviews-text">Reviews</span>
          <div class="stars">
            <star-icon font-scale=".9"></star-icon>
            <star-icon font-scale=".9"></star-icon>
            <star-icon font-scale=".9"></star-icon>
            <star-icon font-scale=".9"></star-icon>
            <star-icon font-scale=".9"></star-icon>
          </div>
        </div>
        <div class="hero-provider-button">
          <button class="see-quotes-btn">See Quotes</button>
        </div>
      </div>

      <div class="provider-card hero-provider-card" :style="{ animationDelay: '0.3s' }">
        <div class="hero-provider-logo">
          <img src="../../assets/geico-logo.png" alt="GEICO" class="provider-logo-img"
            loading="eager"
            fetchpriority="high" >
        </div>
        <div class="hero-provider-rating">
          <span class="reviews-text">Reviews</span>
          <div class="stars">
            <star-icon font-scale=".9"></star-icon>
            <star-icon font-scale=".9"></star-icon>
            <star-icon font-scale=".9"></star-icon>
            <star-icon font-scale=".9"></star-icon>
            <star-icon font-scale=".9"></star-icon>
          </div>
        </div>
        <div class="hero-provider-button">
          <button class="see-quotes-btn">See Quotes</button>
        </div>
      </div>

      <div class="provider-card hero-provider-card" :style="{ animationDelay: '0.4s' }">
        <div class="hero-provider-logo">
          <img src="../../assets/statefarm-logo.png" alt="State Farm" class="provider-logo-img"
            loading="eager"
            fetchpriority="high" >
        </div>
        <div class="hero-provider-rating">
          <span class="reviews-text">Reviews</span>
          <div class="stars">
            <star-icon font-scale=".9"></star-icon>
            <star-icon font-scale=".9"></star-icon>
            <star-icon font-scale=".9"></star-icon>
            <star-icon font-scale=".9"></star-icon>
            <star-icon font-scale=".9"></star-icon>
          </div>
        </div>
        <div class="hero-provider-button">
          <button class="see-quotes-btn">See Quotes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarIcon from '../../assets/icons/stars.vue';
import { redirectWithParams } from '../../mixins/utilsMixin';

const availableIcons = {
  StarIcon,
};
export default {
  name: 'HeroProviderCards',
  components: {
    ...availableIcons,
  },
  props: {
    config: Object,
    buttonAction: Function,
    disabled: Boolean,
    stateData: Object,
    zipcode: String,
  },
  computed: {
    svgPath() {
      // return require(`../../assets/states/outlines/${this.stateData.state.replace(/\s/g, '').toLowerCase()}.svg`);
      return require('../../assets/states/outlines/icon-shield.png');
    },
  },
  methods: {
    goTo() {
      redirectWithParams('https://insure.protect.com', { zipcode: this.zipcode });
    },
    execute() {
      if (this.config.click) {
        if (this.config.clickParam !== 'undefined') {
          this.config.click(this.config.clickParam);
        } else {
          this.config.click();
        }
      }
    },
    getImage(image) {
      try {
        if (image) {
          // Attempt to load specific image
          return require('../../assets/states/outlines/icon-' + image.replace(/\s/g, '').toLowerCase() + '.png');
        }
        // Default to shield icon if no image provided
        return require('../../assets/states/outlines/icon-shield.png');
      } catch (error) {
        // Fallback if image doesn't exist
        console.warn('Image not found: ' + image + ', using default shield icon');
        return require('../../assets/states/outlines/icon-shield.png');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../scss/variables';

  .hero-right {
      background-size: cover;
    &.tx {
      background-size: contain;
    }
    &.ct {
      background-size: calc(100% * .7);
    }
    @include mobile {
      margin-top: 60px;
      padding: 0px;
      margin: 60px auto 0;
      height: 216px;
    }

    // Shield background behind provider cards
    &::before {
      // content: '';
      // position: absolute;
      // top: 50%;
      // left: 50%;
      // transform: translate(-50%, -50%);
      // width: 300px;
      // height: 300px;
      // // background-image: url('/shield-icon.png');
      // background-size: contain;
      // background-repeat: no-repeat;
      // background-position: center;
      // opacity: 0;
      // z-index: 0;
      // pointer-events: none;
    }
  }

  .provider-cards-stack {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    position: relative;
    z-index: 1;
    width:80%;
    margin: auto;
  }

  .provider-card {
    background: rgba(255, 255, 255, 0.95);
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;
    border: 0.10000000149011612px solid #bcbcbc;
    box-shadow: 0px 7px 10px #00000062;
    border-radius: 0.5px;
    // opacity: 1;

    &:hover {
      background: white;
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    &.hero-provider-card {
      opacity: 1;

      // Add proper spacing between sections with padding
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      &:first-child {
        position: relative;
        top: 40px;
        z-index: 100;
      }
      &:nth-child(2) {
        position: relative;
        left: -40px;
        z-index: 2000;
      }
      &:nth-child(3) {
        position: relative;
        top: -40px;
        z-index: 100;
      }
      @include mobile {
        padding: 0px 15px;
      }
    }

    // Logo section with proper spacing
    .provider-logo, .hero-provider-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      padding: 8px 0;

      .provider-logo-img {
        max-width: 100%;
        height: 32px;
        object-fit: contain;
        object-position: center;
      }
    }
    // Rating section with proper spacing
    .provider-rating, .hero-provider-rating {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 8px;
      flex: 1;

      .stars {
        color: var(--accent-color);
        font-size: 0.875rem;
        display: flex;
        gap: 1px;
      }

      .reviews-text {
        font-size: 0.75rem;
        color: var(--text-muted);
      }
    }

    // Button section with proper spacing
    .hero-provider-button {
      padding: 8px 0;
    }

    .see-quotes-btn {
      background: var(--primary-color);
      color: white;
      border: none;
      padding: var(--spacing-sm) var(--spacing-lg);
      border-radius: var(--radius-md);
      font-weight: 700;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      white-space: nowrap;

      &:hover {
        background: var(--primary-hover);
        transform: translateY(-1px);
      }

      @include mobile {
        font-size: .7em;
        padding: 5px 10px;
        margin: 5px;
      }
    }
  }

</style>
