<template>
  <svg v-bind:class="getClasses" xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 40.11 51.31" class="icon">
    <g id="Layer_2" data-name="Layer 2">
      <g id="icons">
        <path class="cls-1" d="M38.26,51.31H1.85A1.84,1.84,0,0,1,0,49.47V1.85A1.85,1.85,0,0,1,1.85,0H38.26a1.85,1.85,0,0,1,1.85,1.85V49.47A1.84,1.84,0,0,1,38.26,51.31ZM1.85,1.14a.71.71,0,0,0-.71.71V49.47a.71.71,0,0,0,.71.71H38.26a.71.71,0,0,0,.71-.71V1.85a.71.71,0,0,0-.71-.71Z" />
        <rect class="cls-1" x="0.57" y="10.33" width="38.97" height="1.14" />
        <path class="cls-1" d="M32.91,8.35a2.62,2.62,0,1,1,2.61-2.62A2.63,2.63,0,0,1,32.91,8.35Zm0-4.1a1.48,1.48,0,1,0,1.48,1.48A1.48,1.48,0,0,0,32.91,4.25Z" />
        <path class="cls-1" d="M25.72,8.35a2.62,2.62,0,1,1,2.61-2.62A2.62,2.62,0,0,1,25.72,8.35Zm0-4.1a1.48,1.48,0,1,0,1.47,1.48A1.48,1.48,0,0,0,25.72,4.25Z" />
        <path class="cls-1" d="M18.52,8.35a2.62,2.62,0,1,1,2.62-2.62A2.62,2.62,0,0,1,18.52,8.35Zm0-4.1A1.48,1.48,0,1,0,20,5.73,1.49,1.49,0,0,0,18.52,4.25Z" />
        <rect class="cls-1" x="4.6" y="5.16" width="6.02" height="1.14" />
        <rect class="cls-1" x="31.4" y="28.22" width="3.31" height="1.14" />
        <rect class="cls-1" x="4.6" y="46.17" width="4.32" height="1.14" />
        <path class="cls-1" d="M20,37.71a8.92,8.92,0,1,1,8.92-8.92A8.93,8.93,0,0,1,20,37.71ZM20,21a7.79,7.79,0,1,0,7.78,7.78A7.79,7.79,0,0,0,20,21Z" />
        <path class="cls-1" d="M20,41.31A12.52,12.52,0,1,1,32.49,28.79,12.54,12.54,0,0,1,20,41.31Zm0-23.9A11.38,11.38,0,1,0,31.35,28.79,11.4,11.4,0,0,0,20,17.41Z" />
        <g class="cls-2">
          <path class="cls-1" d="M16.17,28.79a8.35,8.35,0,0,1,6.07-8A8.47,8.47,0,0,0,20,20.44a8.35,8.35,0,0,0,0,16.7,8.09,8.09,0,0,0,2.27-.32A8.34,8.34,0,0,1,16.17,28.79Z" />
        </g>
        <g class="cls-2">
          <rect class="cls-1" x="0.57" y="0.57" width="4.55" height="50.18" />
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
        'home-warranty': true,
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
