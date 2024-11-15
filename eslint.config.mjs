import { FlatCompat } from "@eslint/eslintrc"
import { fileURLToPath } from "node:url"
import globals from "globals"
import js from "@eslint/js"
import path from "node:path"
import prettier from "eslint-config-prettier"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

/** @type {import('eslint').Linter.Config[]} */
const config = [
  js.configs.recommended,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-debugger": "warn",
      "sort-imports": "error",
      "sort-keys": "error",
      "sort-vars": "error",
    },
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    rules: {
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
    },
  },
  {
    files: ["public/service-worker.js"],
    globals: globals.serviceworker,
  },
  prettier,
]

export default config
