<script setup>
  import { buildImageUrl } from "@/composables/images.js";

  const props = defineProps({
    providersConfig: {
      type: Array,
      required: true,
    },
    rowLength: {
      type: Number,
      default: 0,
    },
    logoMaxWidth: {
      type: String,
      default: "100%",
    },
    logoMaxHeight: {
      type: String,
      default: "auto",
    },
  });

  // Computed properties
  const calculatedRowLength = computed(() => {
    return props.rowLength === 0 ? undefined : Math.floor(12 / props.rowLength);
  });

  const shouldBeFluid = computed(() => {
    return props.providersConfig.length % 2 !== 0;
  });

  const isLastItem = (item) => {
    return props.providersConfig.indexOf(item) === props.providersConfig.length - 1;
  };
</script>

<template>
  <div class="brands">
    <h2 class="text-center mb-4">
      <slot />
    </h2>
    <b-row>
      <b-col
        :id="`provider-${providersConfig.indexOf(provider) + 1}`"
        :md="!calculatedRowLength ? '' : calculatedRowLength"
        v-for="provider in providersConfig"
        :key="provider.name"
        cols="6"
        class="brand"
        :fluid="shouldBeFluid ? isLastItem(provider) : false"
      >
        <NuxtImg
          :src="buildImageUrl(`partners/${provider.src}`)"
          :alt="provider.name"
          :style="{
            maxWidth: logoMaxWidth,
            maxHeight: logoMaxHeight,
            margin: '0 auto',
          }"
        />
      </b-col>
    </b-row>
  </div>
</template>

<style lang="scss" scoped>
  .brands {
    max-width: 900px;
    width: 100%;
    margin: 50px auto 150px auto;

    .row {
      justify-content: center;
    }
    .brand {
      margin-bottom: 0.5em;
    }

    @include media-breakpoint-down(sm) {
      margin: 50px auto;
      padding: 0 15px;
      .brand {
        margin-bottom: 1em;
      }
      .brand[fluid] {
        flex: 0 0 50%;
        max-width: 50%;
      }
    }

    .brand {
      display: flex;
      flex-direction: column;
      justify-content: center;

      img {
        max-width: 100%;

        @include media-breakpoint-down(md) {
          max-width: 80%;
          margin: auto;
          display: block;
        }
      }
    }
  }
</style>
