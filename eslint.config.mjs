import js from "@eslint/js";
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
    },
    rules: {
      // React Hooks 规则
      ...reactHooks.configs.recommended.rules,

      // React Refresh 规则
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // 格式化相关规则
      quotes: ["error", "single"],
      semi: ["error", "always"],
      "comma-dangle": ["error", "never"],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "space-before-function-paren": ["error", "never"],
      "keyword-spacing": "error",
      "space-infix-ops": "error",
      "comma-spacing": ["error", { before: false, after: true }],
      "key-spacing": ["error", { afterColon: true }],
      "max-len": [
        "error",
        {
          code: 120,
          ignoreStrings: true, // 忽略字符串
          ignoreTemplateLiterals: true, // 忽略模板字符串
          ignoreUrls: true, // 忽略 URL
          ignoreComments: true, // 忽略注释
        },
      ],
      "linebreak-style": "off", // Windows/Unix 兼容性
      'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
      'dot-location': ['error', 'property'],

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
