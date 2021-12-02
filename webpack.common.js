const path = require('path')
const HtmlWebpacklugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin');
var webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: [
    './src/index.js',
    'webpack-dev-server/client?http://localhost:3000/'
  ],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        loader: 'file-loader',
        options: {
          name: 'public/icons/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpacklugin({
      template: './index.html'
    }),
    new ESLintPlugin({
      fix: true,
      overrideConfigFile: path.resolve(__dirname, '.eslintrc.js')
    }),
    new webpack.HotModuleReplacementPlugin({multistep: true}),
    new Dotenv({
      path: './.env',
      safe: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    port: 3000,
    progress: true,
    hot: true,
    host: '127.0.0.1',
    open: true,
    historyApiFallback: true,
    watchContentBase: true,
    quiet: true,
    proxy: {
      '/api': {
        target: 'http://myapp.stagging.cf/api/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    watchOptions: {
      poll: true,
      aggregateTimeout: 300,
      poll: 1000,
      ignored: [
        path.resolve(__dirname, 'node_modules')
      ],
    }
  },
  devtool: 'inline-source-map'
}
