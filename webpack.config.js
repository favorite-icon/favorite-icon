const path = require('path');

const packages = [
  ['favorite-icon', 'Favicon'],
  ['favorite-icon-badge', 'FaviconBadge'],
  ['favorite-icon-emoji', 'FaviconEmoji'],
  ['favorite-icon-video', 'FaviconVideo'],
  ['favorite-icon-status', 'FaviconStatus']
];

module.exports = packages.map(([package, library]) => {
  return {
    entry: `./packages/${package}/src/index.ts`,
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
      filename: `index.js`,
      path: path.resolve(__dirname, `./packages/${package}/dist/`),
      library,
      libraryExport: 'default',
      libraryTarget: 'umd'
    }
  };
});
