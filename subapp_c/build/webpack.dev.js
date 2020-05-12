const webpack = require('webpack');
const merge = require('webpack-merge');
// const path = require('path');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'development',
  // 开发环境本地启动的服务配置
  devServer: {
    port: 9003,
    hot: true,
    open: false,
    historyApiFallback: true,
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // 接口代理转发
    proxy: {
      '/testapi': {
        target: 'https://www.easy-mock.com/mock/5dff0acd5b188e66c6e07329/react-template',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/testapi': '' },
      },
    },
  },
  plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()],
  devtool: 'eval-source-map',
});
