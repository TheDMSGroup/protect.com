// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/sitemap", "@bootstrap-vue-next/nuxt", "@nuxt/image", "@pinia/nuxt", "@nuxt/eslint"],
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
