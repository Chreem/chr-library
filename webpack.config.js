const path = require('path');
const webpack = require('webpack');
let config = undefined;
let url = undefined;
const Mix = require('./config/webpack.mix');

// TODO 项目目录
const sina = new Mix('./project');
sina.react('index.js');
config = sina;
// url = '//n.sinaimg.cn/hb/hgly/';
//
sina.lib({
    // 'react': 'React',
    // 'react-dom': 'ReactDOM',
    // 'three': 'THREE'
    // 'swiper': 'Swiper',
    // 'jquery': 'jQuery'
});


// const three = new Mix('./sina/20180504-hgly');
// three.react('index.js');
// three.lib({
//     'react': 'React',
//     'react-dom': 'ReactDOM',
//     'three': 'THREE'
// });
// config = three;

// TODO vendor在css加载上有bug待解决
// .vendor(['react', 'jquery'], 'common')
// .vendor();

module.exports = process.env.NODE_ENV === 'production' ? config.prod(url) : config.dev();
