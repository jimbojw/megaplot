/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview Configuration for webpack-dev-server, used during development
 * to test Megaplot features under load.
 */

const path = require('path');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.traceDeprecation = true;

// NOTE: 'entry' is not hard-coded, to be passed via command line argument.
module.exports = {
  mode : 'development',
  devtool : 'inline-source-map',
  devServer : {
    allowedHosts : 'all',
    host : '0.0.0.0',
    static : {
      directory : './data',
    },
  },
  module : {
    rules :
    [
      {
        test : /\.ts$/,
        use : 'ts-loader',
        exclude : /node_modules/,
      },
      {
        test : /\.css$/i,
        use : ['style-loader', 'css-loader'],
      },
    ]
  },
  resolve : {extensions : ['.ts', '.js']},
  output : {
    filename : 'megaplot.js',
    path : path.resolve(__dirname, 'dist', 'webpack'),
    libraryTarget : 'umd',
    library : 'megaplot',
  },
  plugins :
          [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin(),
          ],
};
