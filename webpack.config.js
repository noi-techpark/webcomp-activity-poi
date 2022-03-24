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
                test: /\.(s*)css$/,
                use: [{ loader: 'css-loader' }, { loader: 'sass-loader' }]
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'file'
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
              { from: "./src/static/img/fa_icons", to: "."},
              { from: "./src/static/data", to: "." },
              { from: "./src/strings.js", to: "." },
              { from: "./index.html", to: "." }
            ],
        })
    ],
}
