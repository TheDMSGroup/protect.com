<script setup>
import { defineProps } from "vue";

const props = defineProps({
  articlesFeedConfig: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

// Use route parameters to watch for navigation changes
const route = useRoute();

// Create computed properties that gracefully handle both props and route params
const domain = computed(() => {
  return (
    props.articlesFeedConfig?.domain || route.query.domain || '"protectCom"'
  );
});

const articleType = computed(() => {
  return (
    props.articlesFeedConfig?.articleType ||
    route.query.articleType ||
    "article"
  );
});

const vertical = computed(() => {
  return (
    props.articlesFeedConfig?.vertical ||
    route.params.vertical ||
    route.query.vertical ||
    "insurance"
  );
});

const subvertical = computed(() => {
  return (
    props.articlesFeedConfig?.subvertical ||
    route.params.subvertical ||
    route.query.subvertical ||
    ""
  );
});

const {
  data: articlesResults,
  refresh,
  pending,
  error,
} = await useAsyncData(
  "articles",
  () =>
    $fetch(
      `/api/articles?domain=${domain.value}&articleType=${articleType.value}&vertical=${vertical.value}&subvertical=${subvertical.value}`
    ),
  {
    watch: [
      () => domain.value,
      () => articleType.value,
      () => vertical.value,
      () => subvertical.value,
      () => route.fullPath,
    ],
  }
);

// Create a computed that reactively gets articles from the API response
const articles = computed(() => {
  return articlesResults.value?.articles || [];
});

// Create extended pending state to prevent flashing
const extendedPending = ref(false);
const minLoadingTime = 800; // milliseconds

// Watch for pending state changes
watch(
  pending,
  (isPending) => {
    if (isPending) {
      // Start loading immediately
      extendedPending.value = true;
    } else {
      // Delay hiding loading state
      setTimeout(() => {
        extendedPending.value = false;
      }, minLoadingTime);
    }
  },
  { immediate: true }
);
</script>
<template lang="html">
  <div class="blog-feed-wrapper">
    <div class="blog-feed-header container">
      <div class="upper-header">
        <h2>Articles</h2>
      </div>
    </div>

    <div class="blog-feed container">
      <!-- Error and loading states -->
      <div v-if="error" class="alert alert-danger">
        <strong>Error loading articles.</strong>
        <div v-if="error.statusMessage">{{ error.statusMessage }}</div>
        <div v-else>{{ error.message || String(error) }}</div>
      </div>

      <div v-else-if="extendedPending" class="loading">
        <LoadingSkeletonArticleGrid />
      </div>
      <div class="feed-list" v-else-if="articles && articles.length > 0">
        <BlogFeedItem
          v-for="article in articles"
          :key="article.id"
          :article="article"
        />
      </div>
      <div v-else-if="articles && articles.length === 0" class="no-results">
        No articles found.
      </div>
    </div>
  </div>
</template>

<style lang="scss">
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
        position: relative;

        @include media-breakpoint-down(sm) {
          width: 100%;
        }

        .select-wrapper {
          min-width: 260px;
          position: absolute;
          right: 0;
          z-index: 1;

          @include media-breakpoint-down(sm) {
            position: relative;
            right: 0;
            width: 100%;
          }

          @include media-breakpoint-down(xs) {
            width: 100%;
            margin: 1em 0 0;
          }

          .select-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5em;
            height: 25px;

            @include media-breakpoint-down(xs) {
              padding: 0 1em;
            }

            .select-title {
              cursor: pointer;
              display: block;
              color: $blue;
              font-weight: 600;
              padding-left: 10px;
              flex: 1;
              &:hover {
                cursor: pointer;
              }

              @include media-breakpoint-down(sm) {
                padding: 0;
              }
            }

            .down {
              fill: #999999;
              width: 15px;
              cursor: pointer;
            }

            .up {
              fill: #999999;
              width: 15px;
              cursor: pointer;
              transform: rotate(180deg);
            }

            svg {
              @include media-breakpoint-down(sm) {
                position: relative;
                right: -10px;
              }

              @include media-breakpoint-down(xs) {
                margin-right: 10px;
              }
            }
          }

          .category-options {
            display: flex;
            flex-direction: column;
            width: initial;
            border-left: 1px solid #ced4d9;
            border-right: 1px solid #ced4d9;
            border-top: 1px solid $blue;
            border-bottom: 1px solid #ced4d9;

            @include media-breakpoint-down(xs) {
              border-right: 0;
              border-left: 0;
            }

            div {
              background-color: $white;
              border: 0;
              text-align: left;
              border-bottom: 1px solid #ced4d9;
              padding: 0 10px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              position: relative;
              outline: 0;

              @include media-breakpoint-down(xs) {
                padding: 0 1em;
                background-color: #f7faff;
              }

              &:last-child {
                border-bottom: 0;
              }

              label {
                padding: 10px 0;
                margin: 0;
                width: 100%;
                cursor: pointer;
              }

              .radio-box {
                border-left: 1px solid #ced4d9;
                padding: 0 0 0 8px;
                position: absolute;
                right: 10px;
                height: 44px;
                display: flex;
                align-items: center;
                cursor: initial;
                top: 0;

                @include media-breakpoint-down(xs) {
                  border-left: 0;
                  padding-right: 1em;
                }

                input[type="radio"] {
                  opacity: 1;

                  &:checked {
                    &:after {
                      width: 15px;
                      height: 15px;
                      border-radius: 15px;
                      top: -2px;
                      left: -1px;
                      position: relative;
                      background-color: $blue;
                      content: "";
                      display: inline-block;
                      visibility: visible;
                      border: 1px solid $gray;
                    }
                  }

                  &:after {
                    width: 100px;
                    height: 44px;
                  }
                }
              }
            }
          }

          .update {
            font-weight: 600;
            border-left: 1px solid #ced4d9;
            border-right: 1px solid #ced4d9;
            border-bottom: 1px solid #ced4d9;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: $white;

            @include media-breakpoint-down(xs) {
              border: 0;
              background-color: #f7faff;
              width: 100%;
              display: block;
              padding: 1em;
            }

            .search-update-results {
              display: block;
              position: relative;

              .update-results-button {
                display: block;
                position: relative;

                button {
                  font-weight: 600;

                  @include media-breakpoint-down(xs) {
                    width: 100%;
                    background-color: transparent;
                    color: $green;
                    border: 2px solid $green;
                  }
                }
              }
            }

            .reset {
              font-weight: 600;
              margin-right: 1.5em;
              font-size: 0.875em;
              cursor: pointer;

              @include media-breakpoint-down(xs) {
                display: none;
              }
            }
          }
        }
      }
    }
  }

  .blog-feed {
    margin: 0 auto;
    padding: 0;
    margin-bottom: 50px;

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
