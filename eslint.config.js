const vuePlugin = require('eslint-plugin-vue');
const prettierPlugin = require('eslint-plugin-prettier');
const vueEslintParser = require('vue-eslint-parser');
const babelEslintParser = require('@babel/eslint-parser');

module.exports = [
    {
        files: ["**/*.js"],
        languageOptions: {
            globals: {
                // 这里定义你的全局变量
                "window": "readonly",
                "document": "readonly",
                "process": "readonly"
            },
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: "module",
            },
            parser: babelEslintParser, // 使用 @babel/eslint-parser 代替 babel-eslint
        },
        plugins: {
            prettier: prettierPlugin
        },
        rules: {
            'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
            'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
            'prettier/prettier': 'error',
        },
    },
    {
        files: ["**/*.vue"],
        languageOptions: {
            parser: vueEslintParser,
            parserOptions: {
                parser: babelEslintParser,
                ecmaVersion: 2021,
                sourceType: 'module',
            },
        },
        plugins: {
            vue: vuePlugin,
            prettier: prettierPlugin
        },
        rules: {
            'vue/no-multiple-template-root': 'off',
            'prettier/prettier': 'error',
        },
    }
];