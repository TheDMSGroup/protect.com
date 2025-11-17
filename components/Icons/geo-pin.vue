<template>
  <svg v-bind:class="getClasses" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 32">
    <path
      d="M12 0C5.372 0 0 5.373 0 12c0 10 12 20 12 20s12-10 12-20C24 5.373 18.628 0 12 0zm0 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"
      fill="#03a57e"
    />
  </svg>
</template>

<script>
export default {
  props: {
    classes: String,
  },
  computed: {
    getClasses() {
      const classesDefault = {
        'elixr-icon': true,
        'geo-pin': true,
      };
      if (this.classes) {
        const classList = this.classes.split(' ');
        classList.forEach((classd) => {
          classesDefault[classd] = true;
        });
      }
      return classesDefault;
    },
  },
};
</script>

<style scoped>
.geo-pin {
  max-height: 24px;
  width: auto;
}
</style>
