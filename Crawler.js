var https = require('https');
var fs = require('fs');
var path = require('path');

var url = 'https://stocksnap.io';

// 检查目录中是否存在 images 文件夹，如果没有就创建
fs.mkdir('./images', function(err) {
   if(err) {
       console.log('Directory already exists.');
   } else {
       console.log('Directory creation success.');
   }
});

https.get(url, function(res) {
    var content = null;
    res.on('data', function(chunk) {
        content += chunk;
    });
    res.on('end', function() {
        var reg = /src="(.*?\.jpg)"/img;        // 全局匹配以【src=】开头，并以【.jpg】结尾的内容
        var filename;
        while (filename = reg.exec(content)) {
            getImage(filename[1]);      // 子匹配
        }
    });
});

function getImage(url) {
    var imageName = path.parse(url).base;
    var stream = fs.createWriteStream('./images/' + imageName);
    https.get(url, function(res) {
        res.pipe(stream);
        console.log(imageName + '  download completed！');
    });
}
