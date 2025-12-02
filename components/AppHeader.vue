<template>
  <header class="header" :class="{ drawerActive: menuIsVisible }">
    <div class="container">
      <div class="row">
        <div class="header-inner">
          <div class="left-header">
            <!-- @click="showNavMenuMobile = !showNavMenuMobile" -->
            <div
            id="menu-button"
            class="d-block d-lg-none"
            v-if="!showNavSearchHeaderMobile"
            >
              <svg
                v-if="!showNavMenuMobile"
                @click="toggleMobileMenu"
                xmlns="http://www.w3.org/2000/svg" width="30" height="15" viewBox="0 0 30 15"
              >
                <g transform="translate(-49.744 -579)">
                  <rect width="26.923" height="1.5" rx="0.75" transform="translate(52.821 579)" fill="#0c2c67"/>
                  <rect width="30" height="1.5" rx="0.75" transform="translate(49.744 585.75)" fill="#0c2c67"/>
                  <rect width="19.231" height="1.5" rx="0.75" transform="translate(60.513 592.5)" fill="#0c2c67"/>
                </g>
              </svg>
              <svg
                v-else-if="showNavSearchHeaderMobile"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 35.65 35.65"
                class="close-icon"
                @click="toggleSearch">
                <g>
                  <g id="icons">
                    <polygon class="cls-1"
                      points="35.65 2.53 33.12 0 17.82 15.29 2.53 0 0 2.53 15.29 17.82 0
                      33.12 2.53 35.65 17.82 20.35 33.12 35.65 35.65 33.12 20.35 17.82 35.65 2.53"
                      />
                      </g>
                  </g>
              </svg>
              <svg
                v-else width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8
                7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647
                2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </div>
            <svg
              v-if="showNavSearchHeaderMobile"
              @click="toggleSearch"
              width="2em" height="2em" viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8
              7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647
              2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
              <div v-if="showNavMenuMobile || showNavSearchHeaderMobile" id="logo-mobile-menu-open">
              <a @click="go('/')">
                <!-- <protect-shield /> -->
              </a>
            </div>
          </div>
          <div class="logo">
            <NuxtLink to="/">
              <img src="../public/assets/protect_logo.svg" alt="protect logo" srcset="" />
            </NuxtLink>
          </div>
          <div id="spacer"></div> <!-- This is just temp -->
          <div class="right-header">
            <nav class="d-none d-lg-block navigation" :class="{ 'show-mobs': showNavMenuMobile }">
              <ul>
                <li v-for="link in navLinks" :key="link.label">
                  <a @click="go(link.to)">
                    {{ link.label }}
                  </a>
                </li>
              </ul>
            </nav>
            <!-- <img
              v-if="!showNavMenuMobile && !showNavSearchHeaderMobile"
              class="icon show-search"
              alt="Search"
              src="../assets/gray-search.svg"
              @mouseenter="mouseOverMenu"
              @click="toggleSearch"> -->
            <!--
              <b-buttons class="d-none d-lg-block login " :config="{size: 'md', variant: 'outline-primary', label:'Join or Login'}"></b-buttons>
            -->
            <div class="d-none d-lg-none">
              <span v-if="showNavMenuMobile || showNavSearchHeaderMobile">
                <a @click="go('/join/')" class="mobile-menu-open-button"><button>Join</button></a>
                <a @click="go('/login/')" class="mobile-menu-open-button"><button>Login</button></a>
              </span>

              <svg v-else xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 19 19">
                <g transform="translate(-516.724 -178.989)">
                  <path d="M532.945,181.773a9.513,9.513,0,1,0,2.779,6.719A9.439,9.439,0,0,0,532.945,181.773Zm-6.719,
                  15.222a8.448,8.448,0,0,1-6.015-2.488c-.1-.1-.2-.218-.3-.328a1.442,1.442,0,0,1,
                  .882-1.082l3.315-1.308-.348-.882-3.315,1.308a2.386,2.386,0,0,0-1.228,1.1,8.505,8.505,0,1,1,14,
                  .013,2.392,2.392,0,0,0-1.234-1.109l-3.315-1.307-.348.882,3.314,1.308a1.442,1.442,0,0,1,.886,
                  1.1c-.094.1-.182.212-.282.312A8.45,8.45,0,0,1,526.226,196.995Z" fill="#66c296"/>
                  <path d="M528.647,183.715a3.647,3.647,0,0,0-4.861-.016,4.316,4.316,0,0,0-.78,3.407c.237,
                  2.428,1.491,4,3.195,4s2.923-1.53,3.195-3.991A4.25,4.25,0,0,0,528.647,183.715Zm-.2,3.293c-.214,
                  1.941-1.077,3.146-2.251,3.146s-2.064-1.233-2.25-3.14a3.456,3.456,0,0,1,.537-2.678,2.732,2.732,
                  0,0,1,3.453.012A3.4,3.4,0,0,1,528.451,187.008Z" fill="#66c296"/></g></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <aside class="drawer-nav">
      <nav>
        <div class="mobile-drawer-header">
          <svg
            @click="toggleMobileMenu"
            width="2em" height="2em" viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8
            7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647
            2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
          <NuxtLink to="/" @click="toggleMobileMenu" class="mobile-drawer-logo">
            <IconsProtectShield/>
          </NuxtLink>
        </div>
        <div v-for="link in navLinks" :key="link.label" class="item">
          <button @click="goMobile(link.to)" class="next-level">
            <span class="title">{{ link.label }}</span>
          </button>
        </div>
      </nav>
    </aside>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

defineProps({
  header: { type: Object, default: null },
});

const route = useRoute();
const router = useRouter();

// Reactive state
const showNavMenuMobile = ref(false);
const showNavSearchHeaderMobile = ref(false);
const menuIsVisible = ref(false);
const isMobile = ref(false);

// Navigation config - single source for both mobile and desktop
const navLinks = [
  { to: '/car-insurance/', label: 'Car Insurance' },
  { to: '/health-insurance/', label: 'Health Insurance' },
  { to: '/home-insurance/', label: 'Home Insurance' },
  { to: '/car-insurance/rate-calculator', label: 'Rate Calculator' },
  { to: '/articles/', label: 'Articles' },
];

// Methods
const onResize = () => {
  isMobile.value = window.innerWidth < 992;
  if (!isMobile.value) {
    showNavMenuMobile.value = false;
  }
};

const toggleMobileMenu = () => {
  menuIsVisible.value = !menuIsVisible.value;
};

const go = (path) => {
  if (route.path !== path) {
    router.push(path);
  }
  showNavMenuMobile.value = false;
};

const goMobile = (path) => {
  go(path);
  toggleMobileMenu();
};

// Lifecycle hooks
onMounted(() => {
  onResize();
  window.addEventListener('resize', onResize, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize, { passive: true });
});
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
  transform: translateX(100deg) 1s ease-in;
}
.rotate-point-up {
  transform: rotate(180deg);
}
.rotate-point-right {
  transform: rotate(-90deg);
}
#nav-mobile-login-button button {
  border: 2px solid $green;
  width: 90%;
  margin: 0 auto;
  font-weight: bold;
  font-size: 14px;
}
#nav-mobile-search {
  width: 90%;
  margin: 20px auto;
  .input-group {
    height: 50px;
    input {
      height: 50px;
      font-size: 12px;
    }
    .input-group-text.indicator {
      cursor: pointer;
      .elixr-icon {
        width: 20px;
        max-height: 25px;
      }
    }
  }
}

svg.elixr-icon.protect-shield {
  padding-top: 5px;
  width: 20px;
  max-height: 25px;
}
#logo-mobile-menu-open {
  border: none;
  background: none;

}
#menu-button {
  cursor: pointer;
  border: none;
  background: none;
  margin-left: 10px;
}
#sidebar-no-header {
  top: 72px;
  width: 500px;
}
.nav-link-sub, .nav-link-main {
  font-family: 'Nunito Sans', sans-serif;
  height: 40px;
  cursor: pointer;
  border-right: none;
  border-left: none;
}
.mobile-nav {
  .list-group {
    border-radius: 0;

    .list-group-item {
      border-right: 0;
    }
  }
  .list-group:not(:last-child) .nav-link-main {
    border-bottom: unset;
  }
}
.mobile-menu-open-button button {
  border: none;
  background: none;
  color: #66C296;
}
.collapse {
  border-top: 1px solid rgba($black, .1);
}
.nav-link-main {
  color: #0C2C67;
  font-weight: bold;
}
.nav-link-sub {
  background: #F4F8F8 !important;
}
.elixr-icon {
  // height: 100%;
  width: 10px;
  max-height: 60%;
}
.header {
  margin: 10px auto 0px;
  background-color: $white;
  z-index: 999;
  // box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.05);
  border-bottom: 1px solid #F1F1F1;

  a {
    cursor: pointer;
    color: #0C2C67;

    &:hover {
      color: #040f22;
      text-decoration: underline;
    }
  }

  .container {
    margin: auto;

    @include media-breakpoint-down(lg) {
      max-width: 100%;
    }
  }
}

.header-inner {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 10px auto;
  padding: 0 15px;

  @include media-breakpoint-between(lg, xxl) {
    margin: auto;
  }

  @include media-breakpoint-down(md) {
    height: 32px;
    padding: 0;
  }
  .logo {
    display: flex;
    align-items: center;
    //margin-left: 10px;
    margin-right: 15px;
    a {
      width: 115px;

      img {
        max-width: 115px;
      }
    }
    @include media-breakpoint-between(lg, xxl) {
      a {
        width: 174px;

        img {
          max-width: 174px;
        }
      }
    }
  }
  #spacer {
    flex-grow: 1;
  }
  .left-header {
    align-items: left;
    justify-content: flex-start;
    display: none;

    @include media-breakpoint-down(lg) {
      display: flex;
    }
  }
  .right-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    @include media-breakpoint-up(lg) {
      min-width: 685px;
    }

    @include media-breakpoint-down(md) {
      min-width: 40px;
    }

    .navigation {
      ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        padding: 0;
        margin: 0;

        li {
          padding: 15px;

          a {
            color: $gray-dark;
            font-weight: 500;
            font-size: 16px;

            &:hover {
              color: $blue !important;
              text-decoration: none;
            };
          }
        }
      }
    }

    .icon {
      width: 100%;
      max-width: 23px;
      margin: 0 1em 0 0;
      cursor: pointer;
    }

    .login {
      margin-left: 1.5em;

      button {
        font-weight: 600;
        font-size: 0.875em;
      }
    }
  }
}

.show-mobs {
  display: block;
  @include media-breakpoint-between(lg, xxl) {
    display: none;
  }
}
#spacer {
  display: none;
  @include media-breakpoint-between(lg, xxl) {
    display: block;
  }
}

aside.drawer-nav {
  transition: 0.6s all;
  max-width: 768px;
  background: #fff;
  position: fixed;
  height: 100vh;
  transform: translateX(-100%);
  overflow: hidden;
  overflow-y: auto;
  z-index: -9999;
  width: 100%;
  top: 0;
  left: 0;

  .mobile-drawer-header {
    display: flex;
    padding: 1em;

    svg {
      margin-right: 0.5em;
      cursor: pointer;
    }
  }

  nav {
    display: flex;
    flex-direction: column;
  }

  .mobile-menu-hamburger {
    cursor: pointer;
  }

  .item {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #efefef;
    font-weight: 600;
    height: 46px;
    overflow-x: hidden;

    &:last-child {
      border-bottom: 1px solid #efefef;
    }

    .next-level {
      background-color: $white;
      outline: none;
      border: 0;
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.6em 1em;

      .right-arrow {
        width: 8px;
        fill: $blue;
      }
    }
  }
}

.drawerActive {
  .drawer-nav {
    transform: translateX(0);
    z-index: 9999;
    box-shadow: $box-shadow;
  }
}
#searchOverLayMobile {
  .search-box {
    padding-bottom: 1em;
    .search-container .search-input-container {
      padding-bottom: 0;
      border: none;
      .input-and-button .inputs-wrapper .input-group{
        height: 50px;
        input {
          height: 100%;
          padding: 0 10px;
        }
        .input-group-append {
          height: 50px;
          .input-group-text.indicator svg{
            height: 25px;
          }
        }
      }
    }
  }
}
div#searchOverLayMobile {
  .container.search-container.collapsed {
    height: 50px;
  }
  .results.hidden {
    visibility: hidden;
    height: 0;
  }
}

header {
  position: sticky;
  top: 0;
}
</style>
