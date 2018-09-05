const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const apiModel = require('webpack-api-mocker')
const path = require('path');

const getHtmlConfig = function(name, options){
    var config = {
        template: `./src/${name}.html`,
        filename: `${name}.html`,
        inject: false,
        hash: false,
        chunks: [name]
    }

    return {
        ...config,
        ...options
    }
}

const isProduction = process.env.PRODUCTION_ENV

module.exports = {
    
    entry: {
        index:'./src/js/index.js',
        transfer:'./src/js/transfer.js'
    },
    output: {
      filename: 'js/[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    },
    devtool: isProduction ? false: 'inline-source-map',
    devServer: isProduction ? {}: {
        contentBase: './dist',
        before(app){
            apiModel(
                app,  
                path.resolve('./mock/webpack.mocker.js'), 
                {
                    proxy: {
                        '/api_home/*': 'https://retail-develop.51zan.com'
                    },
                    changeHost: true
                }
            )
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.DefinePlugin({
            'HUZAN_ENV': JSON.stringify(process.env.HUZAN_ENV),
        }),
        new HtmlWebpackPlugin(getHtmlConfig('index', { inject: 'head'})),
        new HtmlWebpackPlugin(getHtmlConfig('transfer', { inject: 'head'})),
        new copyWebpackPlugin([{
            from: __dirname + '/src/assets',
            to: './assets'
        }])
    ]
};

