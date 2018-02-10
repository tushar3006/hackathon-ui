var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
// var OfflinePlugin = require('offline-plugin');


module.exports = {
    entry: {},
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: [/app\/lib/, /node_modules/],
            loader: 'ng-annotate!babel'
        }, {
            test: /\.html$/,
            loader: 'raw'
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(jpe?g|png|gif|ttf|otf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }]
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: 'client/app/assets',
            to: 'app/assets'
        }]),
        // Injects bundles in your index.html instead of wiring all manually.
        // It also adds hash to all injected assets so we don't have problems
        // with cache purging during deployment.
        new HtmlWebpackPlugin({
            template: 'client/test.html',
            inject: 'body',
            hash: true,
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackHarddiskPlugin(),
        // Automatically move all modules defined outside of application directory to vendor bundle.
        // If you are using more complicated project structure, consider to specify common chunks manually.
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
            }
        })
        // new OfflinePlugin()
    ],
    sassLoader: {
        includePaths: [path.resolve(__dirname + './client/app')]
    }
};
