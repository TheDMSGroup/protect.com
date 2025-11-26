// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/sitemap", "@bootstrap-vue-next/nuxt", "@nuxt/image", "@pinia/nuxt", "@nuxt/eslint", "@nuxt/scripts"],
  scripts: {
    registry: {
      googleTagManager: {
        id: "GTM-MZPRQHZ", // Replace with your Google Tag Manager ID
      },
    },
  },
  app: {
    head: {
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
    logLevel: "error",
  },
});
