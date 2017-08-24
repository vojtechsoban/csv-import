const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const defaultConfig = {
  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    modules: [path.resolve('./src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.css', '.scss']
  },
  output: {
    path: path.resolve(__dirname, 'www/dist/'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {loader: 'babel-loader'}
        ],
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  }
};

//noinspection JSUnresolvedFunction
  module.exports = Object.assign({}, defaultConfig, {
  devtool: 'cheap-module-source-map',
  output: {
    // the output bundle
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  entry: [
    './src/index'
  ],
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
          title: 'Mortgage calculator',
          template: 'src/index.hbs'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: JSON.stringify(false),
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
});
