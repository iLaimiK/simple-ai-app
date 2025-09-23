import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      // 格式化相关规则
      indent: ["error", 2],
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
      "linebreak-style": ["error", "unix"],

      // 代码质量相关规则
      "no-console": "off",
      "no-undef": "error",
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
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
    },

    // 忽略特定文件的检查
    ignores: [
      "dist/", // 构建输出目录
      "node_modules/", // 依赖包目录
      "*.config.mjs",
      "*.config.js", // 配置文件
    ],
  },
];
