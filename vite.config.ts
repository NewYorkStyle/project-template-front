/// <reference types="vitest/config" />

import path from 'path';
import {fileURLToPath} from 'url';

import react from '@vitejs/plugin-react';
import {defineConfig, loadEnv, type PluginOption} from 'vite';
import {visualizer} from 'rollup-plugin-visualizer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcRoot = path.resolve(__dirname, 'src');

/**
 * Используем loadPaths + короткий модуль `app/styles/variables`.
 * Не инжектим в сами `variables.scss` / `global.scss`, чтобы не было двойного `@use`.
 */
function scssAdditionalData(source: string, filename: string): string {
  const f = filename.replace(/\\/g, '/');
  if (
    f.includes('/app/styles/variables.scss') ||
    f.includes('/app/styles/global.scss')
  ) {
    return source;
  }
  return `@use "app/styles/variables" as *;\n${source}`;
}

export default defineConfig(({command, mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = env.API_URL || 'http://localhost:3000';

  const plugins: PluginOption[] = [
    react(),
    ...(process.env.ANALYZE
      ? [
          visualizer({
            filename: 'dist/stats.html',
            open: true,
            gzipSize: true,
          }),
        ]
      : []),
  ];

  return {
    plugins,

    resolve: {
      alias: {
        '@entities': path.resolve(__dirname, 'src/entities'),
        '@shared': path.resolve(__dirname, 'src/shared'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@features': path.resolve(__dirname, 'src/features'),
        '@widgets': path.resolve(__dirname, 'src/widgets'),
      },
    },

    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },

    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: [srcRoot],
          additionalData: scssAdditionalData,
        },
      },
    },

    server: {
      port: 4200,
      host: true,
      strictPort: true,
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/api/, ''),
        },
      },
    },

    base: command === 'build' ? './' : '/',

    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: false,
      rollupOptions: {
        output: {
          assetFileNames: 'static/media/[name]-[hash][extname]',
        },
      },
    },

    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setup-tests.ts'],
      include: [
        'src/**/__tests__/**/*.{ts,tsx}',
        'src/**/*.{test,spec}.{ts,tsx}',
      ],
      coverage: {
        provider: 'v8',
        include: ['src/shared/**/*.{ts,tsx}'],
        exclude: [
          'src/shared/**/*.d.ts',
          'src/shared/**/*.test.{ts,tsx}',
          'src/shared/**/__tests__/**',
          'src/shared/**/__mocks__/**',
          'src/shared/**/index.ts',
        ],
        reporter: ['text', 'json', 'html'],
      },
    },
  };
});
