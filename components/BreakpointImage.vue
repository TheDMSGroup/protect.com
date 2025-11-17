<script setup>
  import { buildImageUrl } from "@/composables/images.js";

  const props = defineProps({
    image: {
      type: String,
      required: true,
    },
  });

  const bgStyle = computed(() => {
    const img = useImage();
    const imgUrl = img(buildImageUrl(props.image)); // Adjust path as needed
    return { backgroundImage: `url(${imgUrl})` };
  });
</script>

<template lang="html">
  <section id="breakpoint-image" :style="bgStyle" />
</template>

<style lang="scss" scoped>
  #breakpoint-image {
    height: 400px;
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    margin-bottom: 100px;

    @include media-breakpoint-down(md) {
      height: 200px;
    }
    @include media-breakpoint-down(sm) {
      margin-bottom: 50px;
      background-attachment: unset;
    }
  }
</style>
