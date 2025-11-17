module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "@nuxt/eslint", // Use the official Nuxt ESLint config
    "plugin:vue/vue3-recommended",
    "prettier",
  ],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-underscore-dangle": "off",
    "max-len": [1, { code: 150 }],
    "prefer-destructuring": "off",
    "no-restricted-globals": "off",
    "no-plusplus": "off",
    "prefer-template": "off",
    "vue/no-parsing-error": [
      "error",
      {
        "control-character-in-input-stream": false,
      },
    ],
    "global-require": "off",
    "import/no-dynamic-require": "off",
    camelcase: "off",
    "prefer-rest-params": 0,
  },
  ignorePatterns: ["./public/assets/icons/**", "./components/svg/**"],
};
