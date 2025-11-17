<template>
  <div class="rate-calculator">
    <b-tabs>
      <b-tab
        title="Whole Life"
        @click="toggleTabCalculator"
        id="whole-life-tab"
      >
        <b-card-text>
          <div v-if="showWholeLife">
            <p>Rate Calculator</p>

            <!-- zip code-->
            <form class="tab-form">
              <div v-if="showZipCode">
                <label for="zipCode">Enter Zip Code</label>
                <inputs
                  v-model="form.zipCode"
                  :value="form.zipCode"
                  :state="true"
                  :valid="true"
                  :config="{
                    invalidFeedback: 'Please input a valid zip code',
                    noCheckMark: true,
                    name: 'zipCode',
                    placeholderText: 'Zip Code',
                  }"
                ></inputs>
              </div>

              <!-- marital status -->
              <div v-if="maritalStatus">
                <label for="maritalStatus">Martial Status</label>
                <selects
                  :valid="true"
                  :config="maritalStatusConfig"
                  v-model="form.maritalStatus"
                ></selects>
              </div>

              <!-- gender -->
              <div v-if="gender">
                <label for="gender">Select Gender</label>
                <radios
                  class="radio-options"
                  :value="form.gender"
                  :state="true"
                  :valid="true"
                  v-model="form.gender"
                  :config="{
                    options: [
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                    ],
                    label: 'Select Gender',
                    invalidFeedback: 'Please complete this field',
                  }"
                ></radios>
              </div>

              <!-- current provider -->
              <div v-if="currentProvider">
                <label for="currentProvider">Current Provider</label>
                <selects
                  :valid="true"
                  :config="currentProviderConfig"
                  v-model="form.currentProvider"
                ></selects>
              </div>

              <!-- desired policy amount -->
              <div v-if="desiredPolicyAmount">
                <label for="desiredPolicyAmount">Desired Policy Amount</label>
                <div class="desired-policy-amount">
                  <input
                    type="range"
                    name="desiredPolicyAmount"
                    v-model="form.desiredPolicyAmount"
                    min="100000"
                    max="500000"
                    step="50000"
                    list="tickmarks"
                  />
                </div>
                <p class="chosen-policy-amount">
                  {{ commafy(form.desiredPolicyAmount) }}
                </p>
              </div>

              <b-buttons
                class="calculate-rate"
                :config="{
                  click: submit,
                  size: 'lg',
                  variant: 'primary',
                  label: 'CALCULATE RATE',
                  icon: 'arrow-right-short',
                }"
              ></b-buttons>
            </form>
          </div>
        </b-card-text>
      </b-tab>
      <b-tab
        active
        title="Term Life"
        @click="toggleTabCalculator"
        id="term-life-tab"
      >
        <b-card-text>
          <div v-if="showTermLife">
            <p>Rate Calculator</p>

            <!-- zip code-->
            <form class="tab-form">
              <div v-if="showZipCode">
                <label for="zipCode">Enter Zip Code</label>
                <inputs
                  v-model="form.zipCode"
                  :value="form.zipCode"
                  :state="true"
                  :valid="true"
                  :config="{
                    invalidFeedback: 'Please input a valid zip code',
                    noCheckMark: true,
                    name: 'zip_code',
                    placeholderText: 'Zip Code',
                  }"
                ></inputs>
              </div>

              <!-- marital status -->
              <div v-if="maritalStatus">
                <label for="maritalStatus">Martial Status</label>
                <selects
                  :valid="true"
                  :config="maritalStatusConfig"
                  v-model="form.maritalStatus"
                ></selects>
              </div>

              <!-- gender -->
              <div v-if="gender">
                <label for="gender">Select Gender</label>
                <radios
                  class="radio-options"
                  :value="form.gender"
                  :state="true"
                  :valid="true"
                  v-model="form.gender"
                  :config="{
                    options: [
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                    ],
                    label: 'Select Gender',
                    invalidFeedback: 'Please complete this field',
                  }"
                ></radios>
              </div>

              <!-- current provider -->
              <div v-if="currentProvider">
                <label for="currentProvider">Current Provider</label>
                <selects
                  :valid="true"
                  :config="currentProviderConfig"
                  v-model="form.currentProvider"
                ></selects>
              </div>

              <!-- desired policy amount -->
              <div v-if="desiredPolicyAmount">
                <label for="desiredPolicyAmount">Desired Policy Amount</label>
                <div class="desired-policy-amount">
                  <input
                    type="range"
                    name="desiredPolicyAmount"
                    v-model="form.desiredPolicyAmount"
                    min="100000"
                    max="500000"
                    step="50000"
                    list="tickmarks"
                  />
                </div>
                <p class="chosen-policy-amount">
                  {{ commafy(form.desiredPolicyAmount) }}
                </p>
              </div>

              <b-buttons
                class="calculate-rate"
                :config="{
                  click: submit,
                  size: 'lg',
                  variant: 'primary',
                  label: 'CALCULATE RATE',
                  icon: 'arrow-right-short',
                }"
              ></b-buttons>
            </form>
          </div>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: "RateCalculator",
  components: {
    BTabs,
    BTab,
    Inputs,
    BButtons,
    Selects,
    Radios,
    BCardText,
  },
  props: {
    showZipCode: Boolean,
    maritalStatus: Boolean,
    gender: Boolean,
    currentProvider: Boolean,
    desiredPolicyAmount: Boolean,
  },
  data() {
    return {
      showWholeLife: false,
      showTermLife: true,
      maritalStatusConfig: {
        options: [
          {
            value: {
              value: "single",
            },
            text: "Single",
          },
          {
            value: {
              value: "married",
            },
            text: "Married",
          },
          {
            value: {
              value: "divorced",
            },
            text: "Divorced",
          },
        ],
        name: "maritalStatusConfig",
        placeholderText: "Select",
      },
      currentProviderConfig: {
        options: [
          {
            value: {
              value: "geico",
            },
            text: "Geico",
          },
          {
            value: {
              value: "state-farm",
            },
            text: "State Farm",
          },
          {
            value: {
              value: "nationwide",
            },
            text: "Nationwide",
          },
        ],
        name: "currentProviderConfig",
        placeholderText: "Select Current Provider",
      },
      form: {
        zipCode: "",
        maritalStatus: "",
        gender: "",
        currentProvider: "",
        desiredPolicyAmount: 100000,
      },
      submitComplete: false,
      submitClicked: false,
      queryParams: "",
    };
  },
  methods: {
    submit() {
      event.preventDefault();

      // eslint-disable-next-line
      this.$router.push({
        path: `${
          "/insurance/life-insurance/?zip_code=" +
          this.form.zipCode +
          "&maritalStatus=" +
          this.form.maritalStatus +
          "&gender=" +
          this.form.gender +
          "&currentProvider=" +
          this.form.currentProvider +
          "&desiredPolicyAmount=" +
          this.form.desiredPolicyAmount
        }`,
      });
    },
    radioInput(field, value) {
      this.form[field.split(".")[1]] = value;
    },
    commafy(num) {
      const str = num.toString().split(".");
      if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
      }
      if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, "$1 ");
      }
      return str.join(".");
    },
    toggleTabCalculator(event) {
      if (event.currentTarget.id === "term-life-tab___BV_tab_button__") {
        this.showTermLife = true;

        if (this.showWholeLife) {
          this.showWholeLife = false;
        }
      }

      if (event.currentTarget.id === "whole-life-tab___BV_tab_button__") {
        this.showWholeLife = true;

        if (this.showTermLife) {
          this.showTermLife = false;
        }
      }
    },
  },
};
</script>

<style lang="scss">
.rate-calculator {
  .nav-tabs {
    display: flex;

    .nav-item {
      width: 50%;
      position: relative;

      @include media-breakpoint-down(xl) {
        width: 100%;
      }

      .nav-link {
        background-color: $blue;
        color: $white;
        text-align: center;
        font-weight: 600;
        border-bottom: 0;

        @include media-breakpoint-down(xl) {
          &:not(.active) {
            display: none;
          }
        }

        &.active {
          color: $white;
          background-color: $blue-light;

          &:after {
            content: "";
            height: 0;
            width: 0;
            border-top: 9px solid $blue-light;
            border-right: 9px solid transparent;
            border-bottom: 9px solid transparent;
            border-left: 9px solid transparent;
            bottom: -17px;
            left: 50%;
            position: absolute;
            margin-left: -10px;
          }
        }
      }
    }
  }

  .tab-content {
    border: 1px solid $gray-medium;
    width: calc(100% - 1px);
    padding: 0.5em;

    p {
      color: $blue;
      text-transform: uppercase;
      padding: 0.8em 0.3em;
    }

    .tab-form {
      label {
        color: $gray;
        font-size: 0.875em;
        text-transform: capitalize;
        margin-top: 1.2em;
      }

      .inputs-wrapper {
        .input-group > input {
          font-size: 16px;
        }
      }

      .selects-component {
        .input-group {
          .form-control-plaintext {
            color: $gray-dark;
            font-size: 16px;
          }

          .input-group-text {
            svg {
              width: 32px;
            }
          }

          .select-icon {
            padding: 0.5em;
          }
        }
      }

      .radio-options {
        display: flex;
        justify-content: space-between;
        margin: 0.5em 0;

        @include media-breakpoint-down(xl) {
          flex-wrap: wrap;
        }

        .input-group {
          width: 135px;
          margin: 0;

          @include media-breakpoint-down(xl) {
            width: 100%;

            &:first-child {
              margin-bottom: 0.5em;
            }
          }

          .form-control-plaintext {
            padding: 0.5em;
            color: $gray-dark;

            @include media-breakpoint-down(xl) {
              padding: 0 1em;
            }
          }
        }
      }

      .desired-policy-amount {
        position: relative;
        padding: 1em 0;

        input[type="range"] {
          -webkit-appearance: none;
          background: $gray-medium;
          outline: none;
          width: 100%;
          transition: all 0.6s ease;
          border-radius: 6px;
          height: 12px;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          transition: all 0.6s ease;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: $blue-light;
          cursor: pointer;
          position: relative;
          top: 0wpx;

          &:before {
            content: "10";
            color: #ddd;
            left: -7px;
            position: relative;
            top: 26px;
            width: 45px;
            text-align: center;
            display: block;
          }

          &:after {
            content: "";
            position: relative;
            left: 12px;
            top: 12px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 10px 6px 0 6px;
            border-color: #007bff transparent transparent transparent;
          }
        }
      }

      .chosen-policy-amount {
        color: $gray-dark;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        line-height: 1.5;
        border-radius: 0.3rem;
        height: 80px;
      }

      .calculate-rate {
        width: 100%;

        button {
          width: 100%;
          min-height: 60px;
          text-transform: uppercase;
          font-weight: 800;
          font-size: 0.875em;
          margin-top: 2em;
        }
      }
    }
  }
}
</style>
