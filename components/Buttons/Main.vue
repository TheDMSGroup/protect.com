<script setup>
  const props = defineProps({
    config: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: true,
    },
    buttonAction: {
      type: Function,
      default: null,
    },
  });

  const { config, buttonAction } = props;

  const execute = () => {
    if (config.click) {
      if (config.clickParam !== "undefined") {
        config.click(config.clickParam);
      } else {
        config.click();
      }
    }
  };
</script>

<template>
  <span>
    <b-button
      :disabled="props.disabled"
      :type="config.type ? config.type : ''"
      :block="config.block"
      :size="config.size"
      :variant="config.variant"
      @click="buttonAction ? buttonAction() : execute()"
    >
      <span class="align-middle button-label">{{ config.label }}</span>
      <b-icon v-if="config.icon" class="button-icon" font-scale="1.5" :icon="config.icon" />
    </b-button>
  </span>
</template>

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
