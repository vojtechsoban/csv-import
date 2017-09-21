const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const defaultConfig = {
  resolve: {
    alias: {
      // 'redux-devtools/lib': path.join(__dirname, '..', '..', 'src'),
      // 'redux-devtools': path.join(__dirname, '..', '..', 'src'),
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
  devtool: 'source-map',
  devServer: {
    host: 'localhost',
    port: '3000',
    
    // match the output path
    contentBase: path.resolve(__dirname, 'dist'),
    
    hot: true,
    inline: true,
    historyApiFallback: true,
    publicPath: '/'
  },
  
  output: {
    // the output bundle
    filename: 'bundle.js',
    
    path: path.join(__dirname, 'dist'),
    
    // necessary for HMR to know where to load the hot update chunks
    publicPath: '/'
  },
  
  entry: [
    // activate HMR for React
    'react-hot-loader/patch',
    
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack-dev-server/client?http://localhost:3000',
    
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',
    
    // 'babel-polyfill',
    
    // the entry point of our app
    './src/index'
  ],
  
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      title: 'Mortgage calculator',
      template: 'src/index.hbs'
    }),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: JSON.stringify(true),
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ]
});
