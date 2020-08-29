const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/client/index.js',
  output: {
    libraryTarget: 'var',
    library: 'Client'
  },
  mode: 'development',
  devtool: 'source-map',
  stats: 'verbose',

  module: {
    rules: [
      { 
        test: /\.pug$/,
        use: ['pug-loader']
      },
      {
        test: '/.js$/',
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader?name=images/[name].[ext]']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/client/views/index.pug',
    }),
     // We need to set our desired filename for login page.
  new HTMLWebpackPLugin({
    filename: 'login.html',
    template: './src/client/views/login.pug'
  }),
   // We need to set our desired filename for profile page.
   new HTMLWebpackPLugin({
    filename: 'profile.html',
    template: './src/client/views/profile.pug'
  }),
  new HtmlWebpackPugPlugin(),
    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: true,
      // Write Logs to Console
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
    })
  ]
};