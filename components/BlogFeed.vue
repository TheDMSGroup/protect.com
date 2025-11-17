<template>
  <div class="blog-feed">
    <div class="container">
      <div class="feed-categories" v-if="showCategories">
        <div class="feed-left">
          <h2>Check out our most popular articles</h2>
        </div>
        <div class="feed-right">
          <div class="category">
            <h4>Top Categories</h4>
            <ul>
              <span v-for="(tag, index) in uniqueArticleTags" :key="index">
                <li>
                  <a
                    class="top-category-tags"
                    :href="`/articles/${tag.urlSlug}`"
                    >{{ tag.name }}</a
                  >
                </li>
              </span>
              <li><router-link to="/articles">View All</router-link></li>
            </ul>
          </div>
          <div class="category">
            <h4>Top Topics</h4>
            <ul>
              <li>
                <router-link to="/insurance/auto-insurance"
                  >Auto Insurance</router-link
                >
              </li>
              <li>
                <router-link to="/insurance/life-insurance"
                  >Life Insurance</router-link
                >
              </li>
              <li>
                <router-link to="/insurance/home-insurance"
                  >Home Insurance</router-link
                >
              </li>
              <li>
                <router-link to="/insurance/pet-insurance"
                  >Pet Insurance</router-link
                >
              </li>
              <li>
                <router-link to="/insurance/burial-insurance"
                  >Burial Insurance</router-link
                >
              </li>
              <li>
                <router-link to="/insurance/health-insurance"
                  >Health Insurance</router-link
                >
              </li>
            </ul>
          </div>
          <!-- commenting out because none of this exists
          <div class="category">
            <h4>Helpful Resources</h4>
            <ul>
              <li><router-link to="/policy-finder">Policy Finder</router-link></li>
              <li><router-link to="/insurance-calculator">Insurance Calculator</router-link></li>
              <li><router-link to="/protect-rate">Protect Rate®</router-link></li>
              <li><router-link to="/reviews">Reviews</router-link></li>
              <li><router-link to="/articles">View All</router-link></li>
            </ul>
          </div> -->
        </div>
      </div>
      <div class="row feed-posts">
        <!-- TO DO: make posts dynamic when possible -->
        <div class="post">
          <blog-feed-item-home
            v-for="article in recentArticles"
            :key="article.urlSlug"
            :urlSlug="article.urlSlug"
            :coverImage="article.coverImage"
            :title="article.title"
            :excerpt="article.excerpt"
          >
          </blog-feed-item-home>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogFeed",
  props: {
    showCategories: { type: Boolean },
    vertical: { type: String },
    subVerticals: { type: Array },
  },
  data() {
    return {
      //articlePath: window.location.pathname,
    };
  },
  watch: {
    $route() {
      //this.articlePath = window.location.pathname;
    },
  },
  computed: {
    uniqueArticleTags() {
      return this.$store.state.recentArticlesData.uniqueArticleTags;
    },
    recentArticles() {
      // const articles = this.$store.getters.getRecentArticlesData();
      // const limitFromConfig = this.$store.state.recentArticlesData.limit;
      // const filteredArticles = articles.filter((article) => this.subVerticals?.includes(article.subvertical));
      // return filteredArticles.filter((article) => !this.articlePath.includes(article.urlSlug)).slice(0, limitFromConfig);
    },
  },
};
</script>

<style lang="scss">
.blog-feed {
  width: 100%;
  text-align: left;

  a:hover {
    text-decoration: none;
  }

  @include media-breakpoint-down(md) {
    padding: 0 1em;
  }

  .feed-categories {
    display: flex;
    padding: 2em 0;
    margin-top: 6em;

    @include media-breakpoint-down(lg) {
      margin-top: 2em;
      padding-bottom: 0;
      flex-wrap: wrap;
    }

    .feed-left {
      width: 42%;
      margin-left: 15px;

      @include media-breakpoint-down(md) {
        width: 100%;
        margin-bottom: 2em;
        margin-left: 0;
      }

      h2 {
        color: $blue-light;
        font-size: 3em;
        line-height: 1.3em;

        @include media-breakpoint-down(sm) {
          font-size: 2.25em;
        }
      }
    }

    .feed-right {
      width: 54%;
      display: flex;
      justify-content: flex-end;

      @include media-breakpoint-down(md) {
        justify-content: flex-start;
        width: 100%;
        flex-wrap: wrap;
      }

      .category {
        width: 33%;
        margin-top: 5px;

        @include media-breakpoint-down(md) {
          margin-bottom: 1.5em;
          margin-top: 0;
        }
        @include media-breakpoint-down(sm) {
          width: 100%;
        }

        a {
          color: $blue;
        }

        h4 {
          color: $gray-dark;
          font-size: 1.9em;
          font-weight: 600;
          margin-bottom: 0.4em;
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;

          li {
            a {
              text-transform: capitalize;
              font-size: 19px;
            }
          }
        }
      }
    }
  }

  .feed-posts {
    display: flex;
    justify-content: space-between;
    padding: 3em 0 10.5em;

    @include media-breakpoint-down(md) {
      flex-wrap: wrap;
      padding: 1em 0;
    }

    .post {
      display: flex;
      flex-wrap: wrap;
      width: 100%;

      @include media-breakpoint-down(md) {
        width: 100%;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
