"use strict";

var path = require("path");

var rules = [
  require("./webpack/loaders/glsl"),
  require("./webpack/loaders/css"),
  require("./webpack/loaders/svg"),
  require("./webpack/loaders/babel"),
  require("./webpack/loaders/html"),
];

var plugins = require("./webpack/plugins");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/ts/index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  target: "web",
  module: {
    rules,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: ["node_modules", "src"],
    alias: {
      js: path.resolve(__dirname, "src/js"),
      ts: path.resolve(__dirname, "src/ts"),
      css: path.resolve(__dirname, "src/css"),
      components: path.resolve(__dirname, "src/ts/components"),
      templates: path.resolve(__dirname, "src/templates"),
      assets: path.resolve(__dirname, "assets"),
    },
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    historyApiFallback: true,
  },
  devtool: "source-map",
  plugins: plugins,
};
