var express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
var app = express();
module.exports = function (app) {
  app.use(
    "/api/v2/*",
    createProxyMiddleware({
      target: "https://pokeapi.co/",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/*",
    createProxyMiddleware({
      target: "https://pokelatte-backend.herokuapp.com/",
      changeOrigin: true,
    })
  );

  app.use(
    "/user/create",
    createProxyMiddleware({
      target: "https://pokelatte-backend.herokuapp.com/",
      changeOrigin: true,
    })
  );
};
