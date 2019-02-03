const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const CleanWebpackPlugin = require('clean-webpack-plugin');

const autoprefixer = require('autoprefixer');
const devMode = process.env.NODE_ENV !== 'production'

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

    extensions: [ '.js', '.css', '.sass', '.scss', 'woff',  'woff2', 'ttf', 'eot', 'svg']
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

          /* for SASSjj*/
        {
          test: /\.(sass|scss)$/,
          exclude: /(node_modules)/,
          use: [

                devMode ? 'style-loader' : MiniCssExtractPlugin.loader,

              {
                loader: 'css-loader',
                  options:{
                    sourceMap: true,

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
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
              loader: 'url-loader',
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
        }


          /*{
        test: /\.(eot|ttf|woff|woff2|otf)$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[ext]',
                outputPath: './fonts/',
                publicPath: '/'
              }
            }
          ]
        },*/

/*
        {
          test: /\.svg$/,
          exclude: /(node_modules)/,

          use: 'svg-url-loader'
        }*/
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
    }),

    new MiniCssExtractPlugin({
      filename: devMode ? 'style.css' : '[name].[hash].css',
      outputPath: './css/'
    })
/*
    new MiniCssExtractPlugin({
      filename: './css/style.css'
    })
*/
  ]

}
