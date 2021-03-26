# 认真记录所学所思

慢慢来

## NOJS库

1. dotenv
 使用方式是写一个 .env文件
 启动的时候运行就会把 .env文件的变量加到node环境中

2. momentjs
该库目前停止了维护，但重要的是通过这个库掌握JS的时间日期处理方法。

文档记录在**腾讯文档**

Mac怎么产生一个自签名https证书？

```Bash
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
```

然后基于nodejs创建https服务：

```js
const https = require('https')
const fs = require('fs')

const options = {
  key: fs.readFileSync('./cert/key.pem'),
  cert: fs.readFileSync('./cert/cert.pem'),
}

https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hellow world\n");
}).listen(8002)
```

mac怎么设置自签名证书可信：https://kyle.ai/blog/7324.html

## 好好整理一下基础 这里制作demo


## 对于比较好的组件，可以自己多多打磨


## 几款主流的打包工具的学习与原理分析

rollup webpack snowpack vite .........(Parcel)等


