const path = require('path');
const webpackUtils = require('./util');
const dotenv = require('dotenv');

const { config: loadConfig } = dotenv;
//__dirname 當前目錄文件路徑
const NODE_ENV = webpackUtils.getEnv();
const DIST_PATH = path.resolve(__dirname, '../../', 'dist');
const SRC_PATH = path.resolve(__dirname, '../../', 'src');
const PUBLIC_PATH = path.resolve(__dirname, '../../', 'public');
const ROOT_PATH = path.resolve(__dirname, '../../');
const IS_PRO = NODE_ENV === 'prod';
const IS_DEV = NODE_ENV === 'dev';
//當前構建版本
const version = webpackUtils.getVersion();

function getCDNPath() {
  return IS_PRO ? `${process.env.CDN_ROOT}/${version}/` : './';
}

const ENV_CONFIG_PATH = path.resolve(ROOT_PATH, 'env', `${NODE_ENV}.env`);

//webpack 读取env 配置
loadConfig({
  path: ENV_CONFIG_PATH,
});

console.log('NODE_ENV => ', NODE_ENV);

console.log('version => ', version);

module.exports = {
  DIST_PATH,
  SRC_PATH,
  PUBLIC_PATH,
  ROOT_PATH,
  IS_PRO,
  IS_DEV,
  getCDNPath,
  ENV_CONFIG_PATH,
};