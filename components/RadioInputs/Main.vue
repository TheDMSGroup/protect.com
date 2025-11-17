<template>
  <div v-bind:class="{ error: !valid }">
    <!-- {{focused}} -->
    <div class="error-message" v-if="!valid && config.invalidFeedback">
      {{ config.invalidFeedback }}
    </div>
    <div
      class="input-group radio"
      v-for="option in config.options"
      v-bind:class="{ valid: value == option.value, focus: false && focused }"
      v-bind:key="option.value"
      @click="updateRadio(option.value)"
    >
      <input
        type="radio"
        class="hidden"
        :ref="config.name + option.value"
        :id="option.value"
        v-model="config.name"
        :name="config.name"
        :value="option.value"
      />
      <b-input-group size="lg">
        <template v-slot:append>
          <b-input-group-text
            class="indicator"
            v-bind:class="{ selected: value == option.value }"
          >
            <svg class="elixr-icon circle" v-if="value == option.value">
              <circle
                cx="50%"
                cy="50%"
                r="14"
                stroke="gray"
                stroke-width="1"
                fill="white"
              />
              <circle
                class="radio-inner-circle"
                cx="50%"
                cy="50%"
                r="9"
                stroke="white"
                stroke-width="1"
                fill="white"
              />
            </svg>
            <svg class="elixr-icon circle" v-else>
              <circle
                cx="50%"
                cy="50%"
                r="14"
                stroke="gray"
                stroke-width="1"
                fill="white"
              />
            </svg>
          </b-input-group-text>
        </template>
        <b-form-input
          class="radio-option-label clickable"
          plaintext
          :value="option.label"
        ></b-form-input>
      </b-input-group>
    </div>
  </div>
</template>

<script>
import viewMixin from "../../../default/mixins/viewMixin";
import iconMixin from "../../mixins/iconMixin";

const availableElements = {
  BButton,
  BInputGroup,
  BInputGroupAppend,
  BFormInput,
  BIcon,
  BIconCheck2,
  BInputGroupText,
};
export default {
  mixins: [viewMixin, iconMixin],
  name: "Radios",
  components: {
    ...availableElements,
  },
  created() {
    document.addEventListener("focusin", this.focusChanged);
  },
  beforeDestroy() {
    document.removeEventListener("focusin", this.focusChanged);
  },
  props: {
    config: Object,
    valid: Boolean,
    value: String,
    model: String,
  },
  data() {
    return {
      focused: false,
      iconComponentName: null,
      iconsLoaded: {},
      // model: this.config.model
    };
  },
  async mounted() {
    await this.loadIcon("check-mark");
    await this.loadIcon("geo");
  },
  methods: {
    updateRadio(value) {
      this.$emit(
        "input",
        this.$refs[this.config.name + value][0]
          ? this.$refs[this.config.name + value][0].value
          : "0"
      );
    },
    update() {
      this.$emit("input", this.$refs[this.config.name].value);
    },
    getIcon(name) {
      let icon = name;
      switch (name) {
        case "car-icon":
          icon = "Car-Icon";
          break;
        case "home-icon":
          icon = "Home-Icon";
          break;
        case "geo-icon":
          icon = "Geo-Icon";
          break;
        default:
          icon = "";
      }
      return icon;
    },
    focusChanged(event) {
      if (event) {
        const el = event.target;
        if (el) {
          this.focused = el.className.includes("radio-option-label");
          return true;
        }
        return false;
      }
      return false;
      // do something with the element.
    },
  },
  computed: {
    state() {
      return this.config.state;
    },
    // focused() {
    //   return this.focusChanged();
    //   // console.log('eee', e);
    //   // if (this.$refs[this.config.name + 1]) {
    //   //   console.log('uhhhh', this.$refs[this.config.name + 1][0].matches(':focus'));
    //   // }
    //   // console.log('e?', this.$refs[0], this.config.name);
    //   // return this.$refs;
    // },
  },
};
</script>

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
}
.hidden {
  display: none;
}
.input-group.radio {
  margin: 20px auto;
}
.valid {
  &.input-group {
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
      &.selected {
        background: #4153b3;
        border: none;
        circle.radio-inner-circle {
          fill: #4153b3;
          stroke: #4153b3;
        }
      }
    }
    // background: #f6faff;
    border-radius: 5px;
    box-shadow: 0 0 0 2px rgba(59, 84, 186, 0.9);

    .input-group-text {
      color: #8e8e8e;
      &.indicator {
        svg {
          fill: white;
        }
      }
    }
    .input-group-prepend {
      svg {
        fill: #9a9a9a;
      }
    }
  }
}

.error {
  .input-group {
    &.focus {
      input {
        color: #999999;
      }
    }

    border-radius: 5px;
    box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.9);
    input {
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
      }
    }
  }
}
.input-group.radio {
  height: 80px;
  // border: 1px solid gray;
  // border-radius: 5px;
  border-radius: 5px;
  box-shadow: 0 0 0 1px lightgray;
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
  .input-group-prepend {
    .input-group-text {
      background: none;
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
    }
  }
  .indicator {
    background: #f9f9f9;
    border-right: none;
    border-bottom: none;
    border-top: none;
  }
  &.radio {
    cursor: pointer;
  }
}

input.has-leading-icon {
  border-left: none;
}

input:focus {
  box-shadow: none !important;
}
.clickable {
  cursor: pointer;
}
.radio-option-label {
  padding-left: 50px;
  &:focus {
    outline: none;
  }
}
.input-group-text.indicator {
  circle {
    fill: white;
    stroke: lightgrey;
  }
  width: 70px;
  &.selected {
    // background: #4153B3;
    // border: none;
    circle.radio-inner-circle {
      fill: #4153b3;
      // stroke: #4153B3;
    }
  }
}
</style>
