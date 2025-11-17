<template>
  <div class="skeleton-article">
    <div class="skeleton-breadcrumbs">
      <div class="skeleton-breadcrumb-item"></div>
    </div>

    <div class="skeleton-article-content">
      <div class="skeleton-sidebar"></div>

      <div class="skeleton-main">
        <!-- Article Title -->
        <div class="skeleton-title"></div>

        <!-- Article Excerpt/Snippet -->
        <div class="skeleton-excerpt"></div>

        <!-- Author and Date Info -->
        <div class="skeleton-meta">
          <div class="skeleton-author"></div>
          <div class="skeleton-date"></div>
        </div>

        <!-- Cover Image -->
        <div class="skeleton-cover-image"></div>

        <!-- Article Content Lines -->
        <div class="skeleton-content">
          <div class="skeleton-paragraph">
            <div class="skeleton-line full"></div>
            <div class="skeleton-line full"></div>
            <div class="skeleton-line medium"></div>
          </div>

          <div class="skeleton-paragraph">
            <div class="skeleton-line full"></div>
            <div class="skeleton-line full"></div>
            <div class="skeleton-line full"></div>
            <div class="skeleton-line short"></div>
          </div>

          <div class="skeleton-paragraph">
            <div class="skeleton-line full"></div>
            <div class="skeleton-line medium"></div>
          </div>
        </div>

        <!-- Related Articles -->
        <div class="skeleton-related">
          <div class="skeleton-related-item"></div>
          <div class="skeleton-related-item"></div>
          <div class="skeleton-related-item"></div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="skeleton-article-sidebar">
        <div class="skeleton-sidebar-title"></div>
        <div class="skeleton-sidebar-item"></div>
        <div class="skeleton-sidebar-item"></div>
        <div class="skeleton-sidebar-item"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Component logic can go here if needed
</script>

<style lang="scss" scoped>
.skeleton-article {
  width: 100%;

  .skeleton-breadcrumbs {
    background-color: $gray-light;
    padding: 1.5rem 0;
    margin-bottom: 2rem;

    .skeleton-breadcrumb-item {
      height: 16px;
      width: 200px;
      background: linear-gradient(
        90deg,
        $gray-medium 25%,
        $gray-lighter 50%,
        $gray-medium 75%
      );
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
      border-radius: 4px;
      margin: 0 auto;
    }
  }

  .skeleton-article-content {
    display: flex;
    gap: 2rem;

    @include media-breakpoint-down(xs) {
      flex-direction: column;
    }

    .skeleton-sidebar {
      width: 25%;

      @include media-breakpoint-down(md) {
        display: none;
      }
    }

    .skeleton-main {
      flex: 1;
      max-width: 60%;

      @include media-breakpoint-down(xs) {
        max-width: 100%;
      }

      .skeleton-title {
        height: 48px;
        width: 80%;
        background: linear-gradient(
          90deg,
          $gray-medium 25%,
          $gray-lighter 50%,
          $gray-medium 75%
        );
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
        border-radius: 4px;
        margin-bottom: 1.5rem;
      }

      .skeleton-excerpt {
        height: 60px;
        width: 95%;
        background: linear-gradient(
          90deg,
          $gray-medium 25%,
          $gray-lighter 50%,
          $gray-medium 75%
        );
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
        border-radius: 4px;
        margin-bottom: 1.5rem;
      }

      .skeleton-meta {
        display: flex;
        gap: 2rem;
        margin-bottom: 2rem;

        .skeleton-author,
        .skeleton-date {
          height: 20px;
          width: 120px;
          background: linear-gradient(
            90deg,
            $gray-medium 25%,
            $gray-lighter 50%,
            $gray-medium 75%
          );
          background-size: 200% 100%;
          animation: skeleton-loading 1.5s infinite;
          border-radius: 4px;
        }
      }

      .skeleton-cover-image {
        height: 300px;
        width: 100%;
        background: linear-gradient(
          90deg,
          $gray-medium 25%,
          $gray-lighter 50%,
          $gray-medium 75%
        );
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
        border-radius: 8px;
        margin-bottom: 2rem;
      }

      .skeleton-content {
        .skeleton-paragraph {
          margin-bottom: 1.5rem;

          .skeleton-line {
            height: 18px;
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

            &.full {
              width: 100%;
            }
            &.medium {
              width: 75%;
            }
            &.short {
              width: 50%;
            }
          }
        }
      }

      .skeleton-related {
        margin-top: 3rem;

        .skeleton-related-item {
          height: 24px;
          width: 70%;
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
      }
    }

    .skeleton-article-sidebar {
      width: 32%;

      @include media-breakpoint-down(xs) {
        width: 100%;
        margin-top: 2rem;
      }

      .skeleton-sidebar-title {
        height: 20px;
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
        margin-bottom: 1.5rem;
      }

      .skeleton-sidebar-item {
        height: 40px;
        width: 90%;
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
