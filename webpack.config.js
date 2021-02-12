const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    { loader: 'style-loader', options: { injectType: 'styleTag' } },
                    'css-loader',
                ],
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
       minimize: true,
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./src/static/img/category_icons", to: "." },
                { from: "./src/static/img/map_markers", to: "." },
                { from: "./src/static/css/components", to: "." },
                { from: "./src/static/css/all.css", to: "." },
                { from: "./src/static/css/theme.css", to: "." },
                { from: "./src/static/css/atoms.css", to: "." },
                { from: "./src/static/data", to: "." },
                { from: "./src/static/webfonts", to: "." },
                { from: "./index.html", to: "." }
            ],
        })
    ],
}