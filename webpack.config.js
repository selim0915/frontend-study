const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, './public', 'favicon.ico'),
      template: path.resolve(__dirname, './public', 'index.html'),
      filename: 'index.html'
    }),
  ],
  devtool: "source-map",
  devServer: {
    port: 3000,
    server: { type: 'https' },
    static: [
      { directory: path.join(__dirname, "public"), publicPath: '/' },
      { directory: path.join(__dirname, "src"), publicPath: '/src' }, // /src도 정적 서빙
    ],
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
