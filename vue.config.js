const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const ElementPlus = require('unplugin-element-plus/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const path = require("path");

module.exports = {
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@use "@/styles/element.scss" as *;`//引入自定义主题色的文件
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': `${path.join(__dirname, 'src')}`,
      },
    },
    plugins: [
      //按需自动导入
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      //命令式UI组件引入时引入样式，可自定义主题色
      ElementPlus({
        useSource: true
      })
    ]
  },
  devServer: {
    hot: true,
    port: 8000
  }
}