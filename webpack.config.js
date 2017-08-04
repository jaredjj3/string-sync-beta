const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

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
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['import', { libraryName: 'antd', style: 'css' }]
        }
      }, {
        test: [/\.tsx?$/],
        loaders: 'babel-loader?presets[]=es2015&presets[]=react!ts-loader'
      }
    ]
  }
}
