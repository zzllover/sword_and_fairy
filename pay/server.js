const https = require('https')
const fs = require('fs')

// 配置https本地服务，用于测试必须要HTTPS协议的一些API使用
const options = {
  key: fs.readFileSync('./cert/key.pem'),
  cert: fs.readFileSync('./cert/cert.pem'),
}

https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hellow world\n");
}).listen(8002)