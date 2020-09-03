const { override, fixBabelImports, addLessLoader } = require("customize-cra");
const theme = require("./theme.json");
const packageName = require("./package.json").name;

function customWebpack(config) {
  config.output.library = `${packageName}`;
  config.output.libraryTarget = "umd";
  config.output.jsonpFunction = `webpackJsonp_${packageName}`;
  config.output.publicPath = "http://localhost:9101/";
  return config;
}

module.exports = {
  webpack: override(
    customWebpack,
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: theme
    })
  ),
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.open = false;
      config.hot = false;
      config.headers = { "Access-Control-Allow-Origin": "*" };
      return config;
    };
  }
};
