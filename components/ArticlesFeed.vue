<script setup>
  import { paginate } from "~/composables/articles.js";
  import { useStore } from "@/stores/store.js";

  const props = defineProps({
    articles: {
      type: Array,
      required: true,
    },
    vertical: {
      type: String,
      default: "insurance",
    },
    subvertical: {
      type: String,
      default: "",
    },
  });

  //dropdown
  const store = useStore();
  const categories = store.articles.categories || [];

  // Dropdown options for SelectDropdown component
  const categoryDropdownOptions = computed(() => {
    return categories.map((category) => ({
      label: category.name,
      to: `/articles/${props.vertical}/${category.value}`,
    }));
  });

  //category output - computed to be reactive to subvertical changes
  const categoryOutput = computed(() => {
    if (!props.subvertical) return "";
    const currentCategory = categories.find((cat) => cat.value === props.subvertical);
    return currentCategory?.name || "";
  });

  //static value of how many articles to show per page
  const filterLength = 8;

  // Reactive current page
  const page = ref(filterLength ? 1 : 0);

  //calculate where to begin pagination based on current page and filter length
  //ex: page 3 with filterLength 8 would start at index 16
  const paginationStart = computed(() => {
    return (page.value - 1) * filterLength;
  });

  //calculate end based off of start plus filter length, but not exceeding total articles
  const paginationEnd = computed(() => {
    const end = paginationStart.value + filterLength;
    return end > props.articles.length ? props.articles.length : end;
  });

  //calculate the amount of pages needed for pagination
  //use Math.ceil to round up to the nearest whole number
  //ex: 37 articles with filterLength 8 would need 5 pages (37/5=4.625 rounded up to 5)
  const paginationPagesCount = computed(() => {
    if (props.articles && filterLength) {
      return Math.ceil(props.articles.length / filterLength);
    }
    return 0;
  });

  // Compute the current articles to display based on pagination
  // Composable paginate takes (items, startIndex, endIndex)
  const currentArticles = computed(() => {
    return paginate(props.articles, paginationStart.value, paginationStart.value + filterLength);
  });

  // Kick off reactivity by updating the pagination page
  // This comes from the emitted event in the PaginationNav component
  const updatePages = (newPage) => {
    if (blogFeed.value) {
      blogFeed.value.scrollIntoView({ behavior: "smooth", inline: "start", block: "start" });
    }
    page.value = newPage;
  };

  // keep ref to blog feed for scrolling
  const blogFeed = useTemplateRef("blogFeed");
</script>
<template lang="html">
  <div ref="blogFeed" class="blog-feed-wrapper">
    <div class="blog-feed-header container">
      <div class="upper-header">
        <h2>Articles</h2>
      </div>
      <div class="results-and-dropdown mb-3">
        <span>
          <span v-if="props.articles">Showing results {{ paginationStart + 1 }} to {{ paginationEnd }} of {{ props.articles.length }}</span>
        </span>
        <div class="right-dropdown">
          <SelectDropdown title="Select Category" :options="categoryDropdownOptions" />
        </div>
      </div>
    </div>
    <div class="blog-feed container">
      <div v-if="subvertical" class="current_tag_text">
        <h3>Articles in "{{ categoryOutput }}" category</h3>

        <span @click="resetTags">
          <NuxtLink class="view-all-link" :to="`/articles/${props.vertical}`">View All</NuxtLink>
        </span>
      </div>
      <div v-if="currentArticles && currentArticles.length > 0" class="feed-list">
        <BlogFeedItem v-for="article in currentArticles" :key="article.id" :article="article" />
      </div>
      <div v-else-if="props.articles && props.articles.length === 0" class="no-results">No articles found.</div>

      <div v-if="paginationPagesCount > 1" class="pagination row">
        <PaginationNav :total-pages="paginationPagesCount" :current-page="page" @navigate:page="updatePages" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .blog-feed-wrapper {
    background-color: $white;
    background: $white;
    .blog-feed-header {
      margin-bottom: 1em;
      padding: 0;

      @include media-breakpoint-down(xs) {
        border-bottom: 1px solid $blue;
      }

      .upper-header {
        border-bottom: 4px solid $blue-light;
        margin-bottom: 1em;
        padding: 0;
        padding-top: 1em;
        display: flex;
        justify-content: space-between;

        @include media-breakpoint-down(sm) {
          flex-wrap: wrap;
          padding: 1em;
        }

        h2 {
          color: $blue-light;
          font-size: 2.8em;
          margin-left: 0;
        }

        .input-and-button {
          width: 100%;
          max-width: 300px;

          @include media-breakpoint-down(sm) {
            max-width: 100%;
          }

          .valid {
            .input-group {
              height: 40px;
            }

            .form-control {
              height: 40px;
              font-size: 0.875em;
              padding: 0 1em;
            }
          }

          .input-group-append {
            height: 40px;
            cursor: pointer;

            svg {
              height: 20px;
            }
          }
        }
      }

      .results-and-dropdown {
        display: flex;
        justify-content: space-between;

        @include media-breakpoint-down(sm) {
          flex-wrap: wrap;
          // padding: 0 1em;
          width: 100%;
        }

        > span {
          @include media-breakpoint-down(xs) {
            padding: 0 1em;
          }
        }

        .right-dropdown {
          @include media-breakpoint-down(sm) {
            width: 100%;
          }
        }
      }
    }

    .blog-feed {
      margin: 0 auto;
      padding: 0;
      margin-bottom: 50px;

      .view-all-link {
        padding: 10px;
        border: 1px solid $blue-light;
        color: $blue-light;
        font-weight: 600;
        border-radius: 4px;
      }

      .results-list {
        display: flex;
        flex-wrap: wrap;
      }

      .feed-list {
        display: flex;
        flex-wrap: wrap;

        .blog-feed-item {
          a {
            text-decoration: none;
          }
        }
      }

      .no-results {
        padding: 0;
      }

      .pagination {
        width: 100%;

        .pagination-wrapper {
          margin: 0 auto;
          display: flex;
        }
      }
    }
  }
  .current_tag_reset {
    font-size: 0.875rem;
    margin-top: 0.5em;
    cursor: pointer;
  }
  .current_tag_text {
    margin-bottom: 2em;

    @include media-breakpoint-down(sm) {
      padding: 15px;
      margin-bottom: 0;
    }

    h3 {
      margin-bottom: 15px;
    }
    a {
      color: $blue;
    }
  }

</style>
