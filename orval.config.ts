import {defineConfig} from 'orval';
import 'dotenv/config';

const API_URL = process.env.API_URL ?? 'http://localhost:3000';

export default defineConfig({
  api: {
    input: `${API_URL}/swagger/json`,
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
    input: `${API_URL}/swagger/json`,
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
