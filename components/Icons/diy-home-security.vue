<template>
<svg v-bind:class="getClasses" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.67 52">
  <g id="Layer_2" data-name="Layer 2">
    <g id="icons">
      <polygon class="cls-1" points="0.61 22.67 0 21.82 30.49 0 45.4 10.8 44.78 11.65 30.48 1.3 0.61 22.67" />
      <polygon class="cls-1" points="52.69 52 8.29 52 8.29 16.16 9.34 16.16 9.34 50.95 51.63 50.95 51.63 23.96 52.69 23.96 52.69 52" />
      <path class="cls-1" d="M27,52H16.06V31.07H27Zm-9.87-1h8.82V32.13H17.11Z" />
      <path class="cls-1" d="M44.92,39.93H34V31.07H44.92Zm-9.87-1h8.81V32.13H35.05Z" />
      <rect class="cls-1" x="0.31" y="50.95" width="60.36" height="1.05" />
      <path class="cls-1" d="M59.45,24.48H44.87a.75.75,0,0,1-.75-.75V11.45a.76.76,0,0,1,.75-.75H59.45a.76.76,0,0,1,.75.75V23.73A.75.75,0,0,1,59.45,24.48ZM45.17,23.43h14V11.75h-14Z" />
      <path class="cls-1" d="M58.09,11.75H46.23V9.13a5.93,5.93,0,0,1,11.86,0ZM47.28,10.7H57V9.13a4.88,4.88,0,0,0-9.76,0Z" />
      <path class="cls-1" d="M55.09,21.18H49.75l.78-3.63a2.45,2.45,0,0,1-.6-1.61,2.49,2.49,0,1,1,5,0,2.45,2.45,0,0,1-.6,1.61Zm-4-1.06h2.74l-.63-2.92.23-.2a1.44,1.44,0,1,0-1.94,0l.23.2Z" />
      <g class="cls-2">
        <path class="cls-1" d="M48.72,23.73V11.48a.29.29,0,0,1,.29-.3H44.8a.3.3,0,0,0-.3.3V23.73a.3.3,0,0,0,.3.29H49A.29.29,0,0,1,48.72,23.73Z" />
      </g>
      <g class="cls-2">
        <polygon class="cls-1" points="8.81 51.47 13.03 51.47 13.03 13.14 8.81 16.16 8.81 51.47" />
      </g>
      <g class="cls-2">
        <rect class="cls-1" x="16.58" y="31.6" width="4.21" height="19.87" />
      </g>
      <g class="cls-2">
        <rect class="cls-1" x="34.52" y="31.6" width="4.21" height="8.04" />
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
        'diy-home-security': true,
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
