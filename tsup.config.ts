import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['esm'],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  shims: true,
  target: 'node24',
});
