// eslint-disable-next-line
const path = require("path");

module.exports = {
  publicPath: "/weatherOnline/",
  outputDir: "dist/weatherOnline/",

  configureWebpack: {
    resolve: {
      extensions: [".js", ".vue", ".json", ".html", ".scss", ".ts"],
      alias: {
        vue$: "vue/dist/vue.esm.js",
        "@": path.resolve(__dirname, "src"),
        Views: path.resolve(__dirname, "src/views"),
        Assets: path.resolve(__dirname, "src/assets"),
        Store: path.resolve(__dirname, "src/store"),
        Images: path.resolve(__dirname, "src/assets/images"),
      },
    },

    devServer: {
      disableHostCheck: true,
      host: "127.0.0.1",
      port: 4000,
      open: false,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 300,
      },
    },
  },

  transpileDependencies: ["vuetify"],
};
