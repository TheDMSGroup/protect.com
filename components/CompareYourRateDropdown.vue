<template>
  <div class="compare-your-rate-dropdown">
    <selects v-model="goTo" :valid="true" :config="compareRateConfig"></selects>
    <span class="click-continue" v-on:click="changeRoute">
      <b-buttons
        class="continue"
        :config="{
          size: 'lg',
          variant: 'primary',
          label: submitText,
          icon: 'arrow-right-short',
        }"
      ></b-buttons>
    </span>
  </div>
</template>

<script>
export default {
  name: "CompareYourRateDropdown",
  props: {
    compareRateConfig: Object,
    submitText: String,
  },
  data() {
    return {
      goTo: "",
      form: {
        vertical: "test",
      },
    };
  },
  methods: {
    changeRoute() {
      if (this.goTo !== "") {
        this.$router.push({ path: `/${this.goTo}/` });
      }
    },
    required(field) {
      return this.form[field.split(".")[1]].length > 0;
    },
    wat(field, value) {
      this.form[field.split(".")[1]] = value;
    },
  },
};
</script>

<style lang="scss">
// TO DO: edit styles for this component
.compare-your-rate-dropdown {
  display: flex;

  @include media-breakpoint-down(lg) {
    flex-wrap: wrap;
    position: relative;
  }

  .selects-component {
    position: static;
  }

  .valid {
    z-index: 100;

    @include media-breakpoint-down(sm) {
      width: 100%;
    }

    .list-group {
      background-color: #fff;
      position: absolute;
      width: auto;
      min-width: 500px;

      @include media-breakpoint-down(xl) {
        min-width: 300px;
      }
      @include media-breakpoint-down(lg) {
        position: absolute;
        width: 100%;
      }
    }

    .input-group {
      background-color: $white;

      input {
        color: $gray-dark;
      }
    }
  }
}

.click-continue {
  margin: 0 1em;
  display: block;

  @include media-breakpoint-down(lg) {
    margin: 1em 0;
    width: 100%;
  }

  .continue {
    button {
      display: flex;
      height: 80px;
      padding: 1em 1.2em;
      align-items: center;
      font-weight: 500;

      @include media-breakpoint-down(lg) {
        width: 100%;
        justify-content: center;
      }
    }
  }
}
</style>
