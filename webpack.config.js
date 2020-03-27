
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],

  },
};
