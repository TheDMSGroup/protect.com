<template>
  <div class="no-articles-wrapper">
    <div class="no-articles-content">
      <div class="no-articles-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10,9 9,9 8,9" />
        </svg>
      </div>

      <h3 class="no-articles-title">{{ title }}</h3>
      <p class="no-articles-message">{{ dynamicMessage }}</p>

      <div v-if="showSuggestions" class="no-articles-suggestions">
        <h4>You might be interested in:</h4>
        <ul>
          <li><NuxtLink to="/articles/insurance">All Insurance Articles</NuxtLink></li>
          <li><NuxtLink to="/articles/insurance/health-insurance">Health Insurance</NuxtLink></li>
          <li><NuxtLink to="/articles/insurance/home-insurance">Home Insurance</NuxtLink></li>
          <li><NuxtLink to="/articles/insurance/auto-insurance">Car Insurance</NuxtLink></li>
        </ul>
      </div>

      <div class="no-articles-actions">
        <NuxtLink :to="backLink" class="btn btn-primary">
          {{ backText }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    title: {
      type: String,
      default: "No Articles Found",
    },
    message: {
      type: String,
      default: "We couldn't find any articles matching your search criteria.",
    },
    category: {
      type: String,
      default: "",
    },
    subcategory: {
      type: String,
      default: "",
    },
    showSuggestions: {
      type: Boolean,
      default: true,
    },
    backLink: {
      type: String,
      default: "/articles",
    },
    backText: {
      type: String,
      default: "Browse All Articles",
    },
  });

  // Generate dynamic message based on props
  const dynamicMessage = computed(() => {
    if (props.subcategory && props.category) {
      return `We couldn't find any ${props.subcategory} articles in ${props.category}. Try exploring other topics or browse all our articles.`;
    } else if (props.category) {
      return `We couldn't find any ${props.category} articles. Try exploring other topics or browse all our articles.`;
    }
    return props.message;
  });
</script>

<style lang="scss" scoped>
  .no-articles-wrapper {
    background-color: $white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin: 2rem 0;
    padding: 3rem 2rem;
    text-align: center;

    @include media-breakpoint-down(sm) {
      margin: 1rem;
      padding: 2rem 1rem;
    }
  }

  .no-articles-content {
    max-width: 500px;
    margin: 0 auto;
  }

  .no-articles-icon {
    margin-bottom: 1.5rem;

    svg {
      width: 64px;
      height: 64px;
      color: $blue-light;
      opacity: 0.7;
    }
  }

  .no-articles-title {
    color: $blue-light;
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 1rem;

    @include media-breakpoint-down(sm) {
      font-size: 1.5rem;
    }
  }

  .no-articles-message {
    color: $gray-dark;
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;

    @include media-breakpoint-down(sm) {
      font-size: 1rem;
    }
  }

  .no-articles-suggestions {
    background-color: $gray-light;
    border-radius: 6px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    text-align: left;

    h4 {
      color: $blue;
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-bottom: 0.5rem;

        &:last-child {
          margin-bottom: 0;
        }

        a {
          color: $blue-light;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;

          &:hover {
            color: $blue;
            text-decoration: underline;
          }

          &::before {
            content: "→";
            margin-right: 0.5rem;
            color: $green;
          }
        }
      }
    }
  }

  .no-articles-actions {
    .btn {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background-color: $blue-light;
      color: $white;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 600;
      transition: all 0.2s ease;

      &:hover {
        background-color: $blue;
        color: $white;
        text-decoration: none;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba($blue-light, 0.3);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }

  // Responsive adjustments
  @include media-breakpoint-down(xs) {
    .no-articles-wrapper {
      border-radius: 0;
      margin: 0;
    }

    .no-articles-suggestions {
      text-align: center;

      ul li a::before {
        display: none;
      }
    }
  }
</style>
