module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-underscore-dangle': 0,
    'comma-dangle': ['error', 'never'], // 数组、对象等最后一个属性末尾不加 逗号
    'no-console': 0,
    'operator-linebreak': ['error', 'before']
  }
};
