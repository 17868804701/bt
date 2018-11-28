'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL:'"http://192.168.1.116:8702"',//全局接口路径
  upload_BASE_URL:'"http://10.50.0.144:8088/"',//文件资源路径
  logoutUrl:'"http://localhost:8081/#/"'//登陆后跳转路径
});
