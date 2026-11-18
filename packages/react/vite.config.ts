/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

// CSS Modules keep the GDS class convention readable in the DOM:
//   .root in Button.module.css   -> .gds-button
//   .icon in Button.module.css   -> .gds-button__icon
// One module file per component, so names cannot collide.
const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
export const scopedName = (name: string, filename: string): string => {
  const component = kebab(path.basename(filename).replace(/\.module\.css$/, ''));
  return name === 'root' ? `gds-${component}` : `gds-${component}__${kebab(name)}`;
};

export default defineConfig({
  plugins: [
    react(),
    dts({ include: ['src'], exclude: ['**/*.test.*', '**/*.stories.*', 'src/docs/**'] }),
  ],
  css: { modules: { generateScopedName: scopedName, localsConvention: 'camelCaseOnly' } },
  build: {
    lib: {
      entry: path.resolve(here, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'gds-react',
    },
    rollupOptions: {
      external: [
        /^react($|\/)/,
        /^react-dom($|\/)/,
        /^@base-ui\/react/,
        /^@open-earth-foundation\/gds-tokens/,
      ],
    },
    sourcemap: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    css: true,
  },
});
