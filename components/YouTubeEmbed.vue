<template>
  <div class="youtube-embed">
    <iframe
      :src="`https://www.youtube.com/embed/${videoId}`"
      :title="title"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>

<script setup>
  defineProps({
    videoId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "YouTube video player",
    },
  });
</script>

<style scoped>
  .youtube-embed {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
  }

  .youtube-embed iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
