# Sauce Demo Test Automation Framework - Playwright  TypeScript
- Author: Edwin Perona

## Application Under Test
- [Sauce Demo](https://www.saucedemo.com/)

## Prerequisites
- Node.js (>=14.x) and npm installed
- Git installed
- Chrome 
- VSCode

## Installation

1. **Clone the Repository**
    ```
    git clone https://github.com/eperona/saucedemo.git
    ```

2. **Install Dependencies**
    
    dotenv installation
    ```
    npm install dotenv --save --force
    ```
    Allure report installation. 
    
    -https://allurereport.org/docs/install-for-nodejs/

3. **Configure Environment**
    - Create a `.env` file under ./src/config folder.
    - Create another `.env` file with additional suffix `.<environment>` (e.g. .env.qa)
    - Example content:
      ```
      URL=https://www.saucedemo.com/
      USER=...
      PASSWORD=...
      ```
    Before running the test, set environment the value for NODE_ENV or create an npm custom script for it
    ```
    set NODE_ENV=qa
    ```
  ## Running Tests Locally

  - Run all tests:
    ```bash
    npx playwright test
    ```
  - Run specific test group:
    ```bash
    npx playwright test -g "test-group"
    ```
  ## Maintenance

  - Update dependencies:
    ```bash
    npm update
    ```
  - Add new test cases in the `src/tests/regression` directory.
  - Review and refactor code regularly for best practices.

  ## Artifacts & Reports
    
    ## Opening the HTML Report
  ```
  npx playwright show-report
  ```

  ## Opening the Allure HTML Report
  Generate Allure Report after the tests are executed:
  ```
  allure generate ./allure-results -o ./allure-report
  ```
  Open the generated report:
  ```
  allure open ./allure-report
  ```

  ## Continuous Integration (Jenkins) - ToDo

  1. **Jenkins Setup**
      - Install Node.js plugin on Jenkins.
      - Configure Jenkins to use your repository.

  2. **Jenkins Pipeline Example**
      ```groovy
      pipeline {
        agent any
        stages {
          stage('Checkout') {
              steps {
                git 'https://github.com/eperona/saucedemo.git'
              }
          }
          stage('Install') {
              steps {
                sh 'npm install'
              }
          }
          stage('Test') {
              steps {
                sh 'npx playwright test --project=sanity --project=regression'
              }
          }
        }
      }
      ```
  ## Continuous Integration (GitHub Actions)

  1. **Sample Workflow Configuration**
      ```yaml
      name: Playwright Tests
      on:
        push:
          branches: [ main, master ]
        pull_request:
          branches: [ main, master ]
      jobs:
        test:
          timeout-minutes: 60
          runs-on: ubuntu-latest
          steps:
          - uses: actions/checkout@v4
          - uses: actions/setup-node@v4
            with:
              node-version: lts/*
          - name: Install dependencies
            run: npm ci
          - name: Install Playwright Browsers
            run: npx playwright install --with-deps
          - name: Run Playwright tests
            run: npx playwright test --project=sanity --project=regression
          - uses: actions/upload-artifact@v4
            if: ${{ !cancelled() }}
            with:
              name: playwright-report
              path: playwright-report/
              retention-days: 30
      ```

## Best Practices

- Keep dependencies up to date.
- Use version control for all changes.
- Document new features and test cases.
- Monitor CI builds and fix failures promptly.
