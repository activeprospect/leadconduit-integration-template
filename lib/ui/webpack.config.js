const path = require('path');

module.exports = {
  context: path.join(__dirname, 'public'),
  entry: './app/index.js',
  output: {
    path: path.join(__dirname, 'public/dist'),
    publicPath: '/dist',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: { loader: 'text-loader' }
      }
    ]
  }
};
