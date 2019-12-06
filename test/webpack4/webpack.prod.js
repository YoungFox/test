const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifuJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    plugins: [
        // new UglifuJSPlugin({
        //     sourceMap: true
        // }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
})
