const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  entry: './src/app.ts',
  mode: 'development',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts|js?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new NodemonPlugin(),
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.json' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};