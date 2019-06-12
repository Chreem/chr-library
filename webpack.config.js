const fs = require('fs');
const path = require('path');
require('@babel/register')(JSON.parse(fs.readFileSync('./config/.babelrc')));
const WebpackConfig = require('./config/webpack.conf');

const config = new WebpackConfig('./src');
const url = '/';
config.react('app.tsx');
config.setDistPath(path.resolve(__dirname, './public'));
if (process.env.NODE_ENV === 'production') {
  config.lib({
    'react': 'React',
    'react-dom': 'ReactDOM'
  });
}
module.exports = process.env.NODE_ENV === 'production' ? config.prod(url) : config.dev();