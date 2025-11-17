<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="15" viewBox="0 0 30 15">
    <g transform="translate(-49.744 -579)">
      <rect width="26.923" height="1.5" rx="0.75" transform="translate(52.821 579)" fill="#0c2c67"/>
      <rect width="30" height="1.5" rx="0.75" transform="translate(49.744 585.75)" fill="#0c2c67"/>
      <rect width="19.231" height="1.5" rx="0.75" transform="translate(60.513 592.5)" fill="#0c2c67"/>
    </g>
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
        'right-align': true,
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
