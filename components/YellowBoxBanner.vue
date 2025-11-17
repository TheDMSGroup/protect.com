<template lang="html">
  <section class="yellow-box-banner">
    <b-container :class="{ 'right-image': imageAlign === 'right' }">
      <b-row>
        <b-col cols="12" md="5" lg="7" v-if="imageAlign === 'left'">
          <NuxtImg class="image" :src="getImage(image)" />
        </b-col>
        <b-col
          cols="12"
          md="5"
          lg="7"
          v-if="imageAlign === 'right'"
          class="d-block d-md-none d-lg-none d-xl-none"
        >
          <NuxtImg class="image" :src="getImage(image)" />
        </b-col>
        <b-col cols="12" md="7" lg="5" class="wrapper">
          <h2>{{ headline }}</h2>
          <p>
            {{ content }}
          </p>
          <p v-if="action && actionMessage">
            <b-buttons
              :config="{
                type: 'submit',
                size: 'lg',
                variant: 'outline-primary',
                label: actionMessage,
                icon: 'arrow-right-short',
                click: goToAction,
              }"
            ></b-buttons>
          </p>
        </b-col>
        <b-col
          cols="12"
          md="5"
          lg="7"
          v-if="imageAlign === 'right'"
          class="d-none d-md-block"
        >
          <NuxtImg class="image" :src="getImage(image)" />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import BButtons from "./Buttons/Main.vue";

export default {
  name: "YellowBoxBanner",
  props: {
    image: String,
    headline: String,
    content: String,
    action: String,
    actionMessage: String,
    imageAlign: {
      type: String,
      default: "left",
    },
  },
  methods: {
    getImage(image) {
      return "../public/assets/" + image;
    },
    goToAction() {
      if (this.action.includes("#")) {
        const element = document.querySelector(this.action);
        element.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      } else {
        this.$router.push(this.action);
      }
    },
  },
};
</script>

<style lang="scss">
.yellow-box-banner {
  margin-bottom: 100px;

  @include media-breakpoint-down(sm) {
    margin-bottom: 50px;
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: 15px;

    @include media-breakpoint-down(md) {
      text-align: left;
      font-size: 2.3rem;
    }
    @include media-breakpoint-down(sm) {
      font-size: 2rem;
    }
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
    max-height: 600px;
    object-fit: contain;
    margin: 50px auto 0 auto;
  }
  p {
    font-weight: 400;
    font-size: 1.5rem;

    @include media-breakpoint-down(md) {
      font-size: 1.35rem;
    }
  }
  .btn {
    margin-top: 25px;
    height: 80px;
    display: block;
  }
}
</style>
