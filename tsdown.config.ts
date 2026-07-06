import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    convert: 'src/convert.ts',
    'units/index': 'src/units/index.ts',
    'strings/index': 'src/strings/index.ts',
  },
  format: ['es', 'cjs'],
  platform: 'neutral',
  dts: true,
  sourcemap: true,
  exports: false,
  outExtensions: ({ format }) => ({
    js: format === 'cjs' ? '.cjs' : '.js',
  }),
});
