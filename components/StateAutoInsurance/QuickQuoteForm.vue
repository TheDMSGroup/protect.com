<template>
  <section class="quick-quote-form">
    <div class="container">
      <div class="form-wrapper">
        <div class="card">
          <h2>Get Your {{ state.state }} Auto Insurance Quote</h2>

          <form @submit.prevent="handleSubmit" class="quote-form">
            <div class="form-grid">
              <div class="form-group">
                <label for="zipCode">Zip Code</label>
                <input
                  id="zipCode"
                  type="text"
                  v-model="formData.zipCode"
                  placeholder="75201"
                  required
                />
              </div>

              <div class="form-group">
                <label for="age">Age</label>
                <select
                  id="age"
                  v-model="formData.age"
                  required
                >
                  <option value="">Select age</option>
                  <option value="16">16</option>
                  <option value="25">25</option>
                  <option value="35">35</option>
                  <option value="45">45</option>
                  <option value="55">55</option>
                  <option value="65">65+</option>
                </select>
              </div>

              <div class="form-group">
                <label for="currentInsurance">Current Insurance</label>
                <select
                  id="currentInsurance"
                  v-model="formData.hasCurrentInsurance"
                  required
                >
                  <option value="">Select status</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="expired">Expired</option>
                </select>
              </div>

              <div class="form-group">
                <button
                  type="submit"
                  class="btn btn-primary submit-btn"
                  :disabled="submitting"
                >
                  {{ submitting ? 'Submitting...' : 'Compare Rates' }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { submitQuoteRequest } from '../../services/api';

export default {
  name: 'QuickQuoteForm',
  props: {
    state: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        zipCode: '',
        age: '',
        hasCurrentInsurance: '',
      },
      submitting: false,
    };
  },
  methods: {
    async handleSubmit() {
      if (!this.isFormValid()) {
        this.showToast('Please fill all fields', 'error');
        return;
      }

      try {
        this.submitting = true;

        const quoteData = {
          zipCode: this.formData.zipCode,
          age: parseInt(this.formData.age, 0),
          hasCurrentInsurance: this.formData.hasCurrentInsurance === 'yes',
          stateAbbreviation: this.state.stateAbbreviation,
        };

        await submitQuoteRequest(quoteData);

        this.showToast('Quote request submitted successfully!', 'success');
        this.resetForm();
      } catch (error) {
        console.error('Error submitting quote:', error);
        this.showToast('Failed to submit quote request. Please try again.', 'error');
      } finally {
        this.submitting = false;
      }
    },

    isFormValid() {
      return this.formData.zipCode
      && this.formData.age
      && this.formData.hasCurrentInsurance;
    },

    resetForm() {
      this.formData = {
        zipCode: '',
        age: '',
        hasCurrentInsurance: '',
      };
    },

    showToast(message, type = 'info') {
      // Simple toast notification - could be enhanced with a proper toast library
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.textContent = message;
      toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 24px;
        border-radius: 6px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
      `;
      // no nested ternary background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.remove();
      }, 4000);
    },
  },
};
</script>

<style lang="scss" scoped>
.quick-quote-form {
  background: var(--surface-color);
  padding: 3rem 0;

  .form-wrapper {
    max-width: 800px;
    margin: 0 auto;
  }

  h2 {
    text-align: center;
    margin-bottom: var(--spacing-xl);
    color: var(--text-primary);
  }

  .quote-form {
    .form-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--spacing-md);

      // @include mobile {
      //   grid-template-columns: 1fr;
      // }

      // @include tablet {
      //   grid-template-columns: repeat(2, 1fr);
      // }
    }

    .submit-btn {
      width: 100%;
      height: 48px;
      align-self: end;
      margin-top: 1.5rem;

      // @include mobile {
      //   margin-top: 0;
      // }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
