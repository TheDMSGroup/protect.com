# Project Notes for Claude

## Project Goals

- **Mobile first** - Most traffic is mobile; design and test mobile experience first
- **SSR first** - Maximize server-side rendering for SEO and performance
- **Aggressive caching** - Use CDN and browser caching where possible
- **Accessibility** - Target high Lighthouse accessibility scores (WCAG compliance)

## Tech Stack

- Nuxt 3 (Vue 3)
- Pinia for state management
- Bootstrap Vue Next
- SCSS for styling

## Adding New Routes Under `/car-insurance/`

When creating new pages under `/car-insurance/` that are NOT state pages (like `/car-insurance/california`), you must add the route name to the `carInsuranceSubRoutes` array in `utils/redirect-config.js`.

Otherwise, the redirect middleware will treat the path as an invalid state and redirect to `/car-insurance`.

Example:
```js
// utils/redirect-config.js
export const carInsuranceSubRoutes = ["rate-calculator", "chat-form", "mystate", "rates-by-vehicle", "discounts", "directtocall"];
```

## Layouts

- `layouts/default.vue` - Standard layout with header and footer
- `layouts/chatbot.vue` - Minimal layout with footer only (no header/nav), used for chatbot-style pages

## Middleware

Located in `middleware/`:

- `persist-url-params.global.js` - Persists URL parameters across navigation
- `referrer-detection.global.js` - Detects and stores referrer information
- `client-redirects.js` - Client-side redirect handling
- `city-validation.js` - Validates city/state params for `/car-insurance/[state]/[city]` routes

Redirect logic is centralized in `utils/redirect-config.js` which handles:
- State code to slug redirects (e.g., `/car-insurance/CA` → `/car-insurance/california`)
- Invalid state validation
- Legacy path redirects

## Caching (Production Only)

Configured in `nuxt.config.ts` under `routeRules`:

- `/_nuxt/**`, `/img/**`, `/assets/**`, `/fonts/**` - 1 year immutable cache
- `/api/**` - No cache
- `/**` (HTML pages) - 1 hour browser cache, 24 hour CDN cache with stale-while-revalidate

## API & Data

- Vehicle data (makes/models/years): `composables/useVehicleApi.js` - fetches from Google Sheets
- Lead submission: `composables/useMastodonApi.js` - submits to Mastodon API
- State data: `data/cities.js` and `utils/redirect-config.js`

## Runtime Config

Environment variables configured in `nuxt.config.ts` under `runtimeConfig`:
- `mastodonApiKey` - API key for lead submission
- `googleSheetsApiKey` - For vehicle data
- Various spreadsheet IDs for data sources
