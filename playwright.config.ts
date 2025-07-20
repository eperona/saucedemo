import { defineConfig, devices } from '@playwright/test';

if (!process.env.NODE_ENV) {
  require("dotenv").config({ path: `${__dirname}//src//config//.env` });
} else {
  require("dotenv").config({
    path: `${__dirname}//src//config//.env.${process.env.NODE_ENV}`,
  });
}
export default defineConfig({
  testDir: './src/tests',
  retries: 1,
  reporter: [
    ['allure-playwright'],
    ['html']
  ],

  use: {
    baseURL: 'https://www.saucedemo.com/',
    trace: 'on-first-retry',
    screenshot: 'on',
  },

   projects: [
    {
      name: 'regression',
      use: {
        ...devices['Desktop Chrome'],
      }
    }
  ],
});
