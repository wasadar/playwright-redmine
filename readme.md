# Playwright tests

Playwright tests Automated Tests for https://www.redmine.org/ with Playwright. Since I was redoing this task I tried to fix mistakes that I made when I was doing this task for first time. Especially the project structure and double leveled POM code.

## Table of Contents
1. [Summary](#summary)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Usage](#usage)

## Summary
This repository contains automated tests for https://www.redmine.org/ using the Playwright framework. The test results are reported using Allure reporting.

## Requirements
- Node.js
- Playwright

Most of the dependencies can be downloaded throught using this command after cloning repository:
    ```
    npm install
    ```
But some of them including: Node.js, Java, Playwright browsers - can not.

Please make sure you have the necessary dependencies installed and the environment properly configured before running the tests. You can customize the tests in the [tests](tests) directory and configure the Playwright options in the [config](playwright.config.js) file as needed.

## Installation
1. Clone this repository to your local machine.
    ```
    git clone https://github.com/wasadar/playwright-redmine.git
    ```

2. Navigate to the project directory.
    ```
    cd playwright-redmine
    ```

3. Install the required dependencies.
    ```
    npm install
    ```

4. Install Playwright browsers
    - To install the Playwright browsers for Windows, you can use the following command in the project directory:
    ```
    npx playwright install --with-deps
    ```
    - This will install the necessary browsers (Chromium, Firefox, and WebKit) for your tests on Windows.
    
## Usage
### Running Tests
To run the automated tests using Playwright, you can use the following npm scripts defined in the `package.json` file:

- Run the automated tests using Playwright (headless mode):
    ```
    npm test
    ```

- Run the automated tests using Playwright with a graphical user interface (UI):
    ```
    npm run test-with-ui
    ```

Choose the appropriate script based on your testing needs.