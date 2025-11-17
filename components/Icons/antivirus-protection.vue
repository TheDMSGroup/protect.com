<template>
<svg v-bind:class="getClasses" xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 43.04 52">
  <g id="Layer_2" data-name="Layer 2">
    <g id="icons">
      <rect class="cls-1" x="20.98" y="6.45" width="1.07" height="38.43" />
      <rect class="cls-1" x="5.97" y="22.92" width="31.1" height="1.07" />
      <path class="cls-1"
        d="M21.52,45.49l-.26-.14C20.62,45,5.43,36.51,5.43,27.7V11.35H6a4.9,4.9,0,0,0,4.9-4.9V5.92h21.3v.53a4.9,4.9,0,0,0,4.9,4.9h.54V27.7c0,8.81-15.18,17.29-15.83,17.65ZM6.51,12.4V27.7c0,7.59,13,15.4,15,16.56,2-1.16,15-9,15-16.56V12.4A6,6,0,0,1,31.13,7H11.91A6,6,0,0,1,6.51,12.4Z" />
      <path class="cls-1"
        d="M21.52,52l-.26-.14C20.39,51.38,0,40,0,28.21V6.52H.54a6,6,0,0,0,6-6V0h30V.55a6,6,0,0,0,6,6H43V28.21C43,40,22.65,51.38,21.78,51.86ZM1.07,7.57V28.21c0,10.46,18.06,21.19,20.45,22.56C23.91,49.4,42,38.66,42,28.21V7.57a7.07,7.07,0,0,1-6.5-6.49H7.57A7.06,7.06,0,0,1,1.07,7.57Z" />
      <g class="cls-2">
        <path class="cls-1" d="M10.26,28V13.64c3,0,5.43-3.89,5.43-6.89H11.4A5.44,5.44,0,0,1,6,12.19V28c0,8.59,15.55,17.18,15.55,17.18s.85-.47,2.15-1.29C19.4,41.17,10.26,34.59,10.26,28Z" />
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
        'antivirus-protection': true,
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
