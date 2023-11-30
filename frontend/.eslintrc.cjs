 module.exports = {
   env: {
     browser: true,
     es2021: true,
     jest: true,
   },
   extends: [
     'eslint:recommended',
     'plugin:react/recommended',
     'plugin:react/jsx-runtime',
     'plugin:react-hooks/recommended',
     'plugin:@typescript-eslint/recommended',
   ],
   ignorePatterns: ['dist', '.eslintrc.cjs'],
   parser: '@typescript-eslint/parser',
   parserOptions: {
     ecmaFeatures: {
       jsx: true,
     },
     ecmaVersion: 'latest',
     sourceType: 'module',
     project: ['./tsconfig.json'],
     tsconfigRootDir: __dirname,
   },
   plugins: ['react-refresh'],
   rules: {
     '@typescript-eslint/no-explicit-any': 'off',
     'react-refresh/only-export-components': [
       'warn',
       { allowConstantExport: true },
     ],
   },
   settings: {
     react: {
       version: 'detect',
     },
   },
 };
