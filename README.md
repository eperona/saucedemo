# Automation Framework Requirements
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
    ```bash
    cd <project-directory>
    git clone https://github.com/eperona/saucedemo.git
    Open VS
    ```

2. **Install Dependencies**
    ```bash
    - dotenv installation
    npm install dotenv --save --force

    - Allure report installation. make sure "allure-playwright" is added to pakage depedencies
    
    npm install 
    npm install -D allure-commandline
    npx allure generate ./allure-results --clean
    ```
    Note: You might encounter error like JAVA_HOME not set.
    Here is to set JAVA_HOME variable via command line(Run CMD as Administrator)
    ```cmd
    setx /m JAVA_HOME "C:\Program Files\Java\jdk-24"
    ```


3. **Configure Environment**
    - Create a `.env` file under ./src/config folder.
    - Create another `.env` file with additional `.<environment>` (e.g. .env.qa)
    - Example content:
      ```
      URL=https://www.saucedemo.com/
      USER=...
      PASSWORD=...
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

## Opening the HTML Report

- npx playwright show-report

## Opening the Allure HTML Report

- npx allure open ./allure-report

## Maintenance

- Update dependencies:
  ```bash
  npm update
  ```
- Add new test cases in the `src/tests/` directory.
- Review and refactor code regularly for best practices.

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
              git '<repository-url>'
            }
         }
         stage('Install') {
            steps {
              sh 'npm install'
            }
         }
         stage('Test') {
            steps {
              sh 'npm test'
            }
         }
      }
    }
    ```

3. **Artifacts & Reports**
    - Configure test reports (e.g., JUnit, Allure) for Jenkins to display results.

## Continuous Integration (GitHub Actions)

1. **GitHub Actions Setup**
    - Create a `.github/workflows/ci.yml` file in your repository.

2. **Sample Workflow Configuration**
    ```yaml
    name: CI

    on:
      push:
        branches: [ main ]
      pull_request:
        branches: [ main ]

    jobs:
      build-and-test:
        runs-on: ubuntu-latest

        steps:
        - name: Checkout code
          uses: actions/checkout@v4

        - name: Set up Node.js
          uses: actions/setup-node@v4
          with:
            node-version: '18'

        - name: Install dependencies
          run: npm install

        - name: Run tests
          run: npm test
    ```

3. **Artifacts & Reports**
    - Configure additional steps for uploading test reports if needed.

## Best Practices

- Keep dependencies up to date.
- Use version control for all changes.
- Document new features and test cases.
- Monitor CI builds and fix failures promptly.
