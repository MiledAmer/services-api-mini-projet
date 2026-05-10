const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (options) => ({
  ...options,
  plugins: [
    ...options.plugins,
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../../proto'),
          to: path.resolve(__dirname, '../../dist/apps/stock-service/proto'),
        },
      ],
    }),
  ],
});