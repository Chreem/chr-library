const path = require('path');
const webpack = require('webpack');
let config = undefined;
let url = undefined;
const Mix = require('./config/webpack.mix');

// TODO 项目目录
const sina = new Mix('./sina/20180411-hbh');
sina.vue('index.js');
config = sina;
url = 'http://n.sinaimg.cn/hb/hbh/';

// TODO vendor在css加载上有bug待解决
// .vendor(['react', 'jquery'], 'common')
// .vendor();

module.exports = process.env.NODE_ENV === 'production' ? config.prod(url) : config.dev();
