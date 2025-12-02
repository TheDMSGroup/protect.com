<script setup>
  import { useStore } from "@/stores/store.js";
  const store = useStore();
  const assetsBaseUrl = store.assetsBaseUrl;

  const props = defineProps({
    heroImage: {
      type: String,
      default: "",
    },
    headline: {
      type: String,
      default: "",
    },
    subheadline: {
      type: String,
      default: "",
    },
    zipcodeUrl: {
      type: String,
      default: "",
    },
    intermediaryModalOptions: {
      type: Object,
      default: () => ({}),
    },
    lazyImage: {
      type: Boolean,
      default: false,
    },
  });

  console.log("SubVerticalHero props:", props);
  console.log("zipcodeUrl value:", props.zipcodeUrl);

  const { heroImage, headline, subheadline, zipcodeUrl, intermediaryModalOptions } = props;

  const heroImageSrc = computed(() => {
    return `${assetsBaseUrl}/${heroImage}`;
  });
</script>

<template>
  <div class="hero-wrapper">
    <div class="container">
      <div class="hero">
        <div class="hero-left">
          <b-row>
            <b-col class="headline-col" cols="12">
              <h1>{{ headline }}</h1>
              <h2>{{ subheadline }}</h2>
            </b-col>
            <b-col class="cta-col" cols="12">
              <slot name="formactions">
                <ZipCodeForm :intermediary-modal-options="intermediaryModalOptions" :action="zipcodeUrl" />
              </slot>
            </b-col>
            <b-col cols="12" class="hero-img-sm">
              <NuxtImg
                :src="heroImageSrc"
                :loading="lazyImage ? 'lazy' : 'eager'"
                :fetchpriority="lazyImage ? 'low' : 'auto'"
                decoding="async"
                :preload="!lazyImage"
                sizes="sm:400px md:400px"
              />
            </b-col>
          </b-row>
        </div>
        <div class="hero-right">
          <NuxtImg
            :src="heroImageSrc"
            :loading="lazyImage ? 'lazy' : 'eager'"
            :fetchpriority="lazyImage ? 'low' : 'auto'"
            decoding="async"
            :preload="!lazyImage"
            sizes="md:475px lg:475px xl:475px"
          />
        </div>
      </div>
    </div>
    <div class="skews" />
  </div>
</template>

<style scoped lang="scss">
  .hero-wrapper {
    background-color: $gray-light;
    width: 100%;
    height: 700px;
    overflow: hidden;

    @include media-breakpoint-between(xl, lg) {
      height: 800px;
    }
    @include media-breakpoint-down(md) {
      height: 1100px;
    }
    .container {
      z-index: -1;
    }

    .hero-img-sm {
      display: none;
      max-width: 400px;
      width: 100%;
      margin: 0 auto;
      @include media-breakpoint-down(md) {
        display: block;
      }
    }
    .hero {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 100%;

      @include media-breakpoint-down(xs) {
        flex-wrap: wrap;
      }

      .hero-left {
        width: 60%;
        display: flex;
        flex-direction: column;
        margin-top: 6em;
        text-align: left;

        @include media-breakpoint-down(lg) {
          margin-top: 4em;
        }

        @include media-breakpoint-down(md) {
          width: 100%;
          margin-bottom: 2em;
        }

        @include media-breakpoint-down(sm) {
          margin-top: 3em;
          margin-bottom: 0;
        }

        h1 {
          font-size: 4.3rem;
          font-family: "Cantata One", serif;
          letter-spacing: -0.07rem;
          line-height: 4.9rem;

          @include media-breakpoint-down(xl) {
            font-size: 3.3em;
            line-height: 1.2;
          }
          @include media-breakpoint-down(lg) {
            font-size: 2.5em;
            max-width: 450px;
          }
        }

        h2 {
          color: $gray-dark;
          font-size: 2.39rem;
          font-family: "Nunito Sans", sans-serif;
          font-weight: 400;
          margin-top: 1.3rem;
          margin-bottom: 2.3rem;
          letter-spacing: -0.019rem;
          line-height: 2.85rem;

          @include media-breakpoint-down(lg) {
            font-size: 1.6em;
            line-height: 1.3em;
          }
        }

        img.mobile-image {
          max-width: 100%;

          @include media-breakpoint-down(xs) {
            margin-top: 1em;
          }
        }
      }

      .hero-right {
        width: 40%;
        display: flex;
        justify-content: center;
        align-items: start;
        padding-top: 3em;

        @include media-breakpoint-down(lg) {
          align-items: flex-start;
        }
        @include media-breakpoint-down(md) {
          display: none;
        }

        img {
          width: 90%;
          max-width: 475px;
          margin-left: auto;
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
    top: 50px;
    left: -7%;
    z-index: 0;

    @include media-breakpoint-down(md) {
      width: 140%;
      left: -20%;
    }
  }
</style>
