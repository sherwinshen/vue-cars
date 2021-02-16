module.exports = {
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      scss: {
        prependData: `@import "./src/styles/main.scss";`
      }
    }
  },
  // webpack-dev-server 相关配置
  devServer: {
    open: false, // 编译完成是否打开网页
    host: "0.0.0.0", // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080, // 访问端口
    https: false, // 编译失败时刷新页面
    hot: true, // 开启热加载
    hotOnly: false,
    proxy: {
      // 后端的接口：http://www.web-jshtml/api/cars   接口：/getCode/
      [process.env.VUE_APP_API_LOGIN]: {
        target: "http://www.web-jshtml.cn/api/cars", //真实服务器的地址
        changeOrigin: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_API_LOGIN}`]: ""
        }
      },
      // 前端的接口：http://www.web-jshtml/api/cars/web
      [process.env.VUE_APP_API_WEB]: {
        target: process.env.VUE_API_DEV_WEB_TARGET, //真实服务器的地址
        changeOrigin: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_API_WEB}`]: ""
        }
      }
    }
  }
};
