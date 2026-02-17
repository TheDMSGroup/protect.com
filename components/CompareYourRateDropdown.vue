<script setup>
  import { generateRedirectUrl } from "~/composables/utils.js";

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

  // Initialize with the first option value if this is a hardcoded dropdown
  const isHardcodedDropdown = computed(() =>
    props.compareRateConfig.name === 'compareYourRateDropdown' ||
    props.compareRateConfig.name === 'compareYourRateDropdownMain'
  );

  const getInitialValue = () => {
    if (isHardcodedDropdown.value && props.compareRateConfig.options?.length > 0) {
      return props.compareRateConfig.options[0].value.value;
    }
    return "";
  };

  const selectValue = ref(getInitialValue());

  const getInitialTarget = () => {
    if (isHardcodedDropdown.value && props.compareRateConfig.options?.length > 0) {
      return props.compareRateConfig.options[0].value.target || "";
    }
    return "";
  };

  const selectedTarget = ref(getInitialTarget());
  const router = useRouter();

  const changeRoute = () => {
    if (goTo.value !== "") {
      // Check if the selected option has a custom target URL
      if (selectedTarget.value) {
        // Use generateRedirectUrl to append URL params (ueid, zip, mst, etc.)
        const urlWithParams = generateRedirectUrl(selectedTarget.value, {});
        window.open(urlWithParams, '_blank');
      } else {
        // Default behavior: navigate internally
        router.push({ path: `/${goTo.value}/` });
      }
    }
  };
  // callabcks for emitted events from the input
  const handleValidSelect = (eventValue) => {
    selectValue.value = eventValue;

    // Find the selected option to get its target URL if it has one
    const selectedOption = props.compareRateConfig.options?.find(
      opt => opt.value.value === eventValue
    );
    selectedTarget.value = selectedOption?.value?.target || "";
  };
  const handleInvalidSelect = () => {
    // Clear selectValue on invalid input
    selectValue.value = "";
    selectedTarget.value = "";
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
      :config="props.compareRateConfig"
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
          label: props.submitText,
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
