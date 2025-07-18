# Automation Framework Requirements

## Application Under Test
- [Sauce Demo](https://www.saucedemo.com/)
- Author: Edwin Perona

## Prerequisites
- Node.js (>=14.x) and npm installed
- Git installed
- Chrome or Firefox browser
- Access to Jenkins (for CI)

## Installation

1. **Clone the Repository**
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Configure Environment**
    - Create a `.env` file for sensitive data (e.g., credentials).
    - Example:
      ```
      SAUCE_USERNAME=your_username
      SAUCE_ACCESS_KEY=your_access_key
      ```

## Running Tests Locally

- Run all tests:
  ```bash
  npm test
  ```
- Run specific test:
  ```bash
  npm run test -- <test-file>
  ```

## Maintenance

- Update dependencies:
  ```bash
  npm update
  ```
- Add new test cases in the `tests/` directory.
- Review and refactor code regularly for best practices.

## Continuous Integration (Jenkins)

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

## Best Practices

- Keep dependencies up to date.
- Use version control for all changes.
- Document new features and test cases.
- Monitor CI builds and fix failures promptly.
