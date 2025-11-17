<template>
  <span>
    <b-button
      :disabled="disabled"
      @click="execute"
      :type="config.type ? config.type : ''"
      :block="config.block"
      :size="config.size"
      :variant="config.variant"
    >
      <span class="align-middle button-label">{{ config.label }}</span>
      <b-icon
        class="button-icon"
        v-if="config.icon"
        font-scale="1.5"
        :icon="config.icon"
      ></b-icon>
    </b-button>
  </span>
</template>

<script>
export default {
  name: "Buttons",
  props: {
    config: Object,
    buttonAction: Function,
    disabled: Boolean,
  },
  methods: {
    execute() {
      console.log("hmm", this.config);
      if (this.config.click) {
        if (this.config.clickParam !== "undefined") {
          this.config.click(this.config.clickParam);
        } else {
          this.config.click();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  font-weight: bold;
}
.button-label {
  @include media-breakpoint-down(md) {
    font-size: 0.8em;
  }
}
.btn-primary {
  color: #fff;
  background-color: $blue;
  border-color: $blue;
  &:disabled {
    background: $blue;
    opacity: 0.65;
    color: #fff;
    border-color: lighten($blue, 10%);
  }
  &:not(:disabled):hover,
  &:not(:disabled):focus {
    background-color: lighten($blue, 10%);
    color: #fff;
    border-color: lighten($blue, 10%);
  }
}
.btn-outline-primary {
  border-width: 0.12em;
  &:hover {
    color: #fff;
  }
}
.button-icon {
  padding-top: 3px;
  margin-left: 5px;
}
</style>
