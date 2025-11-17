<!--

HowToUse

<intermediary-modal
  v-if="showIM" // property that will show the modal. Warning, you cannot close it
  url="https://www.google.com" // url of where you want the person to go
  delay="3" // seconds for the redirect to be delayed
  text="Finding lowest rates" // Main Text to be displayed
  subText="You are leaving Protect.com" // Main Text to be displayed
>
  <img slot="logo" src="../assets/protect_logo.png" class="img-fluid">
  <img slot="gif" src="../assets/blue_checkmark.gif" class="img-fluid">
</intermediary-modal>

`leaveBehindPath` will open `url` in a new window and redirect the current page
to the path that is defined
-->
<template>
  <b-modal
    id="intermediary-modal"
    ref="my-modal"
    hide-footer
    hide-header
    hide-header-close
    centered
    no-close-on-backdrop
    no-close-on-esc
  >
    <div class="modal_logo" v-if="showLogo">
      <slot name="logo"></slot>
    </div>
    <div class="modal_gif" v-if="showGif">
      <slot name="gif"></slot>
    </div>
    <div class="model_text" v-if="text">{{ text }}</div>
    <div class="model_subtext" v-if="subtext">{{ subtext }}</div>
  </b-modal>
</template>

<script>
export default {
  name: "Intermediary-Modal",
  props: {
    showIM: Boolean,
    delay: {
      default: 3,
      type: [Number, String],
    },
    url: String,
    leaveBehindPath: String,
    text: String,
    subtext: String,
    logo: String,
    gif: String,
  },
  data() {
    return {
      showLogo: false,
      showGif: false,
    };
  },
  created() {
    this.configSlots();
  },
  mounted() {
    this.$refs["my-modal"].show();
    const delay = Number(this.delay) * 1000;
    setTimeout(() => {
      if (this.leaveBehindPath) {
        window.open(this.url, "_blank");
        this.$router.push({ path: "/" + this.leaveBehindPath });
      } else {
        window.open(this.url, "_self");
      }
    }, delay);
  },
  watch: {},
  destroyed() {},
  computed: {},
  methods: {
    configSlots() {
      this.showLogo = this.$slots.logo?.[0];
      this.showGif = this.$slots.gif?.[0];
    },
  },
};
</script>

<style lang="scss">
.modal-backdrop {
  background-color: #fff !important;
  opacity: 0.7 !important;
}
.modal-content {
  -webkit-box-shadow: 0px 0px 34px 6px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 0px 34px 6px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 34px 6px rgba(0, 0, 0, 0.25);
  margin: 0 auto;
  max-width: 300px;
}
.modal_logo {
  width: 250px;
  margin: 0 auto;
  padding: 25px;
  text-align: center;
}
.modal_gif {
  margin: 0 auto;
  width: 130px;
}
.model_text {
  color: #3b54ba;
  font-size: 1.9rem;
  font-family: "Nunito Sans", sans-serif;
  font-weight: 400;
  text-align: center;
  line-height: 1.1;
  padding: 10px 0 25px 0;
}
.model_subtext {
  color: #666;
  font-size: 1rem;
  font-family: "Nunito Sans", sans-serif;
  font-weight: 400;
  text-align: center;
  line-height: 1;
  padding: 0 0 25px 0;
}
</style>
