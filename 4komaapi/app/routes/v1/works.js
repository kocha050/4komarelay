const express = require('express');
var app = express();
var router = express.Router();
const pg = require('pg');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) //Appending .jpg
  }
});

const upload = multer({ dest: '/public/images', storage: storage });

var pool = new pg.Pool({
  database: 'test',
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  // port: 5432,
});

// GET  http://localhost:3000/api/works/hoge?~~~ ←みたいな感じのURL


router.use('/image',express.static(path.join(__dirname + '/public')));

app.get('/upload', (req, res) => res.sendFile(path.join(__dirname, '../public/upload.html')));

router.post('/upload', upload.single('file'), function (req, res) { //(APIプロジェクト名/public/images)のディレクトリに画像を保存（名前被りNG）

  var PATH = '/public/images/' + req.file.originalname;

  //DBにアクセスし、リクエストの情報をもとにsakuhinテーブルにインサートする
  //終了処理
  res.send(PATH + 'にファイルのアップロードが完了しました。');
});


//画像へのパスを取得するAPI
//router.get('/imag', function (req, res) {

//DBにアクセスして、リクエストの情報をもとに画像ファイルへのパスを取得する

//});

//router.post('/register', function (req, res) {

  //画像に名前を付ける（被りNG）
  //(APIプロジェクト名/public/images)のディレクトリにつけた名前のフォルダを作りデータを格納
  //DBにアクセスし、リクエストの情報をもとにsakuhinテーブルの該当行にインサートする
  //登録できた場合true、途中でエラーの場合falseを返す


//});


//router.delete('/del', function (req, res) {

  //DBにアクセスして、リクエストの情報をもとにsakuhinテーブルの該当する行を削除
  //削除できた場合trueを返し、エラーの場合falseを返す

//});




//routerをモジュールとして扱う準備
module.exports = router;