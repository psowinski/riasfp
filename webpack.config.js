/* eslint-disable */
var path = require('path');
var nodeExternals = require('webpack-node-externals');
var nodemonPlugin = require('nodemon-webpack-plugin');
var cleanPlugin = require('clean-webpack-plugin');

function resolve(filePath) {
  return path.join(__dirname, filePath);
}

var isProduction = process.argv.indexOf('-p') >= 0;
console.log(
  'Bundling for ' + (isProduction ? 'production' : 'development') + '...'
);

function getPlugins(env) {
  var plugins = [new cleanPlugin()];
  if (env && env.nodemon) {
    console.log('Running node deamon...');
    plugins.push(
      new nodemonPlugin({
        watch: resolve('./dist')
      })
    );
  }
  return plugins;
}

module.exports = env => {
  return {
    mode: isProduction ? 'production' : 'development',
    devtool: 'source-map',
    entry: resolve('./src/index.js'),
    target: 'node',
    externals: [nodeExternals()],
    output: {
      filename: 'bundle.js',
      path: resolve('./dist'),
      library: 'lib',
      libraryTarget: 'commonjs2'
    },
    plugins: getPlugins(env),
    resolve: {
      modules: ['node_modules', resolve('./node_modules/')],
      extensions: ['*', '.mjs', '.js', '.json']
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          type: 'javascript/auto',
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: { presets: ['@babel/env'] }
          }
        }
      ]
    }
  };
};
