const http = require('http');
const querystring = require('querystring');

let server = http.createServer((req, res)=>{

  //POST数据--urlencoded
  let aBuffer = [];
  req.on('data', data=>{
    aBuffer.push(data);
  });
  req.on('end', ()=>{
    //连接Buffer类型数据
    let data = Buffer.concat(aBuffer);
    const post = querystring.parse(data.toString());
    console.log('urlencoded--post数据：', post);//urlencoded--post数据： { user: 'carmen', pass: '111' }
  });

});

server.listen(8080);
