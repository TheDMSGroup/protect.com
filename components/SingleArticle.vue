<script setup>
  const route = useRoute();

  const {
    data: articleResult,
    pending,
    error,
  } = await useAsyncData("article", () => $fetch(`/api/article/?urlSlug=${route.params.slug}`), {
    watch: [() => route.params.slug, () => route.fullPath],
  });

  // Create a computed that reactively gets articles from the API response
  const article = computed(() => {
    return articleResult.value?.article || {};
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

  const title = computed(() => article.value?.title || "");
  const excerpt = computed(() => article.value?.excerpt || "");
  const content = computed(() => article.value?.content || null);
  const author = computed(() => article.value?.author || {});
  const date = computed(() => article.value?.publishedAt || "");
  const readTime = computed(() => article.value?.readTime || "");
  const relatedArticles = computed(() => article.value?.relatedArticles || []);
  const recentArticles = computed(() => article.value?.recentArticles || []);
  const coverImage = computed(() => article.value?.coverImage || null);
  const vertical = computed(() => article.value?.vertical || "");
  const subvertical = computed(() => article.value?.subvertical || "");
</script>

<template lang="html">
  <div class="blog-article-wrapper">
    <div class="blog-article-cover">
      <div class="breadcrumbs">
        <div class="container">
          <span class="links">
            <NuxtLink to="/articles/">Articles</NuxtLink>
            <span class="arrow" v-if="vertical">></span>
            <NuxtLink v-if="vertical" :to="`/articles/${vertical}`" class="article-slug">{{ vertical }}</NuxtLink>
            <span class="arrow" v-if="subvertical">></span>
            <NuxtLink v-if="subvertical" :to="`/articles/${vertical}/${subvertical}`" class="article-slug">
              {{ subvertical }}
            </NuxtLink>
          </span>
        </div>
      </div>
      <!-- <span class="advertiser-disclosure">Advertiser Disclosure</span> -->
    </div>
    <div class="blog-article container">
      <div v-if="error" class="alert alert-danger">
        <strong>Error loading article.</strong>
        <div v-if="error.statusMessage">{{ error.statusMessage }}</div>
        <div v-else>{{ error.message || String(error) }}</div>
      </div>

      <div v-else-if="extendedPending" class="loading">
        <LoadingSkeletonArticle />
      </div>
      <div class="row" v-else-if="!error">
        <div class="col-lg-3 col-md-3 sidebar"></div>
        <div class="col-lg-9 col-md-12">
          <h1 class="article-title">{{ title }}</h1>
          <div v-if="excerpt && excerpt.length > 0" class="snippet">
            {{ excerpt }}
          </div>
          <p class="author" v-if="date && date.length > 0">
            <span v-if="author && author.name.length > 0">{{ author.name }} <span class="divider">|</span></span>
            <span class="mobile-second-line">
              <span class="date">
                {{ date }}
              </span>
              <span class="divider" v-if="readTime">|</span>
              <span class="read-time" v-if="readTime">
                <img alt="time" src="../public/clock.jpg" />
                {{ readTime }}
              </span>
            </span>
          </p>

          <div v-if="coverImage" class="secondary-image">
            <img :src="coverImage.url" alt="" />
          </div>
          <div class="article-body">
            <div class="article-left">
              <div class="article-content" v-if="content" v-html="content.html"></div>
              <ul class="related-articles">
                <li v-for="article in relatedArticles" :key="article.title">
                  <NuxtLink :to="article.urlSlug" class="related-article-link">
                    {{ article.title }}
                    <svg class="green-right-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.45 12.6">
                      <g>
                        <path
                          d="M14.37,6.09l-6-6A.31.31,0,0,0,8.15,0a.3.3,0,0,
                      0-.21.09l-1,1a.27.27,0,0,0-.09.21A.27.27,0,0,0,7,1.47l3.85,
                      3.85H.3a.3.3,0,0,0-.3.3V7a.3.3,0,0,0,.3.3H10.83L7,11.13a.29.29,0,0,
                      0-.09.21.27.27,0,0,0,.09.21l1,1a.3.3,0,0,0,.21.09.31.31,0,0,0,.22-.09l6-6A.31.31,0,0,0,14.37,6.09Z"
                        />
                      </g>
                    </svg>
                  </NuxtLink>
                </li>
              </ul>
              <!--
            <div class="blog-article-picks">
              <TopPicks :picks="blogArticlePicks"/>
            </div>
            <div class="blog-article-quote-pick">
              <InputQuoteAd :pick="blogArticleQuotePick"/>
            </div>
            -->
              <!-- <div class="author-info" v-if="author.name !== ''">
              <div class="author-left">
                <img class="avatar" :src="`${author.avatar}`"> <strong>{{ author.name }}</strong>
                <p class="about">{{ author.about }}</p>
              </div>
              <div class="author-right">
                <p v-if="author.urlSlug">
                  <img
                    alt="Read More"
                    src="../../assets/read-more.png">
                    <NuxtLink
                      :to="`/author/${author.urlSlug}`">Read More by {{ author.name }}
                    </NuxtLink>
                </p>
                <p v-if="author.twitter">
                  <img
                    alt="Twitter"
                    src="../../assets/twitter.png">
                    <a :href="`https://www.twitter.com/${author.twitter}`">
                      @{{ author.twitter }}
                    </a>
                </p>
                <p v-if="author.email">
                  <img
                    alt="Email"
                    src="../../assets/email.png">
                    <a :href="`mailto:${author.email}`">
                      {{ author.email }}
                    </a>
                </p>
              </div>
            </div> -->
            </div>

            <div class="article-sidebar">
              <div class="sidebar-section">
                <span>Latest Articles</span>
                <ul class="recent-articles">
                  <li v-for="article in recentArticles" :key="article.urlSlug">
                    <NuxtLink :to="'/article/' + article.urlSlug">
                      {{ article.title }}
                      <svg class="green-right-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.45 12.6">
                        <g>
                          <path
                            d="M14.37,6.09l-6-6A.31.31,0,0,0,8.15,0a.3.3,0,0,
                        0-.21.09l-1,1a.27.27,0,0,0-.09.21A.27.27,0,0,0,7,1.47l3.85,
                        3.85H.3a.3.3,0,0,0-.3.3V7a.3.3,0,0,0,.3.3H10.83L7,11.13a.29.29,0,0,
                        0-.09.21.27.27,0,0,0,.09.21l1,1a.3.3,0,0,0,.21.09.31.31,0,0,0,.22-.09l6-6A.31.31,0,0,0,14.37,6.09Z"
                          />
                        </g>
                      </svg>
                    </NuxtLink>
                  </li>
                </ul>
              </div>

              <!-- <div class="sidebar-section">
              <TopPicks :picks="ourTopPicks"/>
            </div> -->
            </div>
          </div>
        </div>
      </div>
      <div v-else class="no-results">No article found.</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["articleConfig"],
  };
</script>
<style lang="scss" scoped>
  .blog-article-wrapper {
    a {
      color: $blue;
    }

    .blog-article-cover {
      max-height: 600px;
      overflow: hidden;
      position: relative;

      .breadcrumbs {
        position: relative;
        background-color: $white;
        width: 100%;
        bottom: 0;
        height: 80px;
        text-transform: capitalize;
        background-color: $gray-light;
        display: flex;
        align-items: center;

        @include media-breakpoint-down(md) {
          height: auto;
          padding: 1em 0.5em;
          font-size: 0.875em;
        }
        @include media-breakpoint-down(xs) {
          position: relative;
        }

        a {
          color: $gray-dark;
        }

        .container {
          display: flex;
          flex-wrap: wrap;

          .links {
            width: 85%;
            position: relative;

            @include media-breakpoint-down(md) {
              width: 100%;
            }
            .arrow {
              margin: 0 8px;
            }

            .custom-select {
              border: 0;
              background-color: $gray-light;
              color: $gray-dark;
            }
          }
        }
      }
      .advertiser-disclosure {
        display: block;
        font-size: 0.875em;
        text-align: right;
        padding-right: 15px;
        top: -50px;
        position: relative;

        @include media-breakpoint-down(md) {
          top: 0px;
          position: unset;
          width: 100%;
          padding: 5px;
        }
      }
    }

    .blog-article {
      background-color: $white;
      overflow: auto;
      padding: 0 15px;
      margin-top: 3em;
      background: $white;

      @include media-breakpoint-down(xs) {
        margin-top: 0;
      }
      .sidebar {
        @include media-breakpoint-down(md) {
          display: none;
        }

        img {
          width: 100%;
        }
      }

      .article-title {
        font-weight: 600;

        @media (max-width: 600px) {
          margin-top: 0;
          font-size: 2rem;
        }

        @include media-breakpoint-down(xs) {
          margin-top: 1em;
        }
      }

      .secondary-image {
        max-height: 300px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2em;

        @include media-breakpoint-down(xs) {
          margin-left: -1em;
          margin-right: -1em;
        }

        img {
          width: 100%;
        }
      }

      .snippet {
        font-size: 1.6em;
        color: $gray-dark;
        margin-top: 1em;

        @include media-breakpoint-down(xs) {
          margin-top: 0.5em;
        }
      }

      .author {
        font-size: 1em;
        margin-top: 1em;

        .divider {
          margin: 0 8px;

          @include media-breakpoint-down(xs) {
            display: none;
          }
        }

        .mobile-second-line {
          @include media-breakpoint-down(xs) {
            display: block;
          }

          .read-time {
            @include media-breakpoint-down(xs) {
              float: right;
            }

            img {
              position: relative;
              top: -2px;
              margin-right: 4px;
            }
          }
        }
      }

      .article-body {
        display: flex;

        @include media-breakpoint-down(xs) {
          flex-wrap: wrap;
        }

        .article-left {
          width: 68%;
          margin-right: 40px;

          @include media-breakpoint-down(xs) {
            width: 100%;
            margin-right: 0;
          }

          .article-content {
            margin-bottom: 1em;
            padding-right: 1.5em;

            p {
              font-size: 1em;
              font-weight: 400;
            }

            code {
              white-space: pre-wrap;
            }

            table {
              width: 100%;
              max-width: 100%;
              margin-bottom: 1rem;
              background-color: transparent;

              td,
              th {
                padding: 0.75rem;
                vertical-align: top;
                border-top: 1px solid #dee2e6;
              }
              thead th {
                vertical-align: bottom;
                border-bottom: 2px solid #dee2e6;
              }
            }

            img {
              width: 100%;
              height: auto;
            }

            iframe {
              width: 100%;
              height: 400px;
            }
          }

          .related-articles {
            width: 100%;
            list-style: none;
            margin: 0;
            padding: 0;

            li {
              border-bottom: 1px solid $gray-dark;
              padding: 6px 0;
              display: flex;
              align-items: center;

              .related-article-link {
                color: $gray-dark;
                font-size: 1.2em;
                font-weight: 500;

                &:hover {
                  text-decoration: none;
                }
              }
            }
          }

          .author-info {
            display: flex;
            margin-top: 4em;
            background-color: #f5f8f7;
            padding: 1.5em;

            @include media-breakpoint-down(md) {
              flex-direction: column;
            }

            p {
              font-size: 0.875em;
              font-weight: 400;
            }

            .author-left {
              width: 50%;

              @include media-breakpoint-down(md) {
                width: 100%;
              }

              .about {
                margin-top: 1em;
              }

              .avatar {
                width: 35px;
                border-radius: 50%;
              }
            }

            .author-right {
              width: 50%;
              padding-left: 2em;
              display: flex;
              flex-direction: column;
              justify-content: center;

              @include media-breakpoint-down(md) {
                width: 100%;
                padding: 0;
              }

              img {
                margin-right: 1.2em;
              }

              a {
                color: $gray-dark;
              }
            }
          }

          .blog-article-picks {
            margin-top: 4em;

            .top-pick-header {
              display: none;
            }

            .sponsored-listings {
              display: none;

              @include media-breakpoint-down(md) {
                display: block;
              }
            }
          }

          .blog-article-quote-pick {
            margin-top: 4em;
          }
        }

        .article-sidebar {
          width: 32%;

          @include media-breakpoint-down(xs) {
            width: 100%;
            margin-top: 4em;
          }

          .sidebar-section {
            width: 100%;
            border-top: 3px solid $blue;
            margin-bottom: 2em;

            span,
            .top-pick-header {
              color: $blue;
              font-weight: bold;
              text-transform: uppercase;
              font-size: 0.875em;
              margin-bottom: 2em;
            }

            .recent-articles {
              list-style: none;
              padding: 0;
              margin: 0;

              li {
                padding: 1em 0;
                border-bottom: 1px solid $gray;

                &:last-child {
                  border: 0;
                }

                a {
                  color: $gray-dark;
                  font-weight: 500;

                  &:hover {
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }

    .green-right-arrow {
      width: 14px;
      margin-left: 0.3em;
      height: 20px;
      path {
        fill: $green;
      }
    }
  }
</style>
