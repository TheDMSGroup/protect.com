<template lang="html">
  <b-row class="vertical_card_row">
    <template v-if="cardPosition === 'left'">
      <b-col cols="12" :lg="12 - Number(largeColSize)" class="img_col">
        <img :src="getImage(cardImage)" />
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
        ></b-buttons>
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
        ></b-buttons>
      </b-col>
      <b-col cols="12" :lg="12 - Number(largeColSize)" class="img_col">
        <img :src="getImage(cardImage)" />
      </b-col>
    </template>
  </b-row>
</template>

<script>
import {
  preprocessTextForLinks,
  redirectWithParams,
} from "../mixins/utilsMixin";

export default {
  name: "VerticalCardRow",
  components: {
    BRow,
    BCol,
    BButtons,
  },
  props: {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    buttonDestination: {
      type: String,
      default: "/",
    },
    buttonLabel: {
      type: String,
      default: "COMPARE PLANS NOW",
    },
    cardImage: {
      type: String,
      default: "cards_auto_insurance.png",
    },
    cardPosition: {
      type: String,
      default: "left",
    },
    links: {
      type: Array,
      default: () => [],
    },
    largeColSize: {
      type: [String, Number],
      default: "6",
    },
  },
  methods: {
    goToRoute(route) {
      redirectWithParams(route, {}, this.$router);
    },
    getImage(image) {
      return require("../assets/" + image);
    },
    preprocessDescription() {
      return preprocessTextForLinks(this.description, this.links);
    },
  },
};
</script>

<style lang="scss">
@import "../scss/bootstrap.scss";
@import "../scss/_variables.scss";

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
