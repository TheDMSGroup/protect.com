<template>
  <svg v-bind:class="getClasses" xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 19.334 11.332">
    <path id="Path_420" data-name="Path 420" class="cls-1" d="M65.791,532.956a2.286,2.286,0,0,0-3.252-.07c-.78.706-1.56,1.436-2.315,2.142-.866.81-1.762,1.647-2.659,2.451l-.765.686-.054-.046c-.085-.073-.2-.17-.315-.266-.179-.151-.383-.323-.434-.371q-.738-.683-1.474-1.367c-1.144-1.063-2.326-2.163-3.5-3.229a2.286,2.286,0,0,0-3.252.07,2.333,2.333,0,0,0-.654,1.679,2.3,2.3,0,0,0,.745,1.618c2.544,2.381,4.911,4.564,7.234,6.671a2.733,2.733,0,0,0,1.291.608,2.384,2.384,0,0,0,.438.042,1.969,1.969,0,0,0,.768-.153,2.577,2.577,0,0,0,.877-.5c2.322-2.106,4.688-4.288,7.234-6.671a2.305,2.305,0,0,0,.745-1.618A2.333,2.333,0,0,0,65.791,532.956Z" transform="translate(-47.112 -532.242)"/>
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
        'arrow-down': true,
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
  fill: #999;
} */
.arrow-down {
  max-height: 10px;
}
</style>
