<template>
  <form id="bundleForm" @submit.prevent="submitForm">
    <div class="form-question">
      <label>Are you a homeowner?</label>
      <div class="radio-group">
        <div class="radio-option">
          <input id="yes" v-model="homeowner" type="radio" name="homeowner" value="Yes" required />
          <label for="yes">Yes</label>
        </div>
        <div class="radio-option">
          <input id="no" v-model="homeowner" type="radio" name="homeowner" value="No" required />
          <label for="no">No</label>
        </div>
      </div>
    </div>

    <button type="submit" class="submit-btn">Compare Quotes</button>

    <div class="form-footer">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 0L10.163 5.86852L16 8L10.163 10.1315L8 16L5.86852 10.1315L0 8L5.86852 5.86852L8 0Z" fill="currentColor" />
      </svg>
      No spam, just quotes
    </div>
  </form>
</template>

<script setup>
  // Props can be added here if needed in the future

  const emit = defineEmits(["submit-form"]);

  const homeowner = ref("");

  const submitForm = () => {
    if (!homeowner.value) {
      return;
    }
    emit("submit-form", {
      homeowner: homeowner.value,
      bundle: homeowner.value === "Yes" ? true : false,
    });
  };
</script>

<style lang="scss" scoped>
  @import "../../scss/bundlepages.scss";

  .form-question {
    margin-bottom: 2.5rem;
  }

  .form-question label {
    display: block;
    font-weight: 600;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: $blue;
  }

  .radio-group {
    display: flex;
    gap: 1rem;
  }

  .radio-option {
    flex: 1;
    position: relative;
  }

  .radio-option input[type="radio"] {
    position: absolute;
    opacity: 0;
  }

  .radio-option label {
    display: block;
    padding: 1.2rem;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 600;
    background: white;
  }

  .radio-option input[type="radio"]:checked + label {
    border-color: $blue-light;
    background: $blue-light;
    color: white;
    transform: scale(1.05);
  }

  .radio-option label:hover {
    border-color: $blue-light;
  }

  .submit-btn {
    width: 100%;
    padding: 1.3rem;
    background: $blue-light;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 8px 20px rgba(12, 44, 103, 0.3);
  }

  .submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(0, 102, 204, 0.4);
  }

  .form-footer {
    margin-top: 1.5rem;
    text-align: center;
    color: $gray;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
</style>
