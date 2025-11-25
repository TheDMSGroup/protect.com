<template>
  <div v-if="sidebarActive" id="article-content-links" class="content-links-container">
    <h5 id="content-title">On this page</h5>
    <ul class="content-links" style="list-style-type: none; padding: 0">
      <li v-for="link in links" :key="link.text">
        <a :href="`#${link.id}`" @click.prevent="goToContent(link.el)">{{ link.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
  // Props
  const props = defineProps({
    articleContent: {
      type: String,
      required: true,
    },
  });

  // Reactive state
  const sidebarActive = ref(false);
  const links = ref([]);

  // Methods
  const createHeading = (heading) => {
    // Add IDs to headings if they don't have them
    const id = heading.textContent.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();
    heading.setAttribute("id", id);
    links.value.push({
      text: heading.textContent.replace(/[^a-zA-Z0-9]+/g, " "),
      id,
      el: heading,
    });
  };

  const generateLinks = () => {
    // Reset links
    links.value = [];
    sidebarActive.value = false;

    // Wait for content to be rendered
    nextTick(() => {
      // Find headings in the actual DOM
      const headings = document.querySelectorAll(
        ".blog-article.container h1, .blog-article.container h2, .blog-article.container h3, .blog-article.container h4, .blog-article.container h5, .blog-article.container h6"
      );

      if (headings.length > 2) {
        headings.forEach((heading) => createHeading(heading));
      } else {
        const possibleHeadings = [...document.querySelectorAll("div > p")].filter(
          (el) => el.children.length === 1 && ["STRONG", "B"].includes(el.children[0].tagName)
        );
        if (possibleHeadings.length > 2) {
          possibleHeadings.forEach((heading) => createHeading(heading));
        }
      }

      if (links.value.length > 0) {
        sidebarActive.value = true;
      }
    });
  };

  const goToContent = (element) => {
    if (element) {
      // Optionally set scroll margin for fixed headers
      element.style.scrollMarginTop = "80px"; // adjust as needed for your header height
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Watch for content changes
  watch(
    () => props.articleContent,
    () => {
      generateLinks();
    }
  );

  // Generate links on mount
  onMounted(() => {
    generateLinks();
  });
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
