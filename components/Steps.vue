<template>
  <div class="steps">
    <b-container>
      <h2 class="text-center mb-4">
        Find Insurance In {{ stepsConfig?.length || 3 }} Easy&nbsp;Steps
      </h2>
      <b-row v-if="stepsConfig && stepsConfig.length">
        <b-col
          col=""
          sm="12"
          class="step"
          v-for="step in stepsConfig"
          :key="step.text"
          :id="`step-${stepsConfig.indexOf(step) + 1}`"
        >
          <div class="step-inner">
            <span class="step-number">{{
              `${stepsConfig.indexOf(step) + 1}`
            }}</span>
            <span class="step-text">{{ step.text }}</span>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  name: "Steps",
  props: {
    headline: String,
    stepsConfig: {
      type: Array,
      required: true,
      default: [],
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.steps {
  margin-bottom: 150px;

  @include media-breakpoint-down(sm) {
    flex-direction: column;
    text-align: center;
    padding: 1em 0;
    margin-bottom: 50px;

    .step-number {
      border-right: unset !important;
      flex-basis: 100%;
    }
  }
  .step {
    display: flex;
    margin: auto;
    flex-basis: 33.33333%;
    justify-content: center;

    .step-inner {
      display: flex;
      width: 70%;
      flex-wrap: nowrap;
    }

    @include media-breakpoint-down(sm) {
      flex-wrap: wrap;
      flex-basis: 100%;
      justify-content: center;
      .step-inner {
        width: 100%;
        justify-content: center;
      }
    }

    @include media-breakpoint-down(sm) {
      flex-wrap: wrap;

      .step-inner {
        flex-basis: 100%;
        flex-wrap: wrap;
      }
      .step-text,
      .step-number {
        padding: 0;
      }
    }
  }
  .step:first-of-type .step-text {
    max-width: 125px;
  }
  .step-number {
    color: #3b54ba;
    font-size: 4rem;
    border-right: 1px solid #e6e6e6;
    padding-right: 4%;
    font-family: "Cantata One", serif;
  }
  .step-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 4%;
    max-width: 175px;
  }
}
</style>
