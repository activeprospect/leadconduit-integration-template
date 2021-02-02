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
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    "semi": [2, "always"],
    "no-extra-semi": 2,
    "no-useless-return": "error",
    "prefer-const": "error"
  }
}
