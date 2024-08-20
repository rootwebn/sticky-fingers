/** @type {import('stylelint').Config} */
module.exports = {
  extends: ['next/core-web-vitals', 'prettier', 'plugin:prettier/recommended'],
  settings: {
    next: {
      rootDir: 'packages/my-app/',
    },
  },
  rules: {
    '@next/next/no-html-link-for-pages': 2,
    'react-hooks/exhaustive-deps': 'off',
  },
};
