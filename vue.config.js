const path = require("path");
module.exports = {
  lintOnSave: false,
  // 配置svg
  chainWebpack(config) {
    config.module.rules.delete("svg");
    config.module
      .rule("svg-sprite-loader")
      .test(/\.svg$/)
      .include.add(path.resolve("src/assets/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      });
  },
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    // css预设器配置项
    loaderOptions: {
      scss: {
        prependData: `@import "./src/styles/main.scss";`,
      },
    },
  },
  // 跨域
  devServer: {
    host: "0.0.0.0", // 允许访问
    proxy: {
      "/devApi": {
        target: 'http://www.web-jshtml.cn/api/vue3',
        ws: false,
        changeOrigin: true, // 开启跨域
        pathRewrite: {
          "^devApi": "",
        },
      },
    },
  },
};
