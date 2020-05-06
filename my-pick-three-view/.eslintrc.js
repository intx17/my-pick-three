module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
  },
  extends: [
    '@nuxtjs',
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    // 'plugin:prettier/recommended',
    // 'prettier',
    // 'prettier/vue'
  ],
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'quotes': ['warn', 'single'],
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/no-v-html': 'warn',
    'vue/html-closing-bracket-spacing': 'off',
  }
}
