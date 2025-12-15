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
      <svg v-if="config.icon" class="button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
        <path
          fill="currentColor"
          d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z"
        />
      </svg>
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
    width: 1.2em;
    height: 1.2em;
    fill: currentColor;
    position: relative;
    top: -2px;
    flex-shrink: 0;
  }
</style>
