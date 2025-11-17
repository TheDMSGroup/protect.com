<template>
  <div class="hero-wrapper">
    <div class="container">
      <div class="hero">
        <div class="hero-left">
            <h1>Compare home, health, and car insurance rates and start saving money today</h1>
            <p>Take the stress out of finding the best insurance rates by letting us instantly shop the top home, health, and auto insurance companies for you.</p>
            <div class="compare-dropdown" v-if="action === 'rates-dropdown'">
              <CompareYourRateDropdown
                submitText="CONTINUE"
                :compareRateConfig="compareRateConfig" />
            </div>
            <div class="zip-form" v-else>
            <slot name="formactions">
              <ZipCodeForm
              :action="action" />
            </slot>
            </div>
        </div>
        <div class="hero-right">
          <img alt="" :src="getImage(image)" />
        </div>
      </div>
    </div>
    <div class="skews">
    </div>
  </div>
</template>

<script>

export default {
  name: 'Hero',
  components: {
    ZipCodeForm: () => import('./ZipCodeForm.vue'),
    CompareYourRateDropdown: () => import('./CompareYourRateDropdown.vue'),
  },
  props: {
    compareRateConfig: {
      type: Object,
      default: () => ({}),
    },
    action: {
      type: String,
      default: 'https://insure.protect.com/',
    },
    headline: {
      type: String,
      default: '',
    },
    subheadline: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: 'couple-home.jpg',
    },
    formType: {
      type: String,
      default: 'zip-form',
    },
  },
  data() {
    return {
      // action moved to props
    };
  },
  methods: {
    getImage(image) {
      return require(`../assets/${image}`);
    },
  },
};
</script>

<style scoped lang="scss">

.hero-wrapper {
  background-color: $gray-light;
  width: 100%;
  height: 700px;
  overflow: hidden;

  @include media-breakpoint-down(sm) {
    height: 1020px;
  }

  .container {
    z-index: -1;
  }

  .hero {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 700px;

    @include media-breakpoint-down(sm) {
      flex-wrap: wrap;
    }

    .hero-left {
      width: 50%;
      display: flex;
      flex-direction: column;
      margin-top: 8em;
      text-align: left;

      @include media-breakpoint-down(lg) {
        margin-top: 4em;
      }

      @include media-breakpoint-down(sm) {
        width: 100%;
        margin-bottom: 2em;
      }

      h1 {
        font-size: 4em;
        margin-bottom: 0.32em;

        @include media-breakpoint-down(xl) {
          font-size: 2.8em;
        }
      }

      h2 {
        color: $gray-dark;
        font-size: 2.3em;
        font-family: 'Nunito Sans', sans-serif;
        margin-bottom: 1.5em;

        @media (max-width: 1200px) {
          font-size: 1.6em;
        }
      }
    }

    .hero-right {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      @include media-breakpoint-down(sm) {
        width: 100%;
      }

      img {
        padding-left: 9em;
        margin-top: 46px;

        @include media-breakpoint-down(xl) {
          padding: 0;
          margin-top: 0;
          width: 100%;
        }
      }
    }
  }
}

.skews {
  width: 115%;
  background-color: $white;
  border-radius: 150%;
  position: relative;
  height: 250px;
  top: -62px;
  left: -7%;
  z-index: 0;

  @include media-breakpoint-down(sm) {
    top: 212px;
  }

  @include media-breakpoint-down(xs) {
    top: 180px;
    width: 140%;
    left: -20%;
  }
}
</style>
