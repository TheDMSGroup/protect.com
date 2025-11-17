<template>
  <div class="hero-wrapper vertical-hero">
    <b-container :class="heroClass">
      <div class="hero">
        <div class="hero-left">
          <b-row>
            <b-col class="headline-col" cols="12">
              <h1>{{ headline }}</h1>
              <h2 v-if="!subheadlineType === 'small'">{{ subheadline }}</h2>
              <p v-else>{{ subheadline }}</p>
            </b-col>
            <b-col v-if="ctaType" class="cta-col" cols="12">
              <b-row v-if="ctaType == 'buttons'" class="btn-row">
                <b-col
                  v-for="(btn, index) in ctaConfig.options"
                  :key="index"
                  cols="12"
                  lg="6"
                >
                  <router-link class="vertical-btn" :to="'/' + btn.value">
                    <img :src="getImage(btn.icon)" :alt="btn.text" />
                    <p class="btn-title">
                      {{ btn.text }}
                    </p>
                  </router-link>
                </b-col>
              </b-row>
              <div
                v-else-if="ctaType == 'rates-dropdown'"
                class="compare-dropdown"
              >
                <CompareYourRateDropdown
                  submitText="CONTINUE"
                  :compareRateConfig="ctaConfig"
                />
              </div>
            </b-col>
          </b-row>
        </div>
        <div class="hero-right">
          <img :src="getImage(heroImage)" alt="Identity Shield" />
        </div>
      </div>
    </b-container>
    <div class="skews"></div>
  </div>
</template>

<script>
export default {
  name: "VerticalHero",
  props: {
    heroImage: String,
    headline: String,
    subheadline: String,
    ctaType: String,
    ctaConfig: Object,
    heroClass: {
      type: String,
      default: "",
    },
    subheadlineType: {
      type: String,
      default: "large",
    },
  },
  components: {
    BContainer,
    BRow,
    BCol,
    CompareYourRateDropdown,
  },
  methods: {
    getImage(image) {
      return "../public/assets/" + image;
    },
  },
};
</script>

<style scoped lang="scss">
.hero-wrapper {
  background-color: $gray-light;
  width: 100%;
  overflow: hidden;

  .container {
    z-index: -1;
  }

  .container.home-seo-hero {
    .hero {
      .hero-left {
        width: 50%;
        @include media-breakpoint-down(md) {
          width: 100%;
        }
        h1 {
          font-size: 3.75rem;
          @include media-breakpoint-down(xl) {
            font-size: 3rem;
          }
        }
        p {
          @include media-breakpoint-down(xl) {
            font-size: 1rem;
            line-height: 1.4;
            max-width: 500px;
          }
        }
      }
    }
  }

  .hero {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 700px;
    flex-wrap: wrap;

    @include media-breakpoint-down(md) {
      height: auto;
    }

    .hero-left {
      width: 55%;
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

      .mobile-shield-image {
        width: 100%;
        max-height: 400px;
        object-fit: contain;
        object-position: right;
      }
      .cta-col {
        position: static;

        @include media-breakpoint-down(xs) {
          padding-bottom: 50px;
        }
      }
    }

    .hero-right {
      width: 45%;
      display: flex;
      height: 100%;

      @include media-breakpoint-down(md) {
        width: 100%;
      }

      img {
        display: block;
        height: 100%;
        object-fit: contain;
        object-position: top right;

        @include media-breakpoint-down(md) {
          max-width: 600px;
          margin: 0 auto;
          width: 100%;
        }
      }
    }

    .btn-row {
      max-width: 600px;
    }

    .vertical-btn {
      display: flex;
      background: #fff;
      border: 1px solid #ddd;
      box-shadow: 0px 0px 16px -5px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      padding: 15px;
      align-items: center;

      &:hover {
        text-decoration: none;
      }

      @include media-breakpoint-down(md) {
        margin-bottom: 15px;
      }

      img {
        height: 50px;
        width: 50px;
        object-fit: contain;
        margin-right: 15px;
      }
      .btn-title {
        color: #3b54ba;
        font-size: 18px;
        margin: 0;
        font-weight: 400;
      }
    }
  }
}

.skews {
  position: relative;

  &:after {
    content: "";
    background-color: $white;
    position: absolute;
    height: 250px;
    z-index: 0;
    bottom: -175px;
    width: 100%;
    clip-path: ellipse(55% 125px at 50% 50%);

    @include media-breakpoint-down(sm) {
      clip-path: ellipse(70% 95px at 50% 50%);
    }
  }
}
</style>
