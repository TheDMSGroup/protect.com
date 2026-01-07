<template>
  <div v-if="interacted" class="youtube-embed" ref="youtubeEmbed">
    <iframe
      :src="`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`"
      :title="videoTitle"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
  <div v-else class="video-thumbnail" @click="updateInteracted" style="position: relative; cursor: pointer">
    <div class="title-overlay">
      <div class="icon">
        <IconsProtectShield />
      </div>
      <span v-if="!isMobile">{{ videoTitle }}</span>
      <span v-if="isMobile">{{ videoTitleTruncated }}</span>
    </div>
    <picture>
      <source media="(min-width: 768px)" :srcset="`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`" />
      <source media="(min-width: 480px)" :srcset="`https://img.youtube.com/vi/${videoId}/sddefault.jpg`" />
      <img :src="`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`" :alt="videoTitle" style="width: 100%; height: auto; display: block" />
    </picture>
    <div
      style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 64px;
        color: white;
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
      "
    >
      ▶
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    videoId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "YouTube video player",
    },
  });

  const interacted = ref(false);
  const youtubeEmbed = ref(null);
  const videoTitle = ref(props.title);
  const isMobile = ref(false);

  const videoTitleTruncated = computed(() => {
    if (videoTitle.value.length > 60) {
      return videoTitle.value.slice(0, 20) + "...";
    }
    return videoTitle.value;
  });

  const updateInteracted = () => {
    interacted.value = true;
  };

  // Fetch video title from YouTube oEmbed API
  onMounted(async () => {
    // Initialize isMobile
    isMobile.value = window.innerWidth <= 768;

    try {
      const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${props.videoId}&format=json`);
      const data = await response.json();
      if (data.title) {
        videoTitle.value = data.title;
      }
    } catch (error) {
      console.warn("Failed to fetch YouTube video title:", error);
      // Falls back to the prop title
    }

    // ResizeObserver to update isMobile dynamically
    const resizeObserver = new ResizeObserver(() => {
      isMobile.value = window.innerWidth <= 768;
    });

    resizeObserver.observe(document.body);

    onBeforeUnmount(() => {
      resizeObserver.disconnect();
    });
  });
</script>

<style lang="scss" scoped>
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
  .title-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
    color: white;
    padding: 20px 0 16px 2%;
    box-sizing: border-box;
    font-size: 1.2rem;

    .icon {
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
      border-radius: 50%;
      background: white;
      width: 30px;
      height: 30px;
      padding: 5px;
    }

    .icon svg {
      width: 100%;
      height: 100%;
      margin-top: -12px;
      width: 25px;
      height: 25px;
      margin-left: -2px; /* Protect blue color */
    }
  }
</style>
