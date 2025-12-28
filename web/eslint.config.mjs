import js from '@eslint/js';
import pluginNext from '@next/eslint-plugin-next';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  js.configs.recommended,
  {
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
