<template>
  <svg v-bind:class="getClasses" xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 37.87 50.63" class="icon">
    <g id="Layer_2" data-name="Layer 2">
      <g id="icons">
        <path class="cls-1" d="M37.87,50.63H0V18.4H37.87ZM1,49.63H36.88V19.39H1Z" />
        <path class="cls-1" d="M32.49,19.39H5V13.75a13.76,13.76,0,0,1,27.51,0ZM6,18.4H31.49V13.75A12.76,12.76,0,0,0,6,13.75Z" />
        <path class="cls-1" d="M28.36,18.89h-1V13.45a8.64,8.64,0,1,0-17.27,0v5.44h-1V13.45a9.63,9.63,0,1,1,19.25,0Z" />
        <path class="cls-1" d="M18.94,43.93a9.42,9.42,0,1,1,6.66-2.75A9.38,9.38,0,0,1,18.94,43.93Zm0-17.84a8.42,8.42,0,1,0,6,2.46A8.44,8.44,0,0,0,18.94,26.09Z" />
        <path class="cls-1" d="M25.82,40.81h-1V39a2.19,2.19,0,0,0-2.18-2.19H21v-1h1.67A3.18,3.18,0,0,1,25.82,39Z" />
        <path class="cls-1" d="M13.41,41.11h-1V39a3.16,3.16,0,0,1,3.17-3.17h5.7v1h-5.7A2.19,2.19,0,0,0,13.41,39Z" />
        <path class="cls-1" d="M19.12,34.94a3.29,3.29,0,1,1,3.28-3.29A3.29,3.29,0,0,1,19.12,34.94Zm0-5.58a2.29,2.29,0,1,0,2.29,2.29A2.3,2.3,0,0,0,19.12,29.36Z" />
        <g class="cls-2">
          <rect class="cls-1" x="0.5" y="18.89" width="3.98" height="31.24" />
        </g>
        <g class="cls-2">
          <path class="cls-1" d="M16.83,38.32a6.42,6.42,0,0,1,1.56-2,12.17,12.17,0,0,0-4.26.32,8.91,8.91,0,0,1-.29-2.14,9.08,9.08,0,0,1,7.09-8.85,8.75,8.75,0,0,0-5.83.67,9,9,0,0,0,3.84,17.26,8.74,8.74,0,0,0,2-.23,7.9,7.9,0,0,1-3-1.21A3.07,3.07,0,0,1,16.83,38.32Z" />
        </g>
        <g class="cls-2">
          <path class="cls-1" d="M20.44,29.21a2.78,2.78,0,1,0-1.32,5.23,2.68,2.68,0,0,0,1.32-.35,2.77,2.77,0,0,1,0-4.88Z" />
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
        identity: true,
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
  .icon {
    height: 37px;
  }

  .cls-1 {
    fill: #999;
  }
</style>
