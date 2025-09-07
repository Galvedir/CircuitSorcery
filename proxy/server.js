const fs = require('fs');
const https = require('https');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy all requests to React app on port 3000
app.use('/', createProxyMiddleware({
  target: 'http://localhost:3000',
  changeOrigin: true,
  ws: true
}));

const sslOptions = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

https.createServer(sslOptions, app).listen(443, () => {
  console.log('Proxy listening on port 443 (HTTPS) and forwarding to http://localhost:3000');
});

const wsUrl = window.location.protocol === 'https:' 
  ? `wss://${window.location.host}/ws`
  : `ws://${window.location.host}/ws`;