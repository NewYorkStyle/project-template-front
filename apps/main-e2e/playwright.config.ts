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

    {
      name: 'firefox',
      use: {...devices['Desktop Firefox']},
    },

    // {
    //   name: 'webkit',
    //   use: {...devices['Desktop Safari']},
    // },

    // Uncomment for mobile browsers support
    /* {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    }, */

    // Uncomment for branded browsers
    /* {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    } */
  ],

  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npx nx run main:serve-static',
    cwd: workspaceRoot,
    reuseExistingServer: !process.env.CI,
    url: 'http://localhost:4200',
  },
});
