// eslint.config.js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginPrettier from "eslint-plugin-prettier";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import pluginTypescript from "@typescript-eslint/eslint-plugin";
import parserTypescript from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const ignorePatterns = ["node_modules/**", ".next/**", "dist/**", "build/**", "*.min.js"];

const eslintConfig = [
  {
    // Global ignores
    ignores: ignorePatterns,
  },
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended", // This requires eslint-config-prettier
    "prettier", // Explicitly extend prettier config
  ),
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: parserTypescript,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "simple-import-sort": pluginSimpleImportSort,
      "@typescript-eslint": pluginTypescript,
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      prettier: pluginPrettier,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^\\w", "^@\\w"], // Third-party imports
            ["^@/"], // Root imports
            ["^\\.", "^\\.."], // Relative imports
            ["^.+\\.css$"], // CSS imports
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react/prop-types": "off",
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  eslintConfigPrettier,
];

export default eslintConfig;
