<template>
  <nav class="navigation">
    <div class="container">
      <div class="nav-content">
        <router-link to="/" class="nav-logo">
          <h2>Protect.com</h2>
        </router-link>

        <div class="nav-links" :class="{ 'nav-links-mobile': isMobileMenuOpen }">
          <router-link to="/car-insurance" class="nav-link">Car Insurance</router-link>
          <router-link to="/home-insurance" class="nav-link">Home Insurance</router-link>
          <router-link to="/compare" class="nav-link">Compare Quotes</router-link>
        </div>

        <div class="nav-actions">
          <button @click="toggleTheme" class="theme-toggle" :title="themeLabel">
            <i :class="themeIcon"></i>
          </button>
          <a href="#quote" class="btn btn-primary">Get Quote</a>
          <button
            class="mobile-menu-toggle"
            @click="toggleMobileMenu"
            aria-label="Toggle mobile menu"
          >
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      isMobileMenuOpen: false,
      isDarkMode: false,
    };
  },
  computed: {
    themeIcon() {
      return this.isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    },
    themeLabel() {
      return this.isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';
    },
  },
  mounted() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.isDarkMode = true;
    }
    this.applyTheme();
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      this.applyTheme();
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    },
    applyTheme() {
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark-theme');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navigation {
  background: var(--background-color);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 1000;

  .nav-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
  }

  .nav-logo {
    text-decoration: none;
    color: var(--primary-color);

    h2 {
      margin: 0;
      font-weight: 700;
    }
  }

  .nav-links {
    display: flex;
    gap: var(--spacing-lg);

    // @include mobile {
    //   display: none;
    //   position: absolute;
    //   top: 100%;
    //   left: 0;
    //   right: 0;
    //   background: var(--background-color);
    //   border-bottom: 1px solid var(--border-color);
    //   flex-direction: column;
    //   padding: var(--spacing-md);
    //   gap: var(--spacing-sm);

    //   &.nav-links-mobile {
    //     display: flex;
    //   }
    // }
  }

  .nav-link {
    text-decoration: none;
    color: var(--text-secondary);
    font-weight: 500;
    transition: color 0.2s ease;

    &:hover, &.router-link-active {
      color: var(--primary-color);
    }
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);

    .theme-toggle {
      background: var(--surface-color);
      border: 2px solid var(--border-color);
      font-size: 1.25rem;
      color: var(--text-primary);
      cursor: pointer;
      padding: var(--spacing-sm);
      border-radius: var(--radius-md);
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;

      &:hover {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
        transform: scale(1.05);
      }

      i {
        transition: transform 0.3s ease;
      }

      &:hover i {
        transform: rotate(20deg);
      }
    }

    .mobile-menu-toggle {
      display: none;
      background: none;
      border: none;
      font-size: 1.25rem;
      color: var(--text-primary);
      cursor: pointer;

      // @include mobile {
      //   display: block;
      // }
    }
  }
}
</style>
