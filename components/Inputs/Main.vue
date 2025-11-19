<script setup>
  import { iconLoader } from "~/composables/icons.js";

  const props = defineProps({
    config: {
      type: Object,
      required: true,
    },
    validate: {
      type: Function,
      default: (inputValue) => {
        return typeof inputValue === "string" && inputValue.length > 0;
      },
    },
  });

  const config = props.config;

  const dynamicIcon = iconLoader(config.icon ? config.icon : "icon-check-mark");

  // Reactive data
  const focus = ref(false);
  const touched = ref(false);
  const valid = ref(false);

  // Computed properties
  const currentIconLoaded = computed(() => {
    return config.icon ? true : false;
  });

  // Emits
  const emit = defineEmits(["inputUpdated:modelValue", "inputInvalid:modelValue"]);

  // Methods
  const onEnterButton = () => {
    if ("appendIconClickFunction" in config) {
      config.appendIconClickFunction();
    }
    return false;
  };

  const update = (inputValue) => {
    // Run validation if provided
    if (props.validate) {
      const isValid = props.validate(inputValue);
      // Emit different events based on validation
      if (isValid) {
        emit("inputUpdated:modelValue", inputValue);
        valid.value = true;
      } else {
        emit("inputInvalid:modelValue", inputValue);
        valid.value = false;
      }
    } else {
      // No validation, emit normally
      emit("inputUpdated:modelValue", inputValue);
    }
  };
</script>

<template>
  <div class="inputs-wrapper" :class="{ error: !valid && touched, valid: valid }">
    <div v-if="!valid && config.invalidFeedback && touched" class="error-message">
      {{ config.invalidFeedback }}
    </div>
    <b-input-group size="lg" :class="{ focus: false && focus && !config.noFocusStyle }">
      <template v-if="currentIconLoaded" #prepend>
        <b-input-group-text>
          <component :is="dynamicIcon" />
        </b-input-group-text>
      </template>
      <template v-if="!config.noCheckMark" #append>
        <b-input-group-text class="indicator" @click="config.appendIconClickFunction()">
          <component :is="config.appendIcon" v-if="config.appendIcon" />
          <IconsCheckMark v-else :classes="valid ? 'valid' : 'error'" />
        </b-input-group-text>
      </template>
      <b-form-input
        :id="config.name"
        :ref="config.name"
        :type="config.type ? config.type : 'text'"
        :name="config.name"
        :placeholder="config.placeholderText"
        :class="{
          'has-leading-icon': config.icon,
          'has-check-mark': !config.noCheckMark,
          'no-check-mark': config.noCheckMark,
          valid: valid,
        }"
        @keyup.enter="onEnterButton()"
        @focus="focus = true"
        @blur="focus = false"
        @input="
          update($event.target.value);
          touched = true;
        "
      />
      <label :for="config.name" :class="{ focus: focus || value, valid: valid }">{{ config.label }}</label>
    </b-input-group>
  </div>
</template>

<style lang="scss" scoped>
  .elixr-icon {
    // height: 100%;
    width: 60px;
    max-height: 45px;
  }

  .elixr-icon.check-mark {
    max-height: 20px;
    width: 25px;
  }
  .error-message {
    color: #ff4848;
    text-align: right;
    font-size: 14px;
    position: absolute;
    top: -27px;
  }
  .inputs-wrapper {
    position: relative;
  }
  .input-group-text {
    border: 0;
  }
  .input-group {
    &.focus {
      box-shadow: 0 0 0 2px #b5c7e5;
    }
    height: 80px;
    input.form-control {
      height: 80px;
      color: #9f9f9f;
      padding-top: 30px;
      font-size: 21px;
    }
    input.has-leading-icon {
      border-left: none;
      &:focus {
        box-shadow: none;
        // background: #f6faff;
        color: #9f9f9f;
      }
    }
    // border: 2px solid blue;
    // border-radius: 5px;
    .input-group-prepend {
      .input-group-text {
        background: none;
      }
      svg {
        fill: #c5c5c5;
      }
    }
    .input-group-append {
      border: none;
      .btn {
        border: none;
        background: blue;
        .button-icon {
          color: white;
        }
      }
      .btn.btn-outline-secondary {
        // border-top-right-radius: 5px;
        // border-bottom-right-radius: 5px;
      }
    }
    .indicator {
      background: #f9f9f9;
      svg {
        fill: #b5c7e5;
      }
    }
  }

  .valid {
    .input-group {
      border-radius: 5px;
      input.form-control {
        color: #3b54ba;
      }
      input {
        background: #fff;
      }
      &.focus {
        background: #f6faff;
        border-radius: 5px;
        box-shadow: 0 0 0 2px rgba(59, 84, 186, 0.9);
        .input-group-text {
          color: #3b54ba;
          &.indicator {
            background: #3b54ba;
            border: none;
            svg {
              fill: #fff;
            }
          }
        }
        .input-group-prepend {
          border-radius: 5px;
          svg {
            fill: #3f50e6;
          }
        }
        input.valid {
          color: #3b54ba;
        }
        input {
          background: #f6f9fe;
        }
      }
      // background: #f6faff;
      border-radius: 5px;
      // box-shadow: 0 0 0 2px rgba(59, 84, 186, 0.9);
      .input-group-text {
        color: #8e8e8e;
        &.indicator {
          svg {
            fill: #3b54ba;
          }
        }
      }
      .input-group-prepend {
        border-radius: 5px;
        svg {
          fill: #3b54ba;
        }
      }
    }
  }

  .error {
    .input-group {
      &.focus {
        input {
          // box-shadow: none;
          // color: #e5e5e5;
          // &:focus {
          color: #999999;
          // box-shadow: none;
          // }
        }
      }

      // &.focus {
      // border: 2px solid blue;
      // background: #f6faff;
      border-radius: 5px;
      box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.9);
      input {
        // box-shadow: none;
        color: #e5e5e5;
        &:focus {
          color: #999999;
          box-shadow: none;
        }
      }

      .input-group-text {
        color: #e5e5e5;
        background: #f9f9f9;
        &.indicator {
          svg {
            fill: #e1e1e1;
          }
          // border: none;
        }
        // }
      }
    }
  }
  input {
    .has-leading-icon {
      border-left: none;
    }
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }

  input:focus {
    box-shadow: none !important;
  }

  .input-group .form-control {
    &.has-check-mark {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &.no-check-mark {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
  label {
    color: #9f9f9f;
    // font-size: 18px;
    font-size: 1.25rem;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 110px;
    top: 25px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  label {
    // top: 5px;
    // left: 110px;
    // font-size: .8rem;
    // font-size: 14px;
    // z-index: 100;

    &.focus {
      top: 8px;
      left: 110px;
      font-size: 0.8rem;
      // font-size: 14px;
      color: #9f9f9f;
      z-index: 100;
    }
    &.valid {
      top: 8px;
      left: 110px;
      font-size: 0.8rem;
      // font-size: 14px;
      color: #3b54ba;
      z-index: 100;
    }
  }
</style>
