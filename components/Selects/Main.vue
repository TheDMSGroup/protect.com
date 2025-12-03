<script setup>
  import { ref, computed, watch } from "vue";
  import { iconLoader } from "~/composables/icons.js";

  // Define props with destructuring
  const props = defineProps({
    config: {
      type: Object,
      default: () => ({}),
    },
    validate: {
      type: Function,
      default: (inputValue) => {
        return typeof inputValue === "string" && inputValue.length > 0;
      },
    },
  });

  // Emits
  const emit = defineEmits(["selectUpdated:modelValue", "selectInvalid:modelValue"]);

  // Reactive data
  const focus = ref(false);
  const menu = ref(false);
  const selected = ref(false);
  const valid = ref(false);

  // Computed properties
  const currentIcon = computed(() => {
    return selected.value && selected.value.value ? selected.value.value.icon : props.config.icon;
  });

  const selectedValue = computed(() => {
    if (selected.value) {
      return selected.value.value;
    }
    return null;
  });

  const display = computed(() => {
    if (selected.value && selected.value) {
      return selected.value.text;
    } else {
      return props.config.placeholderText;
    }
  });

  const update = (selectValue, selectText) => {
    // Run validation if provided
    if (props.validate) {
      const isValid = props.validate(selectValue);
      // Emit different events based on validation
      if (isValid) {
        emit("selectUpdated:modelValue", selectValue);
        valid.value = true;
        selected.value = { value: selectValue, text: selectText };
        toggleMenu();
      } else {
        emit("selectInvalid:modelValue", selectValue);
        valid.value = false;
      }
    } else {
      // No validation, emit normally
      emit("selectUpdated:modelValue", selectValue);
    }
  };
  // Methods
  const toggleMenu = () => {
    menu.value = !menu.value;
  };

  const iconComponentName = ref(iconLoader(currentIcon?.value || null));

  watch(
    () => currentIcon.value,
    (newIcon) => {
      if (newIcon) {
        iconComponentName.value = iconLoader(newIcon);
      }
    },
    { immediate: true }
  );
</script>

<template>
  <div class="selects-component" :class="{ error: !valid, valid: valid }">
    <b-form-select class="hidden" :value="selectedValue" :options="props.config.options" @input="update($event.value)" />
    <div v-if="!valid && props.config.invalidFeedback" class="error-message">
      {{ props.config.invalidFeedback }}
    </div>
    <div class="input-group clickable" :class="{ focus: focus, 'menu-open': false && menu }" @click="toggleMenu()">
      <b-input-group size="lg">
        <template #prepend>
          <b-input-group-text v-if="iconComponentName" class="select-icon">
            <component :is="iconComponentName" class="choice-icon" :name="iconComponentName" />
          </b-input-group-text>
        </template>
        <template #append>
          <b-input-group-text
            :class="{
              indicator: true,
              'menu-open-icon': false && menu,
              error: !valid,
            }"
          >
            <IconsArrowDown v-if="menu || !selected" :classes="(valid ? 'valid' : 'error') + (menu ? ' menu-open-icon' : '')" />
            <IconsCheckMark v-else :classes="(valid ? 'valid' : 'error') + (menu ? ' menu-open-icon' : '')" />
          </b-input-group-text>
        </template>
        <span class="selected-value clickable">{{ display }}</span>
      </b-input-group>
    </div>
    <transition name="slide-fade">
      <b-list-group v-if="menu" class="clickable">
        <b-list-group-item v-for="option in props.config.options" :key="option.value.value" @click="update(option.value.value, option.text)">
          {{ option.text }}
        </b-list-group-item>
      </b-list-group>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  .selects-component {
    width: 100%;
    position: relative;
    & > .input-group {
      background: #fff;
    }

    svg.elixr-icon.choice-icon {
      fill: #4153b3;
    }
    svg.elixr-icon {
      // .cls-1 {
      fill: #999999;
      // }
      // &.check-mark.valid {
      //   fill: #7DC099;
      // }
    }
    .elixr-icon.check-mark {
      &.valid {
        fill: #4153b3;
        &.menu-open-icon {
          fill: white;
        }
      }
    }
    // .menu-open > div > div > svg.elixr-icon.check-mark {
    //   fill: blue;
    // }

    .select-icon {
      padding: 0.5rem !important;
      background: none;
      border-right: none;
      .elixr-icon {
        // height: 100%;
        width: 60px;
        max-height: 60%;
      }
    }
    .clickable {
      cursor: pointer;
    }
    .input-group.clickable {
      z-index: 999;
      flex-wrap: nowrap;

      .input-group {
        flex-wrap: nowrap;
      }
    }
    .list-group {
      z-index: 999;
      position: absolute;
      width: 100%;
      background: #fff;
      border-radius: 0 0 5px 5px;
      box-shadow: 0 4px 16px -5px rgba(0, 0, 0, 0.18);

      .list-group-item {
        color: #a6a6a6;
        text-align: left;
        font-size: 18px;
        background: #fff;
        &:first-child {
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          border-top: none;
        }
        &:last-child {
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }
        &:hover {
          background: #f9f9f9;
        }
      }
    }
    .hidden {
      display: none;
    }
    .error-message {
      color: #ff4848;
      text-align: right;
      font-size: 14px;
    }
    .selected-value {
      width: 100%;
      color: inherit;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      font-size: 22px;
      color: #666666;
      &:focus {
        border: none;
        box-shadow: none;
      }
    }
    .menu-open {
      border-radius: 5px;
      // .input-group-prepend {
      //     svg,
      //     svg * {
      //         fill: #4153B3;
      //     }
      // }
    }
    &.valid {
      .menu-open {
        box-shadow: 0 0 0 2px rgba(59, 84, 186, 0.9);
      }
      .input-group {
        .input-group-prepend {
          svg,
          svg * {
            fill: #4153b3;
          }
        }
        &.focus {
          background: #f6faff;
          border-radius: 5px;
          box-shadow: 0 0 0 2px rgba(59, 84, 186, 0.9);
          .input-group-text {
            color: #3b54ba;
            &.indicator {
              background: #3b54ba;
              color: #fff;
              border: none;
              .menu-open-icon {
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
                border: 2px solid #3b54ba;
              }
            }
          }
        }
        // background: #f6faff;
        border-radius: 5px;
        // box-shadow: 0 0 0 2px rgba(59, 84, 186, 0.9);

        .input-group-text {
          color: #8e8e8e;
          &.indicator {
            color: #5dce70;
          }
        }
        // border: 2px solid blue;
        // background: #f6faff;
        // border-radius: 5px;
        // box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.9);
        // input {
        //   box-shadow: none;
        //   color: #e5e5e5;
        //   &:focus {
        //     color: #999999;
        //     box-shadow: none;
        //   }
        // }
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
            color: #e1e1e1;
            // border: none;
          }
          // }
        }
      }
    }
    // .input-group.focus {
    // background: #f6faff;
    // border-radius: 5px;
    // box-shadow: 0 0 0 2px rgba(59, 84, 186, 0.9);
    // .input-group-text {
    //     color: #3b54ba;
    //     &.indicator {
    //       background: #3b54ba;
    //       color: #fff;
    //       border: none;
    //     }
    // }
    // }
    .input-group {
      height: 80px;
      box-shadow: 0 0 16px -5px rgba(0, 0, 0, 0.18);
      border-radius: 5px;
      input.form-control {
        height: 80px;
      }
      input.has-leading-icon {
        border-left: none;
        &:focus {
          box-shadow: none;
          background: #f6faff;
          color: #3b54ba;
        }
      }
      // border: 2px solid blue;
      // border-radius: 5px;
      .input-group-prepend {
        height: 100%;

        .input-group-text {
          background: none;
          border-right: none;
        }
      }
      .input-group-append {
        border: none;
        .indicator.menu-open-icon {
          border: none;
          background: #4153b3;
          &.error {
            border: 1px solid rgb(206, 212, 218);
            background: #f9f9f9;
            svg {
              fill: #9a9a9a;
            }
          }
        }
        .btn {
          border: none;
          background: #4153b3;
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
        text-align: center;
        background: #f9f9f9;
        width: 60px;
        svg {
          width: 80px;
        }
      }
      input {
        font-size: 22px;
        color: #a6a6a6;

        @include media-breakpoint-down(xl) {
          font-size: 18px;
        }
      }
    }
    input.has-leading-icon {
      border-left: none;
    }

    input:focus {
      box-shadow: none !important;
    }

    .form-control-plaintext {
      padding-left: 20px;
      // border-width: none;
      border-color: lightgray;
      border: 1px 0;
      appearance: none;
      padding-left: 0;

      &:focus {
        // border: none;
        // box-shadow: none;
        outline: none;
      }
    }
    select {
      display: none;
    }
  }
</style>
