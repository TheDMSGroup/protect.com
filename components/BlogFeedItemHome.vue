<template lang="html">
  <div class="blog-feed-item-home col-lg-3 col-md-6 col-sm-12">
    <div class="article-image">
      <router-link :to="'/article/' + urlSlug">
        <img :src="coverImage">
      </router-link>
    </div>
    <div class="article-body">
      <router-link :to="'/article/' + urlSlug">
        <h3>{{ title }}</h3>
        <p>{{ excerpt }}</p>
      </router-link>
    </div>
    <div class="continue-reading">
        <router-link :to="'/article/' + urlSlug" class="continue-reading-link">
        Continue reading
      </router-link>
    </div>
  </div>
</template>

<script>
import blogMixin from '../mixins/blogMixin';

export default {
  mixins: [blogMixin],
  props: {
    urlSlug: String,
    coverImage: String,
    title: String,
    articleDate: [String, Date],
    excerpt: String,
    author: String,
    tags: Array,
  },
};
</script>

<style lang="scss" scoped>

.blog-feed-item-home {
  margin-bottom: 15px;
  background: #fff;

  @include media-breakpoint-down(md) {
    width: 50%;
    padding-right: 1em;
    margin: 0 0 2em;
  }
  @include media-breakpoint-down(sm) {
    width: 100%;
    padding: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  .article-image {
    padding: 0;
    background-color: #ddd;

    a {
      padding: 0;

      img {
        width: 100%;
        object-fit: cover;
        height: 250px;
      }
    }
  }

  .article-body {
    padding: 2.0em 0 0 0;

    @include media-breakpoint-down(md) {
      height: initial;
    }

    h3 {
      font-size: 1.9rem;
      font-weight: 600;
      margin-bottom: .7em;
      color: $gray-dark;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      min-height: 69px;
    }

    p {
      font-size: 1.3em;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      min-height: 93px;

      @include media-breakpoint-down(md) {
        margin: 0;
      }
    }
  }

  .continue-reading {
    margin-top: 1em;

    @include media-breakpoint-down(md) {
      margin: 0 0 1.5em;
    }

    .continue-reading-link {
      color: $green;
      border-bottom: 2px solid $green;
      padding-bottom: 2px;
      font-weight: 600;

      &:hover {
        text-decoration: none;
        color: $green-darker;
        border-bottom: 2px solid $green-darker;
        padding-bottom: 2px;
      }
    }
  }
}
</style>
