import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    isolate: false,
    globals: true,
    environment: 'node',
    include: ['**/*.test.ts', '**/*.test-d.ts'],
    typecheck: {
      enabled: true,
      checker: 'tsgo',
      include: ['**/*.test.ts', '**/*.test-d.ts'],
      exclude: ['**/*.property.test.ts'],
    },
  },
});
