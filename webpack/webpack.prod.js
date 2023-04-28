//生產環境
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const variable = require('./webpackUtils/variable');

const config = {
    mode: 'production',
    cache: { type: 'filesystem', buildDependencies: { config: [__filename] } },//使用文件缓存
    optimization: {
        minimize: true,
        moduleIds: 'deterministic',
        splitChunks: {
            chunks: 'all',
            automaticNameDelimiter: '-',
            cacheGroups: {
                //第三方組件
                vendor: {
                    name: 'vendors',
                    enforce: true,
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                },
                default: {
                    minSize: 0, // 分離後的最小塊文件大小默認3000
                    name: 'common', // 用以控制分離後模塊的命名
                    minChunks: 3, // 最小共用次数
                    priority: 10, 
                    reuseExistingChunk: true,
                }
            }
        }
    }
}

const mergeConfig = webpackMerge.merge(baseConfig, config)
module.exports = mergeConfig;