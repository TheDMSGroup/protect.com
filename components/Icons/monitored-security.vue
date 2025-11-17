<template>
<svg v-bind:class="getClasses" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.15 51.73">
  <g id="Layer_2" data-name="Layer 2">
    <g id="icons">
      <path class="cls-1" d="M42.15,51.73H0L.06,44.4,3.5,37.53h34l4.63,6.94ZM1.05,50.67H41.1V44.79L37,38.59H4.15l-3.1,6.17Z" />
      <path class="cls-1" d="M34.75,38.59H7.41V15.25A7.64,7.64,0,0,1,15,7.62H27.12a7.64,7.64,0,0,1,7.63,7.63ZM8.46,37.53H33.69V15.25a6.58,6.58,0,0,0-6.57-6.57H15a6.58,6.58,0,0,0-6.58,6.57Z" />
      <rect class="cls-1" y="26.32" width="2.25" height="1.05" />
      <rect class="cls-1" x="1.07" y="13.13" width="1.05" height="2.25" transform="translate(-12.46 11.4) rotate(-72.12)" />
      <rect class="cls-1" x="8.78" y="3.05" width="1.05" height="2.25" transform="translate(-0.6 6.6) rotate(-37.95)" />
      <rect class="cls-1" x="39.38" y="26.32" width="2.25" height="1.05" />
      <rect class="cls-1" x="20.55" width="1.05" height="2.25" />
      <rect class="cls-1" x="38.91" y="13.73" width="2.25" height="1.05" transform="translate(-2.44 13.01) rotate(-17.92)" />
      <rect class="cls-1" x="31.2" y="3.65" width="2.25" height="1.05" transform="translate(9.17 27.11) rotate(-52.09)" />
      <rect class="cls-1" x="20.55" y="27.59" width="1.05" height="10.47" />
      <polygon class="cls-1" points="21.08 28.01 17.14 24.07 17.88 23.32 21.08 26.52 24.27 23.32 25.02 24.07 21.08 28.01" />
      <rect class="cls-1" x="0.93" y="44.1" width="40.33" height="1.05" />
      <g class="cls-2">
        <path class="cls-1" d="M8,38.06h4.11V15.25a7.1,7.1,0,0,1,7.1-7.1H15a7.1,7.1,0,0,0-7.11,7.1V38.06H3.82L.53,44.63V51.2H4.75V44.63Z" />
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
        'monitored-security': true,
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
