module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    mocha: true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
  }
}
