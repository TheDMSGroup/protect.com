<template>
  <div class="selects-component" v-bind:class="{ error: !valid, valid: valid }">
    <b-form-select
      class="hidden"
      @input="$emit('input', $event.value)"
      :value="selectedValue"
      :options="config.options"
    ></b-form-select>
    <div class="error-message" v-if="!valid && config.invalidFeedback">
      {{ config.invalidFeedback }}
    </div>
    <div
      class="input-group clickable"
      v-bind:class="{ focus: focus, 'menu-open': false && menu }"
      @click="toggleMenu"
    >
      <b-input-group size="lg">
        <template v-slot:prepend>
          <b-input-group-text class="select-icon">
            <component
              v-if="currentIconLoaded"
              :classes="
                (selected ? 'selected' : '') + (menu ? ' focused-icon' : '')
              "
              :is="currentIcon"
              :name="currentIcon"
            >
            </component>
          </b-input-group-text>
        </template>
        <template v-slot:append>
          <b-input-group-text
            v-bind:class="{
              indicator: true,
              'menu-open-icon': false && menu,
              error: !valid,
            }"
          >
            <component
              :is="'arrow-down'"
              :classes="
                (valid ? 'valid' : 'error') + (menu ? ' menu-open-icon' : '')
              "
              v-if="iconsLoaded['arrow-down'] && (menu || !selected)"
            ></component>
            <component
              :is="'check-mark'"
              :classes="
                (valid ? 'valid' : 'error') + (menu ? ' menu-open-icon' : '')
              "
              v-else-if="iconsLoaded['check-mark']"
            ></component>
          </b-input-group-text>
        </template>
        <b-form-input
          class="selected-value clickable"
          plaintext
          :value="display"
        ></b-form-input>
      </b-input-group>
    </div>
    <transition name="slide-fade">
      <b-list-group v-if="menu" class="clickable">
        <b-list-group-item
          @click="setValue(option)"
          v-for="option in config.options"
          v-bind:key="option.value.value"
          >{{ option.text }}</b-list-group-item
        >
      </b-list-group>
    </transition>
  </div>
</template>

<script>
import iconMixin from "../../mixins/iconMixin";

const availableElements = {
  BListGroup,
  BListGroupItem,
  BDropdownItem,
  BDropdownDivider,
  BDropdown,
  BButtonGroup,
  BButton,
  BInputGroup,
  BInputGroupAppend,
  BFormInput,
  BIcon,
  BIconCheck2,
  BInputGroupText,
  BIconChevronDown,
  BFormSelect,
  BIconBicycle,
  BIconHouse,
};
export default {
  name: "Selects",
  components: {
    ...availableElements,
  },
  props: {
    config: Object,
    valid: Boolean,
    value: String,
    model: String,
  },
  mixins: [iconMixin],
  data() {
    return {
      focus: false,
      menu: false,
      selected: null,
      // display: 'Please select...'
      // model: this.config.model
    };
  },
  async mounted() {
    // Load icons used in template
    await this.loadIcon("arrow-down");
    await this.loadIcon("check-mark");
  },
  methods: {
    setValue(option) {
      this.selected = option;
      // this.value = option.value
      this.toggleMenu();
    },
    toggleMenu() {
      this.menu = !this.menu;
    },
    update() {
      this.$emit("input", this.$refs[this.config.name].value);
    },
  },
  computed: {
    selectedValue() {
      if (this.selected) {
        return this.selected.value;
      }
      return this.value;
    },
    state() {
      return this.config.state;
    },
    display() {
      if (this.selected) {
        return this.selected.text;
      }
      return this.config.placeholderText;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "imports.scss";

// slide-fade
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-6px);
  opacity: 0;
}

.selects-component {
  box-shadow: 0 0 16px -5px rgba(0, 0, 0, 0.18);
  width: 100%;
  position: relative;

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
    z-index: 99;
  }
  .list-group {
    // top: -1px;
    position: relative;

    .list-group-item {
      color: #a6a6a6;
      text-align: left;
      font-size: 18px;
      &:first-child {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-top: none;
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
  // .selected-value {
  // &:focus {
  //   border: none;
  //   box-shadow: none;
  // }
  // }
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
