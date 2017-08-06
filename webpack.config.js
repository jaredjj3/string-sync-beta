const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const fs = require('fs');

const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(
  fs.readFileSync(path.join(__dirname, 'client', 'src', 'styles', 'vars', 'overrides.less'), 'utf8')
);

module.exports = {
  context: __dirname,
  entry: './client/src/stringSync.tsx',
  devtool: 'source-map',
  resolve: {
    modules: [path.resolve(__dirname, "client", "src"), "node_modules"],
    extensions: ['', '.js', '.jsx', '.web.js', '.json', '.ts', '.tsx', '.d.ts']
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
        query: {
          plugins: [
            ['import', { libraryName: 'antd', style: true}],
            ['import', { libraryName: 'antd-mobile', style: true }]
          ],
          presets: ['es2015', 'react'],
        }
      }, {
        test: [/\.tsx?$/],
        loaders: 'babel-loader?presets[]=es2015&presets[]=react!ts-loader'
      }
    ]
  }
}
