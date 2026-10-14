// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: CC0-1.0

const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: { exportType: 'string' },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: { exportType: 'string' },
                    },
                    {
                        loader: 'sass-loader',
                        options: { api: 'modern' },
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: {
                    loader: 'svg-url-loader',
                    options: {},
                },
            },
            {
                test: /\.(png|jpg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
            }
        ],
    },
    optimization: {
       minimize: false,
    },
    plugins: [
        new CopyPlugin({
            patterns: [
              { from: "./src/static/img/category_icons", to: "." },
              { from: "./src/static/img/map_markers", to: "." },
              { from: "./src/static/data", to: "." },
              { from: "./src/strings.js", to: "." },
              { from: "./index.html", to: "." }
            ],
        })
    ],
}
