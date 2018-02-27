Buffer.prototype.split = Buffer.prototype.split || function(spliter){
  let b1 = this;

  let result = [];
  let n;
  while((n=b1.indexOf(spliter)) != -1){
    let res1 = b1.slice(0,n);
    let res2 = b1.slice(n+spliter.length);
    result.push(res1);

    b1 = res2;

  }

  result.push(b1);
  return result;
}

// let b1 = new Buffer('abc==carmen==hellowdfsf=sdf==welcome');
// let result2 = b1.split('=');


exports.parseInfo=function (str){
  let arr=str.split('; ');
  let arr2=[];
  arr.forEach(item=>{
    let a=item.split('\r\n');
    arr2=arr2.concat(a);
  });

  //arr2 --  Content-Disposition: form-data; name="f1"; filename="1.txt"
  //         Content-Type: text/plain

  let json={};
  arr2.forEach(s=>{
    if(s.indexOf(': ') != -1){
      //切分 Content-Type: text/plain
      let [key, val]=s.split(': ');//name "user"
      json[key] = val;
    }else{
      //切分 name="f1"  filename="1.txt"
      let [key, val]=s.split('=');//name "user"
      if(!val){
        json[key]=val;
      }else{
        //去掉前后双引号 "user"--user
        json[key]=val.substring(1, val.length-1);//json[name] = user
      }
    }

  });

  return json;
};
