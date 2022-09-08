const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/server.js",
  target: "node",
  name: "server",
  mode: "development",
  externals: [nodeExternals()],
  module: {
    // exclude node_modules
    rules: [
      {
        test: /\.(js|jsx)$/, // <-- added `|jsx` here
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"], // <-- added `.jsx` here
  },
  output: {
    filename: "server.js",
    // library: 'app',
    path: path.resolve(__dirname, "build"),
    libraryTarget: "commonjs2",
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: path.join(__dirname, "public", "index.html"),
  //   }),
  // ],
  // devServer: {
  //   static: {
  //     directory: path.join(__dirname, "build"),
  //   },
  //   port: 3000,
  // }
};
