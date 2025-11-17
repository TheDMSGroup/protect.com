<template>
  <svg v-bind:class="getClasses" xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 42.428 51.833">
    <g id="Group_373" data-name="Group 373" transform="translate(-756.925 -741.994)">
      <g id="Group_371" data-name="Group 371">
        <g id="Group_369" data-name="Group 369">
          <g id="Group_368" data-name="Group 368">
            <g id="Group_366" data-name="Group 366">
              <path id="Path_198" data-name="Path 198"
              class="cls-1" d="M777.561,788.668,763.748,769.03l.013-.012a17.34,
              17.34,0,1,1,31.724-9.678c0,4.677-5.581,12.117-5.819,
              12.431Zm-12.468-19.5L777.569,786.9l11.276-15.738c.063-.085,
              5.619-7.491,5.619-11.826a16.325,16.325,0,1,0-29.617,9.453l.26.363Z"/>
            </g>
            <g id="Group_367" data-name="Group 367">
              <path id="Path_199" data-name="Path 199" class="cls-1"
              d="M777.977,765.849a6.267,6.267,0,1,1,6.267-6.268A6.275,6.275,0,
              0,1,777.977,765.849Zm0-11.514a5.246,5.246,0,1,0,5.246,5.246A5.253,
              5.253,0,0,0,777.977,754.335Z"/>
            </g>
          </g>
        </g>
        <g id="Group_370" data-name="Group 370">
          <path id="Path_200" data-name="Path 200" class="cls-1"
          d="M778.139,793.827c-11.9,0-21.214-3.77-21.214-8.583,0-3.569,
          5.009-6.612,13.073-7.942l.165,1.007c-7.307,1.2-12.217,3.992-12.217,
          6.935,0,4.1,9.247,7.562,20.193,7.562s20.193-3.463,
          20.193-7.562c0-3.068-5.42-5.98-13.18-7.083l.144-1.01c8.54,1.213,
          14.057,4.389,14.057,8.093C799.353,790.057,790.036,793.827,778.139,793.827Z"/>
        </g>
      </g>
      <g id="Group_372" data-name="Group 372" class="cls-2">
        <path id="Path_201" data-name="Path 201" class="cls-1"
        d="M761.519,785.244c0-2.883,3.881-5.41,9.712-6.838l6.335,
        9.381,1.915-2.674-4.857-7.312-6.12-8.7.01-.01a16.807,16.807,0,0,
        1,11.667-26.45,16.746,16.746,0,0,0-18.877,16.7,16.739,16.739,0,0,0,
        3.127,9.749l-.011.01,6.121,8.7-.46.005c-7.431,1.225-12.645,
        4.094-12.645,7.438,0,4.459,9.27,8.073,20.7,8.073.689,0,1.37-.015,
        2.042-.04C769.706,792.877,761.519,789.434,761.519,785.244Z"/>
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
        geo: true,
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
