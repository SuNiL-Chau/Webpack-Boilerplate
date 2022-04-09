/**
 * Webpack main configuration file
 */

const path = require("path");
const fs = require("fs");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const environment = require("./configs/environment");

module.exports = {
  entry: {
    helper: path.resolve(environment.paths.source, 'js/helpers', 'helper.js'),
    index: [`${path.resolve(environment.paths.source, "js", "index.js")}`, `${path.resolve(environment.paths.source, "scss", "index.scss")}`],
    home: [`${path.resolve(environment.paths.source, "js/pages/", "home.js")}`, `${path.resolve(environment.paths.source, "scss/pages/", "home.scss")}`],
    about: [`${path.resolve(environment.paths.source, "js/pages/", "about.js")}`, `${path.resolve(environment.paths.source, "scss/pages/", "about.scss")}`],
  },
  output: {
    filename: "js/[name].js",
    path: environment.paths.output,
  },
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader", 
          "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ["**/*", "!stats.json"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(environment.paths.source, "images"),
          to: path.resolve(environment.paths.output, "images"),
          toType: "dir",
          globOptions: {
            ignore: ["*.DS_Store", "Thumbs.db"],
          },
        },
        {
          from: path.resolve(environment.paths.source, "pages"),
          to: path.resolve(environment.paths.output, "pages"),
          toType: "dir",
          globOptions: {
            ignore: ["*.DS_Store", "Thumbs.db"],
          },
        },
        {
          from: path.resolve(environment.paths.source, "index.html"),
          to: path.resolve(environment.paths.output, "index.html"),
          //   toType: "dir",
          globOptions: {
            ignore: ["*.DS_Store", "Thumbs.db"],
          },
        },
      ],
    }),
  ],
};
