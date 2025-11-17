<template lang="html">
  <div id="vetical_button_selection">
    <b-container>
      <b-row>
        <b-col cols="12">
          <div class="buttonCardsContainer">
            <div class="buttonCard message btn">
              <span class="button-label" v-html="message"></span>
            </div>
            <div
              v-for="(buttonConfig, index) in buttonConfigs"
              :key="index"
              class="buttonCard buttonWithRadio"
            >
              <buttons-radio-theme :config="buttonConfig" />
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  props: {
    buttonConfigs: {
      type: Array,
    },
    message: {
      type: String,
      default: "Select Your Protection",
    },
  },
  components: {
    BContainer,
    BRow,
    BCol,
    ButtonsRadioTheme,
  },
  // computed: {
  //   getButtonCardWidth() {
  //     if (this.buttonConfigs) {
  //       return (100 / this.buttonConfigs.length) + '%';
  //     }
  //     return '100%';
  //   },
  // },
  methods: {
    getImage(image) {
      return require("../assets/" + image);
    },
  },
};
</script>

<style lang="scss" scoped>
#vetical_button_selection {
  .buttonCardsContainer {
    display: flex;

    .buttonCard {
      flex: 1;
      margin: 0 10px;

      &.message {
        box-shadow: 0px 0px 20px -13px rgba(0, 0, 0, 0.51);
        border: 1px solid #ccc;
        background: #3a54ba;
        color: #fff;
        margin-bottom: 25px;
        cursor: initial;

        .button-label {
          width: 100%;
          height: 100%;
          font-size: 1.2rem;
          text-align: left;
          display: inline-block;
          padding-top: 7px;
          padding-right: 15px;
          padding-left: 15px;
        }
      }
    }
  }
}
</style>
