const configureAPI = require("./src/server/configure");

module.exports = {
  publicPath: "/",
  devServer: {
    before: configureAPI
  }
};
