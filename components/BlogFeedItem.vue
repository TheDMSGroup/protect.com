<script setup>
import { defineProps } from "vue";

const props = defineProps({
  article: Object,
  required: true,
});

const { urlSlug, coverImage, title, excerpt, ...metaData } = props.article;

const imageUrl = coverImage?.url;
</script>

<template lang="html">
  <div class="blog-feed-item col-lg-3 col-md-6 col-sm-12">
    <NuxtLink
      :to="{
        name: 'article-slug',
        params: {
          slug: urlSlug,
          domain: 'protectCom',
          vertical: metaData.vertical,
          subvertical: metaData.subvertical,
        },
      }"
    >
      <div class="col-md-12 article-image">
        <img :src="imageUrl" />
      </div>

      <div class="col-md-12 article-body">
        <h3>{{ title }}</h3>
        <p>{{ excerpt }}</p>

        <p>
          <span class="continue-reading">Continue reading</span>
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<!-- <script>
import blogMixin from '../../mixins/blogMixin';

export default {
  mixins: [blogMixin],
  props: {
    urlSlug: String,
    coverImage: String,
    title: String,
    articleDate: [String, Date],
    excerpt: String,
    author: String,
    tags: Array
  }
};
</script> -->

<style lang="scss" scoped>
.blog-feed-item {
  margin-bottom: 15px;
  padding-right: 15px;
  background: #fff;
  display: block;

  @include media-breakpoint-down(sm) {
    &:nth-child(1n) {
      padding: 1em;
    }

    &:nth-child(4n) {
      padding: 1em;
    }
  }

  &:nth-child(1n) {
    padding-left: 0;

    @include media-breakpoint-down(sm) {
      padding: 1em;
    }
  }

  &:nth-child(4n) {
    padding-right: 0;

    @include media-breakpoint-down(sm) {
      padding: 1em;
    }
  }

  .article-image {
    padding: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    background-color: #ddd;
    height: 200px;

    a {
      padding: 0;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      width: 100%;

      img {
        width: 100%;
        object-fit: cover;
        max-height: 300px;
      }
    }
  }
  .article-body {
    padding: 15px 0;

    h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: $gray-dark;
    }

    p {
      font-size: 1em;
    }

    .continue-reading {
      color: $green;
      border-bottom: 2px solid $green;
    }
  }
}
</style>
