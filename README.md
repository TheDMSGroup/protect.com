# Protect.com - Nuxt Application

A comprehensive insurance comparison and information platform built with Nuxt 3, Vue 3, and Bootstrap Vue Next.

## Features

- **Insurance Content Management**: Articles, comparisons, and educational content
- **Interactive Tools**: Rate calculators, quote forms, and comparison tools
- **Responsive Design**: Mobile-first approach with Bootstrap integration
- **SEO Optimized**: Built-in sitemap generation and meta management
- **Component Library**: Reusable UI components for consistent design

## Tech Stack

- **Framework**: Nuxt 3
- **UI Library**: Bootstrap Vue Next
- **Styling**: SCSS with Bootstrap integration
- **State Management**: Pinia
- **Images**: Nuxt Image with optimization
- **Content**: GraphQL API integration via Hygraph CMS

## Prerequisites

- Node.js (v20 or higher recommended)
- npm, pnpm, yarn, or bun package manager

## Getting Started

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd protect-nuxt

# Install dependencies
npm install
# or
pnpm install
# or
yarn install
```

### 2. Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

## Project Structure

```
├── components/          # Vue components
│   ├── Article.vue     # Article display component
│   ├── Header.vue      # Site header
│   ├── Footer.vue      # Site footer
│   └── ...
├── pages/              # File-based routing
│   ├── articles/       # Article pages
│   ├── car-insurance/  # Insurance category pages
│   └── ...
├── layouts/            # Layout templates
├── stores/             # Pinia state management
├── scss/               # Global styles and variables
├── server/             # Server-side API routes
└── public/             # Static assets
```

## Key Components

- **Article System**: Dynamic article rendering with SEO optimization
- **Rate Calculators**: Interactive insurance rate estimation tools
- **Quote Forms**: Lead generation forms with zip code validation
- **Testimonials**: Customer testimonial displays
- **FAQ Components**: Structured data for search engines

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

## Styling

The project uses Bootstrap 5 with custom SCSS:

- Variables: [`scss/_variables.scss`](scss/_variables.scss)
- Type: [`scss/type.scss`](scss/type.scss)
- Main styles: [`scss/main.scss`](scss/main.scss)
- Component-specific styles in individual `.vue` files

## API Integration

The application fetches content from Hygraph CMS via GraphQL:

- Articles API: [`server/api/articles/index.js`](server/api/articles/index.js)
- Single Article: [`server/api/article/index.js`](server/api/article/index.js)
- Sitemap generation: [`server/api/sitemap/urls.js`](server/api/sitemap/urls.js)

## Support

For development questions or issues, refer to:

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Bootstrap Vue Next Documentation](https://bootstrap-vue-next.github.io/bootstrap-vue-next/)
- [Vue 3 Documentation](https://vuejs.org/)
