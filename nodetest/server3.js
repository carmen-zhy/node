const http=require('http');
const url=require('url');
const querystring=require('querystring');
const common=require('./libs/common');
const fs=require('fs');
const uuid=require('uuid/v4');
const path=require('path');

let server=http.createServer((req, res)=>{

  //POST数据
  let aBuffer=[];
  req.on('data', data=>{
    aBuffer.push(data);
  });

  req.on('end', ()=>{
    let data=Buffer.concat(aBuffer);
    // console.log('req---------------------', req.headers);

    //multipart/form-data 类型数据
    if(req.headers['content-type'].startsWith('multipart/form-data')){
      let post={};//存放普通数据信息
      let files={};//存放文件信息
      console.log(data.toString());

      //提取分隔符
      //'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryfFe70dlzgqIDLpgZ'
      const boundary='--'+req.headers['content-type'].split('; ')[1].split('=')[1];

      //第一步、用分隔符切分
      let arr=data.split(boundary);

      //第二步、扔掉头尾(<>、<--\r\n>)
      arr.shift();
      arr.pop();

      //第三步、每一项的头尾扔掉(\r\n....\r\n)
      arr=arr.map(item=>item.slice(2, item.length-2));

      //第四步、找第一个"\r\n\r\n"，一切两半——前一半:信息，后一半:数据
      //Content-Disposition: form-data; name="user"\r\n\r\ncarmen
      arr.forEach(item=>{
        let n=item.indexOf('\r\n\r\n');

        let info=item.slice(0, n);
        let fileData=item.slice(n+4);

        info=info.toString();//Content-Disposition: form-data; name="user"

        let total=0;
        let complete=0;

        //判断POST数据类型
        if(info.indexOf('\r\n')==-1){   //只有一行——普通数据
          let key=common.parseInfo(info).name;
          let val=fileData.toString();

          post[key]=val;
        }else{                          //两行——文件数据
          total++;

          let json=common.parseInfo(info);
          // console.log(json);
          let key=json.name;
          let filename=json.filename;
          let type=json['Content-Type'];
          let filepath=`upload/${uuid().replace(/\-/g, '')}${path.extname(filename)}`;

          files[key]={filename, type, filepath};

          fs.writeFile(filepath, fileData, err=>{
            if(err){
              console.log('文件写入失败');
            }else{
              console.log('写入完成');
              complete++;
              console.log(post, files);
            }
          });
        }
      });
    }else{      //urlencoded
      let post=querystring.parse(data.toString());
      console.log('urlencoded类型数据: ', post);
    }
  });
});
server.listen(8080);

//---------------------------------------------------------------
// ------WebKitFormBoundary9x5iuu8jUZvvA8BJ
// Content-Disposition: form-data; name="user"
//
// carmen
// ------WebKitFormBoundary9x5iuu8jUZvvA8BJ
// Content-Disposition: form-data; name="pass"
//
// 111
// ------WebKitFormBoundary9x5iuu8jUZvvA8BJ
// Content-Disposition: form-data; name="f1"; filename="1.txt"
// Content-Type: text/plain
//
// 123123123we
// ------WebKitFormBoundary9x5iuu8jUZvvA8BJ--
