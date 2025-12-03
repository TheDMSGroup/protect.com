<script setup>
  import { buildImageUrl } from "@/composables/images.js";

  const props = defineProps({
    image: {
      type: String,
      required: true,
    },
  });

  const imageSrc = computed(() => buildImageUrl(props.image));

  // Use Nuxt Image's useImage to get optimized URL for background
  const img = useImage();
  const bgStyle = computed(() => {
    const optimizedUrl = img(imageSrc.value, { format: 'webp', quality: 80 });
    return { backgroundImage: `url(${optimizedUrl})` };
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
