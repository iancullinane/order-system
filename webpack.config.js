const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './app/index.jsx',
  devtool: 'source-map',
  watch: true,
  devServer: {
    contentBase: './dist/',
    hot: true
  },
  resolve: {
    modules: [    
      path.resolve('./app'),
      path.resolve('./node_modules')
    ],
    extensions: ['.js', '.jsx']
  },
  module:{
    loaders:[{
        test:/\.scss$/,
        // the are used in reverse order, output of sass-loader->css-loader->
        // stlye->loader injects it into the html
        use:['style-loader','css-loader', 'sass-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            query: {
              // If you set something here, also set it in .babelrc
              presets: ['es2016', 'react'],
              plugins: ['transform-class-properties','syntax-async-functions']
          }
        }
      }]
  },
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Pesto',
      template: './app/index-template.html',
      inject: true,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist'
  }
};