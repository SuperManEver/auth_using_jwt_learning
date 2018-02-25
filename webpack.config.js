var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.join(__dirname, '/public');
var APP_DIR = path.join(__dirname, '/src');

var config = {
  entry: {
    whm: 'webpack-hot-middleware/client',
    main: APP_DIR + '/app.jsx',
    vendor: APP_DIR + '/vendor.js',
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.js',
  },
  devServer: {
    contentBase: BUILD_DIR,
    publicPath: '/',
    historyApiFallback: true,
    hot: true,

    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['main', 'vendor'],
    }),
    new HtmlWebpackPlugin({
      template: APP_DIR + '/index.html',
    }),
    new ExtractTextPlugin('styles.css'),
  ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        include: APP_DIR,
        loader: 'babel-loader',
        exclude: /node_modules/,
        /*
        query: {
          cacheDirectory: true,
        },
        */
      },
      {
        test: /\.(css|scss)$/,
        include: APP_DIR,
        loader:
          'style-loader!css-loader?modules&localIdentName=[name]__[local]__[hash:base64:5]&camelCase!postcss-loader!sass-loader',
      },
      {
          test: /\.(scss|css)$/,
          use: [
            'style-loader',
            'css-loader',
            'resolve-url-loader',
            'sass-loader?sourceMap',
          ],
          include: [path.resolve(__dirname, 'node_modules')],
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
      /*
      {
        test: /\.(css|scss)$/,
        include: APP_DIR,
        exclude: [path.join(APP_DIR, 'pages'), path.join(APP_DIR, 'components')],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader', use: 'css-loader?sourceMap!postcss-loader!sass-loader'
        })
      },
      */
    ],
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    extensions: ['.js', '.jsx'],
  },
};

module.exports = config;
