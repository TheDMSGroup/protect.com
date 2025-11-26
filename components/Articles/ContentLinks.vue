<template>
  <div v-if="sidebarActive" id="article-content-links" class="content-links-container">
    <h5 id="content-title">On this page</h5>
    <ul class="content-links" style="list-style-type: none; padding: 0">
      <li v-for="link in contentLinks" :key="link.id">
        <a :href="`#${link.id}`" @click.prevent="scrollToHeading(link.id)">{{ link.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
  // Props
  const props = defineProps({
    contentLinks: {
      type: Array,
      required: true,
    },
  });

  // Component name for linting
  defineOptions({
    name: "ContentLinks",
  });

  // Reactive state
  const sidebarActive = computed(() => {
    return props.contentLinks && props.contentLinks.length > 0;
  });

  // Scroll to heading by ID (matches contentParts IDs from API)
  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Set scroll margin for fixed headers
      element.style.scrollMarginTop = "80px";
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
</script>

<style lang="scss" scoped>
  .content-links-container {
    position: sticky;
    top: 20px; /* Distance from top when stuck */
    max-width: 300px;
    width: 100%;
    margin-top: 25vh;
    align-self: flex-start; /* Prevents container from stretching full height */

    @include media-breakpoint-down(md) {
      display: none; /* Disable sticky on mobile if needed */
    }

    li {
      margin: 20px auto;
      border-bottom: 1px solid #e6e6e6;
      padding-bottom: 15px;
    }
  }
</style>
