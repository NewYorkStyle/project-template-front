import {workspaceRoot} from '@nx/devkit';
import {nxE2EPreset} from '@nx/playwright/preset';
import {defineConfig, devices} from '@playwright/test';

const baseURL = process.env['BASE_URL'] || 'http://localhost:4200';

export default defineConfig({
  ...nxE2EPreset(__filename, {testDir: './src'}),

  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },
  ],

  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npx nx run main:serve-static',
    cwd: workspaceRoot,
    reuseExistingServer: !process.env.CI,
    url: 'http://localhost:4200',
  },
});
