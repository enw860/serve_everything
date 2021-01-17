const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
  entry: {
    main: './client/main/index.js',
    example1: './client/example1/index.js',
    example2: './client/example2/index.js'
  },
  resolve: {
    extensions: ['.js', '.less', '.css']
  },
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: '[name]/[name].bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]/[name].bundle.min.css'
    }),
    new HtmlWebpackPlugin({
      favicon: "./public/favicon.ico",
      template: './public/index.html',
      filename: 'index.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      favicon: "./public/favicon.ico",
      template: './public/index.html',
      filename: 'example1/index.html',
      chunks: ['example1']
    }),
    new HtmlWebpackPlugin({
      favicon: "./public/favicon.ico",
      template: './public/index.html',
      filename: 'example2/index.html',
      chunks: ['example2']
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true
              }
            }
          ],
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      }, {
        test: /\.(ico|jpe?g|png|svg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            publicPath: 'images',
            outputPath: 'images'
          },
        }]
      }
    ]
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    overlay: true,
    port: 8000,
    stats: {
      normal: true
    },
    proxy: {
      '/': 'http://localhost:8080'
    }
  }
}