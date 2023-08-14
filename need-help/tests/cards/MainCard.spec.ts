/* eslint-disable global-require */
const { webpackConfigBuilder } = require("@ellucian/experience-extension");
const packageJson = require("./package.json");
// eslint-disable-next-line import/extensions
const extensionConfig = require("./extension.js");

function getMode(environmentName) {
  if (environmentName === "dev") {
    return "development";
  }
  if (environmentName === "prod") {
    return "production";
  }
  // test case or default
  return "development";
}

function getEnvFile(environmentName) {
  if (environmentName === "dev") {
    return "./env-vars/.dev.env";
  }
  if (environmentName === "prod") {
    return "./env-vars/.prod.env";
  }
  if (environmentName === "test") {
    return "./env-vars/.test.env";
  }

  // default to dev
  return "./env-vars/.dev.env";
}

module.exports = async (env, options) => {
  // Generate Webpack configuration based on the extension.js file
  // and any optional env flags  ("--env verbose", "--env upload", etc)
  console.log(env);

  if (env["env-name"] === undefined) {
    throw new Error(
      "You must specify an environment name using --env env-name=dev|test|prod"
    );
  }

  const envName = env["env-name"];
  const mode = getMode(envName);
  const envPath = getEnvFile(envName);

  console.log("envName: ", envName);
  console.log("mode: ", mode);
  console.log("envPath: ", envPath);

  require("dotenv").config({ path: envPath });
  const Dotenv = require("dotenv-webpack");

  const webpackConfig = await webpackConfigBuilder({
    extensionConfig: extensionConfig,
    extensionVersion: packageJson.version,
    mode: mode,
    verbose: env.verbose || process.env.EXPERIENCE_EXTENSION_VERBOSE || false,
    upload: env.upload || process.env.EXPERIENCE_EXTENSION_UPLOAD || false,
    forceUpload:
      env.forceUpload || process.env.EXPERIENCE_EXTENSION_FORCE_UPLOAD || false,
    uploadToken: process.env.EXPERIENCE_EXTENSION_UPLOAD_TOKEN,
    liveReload: env.liveReload || false,
    port: process.env.PORT || 8082,
  });
  webpackConfig.plugins.push(new Dotenv({ path: envPath }));

  // For advanced scenarios, dynamically modify webpackConfig here.

  const newBabelRule = {
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    loader: "babel-loader",
  };
  const oldModuleRules = webpackConfig.module.rules;
  webpackConfig.module.rules = [...oldModuleRules, newBabelRule];

  const newResolve = {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  };
  webpackConfig.resolve = newResolve;

  return webpackConfig;
};