const http = require('http');
const url = require('url');

let server = http.createServer((req, res)=>{
  //  GET数据
  let {pathname, query} = url.parse(req.url, true);
  console.log('接收到GET数据：', pathname, query);//接收到GET数据： /login { user: 'carmen', pass: '123' }
});

server.listen(8080);
