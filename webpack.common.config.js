const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const CleanWebpackPlugin = require('clean-webpack-plugin');

const autoprefixer = require('autoprefixer');


module.exports = {

  entry:{
      index: ['./src/js/index.js',/*'./src/sass/style.sass'*/]
      //style: './src/sass/style.sass'
  },


  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].bandle.js',
    //  chunkFilename: '[name].[hash].bandle.js',
      publicPath: '/'
  },


  resolve: {
      modules: [
        'node_modules',
        path.resolve(__dirname, 'src/libs'),
        path.resolve(__dirname, 'src/fonts') //?????
      ],

    extensions: [ '.js', '.css', '.sass']
  },


  optimization: {
      runtimeChunk: 'single',
      splitChunks: {
          cacheGroups: {

              vendor: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'vendors',
                  chunks:'all'
              }

          }
      }
  },


  module: {
    rules: [

        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use:
            {
              loader: 'babel-loader',
              options: {
                  presets: ['@babel/preset-env']
              }
           }

        },

            /* for SASS*/
        {
          test: /\.(sass|scss)$/,
          exclude: /(node_modules)/,
          use: [
                {
                  loader: 'style-loader'
                },
          //  MiniCssExtractPlugin.loader,

              {
                loader: 'css-loader',
                  options:{
                    sourceMap: true
                  }
              },

              {
                loader: 'postcss-loader',
                options: {
                  plugins: [autoprefixer('last 2 version')],
                  sourceMap: true
                }
              },

              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
          ]
        },

        {
          test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          use: [{
              loader: 'file-loader',
              options: {
              name: '[name].[ext]',
              outputPath: './fonts/',
              publicPath: '/'
              }
          }]
        },

        {
          test: /\.css$/,
          exclude: /(sass)/,
          use: [ 'style-loader', 'css-loader']
        },

        {
          test: /\.(png|gif|jpg|jpeg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[ext]',
                outputPath: './img/',
                publicPath: '/'

              }
            }
          ]
        },


        {
          test: /\.(eot|ttf|woff|woff2|otf)$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: './fonts/[name].[ext]',
                publicPath: '/'
              }
            }
          ]
        },


        {
          test: /\.svg$/,
          use: 'svg-url-loader'
        }
    ]
  },

  plugins: [

  //  new CleanWebpackPlugin(['dist']),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Quotes',
      template: './src/index.html',
      inject: true,
      sourceMap: true,
      minify:{
        removeComments: true,
        collapseWhitespace: true
      }
    })
/*
    new MiniCssExtractPlugin({
      filename: './css/style.css'
    })
*/
  ]

}
