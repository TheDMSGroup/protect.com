<template lang="html">
  <section class="yellow-box-banner" :aria-labelledby="headingId">
    <b-container :class="{ 'right-image': imageAlign === 'right' }">
      <b-row>
        <b-col v-if="imageAlign === 'left'" cols="12" md="5" lg="7">
          <NuxtImg
            class="image"
            :alt="imageAlt"
            :src="buildImageUrl(image)"
            :loading="lazyImage ? 'lazy' : 'eager'"
            :fetchpriority="lazyImage ? 'low' : 'auto'"
            decoding="async"
            :preload="!lazyImage"
          />
        </b-col>
        <b-col v-if="imageAlign === 'right'" cols="12" md="5" lg="7" class="d-block d-md-none d-lg-none d-xl-none">
          <NuxtImg
            class="image"
            :alt="imageAlt"
            :src="buildImageUrl(image)"
            :loading="lazyImage ? 'lazy' : 'eager'"
            :fetchpriority="lazyImage ? 'low' : 'auto'"
            decoding="async"
            :preload="!lazyImage"
          />
        </b-col>
        <b-col cols="12" md="7" lg="5" class="wrapper">
          <h2 :id="headingId">{{ headline }}</h2>
          <p>
            {{ content }}
          </p>
          <p v-if="action && actionMessage">
            <ButtonsMain
              :disabled="false"
              :config="{
                type: 'button',
                size: 'lg',
                variant: 'outline-primary',
                label: actionMessage,
                icon: 'arrow-right-short',
                click: goToAction,
              }"
            />
          </p>
        </b-col>
        <b-col v-if="imageAlign === 'right'" cols="12" md="5" lg="7" class="d-none d-md-block">
          <NuxtImg
            class="image"
            :alt="imageAlt"
            :src="buildImageUrl(image)"
            :loading="lazyImage ? 'lazy' : 'eager'"
            :fetchpriority="lazyImage ? 'low' : 'auto'"
            decoding="async"
            :preload="!lazyImage"
          />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script setup>
  import { buildImageUrl } from "~/composables/images";
  const props = defineProps({
    image: {
      type: String,
      default: "",
    },
    imageAlt: {
      type: String,
      default: "",
    },
    headline: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    action: {
      type: String,
      default: "",
    },
    actionMessage: {
      type: String,
      default: "",
    },
    imageAlign: {
      type: String,
      default: "left",
    },
    lazyImage: {
      type: Boolean,
      default: true,
    },
  });

  const router = useRouter();

  // Generate unique ID for heading to link with aria-labelledby
  const headingId = `yellow-banner-heading-${Math.random().toString(36).substring(2, 11)}`;

  const goToAction = () => {
    if (props.action.includes("#")) {
      const element = document.querySelector(props.action);
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    } else {
      router.push(props.action);
    }
  };
</script>

<style lang="scss">
  .yellow-box-banner {
    margin-bottom: 100px;

    @include media-breakpoint-down(sm) {
      margin-bottom: 50px;
    }

    h2 {
      margin-bottom: 15px;
    }

    .container {
      background-image: linear-gradient(#fafaec, #fafaec);
      background-size: 60% 100%;
      background-repeat: no-repeat;
      background-position: right;

      &.right-image {
        background-position: left;
      }
      @include media-breakpoint-down(md) {
        background-size: 70% 100%;
      }
      @include media-breakpoint-down(sm) {
        background-size: 90% 80%;
        background-position: bottom;
        &.right-image {
          background-position: bottom;
        }
      }
    }
    .wrapper {
      padding: 75px 50px 25px 0;

      @include media-breakpoint-down(sm) {
        padding: 25px 35px;
      }
    }
    .container.right-image .wrapper {
      padding: 75px 0 25px 50px;

      @include media-breakpoint-down(sm) {
        padding: 25px 35px;
      }
    }
    .image {
      display: block;
      width: 100%;
      max-width: 600px;
      margin: 50px auto 0 auto;
    }
    .btn {
      margin-top: 25px;
      height: 80px;
      display: block;
    }
  }
</style>
