// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/sitemap", "@bootstrap-vue-next/nuxt", "@nuxt/image", "@pinia/nuxt", "@nuxt/eslint", "@nuxt/scripts"],
  features: {
    inlineStyles: true,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      viewport: "width=device-width, initial-scale=1",
      charset: "utf-8",
      title: "Compare Insurance Quotes For Auto, Home & Health | Protect.com",
      meta: [
        {
          name: "description",
          content: "Compare car, home, renters, and health insurance quotes from top providers. Save money with Protect.com's free comparison tool.",
        },
        {
          name: "keywords",
          content:
            "car insurance, auto insurance, home insurance, renters insurance, health insurance, compare insurance quotes, insurance providers, save on insurance",
        },
        { name: "author", content: "Protect.com" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://protect.com/" },
        { property: "og:site_name", content: "Protect.com" },
        { property: "og:image", content: "https://stage.protect.com/img/protect-share.dabdad17.jpg" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:creator", content: "@ProtectDotCom" },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cantata+One&family=Nunito+Sans:wght@400;600;700&display=swap",
          media: "print",
          onload: "this.media='all'",
        },
      ],

    },
  },
  runtimeConfig: {
    // Private keys (only available on server-side)
    graphqlApiUrl: process.env.GRAPHQL_API_URL || "https://us-west-2.cdn.hygraph.com/content/ckwzg7tk528a001z4e7z0bqi0/master",
    // Public keys (exposed to client-side)
    public: {
      // Add any public config here if needed
    },
  },
  sitemap: {
    hostname: "https://protect.com",
    gzip: true,
    sources: ["/api/sitemap-urls"],
  },
  routeRules: {
    // Static assets with content hash - cache for 1 year (immutable)
    "/_nuxt/**": {
      headers: {
        "cache-control": "public, max-age=31536000, immutable",
      },
    },
    // Images - cache for 1 year
    "/img/**": {
      headers: {
        "cache-control": "public, max-age=31536000, immutable",
      },
    },
    // Assets (license plates, state outlines, etc.) - cache for 1 year
    "/assets/**": {
      headers: {
        "cache-control": "public, max-age=31536000, immutable",
      },
    },
    // Fonts - cache for 1 year
    "/fonts/**": {
      headers: {
        "cache-control": "public, max-age=31536000, immutable",
      },
    },
    // GeoIP library - cache for 1 year
    "/lib/**": {
      headers: {
        "cache-control": "public, max-age=31536000, immutable",
      },
    },
    // API routes - no cache or short cache
    "/api/**": {
      headers: {
        "cache-control": "no-cache, no-store, must-revalidate",
      },
    },
    // HTML pages - short cache with revalidation
    "/**": {
      headers: {
        "cache-control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
      },
    },
  },
  css: ["~/scss/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "bootstrap/scss/functions";
            @import "bootstrap/scss/variables";
            @import "bootstrap/scss/maps";
            @import "bootstrap/scss/mixins";
            @import "~/scss/_variables.scss";
          `,
          api: "modern-compiler",
          silenceDeprecations: ["legacy-js-api", "color-functions", "global-builtin", "import", "mixed-decls", "slash-div"],
          quietDeps: true,
          verbose: false,
        },
      },
    },
    build: {
      cssCodeSplit: true,
    },
    logLevel: "error",
  },
});
