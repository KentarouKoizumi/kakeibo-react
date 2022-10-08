const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/",
    createProxyMiddleware({
      target: "https://asia-northeast1-tonal-land-364800.cloudfunctions.net",
      changeOrigin: true,
    })
  );
};