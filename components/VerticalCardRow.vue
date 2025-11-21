<script setup>
  import { buildImageUrl } from "@/composables/images";
  const props = defineProps({
    cardImage: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    links: {
      type: Array,
      default: () => [],
    },
    buttonLabel: {
      type: String,
      default: "",
    },
    buttonDestination: {
      type: String,
      default: "",
    },
    largeColSize: {
      type: [String, Number],
      default: 6,
    },
    cardPosition: {
      type: String,
      default: "left",
    },
  });

  const { cardImage, title, description, links, buttonLabel, buttonDestination, largeColSize, cardPosition } = props;
  const goToRoute = (route) => {
    redirectWithParams(route, {}, this.$router);
  };
  const preprocessDescription = () => {
    if (!description) return "";
    return preprocessTextForLinks(description, links);
  };
</script>

<template lang="html">
  <b-row class="vertical_card_row">
    <template v-if="cardPosition === 'left'">
      <b-col cols="12" :lg="12 - Number(largeColSize)" class="img_col">
        <NuxtImg :src="buildImageUrl(cardImage)" />
      </b-col>
      <b-col cols="12" :lg="largeColSize" class="content_col">
        <h2>{{ title }}</h2>
        <p v-html="preprocessDescription()"></p>
        <b-buttons
          class=""
          :config="{
            click: goToRoute,
            clickParam: buttonDestination,
            size: 'lg',
            variant: 'primary',
            label: buttonLabel,
            icon: 'arrow-right-short',
          }"
        />
      </b-col>
    </template>
    <template v-if="cardPosition === 'right'">
      <b-col cols="12" :lg="largeColSize" class="content_col">
        <h2>{{ title }}</h2>
        <p v-html="preprocessDescription()"></p>
        <b-buttons
          class=""
          :config="{
            click: goToRoute,
            clickParam: buttonDestination,
            size: 'lg',
            variant: 'primary',
            label: buttonLabel,
            icon: 'arrow-right-short',
          }"
        />
      </b-col>
      <b-col cols="12" :lg="12 - Number(largeColSize)" class="img_col">
        <NuxtImg :src="buildImageUrl(cardImage)" />
      </b-col>
    </template>
  </b-row>
</template>

<style lang="scss">
  .vertical_card_row {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 74px;

    .img_col {
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      @include media-breakpoint-down(md) {
        order: 1;
      }
      img {
        display: block;
        width: 100%;
      }
    }

    .content_col {
      padding: 2em 6em;

      @include media-breakpoint-down(md) {
        padding: 15px;
        order: 2;
      }

      h2 {
        font-size: 60px;

        @include media-breakpoint-down(xl) {
          font-size: 40px;
        }
      }
      p {
        font-size: 31px;
        font-weight: 400;

        @include media-breakpoint-down(xl) {
          font-size: 20px;
        }
      }
      .btn {
        margin-top: 25px;
        padding: 15px 45px;

        @include media-breakpoint-down(sm) {
          width: 100%;
        }
      }
    }
  }
</style>
