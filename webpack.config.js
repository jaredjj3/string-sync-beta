const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');

const isProduction = process.argv.indexOf('-p') >= 0;
const outPath = path.join(__dirname, 'app', 'assets', 'javascripts');
const sourcePath = path.join(__dirname, 'client', 'src');
const themeVariables = lessToJs(
  fs.readFileSync(
    path.join(__dirname, 'client', 'src', 'styles', 'overrides.less'), 'utf8'
  )
);

module.exports = {
  context: sourcePath,
  entry: {
    main: './stringSync.tsx',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'recompose',
      'redux'
    ]
  },
  output: {
    path: outPath,
    publicPath: '/assets/',
    filename: 'bundle.js',
  },
  target: 'web',
  resolve: {
    modules: [
      path.join(__dirname, 'client', 'src'),
      path.join(__dirname, 'node_modules')
    ],
    extensions: ['.js', '.ts', '.tsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // https://github.com/Microsoft/TypeScript/issues/11677
    mainFields: ['browser', 'main']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        use: isProduction
          ? 'awesome-typescript-loader?module=es6'
          : [
            'react-hot-loader/webpack',
            'awesome-typescript-loader'
          ]
      }, {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'less-loader',
            query: {
              modifyVars: themeVariables,
              paths: [
                path.resolve(__dirname, 'client', 'src', 'styles'),
                path.resolve(__dirname, 'node_modules')
              ]
            }
          }
        ]
      }, { 
        test: /\.html$/, use: 'html-loader'
      }, { 
        test: /\.png$/, use: 'url-loader?limit=10000'
      }, {
        test: /\.jpg$/, use: 'file-loader' 
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isProduction === true
        ? JSON.stringify('production')
        : JSON.stringify('development')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: Infinity
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: !isProduction
    })
  ],
  devServer: {
    contentBase: sourcePath,
    hot: true,
    stats: {
      warnings: false
    },
    proxy: {
      '**' : 'http://localhost:3000'
    },
    headers: { 
      "X-Custom-Header": "yes"
    },
  },
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty'
  }
};
