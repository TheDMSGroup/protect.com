<template>
  <div class="input-wrapper">
    <label :for="name">{{ label }}</label>
    <div class="button-group">
      <div
        v-for="option in setOptions"
        v-bind:key="option.label"
      >
      <label :for="option.value">
        {{option.label}}/{{option.value}}
      </label>
      <input
      @change="handleUpdate($event, option)" type="radio" :name="name" :id="option.value" :value="option.value">
      </div>
    </div>

  </div>
</template>

<script>
import formInputMixin from '../../default/forms/assets/mixins/formInputMixin';

export default {
  name: 'StandardButtons',
  mixins: [formInputMixin],
  created() {
    if (this.value.length === 0 && this.default !== null && this.default !== undefined) {
      this.updateField(this.name, this.default);
    }
  },
  computed: {
    setOptions() {
      if (typeof this.config.options === 'string') {
        const g = this.$store.getters[this.config.options];
        return g();
      }
      return this.config.options;
    },
  },
};
</script>
