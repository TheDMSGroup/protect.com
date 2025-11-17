<script setup>
const store = useStore();
const assetsBaseUrl = store.assetsBaseUrl;

const props = defineProps({
  containerClass: {
    type: String,
    default: "",
  },
  headline: {
    type: String,
    required: true,
  },
  subheadline: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  image_top: {
    type: Number,
    default: 50,
  },
  ctaType: {
    type: String,
    default: "rates-dropdown", // 'rates-dropdown' or 'zipcode-form'
  },
  ctaConfig: {
    type: Object,
    default: () => ({}),
  },
  action: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div :class="'action-banner ' + containerClass">
    <div class="spacer" :style="'height: ' + image_top + 'px;'"></div>
    <div class="brown-section">
      <b-container>
        <b-row>
          <b-col cols="12" md="6">
            <div class="compare-photo">
              <NuxtImg
                :style="
                  'top: -' + image_top + 'px; margin-top: -' + image_top + 'px;'
                "
                :src="`${assetsBaseUrl}/${image}`"
              />
            </div>
          </b-col>
          <b-col cols="12" md="6">
            <div id="action-banner-widget-bottom">
              <h2>{{ headline }}</h2>
              <h3>{{ subheadline }}</h3>
              <CompareYourRateDropdown
                v-if="ctaType === 'rates-dropdown'"
                submitText="CONTINUE"
                :compareRateConfig="ctaConfig"
              />
              <ZipCodeForm
                v-else-if="ctaType === 'zipcode-form'"
                :action="action"
              />
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.action-banner.dad-bike {
  .brown-section {
    padding: 5em 0 6.6em;
    .compare-photo {
      img {
        margin-top: 10px;
        max-height: 225%;
        top: -199px !important;
      }
    }
  }
}

.action-banner.binoculars {
  position: relative;
  .brown-section {
    padding: 2em 0 0;
    @include media-breakpoint-up(md) {
      padding: 0;
    }
    .container {
      position: relative;
      z-index: 2;
    }
    .row {
      #action-banner-widget-bottom {
        padding: 5em 0;
        @include media-breakpoint-down(sm) {
          padding: 0;
        }
      }

      @include media-breakpoint-down(sm) {
        .col-md-6:has(.compare-photo) {
          order: 2;
        }
      }
    }
    .compare-photo {
      flex-direction: column;
      justify-content: end;
      align-items: start;
      img {
        margin-top: 10px;
        max-height: 90%;
        @include media-breakpoint-between(md, sm) {
          max-width: 400px;
        }
        top: unset;

        @include media-breakpoint-down(md) {
          margin-bottom: 0;
        }
        @include media-breakpoint-down(sm) {
          max-width: 300px;
          margin: 0 auto;
        }
      }
    }
  }
}

.action-banner {
  .brown-section {
    text-align: left;
    background-color: $sand;
    padding: 3em 0;
    height: auto;

    @include media-breakpoint-down(xl) {
      padding: 2em 0;
    }

    .compare-photo {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;

      img {
        position: absolute;
        top: -50px;
        object-fit: contain;
        object-position: bottom;
        max-height: 150%;
        max-width: 100%;

        @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
          /* IE10+ CSS styles go here */
          right: 25%;
        }

        @include media-breakpoint-up(md) {
          margin-top: 0 !important;
        }
        @include media-breakpoint-down(lg) {
          top: auto !important;
          bottom: 0;
        }
        @include media-breakpoint-down(md) {
          position: static;
          margin-bottom: 1.6em;
        }
      }
    }

    #action-banner-widget-bottom {
      h2 {
        color: $blue-light;
        font-size: 2.8em;
        margin-bottom: 0.4em;

        @include media-breakpoint-down(md) {
          font-size: 2em;
        }
      }

      h3 {
        color: $gray-dark;
        font-size: 1.6em;
        margin-bottom: 1.6em;

        @include media-breakpoint-down(lg) {
          margin-bottom: 0.8em;
        }
        @include media-breakpoint-down(md) {
          font-size: 1.4em;
        }
      }
    }
  }
  .spacer {
    @include media-breakpoint-between(md, md) {
      display: none;
    }
  }
}
</style>
