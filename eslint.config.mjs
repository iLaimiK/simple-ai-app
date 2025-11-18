import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tsEslint from 'typescript-eslint';

export default [
  // 忽略文件配置
  {
    ignores: [
      "dist/",
      "node_modules/",
      "*.config.mjs",
      "*.config.js",
      "*.config.ts"
    ]
  },

  // JavaScript 文件配置
  js.configs.recommended,

  // TypeScript 文件配置
  ...tsEslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
        ...globals.browser
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "prettier": prettier,
    },
    rules: {
      // 禁用与 Prettier 冲突的格式化规则
      ...prettierConfig.rules,

      // Prettier 集成
      "prettier/prettier": "warn",

      // React Hooks 规则
      ...reactHooks.configs.recommended.rules,

      // React Refresh 规则
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // 代码质量相关规则
      "no-console": "off",
      "no-undef": "off", // TypeScript 处理
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_", // 忽略以下划线开头的参数
          varsIgnorePattern: "^_", // 忽略以下划线开头的变量
        },
      ],
      eqeqeq: ["error", "always"],
      "no-var": "error",

      // TS特定规则
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
    },
  },
];
