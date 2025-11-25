const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: '/',
    clean: true,
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
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/webrtc'), to: 'src/webrtc' },
      ],
    }),
  ],
  devtool: "source-map",
  devServer: {
    port: 3002,
    server: { type: 'https' },
    static: [
      { directory: path.join(__dirname, "public"), publicPath: '/' },
      { directory: path.join(__dirname, "src"), publicPath: '/src' },
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
