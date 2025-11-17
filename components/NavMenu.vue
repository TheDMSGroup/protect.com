<template>
  <div class="nav-menu-wrapper">
    <SearchOverlay :id="'mobileSearchMenu'" v-if="showSearch" :toggleSearch="toggleSearch" />
    <div class="nav-menu" v-if="showNavInner" >
      <div class="container nav-container">
        <div class="nav-items" v-if="links.length > 0">
          <div class="nav-item" v-for="link in links" :key="link.label">
            <h6><a @click="go(link.to)">{{ link.label }}</a></h6>
            <ul class="nav-column" v-if="link && link.subLinks && link.subLinks.length > 0">
              <li v-for="subLink in link.subLinks" :key="subLink.label">
                <a @click="go(subLink.to)">{{ subLink.label }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="latest-articles">
          <h6><a @click="go('/articles/')">Latest Articles</a></h6>
          <ul class="nav-column">
            <li
            v-for="article in recentArticles"
            :key="article.urlSlug">
              <a @click="go('/article/' + article.urlSlug + '/')">{{ article.title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="nav-overlay" @mouseenter="closeMenu"></div>
  </div>
</template>

<script>
import SearchOverlay from './SearchOverlay.vue';

export default {
  name: 'NavMenu',
  components: {
    SearchOverlay,
  },
  props: {
    closeMenu: { type: Function },
    go: { type: Function },
    showSearch: { type: Boolean },
    toggleSearch: { type: Function },
    showNavInner: { type: Boolean },
    links: { type: Array },
  },
  data() {
    return {
      articlePath: window.location.pathname,
    };
  },
  watch: {
    $route() {
      this.articlePath = window.location.pathname;
    },
  },
  methods: {
    goToAction() {
      if (this.action.includes('#')) {
        const element = document.querySelector(this.action);
        element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
      } else {
        this.$router.push(this.action);
      }
    },
    headerColumnWidth(headerLength) {
      return headerLength - 1 === 3 ? 6 : 4;
    },
  },
  computed: {
    recentArticles() {
      const articles = this.$store.getters.getRecentArticlesData();
      const limitFromConfig = this.$store.state.recentArticlesData.limit;
      return articles.filter((article) => !this.articlePath.includes(article.urlSlug)).slice(0, limitFromConfig);
    },
  },
};

</script>

<style scoped lang="scss">

.nav-menu-wrapper {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 101;
  a {
    cursor: pointer;

    &:hover {
      color: inherit !important;
    }
  }

  &.fade-simple-enter-active .nav-menu, &.fade-simple-leave-active .nav-menu {
    transition: opacity 0.25s ease-out;
  }

  &.fade-simple-enter .nav-menu, &.fade-simple-leave-to .nav-menu {
    opacity: 0;
  }

  // See transform and margin-top on nav-menu
  &.fade-enter-active .nav-menu, &.fade-leave-active .nav-menu {
    transition-timing-function: ease-in;
    transition: 0.2s;
    transform: translateY(4%);
  }

  &.fade-enter .nav-menu, &.fade-leave-to .nav-menu {
    opacity: 0;
    transition-timing-function: ease-out;
    transition: 0.4s;
    transform: translateY(0);
  }

  .nav-menu {
    transform: translateY(4%); // for the fade transition
    margin-top: -10px; // for the fade transition
    background-color: $white;
    width: 100%;
    min-height: 200px;
    overflow: hidden;
    padding-bottom: 15px;
    z-index: 1;
    box-shadow: 0 9px 13px -8px rgba(0,0,0,0.05);

    .nav-container {
      display: flex;

      .nav-items {
        display: flex;
        width: 69%;
        justify-content: space-between;
        padding-right: 2em;

        .nav-item {
          border-left: 1px solid #cccccc;
          padding-left: 2em;

          &:first-child {
            border-left: none;
            padding-left: 0;
          }

          h6 {
            font-weight: 600;
            color: $blue;
          }

          ul {
            padding: 0;
            margin: 0;
            list-style: none;
          }
        }
      }

      .latest-articles {
        width: 31%;
        border-left: 1px solid lighten($color: $gray-dark, $amount: 40);
        margin-left: 2em;
        padding-left: 2em;

        h6 {
          font-weight: 600;
          color: $blue;
        }

        ul {
          padding: 0;
          margin: 0;
          list-style: none;
        }
      }
    }
  }

  .nav-overlay {
    width: 100%;
    height: 100vh;
    z-index: -1;
    position: absolute;
    background-color: transparent;
  }
}
</style>
