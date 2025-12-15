<script setup>
  const props = defineProps({
    compareRateConfig: {
      type: Object,
      default: () => ({}),
    },
    submitText: {
      type: String,
      default: "Continue",
    },
  });

  const { compareRateConfig, submitText } = props;

  const selectValue = ref("");
  const router = useRouter();

  const changeRoute = () => {
    if (goTo.value !== "") {
      router.push({ path: `/${goTo.value}/` });
    }
  };
  // callabcks for emitted events from the input
  const handleValidSelect = (eventValue) => {
    selectValue.value = eventValue;
  };
  const handleInvalidSelect = () => {
    // Clear selectValue on invalid input
    selectValue.value = "";
  };
  // Computed for button disabled state
  const isButtonDisabled = computed(() => {
    const disabled = !selectValue.value || selectValue.value === "";
    return disabled;
  });
  const goTo = computed(() => {
    return selectValue.value;
  });
</script>

<template>
  <div class="compare-your-rate-dropdown">
    <SelectsMain
      :valid="true"
      :config="compareRateConfig"
      @select-updated:model-value="handleValidSelect"
      @select-invalid:model-value="handleInvalidSelect"
    />
    <span class="click-continue" @click="changeRoute">
      <ButtonsMain
        :disabled="isButtonDisabled"
        class="continue"
        :config="{
          size: 'lg',
          variant: 'primary',
          label: submitText,
          icon: 'arrow-right-short',
        }"
        @click="changeRoute"
      />
    </span>
  </div>
</template>

<style lang="scss">
  // TO DO: edit styles for this component
  .compare-your-rate-dropdown {
    display: flex;

    @include media-breakpoint-down(lg) {
      flex-wrap: wrap;
      position: relative;
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
