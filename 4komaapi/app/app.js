const path = require('path')
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

var router = require('./routes/v3/');

var router = require('./routes/v2/');

//body-parserの設定
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var port = process.env.PORT || 3000; // port番号を指定

app.use(express.static('public'));
app.use('/api', router);

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);