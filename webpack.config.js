const { resolve } = require('path');

module.exports = env => {

  const isProd = !!env.production;

  return {
    mode: isProd ? 'production' : 'development',
    entry: 'index.js',
    output: {
      
    } 
  }
}