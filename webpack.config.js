const path = require('path');

module.exports = [
  ['index', 'Favicon'],
  ['badge', 'FaviconBadge'],
  ['emoji', 'FaviconEmoji'],
  ['video', 'FaviconVideo']
].map(([file, library]) => {
  return {
    entry: `./src/${file}.ts`,
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
      filename: `${file}.js`,
      path: path.resolve(__dirname, 'dist'),
      library,
      libraryExport: 'default',
      libraryTarget: 'umd'
    }
  };
});
