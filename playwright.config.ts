import { defineConfig, devices } from '@playwright/test';

if (!process.env.NODE_ENV) {
  require("dotenv").config({ path: `${__dirname}//src//config//.env` });
} else {
  require("dotenv").config({
    path: `${__dirname}//src//config//.env.${process.env.NODE_ENV}`,
  });
}
export default defineConfig({
  // retries: 1,
  reporter: [
    ['allure-playwright'],
    ['html']
  ],

  use: {
    trace: 'on-first-retry',
    screenshot: 'on',
  },

   projects: [
    {
      name: 'sanity',
      testDir: './src/tests/sanity',
      use: {
        ...devices['Desktop Chrome'],
      }
    },
    {
      name: 'regression',
      dependencies: ['sanity'],
      fullyParallel: true,
      testDir: './src/tests/regression',
      use: {
        ...devices['Desktop Chrome'],
      }
    }
  ],
});
