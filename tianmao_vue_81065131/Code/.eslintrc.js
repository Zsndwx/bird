// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 分号，error 错误级别， always 要分号， never 不要分号
    "semi": ["error", "always"],
    // 关掉官方提供的缩进
    "indent": "off",
    // 使用vue提供的缩进  规则：表示缩进 2 * 1 空格
    "vue/script-indent": ['error',2,{'baseIndent':1}],
    // 函数括号之前的空格  anonymous匿名函数总是要空格， named有名字的函数不空格， asyncArrow异步的箭头函数要空格
    "space-before-function-paren": ["error",{"anonymous": "always","named":"never","asyncArrow":"always"}]
  }
}
