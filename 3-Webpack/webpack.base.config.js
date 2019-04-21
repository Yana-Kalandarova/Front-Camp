const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoader = require('svg-sprite-loader/plugin');
const path = require('path');

const isProduction = (process.env.NODE_ENV.trim() === 'production');

module.exports = {
  entry: ['@babel/polyfill', 'whatwg-fetch', './index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: (isProduction) ? MiniCssExtractPlugin.loader : 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-sprite-loader',
          options: {
            name: '[name].svg',
            outputPath: 'img/',
          },
        },
      },
    ],
  },
  plugins: [
    new SpriteLoader({
      plainSprite: true,
      spriteAttrs: { hidden: true },
    }),
  ],
};
