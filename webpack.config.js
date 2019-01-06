const pkg = require('./package.json');
const path = require('path');
const pkgName = pkg.name.split('-').map(x => x[0].toUpperCase() + x.slice(1)).join('');

module.exports = {
  entry: {
    index: './index.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].js',
    library: pkgName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
};
