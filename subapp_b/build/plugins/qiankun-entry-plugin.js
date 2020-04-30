
const HtmlWebpackPlugin = require('html-webpack-plugin');

class QiankunEntryPlugin {
  constructor(options) {
    this.options = options;
  }
  apply (compiler) {
    compiler.hooks.compilation.tap('QiankunEntryPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(
        'QiankunEntryPlugin',
        (data, cb) => {
          if(data.assetTags.scripts.length > 0) {
            const target = this.options.target;
            data.assetTags.scripts.map(item => {
              if(item.attributes.src.includes(target)) {
                item.attributes['entry'] = true;
              };
              return item;
            })
          }
          console.log('===========');
          console.log(this.options.target);
          console.log('===========');
          console.log(data.assetTags.scripts);
          console.log('===========');
          // Tell webpack to move on
          cb(null, data);
        }
      );
    })
  }
}
module.exports = QiankunEntryPlugin;
