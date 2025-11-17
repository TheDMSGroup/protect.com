<template>
<svg v-bind:class="getClasses" xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 89.66 77.24">
  <g id="Layer_2" data-name="Layer 2">
    <g id="icons">
      <path class="cls-1"
        d="M8.48,40.88,6.24,38.36A23.84,23.84,0,0,1,42,7a22.94,22.94,0,0,1,2.83,3.45A23.56,23.56,0,0,1,47.66,7,23.84,23.84,0,0,1,83.88,37.75l-2.69,3.12-1.25-1.08,2.64-3.07a22.18,22.18,0,1,0-37-24.33l-.71,1.18-.71-1.18a22.28,22.28,0,0,0-3.29-4.24A22.18,22.18,0,0,0,7.52,37.3l2.2,2.48Z" />
      <polygon class="cls-1" points="44.83 77.24 8.51 40.92 9.68 39.74 44.83 74.89 79.98 39.74 81.15 40.92 44.83 77.24" />
      <polygon class="cls-1" points="49.17 54.92 34.38 25.01 25.81 41.16 0 41.16 0 39.5 24.81 39.5 34.44 21.38 49.42 51.68 57.97 39.5 89.67 39.5 89.67 41.16 58.83 41.16 49.17 54.92" />
      <g class="cls-2">
        <path class="cls-1" d="M13.49,37.6A23,23,0,0,1,28.46.88,23,23,0,0,0,6.86,37.6L9.1,40.12,44.83,75.86l3.32-3.32L15.72,40.12Z" />
      </g>
    </g>
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
        'pet-insurance': true,
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
