const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin=require('html-webpack-pug-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const fs = require('fs');

// Our function that generates our html plugins
function generateHtmlPlugins(templateDir){
  const templateFiles=fs.readdirSync(path.resolve(__dirname,templateDir));
  return templateFiles.map(item=>{
    // Split names and extension
    const parts=item.split('.')
    const name =parts[0]
    const extension=parts[1]
    return new HtmlWebpackPlugin({
      filename:`${name}.html`,
      template:path.resolve(__dirname,`${templateDir}/${name}.${extension}`)
    })
  })
}

// Call our function on our views directory.
const htmlPlugins = generateHtmlPlugins('./src/client/views')

module.exports = {
  //entry: './src/client/index.js',
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },

  module: {
    rules: [
      { 
        test: /\.pug$/,
        use: [
          "raw-loader",
          "pug-html-loader"
        ]
      },
      {
        test: '/.js$/',
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader, // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run postcss actions
          options: {
            plugins: function () { // postcss plugins, can be exported to postcss.config.js
              return [
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
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader?name=media/[name].[ext]']
      }

    ]
  },
  plugins: [
    /* Use the ProvidePlugin constructor to inject jquery implicit globals */
  
   /* new HtmlWebpackPlugin({
      template: './src/client/views/index.pug'
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
  }),*/

  new HtmlWebpackPlugin({
    template: 'src/client/views/index.pug',
    filename: 'index.html',
 
  }),
  new HtmlWebpackPlugin({
    template: './src/client/views/login.pug',
    filename: 'login.html',
  
  }),
  new HtmlWebpackPugPlugin(),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
  ]  //We join our htmlPlugin array to the end of our webpack plugins array.
};