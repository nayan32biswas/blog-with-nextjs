module.exports = {
  singleQuote: false,
  arrowParens: "always",
  trailingComma: "none",
  printWidth: 100,
  tabWidth: 2,
  plugins: [],

  importOrder: [
    "^(next|react)(.*)",
    "(mui|emotion)/(.*)",
    "<THIRD_PARTY_MODULES>",
    "@/(.*)",
    "^[./]"
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
};
