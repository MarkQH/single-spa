const webpack = require("webpack");
const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const port = 9501;
module.exports = {
  mode: 'development',
  output: {
    publicPath: `//localhost:${port}`
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
      {
        test: /\.less$/,
        use: ['vue-style-loader', 'css-loader', 'less-loader']
      },
    ]
  },
  devtool: "eval-source-map",
  devServer: {
    // open: true,
    port,
    hot: true,
    overlay: true,
    clientLogLevel: "error",
    // contentBase: resolve(__dirname, '../public'),
    // watchContentBase: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../public/index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}