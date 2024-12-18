const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://clothingstore-go-app-1:8080',
      changeOrigin: true,
    })
  );
};