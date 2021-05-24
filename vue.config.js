const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    productionSourceMap: false,
    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
        // 移除 preload 插件
        config.plugins.delete('preload');
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require("postcss-pxtorem")({
                        // 把px单位换算成rem单位
                        rootValue: 37.5, // 换算的基数(设计图750的根字体为75)
                        // selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
                        propList: ["*"],
                    }),
                ],
            },
        },
    },
    configureWebpack: (config) => {
        config.plugins.forEach((val) => {
            if (val instanceof HtmlWebpackPlugin) {
                val.options.title = '首页';
            }
        })
    }
}