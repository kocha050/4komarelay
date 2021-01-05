var express = require('express');
var router = express.Router();
var pg = require('pg');

var pool = new pg.Pool({
    database: 'test',
    user: 'snowman',
    password: 'snowman',
    host: 'localhost',
    //port: 5432,
});

// ↓GET  http://localhost:3000/api/user/pass?***=### ←みたいな感じのURL

/* router.get('/pass', function (req, res) {

    var SQL = `SELECT password FROM userkanrihyo WHERE userid=\'${req.query.id}\'`;

    pool.connect(function (err, client) {
        if (err) {
            console.log(err);
        } else {
            client.query(SQL, function (err, result) {
                res.send(result.rows[0].password);
            });
        }
    });

});

router.get('/id', function (req, res) {

    var SQL = `SELECT userid FROM userkanrihyo WHERE password=\'${req.query.pass}\'`;

    pool.connect(function (err, client) {
        if (err) {
            console.log(err);
        } else {
            client.query(SQL, function (err, result) {
                res.send(result.rows[0].userid);
            });
        }
    });
}); */

router.get('/login', function (req, res) {

    var SQL = `SELECT password FROM userkanrihyo WHERE userid=\'${req.query.id}\'`;

    pool.connect(function (err, client) {
        if (err) {
            console.log(err);
        } else {
            client.query(SQL, function (err, result) {
                console.log(result.rows[0]);
                if (result.rows[0] == undefined) {
                    res.send(false);
                } else if (result.rows[0].password == req.query.pwd) {
                    res.send(true);
                } else {
                    res.send(false);
                }
            });
        }
    });
});

//router.post('/register', function (req, res) {

    //DBにアクセスし、リクエストの情報をもとにuserテーブルにインサートする
    //登録できた場合true、途中でエラーの場合falseを返す

//});

//router.delete('/del', function (req, res) {

    //DBにアクセスして、リクエストの情報をもとにuserテーブルの行を削除
    //削除できた場合trueを返し、エラーの場合falseを返す

//});



//routerをモジュールとして扱う準備
module.exports = router;