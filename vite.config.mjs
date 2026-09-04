import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const root = path.dirname(fileURLToPath(import.meta.url));

function classicScripts() {
  return {
    name: 'classic-scripts',
    apply: 'build',
    transformIndexHtml(html) {
      return html
        .replace(/\s*type="module"/g, ' defer')
        .replace(/\s*crossorigin(?:="[^"]*")?/g, '')
        .replace(/<link rel="modulepreload"[^>]*>/g, '');
    },
  };
}

export default defineConfig({
  plugins: [react(), classicScripts()],
  base: './',
  publicDir: 'public',
  resolve: {
    alias: {
      ts: path.resolve(root, 'src/ts'),
    },
  },
  css: {
    modules: {
      generateScopedName: '[local]',
    },
    preprocessorOptions: {
      scss: {
        loadPaths: [path.resolve(root, 'src')],
      },
    },
  },
  server: {
    port: 3006,
    strictPort: true,
  },
  preview: {
    port: 3006,
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        format: 'iife',
        name: 'Assayo',
        inlineDynamicImports: true,
        entryFileNames: 'static/js/main.js',
        chunkFileNames: 'static/js/[name].js',
        assetFileNames: (assetInfo) => {
          const fileName = assetInfo.names?.[0] || assetInfo.name || '';
          if (fileName.endsWith('.css')) return 'static/css/main.css';
          return 'static/media/[name][extname]';
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
