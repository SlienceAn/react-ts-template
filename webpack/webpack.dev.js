//開發環境
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const variable = require('./webpackUtils/variable');

const { DIST_PATH } = variable;

const config = {
    mode: 'development',
    cache: { type: 'memory' },//使用記憶體緩存
    devtool: 'eval-cheap-module-source-map',
    stats: 'errors-only',
    devServer: {
        open: 'chrome'
    },
    module: {
        rules: [
            {   //打包靜態資源
                test: /\.(png|jpg|gif|jpeg|webp|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[hash][ext][query]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[hash][ext][query]',
                },
            }
        ]
    }
}

const mergeConfig = webpackMerge.merge(baseConfig, config);
module.exports = mergeConfig;