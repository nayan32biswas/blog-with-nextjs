/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  semi: true,
  trailingComma: "all",
  singleQuote: false,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "lf",
  tailwindConfig: "./tailwind.config.js",
  plugins: ["prettier-plugin-tailwindcss"],
};

module.exports = config;
