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

In this tutorial, I will show you how to make the easy workflow I use for my React projects.

This workflow created in GitHub Actions will be responsible for automatically checking the source code, generating a test report spread and uploading it to Codecov, building and posting the project on GitHub pages. All of these activities were done through a Push or pull application event at a large branch.

## Getting Started

First of all, in your last React App GitHub, navigate to the last main page, click on Actions.

After that, you will see CI template suggestions that are best suited for your project. You can use workflow templates as the starting point for building your custom workflow.
In this case, click Set this functionality, under the Node.js template name.

![Basic workflow](/blog/Web/react-cicd/image1.jpeg)

Finally, you will see the default YAML file as follows:

```
name: Node.js CI

to:
Push:
branches: [master]
donsa_cela:
branches: [master]

jobs:
to build:

    advances: personality-latest

    site:
      matrix:
        Node type: [10.x, 12.x, 14.x]

    steps:
    - uses: actions / checkout @ v2
    - name: Use Node.js $ {{matrix.node-version}}
      uses: actions / setup-node @ v1
      no:
        version-node: $ {{matrix.node-version}}
    - gijima: npm ci
    - run: npm run build --if-present
    - run: npm test

```

## Production spread test report

Allow workflow reviews to add step coverage to our workflow test

```
name: CI / CD

to:
Push:
branches: [master]
donsa_cela:
branches: [master]

jobs:
to build:

    advances: personality-latest

    site:
      matrix:
        Node type: [12.x]

    steps:
    - name: Storage location
      uses: actions / checkout @ v2

    - name: Set Node.js $ {{matrix.node-version}}
      uses: actions / setup-node @ v1
      no:
        version-node: $ {{matrix.node-version}}

    - name: Enter dependency
      run: npm to install

    - name: Launch tests
      run: npm test

    - name: Build
      run: npm run build

```

### Set codecov test cover

First, go to [Codecov's website](https://codecov.io/) and create an account, you can use a GitHub account to sign-up.

Next, access your account on the website, click Cache, in the background, click Enter new storage location and select the last location you want to use. (we will set the secret in abit)

## Posting on GitHub pages

Insert `gh` pages and add` deploy` to the text in `package.json`.
Get Started:
`$ npm install - save gh pages`
Include the following texts in your package.
`"pre-use": "npm run build", "download": "gh-pages -d build",`

We will now create a new access token, to send our application to workflow.

Go to the location for personal access tokens in the developer settings of your GitHub profile and click Start new token.

Copy the generated token.

In GitHub, navigate to the last main page, under your last name, click Settings. In the sidebar on the left, click Secrets. And finally, Click Add New Secret.

Type your password in the input box, such as `ACTIONS_DEPLOY_ACCESS_TOKEN`.

Enter your privacy value (which should be a newly created personal access token).

Click Add Secret.

Your last step in your career journey should be as follows:

```
- name: Use
  use: |
    git config --global user.name $ user_name
    git config --global user.email $ user_email
    git remote set-url Origin https://${github_token}@github.com/${repository}
    npm run park
  env:
    username: 'github-actions [bot]'
    user_email: 'github-actions [bot]@users.noreply.github.com'
    github_token: ${{secrets.ACTIONS_DEPLOY_ACCESS_TOKEN}}
    repository: ${{github.repository}}
```

Name and email details do not have to be your actual details. You should also replace `ACTIONS_DEPLOY_ACCESS_TOKEN` with the password you just created.

After adding a submission command to your work trip, click on Start commit, and then click on the new Commit file.

Your final workflow file should be as follows:

```
name: CI / CD

to:
  Push:
    branches: [master]
  pull_request:
    branches: [master]

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

Now, for every request or pull event at the main branch, the CI / CD workflow will be activated. And you will be able to see if all the steps have passed or not.

## References:-

1. [GitHub actions](https://github.com/features/actions)
2. [Actions docs for JS](https://docs.github.com/en/actions/language-and-framework-guides/github-actions-for-javascript-and-typescript)

## Some good reads you may like:-

1. [Angular Youtube integration](https://nayan.co/blog/Web/angular-youtube/)
2. [Angular maps and clusters](https://nayan.co/blog/Web/angular-maps/)
