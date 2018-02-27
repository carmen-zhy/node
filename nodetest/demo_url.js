const url = require('url');

let urlstr = 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=abc&rsv_pq=b9ece72c0000860e&rsv_t=177am3TaI8r5QiG0c%2ByV2hK%2BYvP49'+
'%2BsI%2FqoYmfmEOOnUj9tiNQDldf7mZ6c&rqlang=cn&rsv_enter=1&rsv_sug3=4&rsv_sug1=3&rsv_sug7=100&rsv_sug2=0&inputT=2237&rsv_sug4=2566';

////字符串转化为对象
let obj = url.parse(urlstr, true);
console.log(obj);


//对象转化为字符串
let str = url.format(obj);
// console.log(str);


//url.resolve 处理URL路径，也可以用于处理锚点
let s = url.resolve('http://example.com/one/four', '/two');//http://example.com/two
// console.log(s);
let s2 = url.resolve('/er/one/we', '/two');//two
// console.log(s2);
