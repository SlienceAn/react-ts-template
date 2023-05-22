//開發環境
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const variable = require('./webpackUtils/variable');
//引入熱更新
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { DIST_PATH } = variable;

const config = {
    mode: 'development',
    cache: { type: 'memory' },//使用記憶體緩存
    devtool: 'eval-cheap-module-source-map',
    stats: 'errors-only',
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
    },
    devServer: {
        open: {
            target: ['index.html'],
            app: {
                name: 'chrome',
            },
        },
        compress: true,
        host: 'localhost',
        hot: true,
        port: 8080,
        client: {
            logging: "error",
        },
        static: {
            directory: DIST_PATH
        }
    },
    plugins: [new ReactRefreshWebpackPlugin()].filter(Boolean),
    watchOptions: {
        aggregateTimeout: 500,
        poll: 1000,
        ignored: /node_modules/,
    }
}

const mergeConfig = webpackMerge.merge(baseConfig, config);
module.exports = mergeConfig;