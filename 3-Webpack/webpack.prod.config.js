const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.base.config');
const path = require('path');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  /*module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
        ],
      },
    ],
  },*/
  plugins: [
    /*new UglifyJSPlugin({
      sourceMap: true,
    }),*/
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
});
