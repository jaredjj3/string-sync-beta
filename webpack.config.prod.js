const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(
  fs.readFileSync(path.join(__dirname, 'client', 'src', 'styles', 'vars', 'overrides.less'), 'utf8')
);
const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, '')
]

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: './client/src/note8.tsx',
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js',
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  devtool: 'source-map',
  resolve: {
    modules: [path.resolve(__dirname, 'client', 'src'), 'node_modules'],
    extensions: [
      '.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', 'd.ts',
      '.js',
      '.jsx',
      '.react.js'
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin({
      filename: '../stylesheets/app.css',
      allChunks: true
    })
  ],
  module: {
    loaders: [
       {
         test: /\.(svg)$/i,
         loader: 'svg-sprite-loader',
         include: svgDirs
       }, {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { 
            loader: "less-loader",
            options: {
              modifyVars: themeVariables,
              paths: [
                path.resolve(__dirname, 'client', 'src', 'styles'),
                path.resolve(__dirname, 'node_modules')
              ]
            }
          },
        ]
      }, {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
      }, {
        test: [/\.tsx?$/],
        use: [
          { 
            loader: 'babel-loader',
          }, { 
            loader: 'ts-loader',
            query: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  }
};