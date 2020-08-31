---
title: Setup CI/CD on React app using GitHub Actions
date: 2020-08-20 15:08:25
author: Abhishek Rana
categories:
  - ["Web"]
tags:
  - web
  - react
  - javascript
  - CICD
  - Github-actions
  - Code coverage
---

In this tutorial, I'm going to show you how to create a simple workflow that I use on my personal projects with React.

This workflow created on GitHub Actions will be responsible for automatically test the source code, generate a test coverage report and upload it on Codecov, build and deploy the project on GitHub Pages. All these jobs are activated by a push or pull request event on master branch.

## Getting started

First, on your React App GitHub repository, navigate to the main page of the repository, click Actions.

Then, you'll see suggestions of CI templates that are the best fit for your project. You can use workflow templates as a starting place to build your custom workflow.
In this case, click Set up this workflow, under the name of the template Node.js.   

![Basic workflow](/blog/Web/react-cicd/image1.jpeg)

Finally, you'll see a default YAML file like this:
```
name: Node.js CI

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [10.x, 12.x, 14.x]

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm ci
    - run: npm run build --if-present
    - run: npm test
```

## Test coverage report generation
Lets update workflow abit to add test coverage step in our workflow
```
name: CI/CD

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [12.x]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Set up Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm install

    - name: Run the tests
      run: npm test

    - name: Build
      run: npm run build
```

### Setup codecov test coverage 
First, go to the [Codecov website](https://codecov.io/) and create an account, you can use your GitHub account to sign up.

Next, access your account on the website, click Repositories, after, click Add new repository and choose the repository you want to use. (we will setup secret in abit)

## Deployment on GitHub Pages
Install `gh-pages` and add `deploy` to scripts in `package.json`.
Run:
```
$ npm install --save gh-pages
```
Add the following scripts in your package.json:
```
"predeploy": "npm run build",
"deploy": "gh-pages -d build",
```

Now we are going to create a new access token, in order to deploy our application through the workflow.

Go to the Personal access tokens area in the Developer settings of your GitHub profile and click Generate new token.

Copy the generated token.

On GitHub, navigate to the main page of the repository, under your repository name, click Settings. In the left sidebar, click Secrets. And finally, Click Add a new secret.

Type a name for your secret in the Name input box, like `ACTIONS_DEPLOY_ACCESS_TOKEN`.

Enter the value for your secret (which should be the personal access token we just created).

Click Add secret.

Your last step on your workflow should be some like this:
```
- name: Deploy
  run: |
    git config --global user.name $user_name
    git config --global user.email $user_email
    git remote set-url origin https://${github_token}@github.com/${repository}
    npm run deploy
  env:
    user_name: 'github-actions[bot]'
    user_email: 'github-actions[bot]@users.noreply.github.com'
    github_token: ${{ secrets.ACTIONS_DEPLOY_ACCESS_TOKEN }}
    repository: ${{ github.repository }}
```

The name and email information need not necessarily be your real information. And you must replace ACTIONS_DEPLOY_ACCESS_TOKEN with the name of the secret you just created.

After adding the deploy command on your workflow, click Start commit, and click Commit new file.

Your final workflow file should be like this:
```
name: CI/CD

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [12.x]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Set up Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm install

    - name: Run the tests and generate coverage report
      run: npm test -- --coverage

    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v1

    - name: Build
      run: npm run build

    - name: Deploy
      run: |
        git config --global user.name $user_name
        git config --global user.email $user_email
        git remote set-url origin https://${github_token}@github.com/${repository}
        npm run deploy
      env:
        user_name: 'github-actions[bot]'
        user_email: 'github-actions[bot]@users.noreply.github.com'
        github_token: ${{ secrets.ACTIONS_DEPLOY_ACCESS_TOKEN }}
        repository: ${{ github.repository }}
```

Now, in every push or pull request event on master branch, the CI/CD workflow will be activated. And you will be able to see if all steps have passed or not.

## References:-
1. [GitHub actions](https://github.com/features/actions)
2. [Actions docs for JS](https://docs.github.com/en/actions/language-and-framework-guides/github-actions-for-javascript-and-typescript)

## Some good reads you may like:-
1. [Angular Youtube integration](https://nayan.co/blog/Web/angular-youtube/)
2. [Angular maps and clusters](https://nayan.co/blog/Web/angular-maps/)
