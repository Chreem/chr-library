const webpack = require('webpack')
    , merge = require('webpack-merge')
    , path = require('path')
    , rimraf = require('rimraf')
    , BrowserSyncPlugin = require('browser-sync-webpack-plugin')
    , ExtractTextPlugin = require('extract-text-webpack-plugin')
    , HtmlWebpackPlugin = require('html-webpack-plugin')
;

function selfGetName(path) {
    return path.slice(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
}

function selfAdd2Entry(path) {
    this.config.entry[selfGetName(path)] = this.basePath + path
}

function selfFoundLoader(name) {
    return this.config.module.rules.filter(item => item.test.test(name))[0]
}

let vendorPriority = 0;

function selfFormatVendors(vendors) {
    vendors.map(({name, chunks}) => {
        let chunkStr = '';
        if (chunks.length >= 1) {
            chunks.map(chunk => {
                chunkStr += chunk + '|'
            });
            chunkStr = chunkStr.slice(0, -1);
            chunkStr = `(${chunkStr})`;
        }
        this.config.optimization.splitChunks.cacheGroups[name] = {
            name,
            filename: name + '.js',
            priority: vendorPriority -= 10,
            test: new RegExp('[\\\\/]node_modules[\\\\/]' + chunkStr),
            chunks: 'all'
        }
    });
}

const vendors = [];

class Mix {
    constructor(basePath) {
        this.basePath = basePath || './';
        if (this.basePath.slice(-1) !== '/') this.basePath += '/';
        this.devMode = true;
        this.isReact = false;
        this.isVue = false;
        this.outputPath = path.resolve(__dirname, `.${this.basePath}dist`);
        this.config = {
            entry: {},
            output: {
                path: this.outputPath,
                filename: '[name].[hash:5].js',
            },
            module: {
                rules: [
                    {test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/},
                    {test: /\.tsx?$/, loader: "ts-loader"},
                    // {test: /\.tsx?$/, loader: "awesome-typescript-loader"},
                    {test: /\.css$/, loader: ['style-loader', 'css-loader', 'postcss-loader']},
                    {test: /\.less$/, loader: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']},
                    {test: /\.mp3$/, loader: 'file-loader', options: {name: '[name].[ext]'}},
                    {
                        test: /\.(jpg|png|gif|svg)$/,
                        loader: 'url-loader',
                        options: {limit: 4096, name: '[name].[ext]'}
                    },
                ]
            },
            resolve: {
                extensions: ['*', '.js', '.jsx', '.less', '.ts', '.tsx'],
                alias: {
                    '~components': path.resolve('./components'),
                    '~vendor': path.resolve('./vendor')
                }
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: this.basePath + 'index.template.html',
                    filename: 'index.html'
                })
            ],
            optimization: {
                splitChunks: {
                    cacheGroups: {}
                }
            },

            /**
             * import操作会改变为从全局变量获取而不是node_modules里
             * 用于相应CDN
             */
            // externals: {
            //     "react": "React",
            //     "react-dom": "ReactDOM"
            // },
        };

        this.webpackConfig = this.webpackConfig.bind(this)
    }

    js() {
        selfAdd2Entry.apply(this, arguments);
        return this;
    }

    vue() {
        if (!this.isVue) {
            this.config.module.rules.push({
                test: /\.vue?$/,
                loader: 'vue-loader',
                options: {}
            });
            this.isVue = true;
        }
        selfAdd2Entry.apply(this, arguments);
        return this;
    }

    react() {
        if (!this.isReact) {
            /**
             * some adapter
             */
            this.isReact = true;
        }
        selfAdd2Entry.apply(this, arguments);
        return this;
    }

    html(path, outname, opt) {
        const options = opt || {};
        options.template = this.basePath + (path || 'index.template.html');
        outname ? options.filename = outname : void 0;
        this.config.plugins.push(new HtmlWebpackPlugin(options));
        return this;
    }

    vendor(p, name) {
        name = name || 'vendor';
        if (!vendors.filter(item => (item.name === name))[0]) {
            vendors.push({name, chunks: []})
        }
        if (!p) return this;
        const vendor = vendors.filter(item => (item.name === name))[0];
        if (p.constructor === String) {
            vendor.chunks.push(p)
        } else if (p.constructor === Array) {
            vendor.chunks = vendor.chunks.concat(p);
        }
        return this;
    }

    webpackConfig(config) {
        this.config = merge(this.config, config);
        return this;
    }

    output(outpath) {
        this.config.output.path = path.resolve(__dirname) + outpath;
        return this;
    }

    dev() {
        this.devMode = true;
        this.config.devtool = 'cheap-module-eval-source-map';
        this.config.plugins.push(new BrowserSyncPlugin({
            host: 'localhost',
            port: 80,
            open: false,
            proxy: 'http://localhost:8080'
        }, {reload: false}));
        return this.config;
    }

    prod(publicPath) {
        this.devMode = false;
        const cssLoader = selfFoundLoader.call(this, 'a.css');
        cssLoader.loader = ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader']
        });
        const lessLoader = selfFoundLoader.call(this, 'a.less');
        lessLoader.loader = ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader', 'less-loader']
        });
        const vueLoader = selfFoundLoader.call(this, 'a.vue');
        if (!!vueLoader) vueLoader.options.extractCSS = true;
        this.config.plugins.push(new ExtractTextPlugin('style.[hash:5].css'));
        if (!!publicPath) this.config.output.publicPath = publicPath;
        if (vendors.length >= 1) selfFormatVendors.call(this, vendors);
        rimraf(this.config.output.path, () => console.log(this.config.output.path + ' is clean'));
        return this.config;
    }
}

module.exports = Mix;
