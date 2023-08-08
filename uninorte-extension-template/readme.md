# Uninorte Extension Template

## Steps to recreate this project

Bootstrap a new Ellucian extension project using:

```sh
npx https://cdn.elluciancloud.com/assets/SDK/latest/ellucian-create-experience-extension-latest.tgz my-extension
cd my-extension
npm install
```

Improve developer experience by installing types for the following libraries:

```sh
npm install --save-dev @types/react @types/react-dom @types/react-router-dom
```

Install typescript support

```sh
npm install --save-dev typescript@4.6.4
npm install --save-dev @babel/preset-typescript@7.21.5
```

Configure eslint and prettier

```sh
npm install --save-dev @typescript-eslint/eslint-plugin@5.10.2 @typescript-eslint/parser@5.10.2
npm install --save-dev eslint-config-airbnb@19.0.1
npm install --save-dev eslint-config-prettier@8.8.0
```

Install jest for unit testing

```sh
npm install --save-dev jest @types/jest ts-jest
```

Install dotenv-webpack for environment variables support

```sh
npm install --save-dev dotenv-webpack@7.1.0
```

Finally multiple changes to the initial files were made to support the template. See the git history for more details.

## Naming and Configuration

The extension project name should be in [Kebab Case](https://www.freecodecamp.org/news/snake-case-vs-camel-case-vs-pascal-case-vs-kebab-case-whats-the-difference/#kebab-case).

Modified this name inside the following files:

- package.json
- extension.js

Inside the `extension.js` file the _type_ property of a card should be in Kebab Case. It must be unique across all cards in the extension.

We use kebab case because the _project extension name_, _card type_ and _publisher_ are used in the URL when you visit the page of the functionality in Ellucian Experience

URL Structure: `/<publisher>/<project-extension-name>/<card-type>`

Besides Kebab Case is a valid name convention for package.json and npm modules.

Note: This a convention used by the template, but it is not enforced by the SDK.

## Scripts

To support different environments this templates modifies the scripts inside `package.json`

| Script           | Description                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------- |
| test:unit        | Run unit tests with jest                                                                  |
| test:server      | Same as `npm start`, but loading test environment variables. Useful for e2e tests         |
| dev:build        | Same as `build-dev`                                                                       |
| dev:server       | Same as `npm start`, but loading dev environment variables. Useful for normal development |
| dev:deploy       | Same as `build-dev`                                                                       |
| dev:force-deploy | Same as `build-dev`, but overwriting the current version of the extension                 |
| prod:build       | Same as `build-prod`                                                                      |
| prod:deploy      | Same as `deploy-prod`                                                                     |

### Environment variables

Go to `env-vars` and remove the `.example` extension from the files. Then fill the values with the correct values.

The environment variables are used to support different configuration for different environments. For example, the URL of the API can be different in development and production.

## Folder Structure

### A different view of an Ellucian Extension Project

According to Ellucian, an Extension project is composed of multiple cards. The project can also contain a page to add more complex functionality to the extension. You navigate to the page using a card.

This template is based on the idea that an extension project is composed of 2 parts:

- Cards: Entry points to a react application injected with Ellucian Experience Utilities
- React application: The react application that is loaded when you click on a card. It can be composed of multiple pages. It uses basic client side routing using react-router-dom

Remember the react application is optional in an extension project

## Typescript support

Some notes about typescript support:

- Babel doesn't use the Typescript configuration (`tsconfig.json`) to compile the Typescript code. The configuration is only used by the IDE to improve the developer experience
- We only use Typescript configuration to improve the developer experience (auto completion, syntax highlighting and finding errors before running the code)
- Initially, Typescript support was only for checking files inside `src/core` and `tests` but it was extended to the whole project

## Multi language support

Ellucian Experience has chosen to use 'react-intl' library for localizing the content displayed in the Ellucian Experience dashboard. The boilerplate code was taken from the [experience-sdk-sample-extensions](https://github.com/ellucian-developer/experience-sdk-sample-extensions/tree/main).

## Logging

The template uses the [loglevel](https://www.npmjs.com/package/loglevel) library for logging. The log level can be configured using the `LOG_LEVEL` environment variable.

We only use logging for development purposes and to improve debugging sessions. We do not save logs in production.

An example of how to use logging can be found in `src/pages/Home.jsx`
