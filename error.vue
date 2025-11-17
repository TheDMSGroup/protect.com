<script setup>
  import { clearError } from "#app/composables/error";
  import { useStore } from "@/stores/store.js";

  const store = useStore();
  const assetsBaseUrl = store.assetsBaseUrl;

  // Get the error object from Nuxt
  const props = defineProps({
    error: {
      type: Object,
      default: () => ({ statusCode: 404 }),
    },
  });

  // Set page meta for SEO
  useHead({
    title: `${props.error.statusCode || 404} - ${getErrorTitle()} | Protect.com`,
    meta: [
      {
        name: "description",
        content: getErrorMessage(),
      },
      { name: "robots", content: "noindex" },
    ],
  });

  function getErrorTitle() {
    const statusCode = props.error.statusCode || 404;
    switch (statusCode) {
      case 404:
        return "Page Not Found";
      case 500:
        return "Server Error";
      case 403:
        return "Access Forbidden";
      default:
        return "Something went wrong";
    }
  }

  function getErrorMessage() {
    const statusCode = props.error.statusCode || 404;
    switch (statusCode) {
      case 404:
        return "Oops! The page you're looking for seems to have wandered off. Don't worry though - we'll help you find what you need.";
      case 500:
        return "We're experiencing some technical difficulties. Our team has been notified and is working to fix this issue.";
      case 403:
        return "You don't have permission to access this page. Please check your credentials or contact support.";
      default:
        return "Something unexpected happened. Please try again or contact support if the problem persists.";
    }
  }

  // Clear error function to be called by user actions
  const handleClearError = (redirectPath = "/") => {
    clearError({ redirect: redirectPath });
  };
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="logo p-4">
        <a style="cursor: pointer" @click="handleClearError()">
          <NuxtImg :src="`${assetsBaseUrl}/protect_logo.svg`" alt="Protect.com Logo" width="150" />
        </a>
      </div>
    </div>
    <div class="error-page">
      <div class="error-container">
        <div class="error-content">
          <!-- Large error code display -->
          <h1 class="error-code-display">
            {{ error.statusCode || 404 }}
          </h1>

          <!-- Error title -->
          <h1 class="error-title">{{ getErrorTitle() }}</h1>

          <!-- Error message -->
          <p class="error-message">{{ getErrorMessage() }}</p>

          <!-- Main action buttons -->
          <div class="error-actions">
            <button class="btn btn-primary btn-lg" @click="handleClearError('/')">
              <i class="fas fa-home button-icon" />
              <span class="button-label">Back to Home</span>
            </button>
            <button class="btn btn-outline-primary btn-lg" @click="handleClearError('/car-insurance')">
              <i class="fas fa-car button-icon" />
              <span class="button-label">Find Car Insurance</span>
            </button>
          </div>

          <!-- Quick navigation links for 404 errors -->
          <div v-if="error.statusCode === 404" class="helpful-links">
            <p class="helper-text">Or explore these popular sections:</p>
            <div class="quick-links">
              <button class="quick-link" @click="handleClearError('/articles')">
                <i class="fas fa-newspaper" />
                Articles
              </button>
              <button class="quick-link" @click="handleClearError('/health-insurance')">
                <i class="fas fa-heart" />
                Health Insurance
              </button>
              <button class="quick-link" @click="handleClearError('/home-insurance')">
                <i class="fas fa-home" />
                Home Insurance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .error-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, $gray-blue-light 0%, $gray-lighter 100%);
    padding: 2rem;
    font-family: "Nunito Sans", sans-serif;
  }

  .error-container {
    width: 100%;
    margin: 0 auto;
  }

  .error-content {
    background: $white;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    padding: 4rem 3rem;
    text-align: center;

    @include media-breakpoint-down(md) {
      padding: 3rem 2rem;
    }
  }

  .error-code-display {
    font-size: 8rem;
    font-weight: 900;
    color: $green;
    margin-bottom: 1rem;
    line-height: 1;
    text-shadow: 0 4px 8px rgba($green, 0.2);

    @include media-breakpoint-down(md) {
      font-size: 6rem;
    }

    @include media-breakpoint-down(sm) {
      font-size: 4rem;
    }
  }

  .error-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: $blue;
    margin-bottom: 1.5rem;

    @include media-breakpoint-down(md) {
      font-size: 2rem;
    }

    @include media-breakpoint-down(sm) {
      font-size: 1.75rem;
    }
  }

  .error-message {
    font-size: 1.25rem;
    color: $gray-dark;
    margin-bottom: 3rem;
    line-height: 1.6;

    @include media-breakpoint-down(md) {
      font-size: 1.1rem;
      margin-bottom: 2.5rem;
    }
  }

  .error-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 3rem;

    @include media-breakpoint-down(md) {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 1rem 2rem;
      font-weight: 600;
      font-size: 1rem;
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.3s ease;
      min-width: 180px;
      border-width: 2px;

      @include media-breakpoint-down(md) {
        width: 100%;
        max-width: 280px;
      }

      .button-icon {
        font-size: 1.1rem;
      }

      .button-label {
        font-weight: 600;
      }

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        text-decoration: none;
      }

      &:active {
        transform: translateY(0);
      }
    }

    // Primary button styling to match your site
    .btn-primary {
      background-color: $blue;
      border-color: $blue;
      color: $white;

      &:hover {
        background-color: lighten($blue, 10%);
        border-color: lighten($blue, 10%);
        color: $white;
      }
    }

    // Outline primary button styling to match your site
    .btn-outline-primary {
      background-color: transparent;
      border-color: $blue;
      color: $blue;

      &:hover {
        background-color: $blue;
        border-color: $blue;
        color: $white;
      }
    }
  }

  .helpful-links {
    border-top: 2px solid $gray-light;
    padding-top: 2.5rem;

    .helper-text {
      color: $gray-dark;
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
      font-weight: 600;
    }
  }

  .quick-links {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;

    @include media-breakpoint-down(md) {
      flex-direction: column;
      align-items: center;
    }
  }

  .quick-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    color: $green;
    text-decoration: none;
    font-weight: 600;
    border: 2px solid $green;
    border-radius: 50px;
    transition: all 0.3s ease;
    font-size: 0.95rem;

    &:hover {
      background-color: $green;
      color: $white;
      text-decoration: none;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba($green, 0.3);
    }

    i {
      font-size: 0.9rem;
    }

    @include media-breakpoint-down(md) {
      width: 220px;
      justify-content: center;
    }
  }

  // Animation for the error code
  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  .error-code-display {
    animation: bounce 2s ease-in-out infinite;
  }

  // Responsive enhancements
  @include media-breakpoint-down(sm) {
    .error-page {
      padding: 1rem;
    }

    .error-content {
      border-radius: 12px;
      padding: 2.5rem 1.5rem;
    }
  }
</style>
