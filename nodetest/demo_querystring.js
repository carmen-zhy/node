const querystring = require('querystring');

let str = 'ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=abc&rsv_pq=b9ece72c0000860e&rsv_t=177am3TaI8r5QiG0c%2ByV2hK%2BYvP49';

//字符串转化为对象
let obj = querystring.parse(str);
console.log(obj);

//对象转化为字符串
let str2 = querystring.stringify(obj);
console.log(str2);
