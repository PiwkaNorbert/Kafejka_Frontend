import js from "@eslint/js";
import ts from "typescript-eslint";
import tailwind from "eslint-plugin-tailwindcss";

export default [
  // add eslint built-in
  js.configs.recommended,
  // add `typescript-eslint` flat config simply
  // if you would like use more another configuration,
  // see the section: https://typescript-eslint.io/getting-started#details
  ...ts.configs.recommended,
  ...tailwind.configs["flat/recommended"],
  {
    settings: {
      tailwindcss: {
        // These are the default values but feel free to customize
        callees: ["classnames", "clsx", "ctl"],
        config: "tailwind.config.js", // returned from `loadConfig()` utility if not provided
        cssFiles: [
          "**/*.css",
          "!**/node_modules",
          "!**/.*",
          "!**/dist",
          "!**/build",
        ],
        cssFilesRefreshRate: 5_000,
        removeDuplicates: true,
        skipClassAttribute: false,
        whitelist: [],
        tags: [], // can be set to e.g. ['tw'] for use in tw`bg-blue`
        classRegex: "^class(Name)?$", // can be modified to support custom attributes. E.g. "^tw$" for `twin.macro`
      },
    },
  },
];