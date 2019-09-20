const configureAPI = require("./src/server/configure");

module.exports = {
  publicPath: "dist",
  devServer: {
    before: configureAPI
  }
};
