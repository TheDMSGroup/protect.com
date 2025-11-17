<script setup></script>

<template>
  <div class="skeleton-grid">
    <div v-for="n in 6" :key="`skeleton-${n}`" class="skeleton-article-card">
      <div class="skeleton-image"></div>
      <div class="skeleton-content">
        <div class="skeleton-title"></div>
        <div class="skeleton-excerpt line-1"></div>
        <div class="skeleton-excerpt line-2"></div>
        <div class="skeleton-meta"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.skeleton-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;

  .skeleton-article-card {
    flex: 1 1 300px;
    max-width: calc(33.333% - 1rem);
    background: white;
    overflow: hidden;

    @include media-breakpoint-down(md) {
      max-width: calc(50% - 0.75rem);
    }

    @include media-breakpoint-down(sm) {
      max-width: 100%;
    }

    .skeleton-image {
      width: 100%;
      height: 200px;
      background: linear-gradient(
        90deg,
        $gray-medium 25%,
        $gray-lighter 50%,
        $gray-medium 75%
      );
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
    }

    .skeleton-content {
      padding: 1rem;

      .skeleton-title {
        height: 24px;
        background: linear-gradient(
          90deg,
          $gray-medium 25%,
          $gray-lighter 50%,
          $gray-medium 75%
        );
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
        border-radius: 4px;
        margin-bottom: 1rem;
      }

      .skeleton-excerpt {
        height: 16px;
        background: linear-gradient(
          90deg,
          $gray-medium 25%,
          $gray-lighter 50%,
          $gray-medium 75%
        );
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
        border-radius: 4px;
        margin-bottom: 0.5rem;

        &.line-2 {
          width: 80%;
        }
      }

      .skeleton-meta {
        height: 14px;
        width: 60%;
        background: linear-gradient(
          90deg,
          $gray-medium 25%,
          $gray-lighter 50%,
          $gray-medium 75%
        );
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
        border-radius: 4px;
        margin-top: 1rem;
      }
    }
  }
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
