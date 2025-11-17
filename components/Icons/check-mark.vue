<template>
  <svg v-bind:class="getClasses" xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 24.495 24.026">
    <path id="Path_421" data-name="Path 421" class="cls-1"
    d="M132.2,518.8a2.275,2.275,0,0,0-1.885-.791,2.4,2.4,0,0,0-1.837,
    1.115c-1.912,2.94-3.853,5.931-5.729,
    8.824l-5.335,8.224-.256-.235q-.735-.68-1.469-1.363c-1.145-1.065-2.329-2.165-3.509-3.233a2.286,
    2.286,0,0,0-3.251.069,2.328,2.328,0,0,0-.654,1.68,2.3,2.3,0,0,0,.745,1.618c2.544,
    2.381,4.91,4.564,7.234,6.671a2.728,2.728,0,0,0,1.291.608,2.365,2.365,0,0,0,
    .437.042,2.3,2.3,0,0,0,1.95-1.223c2.215-3.427,4.473-6.906,6.657-10.271l2.071-3.192,
    1.186-1.828q1.234-1.9,2.464-3.8A2.321,2.321,0,0,0,132.2,518.8Z"
    transform="translate(-108.269 -518)"/>
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
        'check-mark': true,
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
/* .cls-1 {
  fill: #3b54ba;
} */
.check-mark {
  max-height: 30%;
}
</style>
