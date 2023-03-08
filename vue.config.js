const vueConfig = {
    // 关闭eslint
    lintOnSave: false,

    // 代理跨域
    devServer: {
        proxy: {
            '/api': {
                target: 'http://admin-test.tttci.com'
            }
        }
    }
}
module.exports = vueConfig