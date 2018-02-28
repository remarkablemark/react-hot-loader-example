const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const paths = {
  build: path.resolve('./build/'),
  src: path.resolve('./src/'),
  template: path.resolve('./src/index.html'),
};

module.exports = (env = { NODE_ENV: 'production' }) => ({
  entry: {
    bundle: './src/index.js',
  },

  output: {
    path: paths.build,
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [paths.src],
        use: ['babel-loader'],
      },
    ],
  },

  // https://webpack.js.org/configuration/devtool/
  devtool: env.NODE_ENV === 'development' ? 'cheap-module-eval-source-map' : false,

  plugins: [
    // remove `build` folder
    new CleanWebpackPlugin([paths.build]),

    // pass environment variable value to app
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
    }),

    // do not bundle certain modules in production
    env.NODE_ENV === 'production' && new webpack.IgnorePlugin(/^(react-hot-loader)$/),

    // hoist all modules to a single scope instead of writing a separate closure for each
    env.NODE_ENV === 'production' && new webpack.optimize.ModuleConcatenationPlugin(),

    // minify bundle in production
    env.NODE_ENV === 'production' && new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false,
      },
      mangle: {
        safari10: true,
      },
      output: {
        comments: false,
        ascii_only: true,
      },
    }),

    // display module names when using HMR
    env.NODE_ENV === 'development' && new webpack.NamedModulesPlugin(),

    // development sandbox
    env.NODE_ENV === 'development' && new HtmlWebpackPlugin({
      template: paths.template,
    }),
  ].filter(Boolean),
});
