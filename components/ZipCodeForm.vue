<script setup>
  const props = defineProps({
    action: {
      type: String,
      required: true,
    },
    intermediaryModalOptions: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  });

  // Reactive data
  const zipcode = ref("");
  // Router for navigation
  const router = useRouter();

  const submit = () => {
    console.log(props.action);
    if (props.action.includes("http")) {
      const actionUrl = new URL(props.action);
      actionUrl.searchParams.set("zipcode", zipcode.value);

      window.location.href = actionUrl;
    } else {
      router.push({
        path: props.action,
        query: { zipcode: zipcode.value },
      });
    }
  };

  // callabcks for emitted events from the input
  const handleValidInput = (inputValue) => {
    zipcode.value = inputValue;
  };
  const handleInvalidInput = () => {
    // Clear zipcode on invalid input
    zipcode.value = "";
  };

  // declare whatever validation function you need
  const validateZip = (inputValue) => {
    if (inputValue) {
      const re = /^\d{5}$/;
      return re.test(inputValue);
    }
    return false;
  };
  // Computed for button disabled state
  const isButtonDisabled = computed(() => {
    const disabled = !zipcode.value || zipcode.value === "";
    return disabled;
  });
</script>

<template>
  <form class="zipcode-form" :action="action" method="GET" @submit.prevent @submit="submit">
    <InputsMain
      :validate="validateZip"
      :valid="!!zipcode"
      :value="zipcode"
      :config="{
        label: 'Enter your zip code',
        invalidFeedback: 'Please input a valid zipcode',
        noCheckMark: true,
        name: 'zipcode',
        icon: 'geo',
        model: zipcode,
        type: 'number',
      }"
      @input-updated:model-value="handleValidInput"
      @input-invalid:model-value="handleInvalidInput"
    />
    <ButtonsMain
      :disabled="isButtonDisabled"
      :config="{
        type: 'submit',
        size: 'lg',
        variant: 'primary',
        label: 'CONTINUE',
        icon: 'arrow-right-short',
      }"
    />
  </form>
</template>

<style lang="scss">
  // Large input group styling
  .input-group-lg {
    > .form-control,
    > .custom-select,
    > .input-group-prepend > .input-group-text,
    > .input-group-append > .input-group-text,
    > .input-group-prepend > .btn,
    > .input-group-append > .btn {
      padding: 0.5rem 1rem;
      font-size: 1.25rem;
      line-height: 1.5;
      border-radius: 0.3rem;
    }
  }

  .zipcode-form {
    display: flex;
    justify-content: space-between;
    max-width: 720px;

    @include media-breakpoint-down(md) {
      flex-wrap: wrap;
      width: 100%;
    }

    button {
      height: 80px;
      padding: 1em 1.2em;
      margin-left: 1em;

      @include media-breakpoint-down(md) {
        margin: 1em 0;
        width: 100%;
      }
    }

    label {
      @include media-breakpoint-down(md) {
        left: 80px;
      }
    }

    .inputs-wrapper {
      width: 100%;

      .input-group {
        background-color: #fff;
        position: relative;
        display: flex;
        flex-wrap: nowrap;
        align-items: stretch;
        width: 100%;
        border-radius: 5px;
        border: 1px solid #ced4da;

        .input-group-text {
          display: flex;
          align-items: center;
          padding: 0.375rem 0.75rem;
          margin-bottom: 0;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
          color: #495057;
          text-align: center;
          white-space: nowrap;
        }
        .input-group-prepend {
          display: flex;
        }
        label {
          @include media-breakpoint-between(sm, lg) {
            font-size: 1rem;
          }
        }
        input {
          border: none;
          height: 78px;
        }
      }
    }
    svg {
      fill: #c5c5c5;
    }
    .valid {
      svg {
        fill: #3b54ba;
      }
    }

    .btn-primary {
      min-width: 225px;
      border-radius: 0.3rem;
      @include media-breakpoint-down(lg) {
        min-width: auto;
      }
    }
  }
</style>
