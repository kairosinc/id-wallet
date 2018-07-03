import webpack from 'webpack';
import path from 'path';

import isProduction from './src/server/isProduction';
import { WDS_PORT } from './src/server/config';

export default {
  entry: [
    "react-hot-loader/patch",
    "./src/client"
  ],
  output: {
    filename: "js/bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: isProduction ? "/static/" : `http://localhost:${WDS_PORT}/dist/`
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: "babel-loader", exclude: /node_modules/ },
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader', options: {
              minimize: true
            }
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          },
        ]
      },
      {
          test: /\.(otf)$/,
          use: [{
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]',
                  outputPath: 'fonts/'
              }
          }]
      },
    ]
  },
  devtool: isProduction ? false : "source-map",
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    port: WDS_PORT,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
