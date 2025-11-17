<script setup>
const store = useStore();
const assetsBaseUrl = store.assetsBaseUrl;

const props = defineProps({
  testimonialConfig: {
    type: Object,
    required: true,
  },
});

const imageOverlap = computed(() => {
  return props.testimonialConfig.imageOverlap === false ? " no-overlap" : "";
});
</script>

<template>
  <section id="testimonials" :class="imageOverlap">
    <div class="container">
      <div class="wrapper">
        <div class="testimonial-container">
          <b-row :class="testimonialConfig.layout">
            <b-col
              :cols="testimonialConfig.imageColWidth"
              :class="
                'testimonial-image ' +
                `${testimonialConfig.imageWrapperClass || 'default'}`
              "
            >
              <NuxtImg
                :src="`${assetsBaseUrl}/testimonials/${testimonialConfig.image}`"
                :alt="testimonialConfig.title"
              />
            </b-col>
            <b-col
              :class="
                'testimonial-text ' +
                `${testimonialConfig.textWrapperClass || 'default'}`
              "
            >
              <h2>{{ testimonialConfig.title }}</h2>
              <h4>{{ testimonialConfig.subhead }}</h4>
              <p>{{ testimonialConfig.quote }}</p>
              <small class="byline">{{ testimonialConfig.byline }}</small>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
#testimonials.no-overlap {
  /* styles for images that don't overlap */
  background-color: rgba(103, 194, 151, 0.06);

  .wrapper {
    @include media-breakpoint-down(sm) {
      padding-bottom: 0;
    }
  }

  /* if we don't want the image to overlap - we default to align bottom */
  .testimonial-image {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-end;
  }
}

#testimonials:not(.no-overlap)::after {
  background-color: rgba(103, 194, 151, 0.06);
  position: absolute;
  content: "";
  width: 100%;
  height: 80%;
  bottom: 0;
  left: 0;
  z-index: 1;

  @include media-breakpoint-down(sm) {
    height: 85%;
  }
}

#testimonials {
  margin-bottom: 100px;
  position: relative;
  .container {
    padding-top: 75px;
    position: relative;
    z-index: 2;
  }
  .wrapper {
    padding: 0px 75px 0px 75px;
    @include media-breakpoint-down(md) {
      padding: 0px;
    }
    @include media-breakpoint-down(sm) {
      padding: 0;
    }

    .testimonial-container {
      @include media-breakpoint-down(sm) {
        padding: 0;
      }
      .row {
        margin-bottom: 20px;
      }

      .image-left {
        .testimonial-image {
          order: 1;
        }
        .testimonial-text {
          order: 2;

          * {
            margin: 10px 0;
          }
        }
      }
      .image-right {
        .testimonial-image {
          order: 2;
        }
        .testimonial-text {
          order: 1;
        }
      }
      .testimonial-text {
        @include media-breakpoint-down(md) {
          padding-top: 35px;
        }
      }
      .testimonial-image {
        @include media-breakpoint-down(sm) {
          order: 2;
          flex: 0 0 100%;
          max-width: 100%;
          justify-content: center;
        }
        img {
          max-width: 100%;
          @include media-breakpoint-down(sm) {
            max-width: 200px;
            margin: auto;
            display: block;
          }
        }
      }
      .testimonial-text {
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: left;

        @include media-breakpoint-down(md) {
          padding-bottom: 2em;
        }
        @include media-breakpoint-down(sm) {
          order: 1;
        }
        .byline {
          color: black;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
