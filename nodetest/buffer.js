const fs = require('fs');

fs.readFile('book.json', (err, data)=>{
  if(err){
    console.log('错了', err);
  }else{
    console.log(data);
    let str = data.toString();
    fs.writeFile('3.jpg', str, err=>{
      if(err){
        console.log('写入失败');
      }else{
        console.log('over');
      }
    })
  }
});
