const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const fs = require('fs');

const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(
  fs.readFileSync(path.join(__dirname, 'client', 'src', 'styles', 'vars', 'antd-overrides.less'), 'utf8')
);

module.exports = {
  context: __dirname,
  entry: './client/src/stringSync.tsx',
  devtool: 'source-map',
  resolve: {
    modules: [path.resolve(__dirname, "client", "src"), "node_modules"],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts']
  },
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    publicPath: '/assets/',
    filename: 'bundle.js',
    hotUpdateChunkFilename: 'hot-update.js',
    hotUpdateMainFilename: 'hot-update.json',
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'client', 'src'),
    proxy: {
      '**' : 'http://localhost:3000'
    },
    headers: { 
      "X-Custom-Header": "yes"
    },
    stats: { 
      colors: true 
    }, 
    inline: true
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { 
            loader: "less-loader",
            options: {
              modifyVars: themeVariables
            }
          },
        ]
      }, {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        }
      }, {
        test: [/\.tsx?$/],
        loaders: 'babel-loader?presets[]=es2015&presets[]=react!ts-loader'
      }
    ]
  }
}
