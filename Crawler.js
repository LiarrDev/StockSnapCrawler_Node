var https = require('https');
var fs = require('fs');
var path = require('path');

var url = 'https://stocksnap.io';

fs.mkdir('./images', function(err) {
   if(err) {
       console.log('Directory creation success.');
   } else {
       console.log('Directory already exists.');
   }
});

https.get(url, function(res) {
    var content = null;
    res.on('data', function(str) {
        content += str;
    });

    res.on('end', function() {
        var reg = /src="(.*?\.jpg)"/img;
        var filename;
        while (filename = reg.exec(content)) {
            getImage(filename[1]);
        }
    });
});

function getImage(url) {
    var obj = path.parse(url);
    var fn = obj.base;
    var stream1 = fs.createWriteStream('./images/' + fn);

    https.get(url, function(res) {
        res.pipe(stream1);
        console.log(fn + '  download completed！');
    });
}