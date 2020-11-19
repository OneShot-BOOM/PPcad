/*
开发环境配置：能让程序运行
*/

const {
    resolve
} = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    
    mode: 'development',
    //调试服务
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true
    },
    //调试工具
    devtool: 'sourcr-map',

    entry: './src/index.js',

    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build'),
        publicPath: './'
    },

    module: {
        rules: [{
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader' //处理html中img资源
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    esModule: false, //关闭es6模块化
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]'
                }
            },
            {
                exclude: /\.(html|css|js|less|jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],

};