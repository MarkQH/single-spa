'use strice'
const { resolve } = require('path');
const packageName = require('../package.json').name;
const prodConfig = require("./webpack.prod");
const devConfig = require("./webpack.dev");
const merge = require("webpack-merge");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const generateConfig = (isProd) => {
  return {
    stats: {
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    },
    mode: isProd ? 'production' : 'development',
    entry: resolve(__dirname, '../index.js'),
    output: {
      path: resolve(__dirname, '../dist'),
      publicPath: isProd ? './' : '/',
      chunkFilename: 'js/vendors_[id]_[hash:5].js',
      filename: 'js/[name]_entry_[hash:5].js',
      hotUpdateChunkFilename: 'hot-update.js',
      // 把子应用打包成 umd 库格式
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`,
    },
    resolve: {
      alias: {
        "@src": resolve(__dirname, '../src')
      } 
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        },
        {
          oneOf: [
            {
              test: /\.(jpg|jpeg|png|gif)$/,
              loader: 'url-loader',
              options: {
                outputPath: 'images',
                limit: 8 * 1024,
                esModule: false,
                name: '[hash:10].[ext]'
              }
            },
            {
              test: /\.(eot|woff2?|ttf|svg)$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    name: "[hash:10].[ext]",
                    limit: 5 * 1024,
                    outputPath: 'fonts'
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
    ]
  };
};

module.exports = env => {
  const isProd = !!env.production;
  const config = (isProd ? prodConfig : devConfig);
  return merge(generateConfig(isProd), config);
}