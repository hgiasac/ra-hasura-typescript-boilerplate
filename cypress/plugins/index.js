/* eslint-disable functional/immutable-data */

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const filePath = path.resolve(__dirname, "../../.env");
const envConfig = dotenv.parse(fs.readFileSync(filePath));

module.exports = (on, config) => {
  config.env = envConfig;

  return config;
};
