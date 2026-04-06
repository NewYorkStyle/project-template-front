import {defineConfig} from 'orval';
import 'dotenv/config';

const VITE_API_URL = process.env.VITE_API_URL ?? 'http://localhost:3000';

export default defineConfig({
  api: {
    input: `${VITE_API_URL}/swagger/json`,
    output: {
      mode: 'tags',
      client: 'react-query',
      httpClient: 'axios',
      target: './src/shared/api/generated/endpoints',
      schemas: './src/shared/api/generated/model',
      namingConvention: 'kebab-case',
      clean: true,
      prettier: true,

      override: {
        mutator: {
          path: './src/shared/api/client/instance.ts',
          name: 'request',
        },
      },
    },
  },

  apiZod: {
    input: `${VITE_API_URL}/swagger/json`,
    output: {
      mode: 'tags',
      client: 'zod',
      target: './src/shared/api/generated/zod',
      fileExtension: '.schema.ts',
      namingConvention: 'kebab-case',
      clean: true,
      prettier: true,
    },
  },
});
