const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/client.js",
  target: "web",
  module: {
    // exclude node_modules
    rules: [
      {
        test: /\.(js|jsx)$/,         // <-- added `|jsx` here
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],    // <-- added `.jsx` here
  },
  output: {
    filename: "client.js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
  // devServer: {
  //   static: {
  //     directory: path.join(__dirname, "build"),
  //   },
  //   port: 3000,
  // }
};