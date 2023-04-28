//基礎配置
const path = require('path');
const variable = require('./webpackUtils/variable');
const resolveConfig = require('./webpackUtils/resolve');
const plugins = require('./webpackUtils/plugins');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { SRC_PATH, DIST_PATH, IS_DEV, IS_PRO, getCDNPath } = variable;

const config = {
    entry: {
        index: path.join(SRC_PATH, 'index.tsx'),
    },
    output: {
        path: DIST_PATH,
        filename: IS_DEV ? 'js/[name].bundle.js' : 'js/[name].[contenthash:8].bundle.js',
        publicPath: getCDNPath(),
        globalObject: 'this',
        chunkFilename: IS_DEV ? 'js/[name].chunk.js' : 'js/[name].[contenthash:8].chunk.js',
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true,
    },
    //loader的執行顺序默認從右到左，多個loader用[],字符串只用一個loader，也可以是物件的格式
    module: {
        rules: [
            {
                test: /\.(tsx?|js)$/,
                include: [SRC_PATH],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    }
                }],
                exclude: [/node_modules/, /public/, /(.|_)min\.js$/]
            },
            {
                test: /\.css$|\.scss$/i,
                include: [SRC_PATH],
                exclude: /node_modules/,
                use: [
                    IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            sourceMap: !IS_PRO
                        }
                    },
                    'postcss-loader',
                    'sass-loader',
                    {
                        //導入css預處理器的一些公共的樣式文件變量
                        loader: 'style-resources-loader',
                        options: {
                            patterns: path.resolve(SRC_PATH, 'assets', 'css', 'core.scss'),
                        },
                    }
                ]
            }
        ]
    },
    resolve: resolveConfig,
    plugins: plugins.getPlugins()
}
module.exports = config