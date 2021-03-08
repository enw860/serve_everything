const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const outputDirectory = "dist";

module.exports = {
  entry: {
    "main": "./client/main/index.js",
    "auth": "./client/auth/index.js"
  },
  resolve: {
    extensions: [".vue", ".js", ".jsx", ".less", ".css"]
  },
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "[name]/[name].bundle.js",
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]/[name].bundle.min.css"
    }),
    new HtmlWebpackPlugin({
      title: 'User center',
      favicon: "./public/favicon.ico",
      template: "./public/index.html",
      filename: "index.html",
      chunks: ["main"]
    }),
    new HtmlWebpackPlugin({
      title: 'Auth center',
      favicon: "./public/favicon.ico",
      template: "./public/index.html",
      filename: "auth/index.html",
      chunks: ["auth"]
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
            "default",
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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }, {
        test: /\.vue$/,
        loader: "vue-loader"
      }, {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
      }, {
        test: /\.(ico|jpe?g|png|svg|gif)$/,
        use: [{
          loader: "file-loader",
          options: {
            publicPath: "images",
            outputPath: "images"
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
      "/": "http://localhost:8080"
    }
  }
}