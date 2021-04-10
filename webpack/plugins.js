"use strict"

var path = require("path")
const root = path.resolve(__dirname, "..")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = [
  new HtmlWebpackPlugin({
    template: path.resolve(root, "src/templates/index.html"),
    baseUrl:
      process.env.NODE_ENV == "development" ? "/" : "/test-task-kameleoon/",
    publicPath:
      process.env.NODE_ENV == "development" ? "/" : "/test-task-kameleoon/",
  }),
  new MiniCssExtractPlugin(),
  new CleanWebpackPlugin(),
]
