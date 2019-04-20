const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  //devtool: 'inline-source-map',
  /*module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },*/
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },
});
