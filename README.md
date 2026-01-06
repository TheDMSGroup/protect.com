<!-- prettier-ignore-start -->

# Protect.com - Nuxt Application

A comprehensive insurance comparison and information platform built with Nuxt 3,
Vue 3, and Bootstrap Vue Next.

## Quick Links

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
  - [`/pages`](#1-pages)
  - [`/components`](#2-components)
  - [`/server`](#3-server)
  - [`/composables`](#4-composables)
  - [`/mixins`](#5-mixins)
- [Styling](#styling)
- [API Integration](#api-integration)
- [Useful Composables](#useful-composables)
  - [buildImageUrl](#buildimageurl-imagesjs)
  - [iconLoader](#iconloader-iconsjs)
  - [redirectWithParams](#redirectwithparams-utilsjs)
- [Code Styling](#code-styling)
- [Development Commands](#development-commands)
- [Contributing](#contributing)
- [Support](#support)



## Tech Stack

- **Framework**: Nuxt 3
- **UI Library**: Bootstrap Vue Next
- **Styling**: SCSS with Bootstrap integration
- **Client-Side State Management**: Pinia
- **Images**: Nuxt Image with optimization
- **Content**: GraphQL API integration via Hygraph CMS

## Prerequisites

- Node.js (v20 or higher recommended)
- npm, pnpm, yarn, or bun package manager

## Getting Started

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/TheDMSGroup/protect.com.git

# Install dependencies
npm install
# or
pnpm install
# or
yarn install
```

### 2. Development Server

Start the development server - defaults to `http://localhost:3000`:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

## Project Structure

Nuxt 3 uses a pages router by default, meaning the folder structure inside the
`/pages` directory defines our routing. Components and re-usable layouts belong
in their respective folders.


### 1. `/pages`

Defines routing and handles high-level page layouts. Keep re-usable
components in [`/components`](components), re-usable layouts in [`/layouts`](layouts), and unique layouts as an `index.vue` file in your directory.

### 2. `/components`

Re-usable layouts and components should be placed here. Name each file with
first letter capitalized, and do not name any files that would conflict with
HTML5 standard elements. Example: a re-usable header component should be named
`AppHeader.vue`. ESLint rules will also warn about conflicting naming
conventions, as well as single-word component names.

Nuxt 3 has auto imports, so we do not need to manually define importsfor files
that are in the `/components` directory. We can simply reference the file like
`<ActionBanner>` or `<action-banner`> and Nuxt 3 will handle the import.

Nested components act similarly, we just need to prefix the component name with
the subdirectory name, for instance `<ArticlesDynamicShell>` will instruct Nuxt
to import `/components/Articles/DynamicShell.vue`.

### 3. `/server`

Place api routes and server middleware here. For client side middleware, see [`/middleware`](middleware)

#### Api Route structure

`/server/api/{context}/{filename}.js` - Prefer to use index.js as filename when possible

#### Middleware Structure
`/server/api/middleware/{filename}.js`

### 4. `/composables`

Vue3 version of mixins. Composables follow a few simple rules. We are working to conform to the recommended styling set forth by the Vue team. 

  1. Each composable should be prefixed with `use`. 
    A composable that returns some formatted text could be called `useTextFormatter`.
  2. Prefer inline composables where possible. This can help organize your composition api code. See an example [here](/pages/article/[slug].vue) (useArticleFromCacheOrApi). Explainer video [here](https://www.youtube.com/watch?v=iKaDFAxzJyw&t=897s).
  3. Any composables that can be re-used throughout the app should be placed in `/composables`

### 5. `/mixins`

⚠️ Deprecated - use [`/composables`](composables) instead

## Styling

The project uses Bootstrap 5 with custom SCSS:

- Variables: [`scss/_variables.scss`](scss/_variables.scss)
- Type: [`scss/type.scss`](scss/type.scss)
- Main styles: [`scss/main.scss`](scss/main.scss)
- Component-specific styles in individual `.vue` files

Prefer to use `scoped` attribute on styles in individual `.vue` files.

## API Integration

You can create and interface with API endpoints defined in `/server/api`. Some endpoints used in this project are: 

- Multiple Articles API:
  [`server/api/articles/index.js`](server/api/articles/index.js)
- Single Article: [`server/api/article/index.js`](server/api/article/index.js)
- Sitemap generation: [`server/api/sitemap/urls.js`](server/api/sitemap/urls.js)

New endpoints should be placed in `/server/api/{context}/index.js`

### Using an endpoint

See [here](/pages/article/[slug].vue) (useArticleFromCacheOrApi). for an example. 
Ensure to follow the pattern defined in `useArticleFromCacheOrApi` as it leverages both our custom api endpoint and Nuxt's built in caching mechanisms. 

Prefer to use API endpoints within your page, rather than a component. See [`pages/article/[slug].vue`](pages/article/[slug].vue)

Sticking point: Your cache key must be unique to each type of API call, or else Nuxt cannot effectively cache your requests. Example: 
```javascript
const cacheKey = `articles-${vertical}-${route.params.slug}`;
// create a cache key like "articles-auto-some-unque-article-slug"
```

The above code will generate a cache key unique to the vertical and article slug, so the next time a user navgiates to `some-unque-article-slug` in the session, the cache can be used rather than another API request. 

## Useful composables

There are a few composables that can be relevant for any new component/page.

  ### buildImageUrl (images.js)
  This composable provides a way to dynamically generate image urls. This is especially useful when image paths or directories frequently change. This gives the developer a way to agnostically include images or icons without needing to know the base path for the assets. Simply call

  ```html
  <template>
      <div>
        <NuxtImg :src='buildImageUrl('your-image-name.jpg')'>
      </div>
  </template>

  <script setup>
    import { buildImageUrl } from "~/composables/images";
  </script>
  ```

  ### iconLoader (icons.js)
  This composable provides a way to dynamically import icons into a file. For example, a form button can have 2 states, where an arrow is shown inside the button by default, and a loading spinner is then shown on form submit. You can leverafe iconLoader to achieve this so we are not loading all icons unless that state is specifically triggered.

  ```html
  <template>
      <button>
        SUBMIT
        <div v-if="iconComponentName" class="button-icon">
          <component :is="iconComponentName" class="choice-icon" :name="iconComponentName" />
        </div>
      </button>
  </template>

  <script setup>
    import { iconLoader } from "~/composables/icons";

    //use vue's reactivity to update the currentIcon based on state, which in turn causes the iconComponentName shallowRef to load the new component on the fly.
    const currentIcon = computed(() => {
    return isSubmitting.value ? 'LoadingIcon' : props.config.icon;
    });

    //use shallowRef here, as iconLoader returns a component and we don't want to wrap the component in reactive ref
    const iconComponentName = shallowRef(iconLoader(currentIcon?.value || null));
  </script>
  ```

### redirectWithParams (utils.js)

Provides a clean way to redirect to other routes within the app, or to an external source.
This function gathers all availible url params, and also appends any data you have provided in a key/value format to the existing url params, then routes accordingly. Do not use for normal mnavigation, only when you find yourself reaching for a solution to passing params around before navigation

  ```html
  <template>
    <!-- External redirect-->
      <form>
        <label for="first_name">First Name</label>
        <input name="first_name" type="text" value="Matt" v-model="firstName"/>
        <button @click.prevent="handleExternalRedirect">
          SUBMIT
        </button>
      </form>
      <!-- App redirect-->
      <form>
        <label for="first_name">First Name</label>
        <input name="first_name" type="text" value="Matt" v-model="appfirstName"/>
        <button @click.prevent="handleAppRedirect">
          SUBMIT
        </button>
      </form>
  </template>

  <script setup>
    import { redirectWithParams } from "@/composables/utils.js";

    const firstName = ref("");
    const appFirstName = ref("");

    const handleExternalRedirect = () => {
      redirectWithParams("insure.protect.com", {
        first_name: firstName.value
      });
      //results in a new tab opening to https://insure.protect.com?first_name=Matt
    }

    const handleAppRedirect = () => {
      const router = useRouter();
      redirectWithParams("/some/route", {
        first_name: firstName.value
      }, router);
      //by passing client-side router, we provide a flag to the function to make a client side redirect to /some/route?first_name=Matt
    }
  </script>
  ```

## Code Styling 

Prefer the following layout for new vue files

```html
  <template>
    ...template code
  </template>

  <script setup>
    // all setup here
  </script>

  <style>
    /* scss code here */
  </style>    
```

Prefer this layout for script setup blocks
```html
  <script setup>
    //imports first
    import { buildImageUrl } from "~/composables/images";

    //props definitions next
    const props = defineProps({
      //props definitions here
    });

    //...other code below
    console.log(props.someProp);
  </script>
```

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate
```

## Contributing

We strive to use semantic branch names as much as possible. 

The basic prefixes for branch naming is defined below, the prefixes should be followed by a concise decsription or task id. 

Example `feature/bundle-page-DSN-1588`

`feature/` - indicates a new feature, page, component, etc.

`bugfix/` - bugfix(es)

`styling/` - updates to code styling

`refactor/` - a refactoring of any scale

`documentation/` - adding/updating docs or function comments

## Support

For development questions or issues, refer to:

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Bootstrap Vue Next Documentation](https://bootstrap-vue-next.github.io/bootstrap-vue-next/)
- [Vue 3 Documentation](https://vuejs.org/)
<!-- prettier-ignore-end -->

