//http://localhost:3000/api/method/命令?**=**&**=**

const path = require('path')
var express = require('express');
const multer = require('multer');
var router = express.Router();
var pg = require('pg');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

var upload = multer({ dest: './public/images/', storage: storage }).single('file');

var pool = new pg.Pool({
    database: '4koma',
    user: 'snowman',
    password: 'snowman',
    host: 'localhost',
});

router.get('/login', function (req, res) {

    res.set({ 'Access-Control-Allow-Origin': '*' });

    var SQL = `SELECT pwd FROM users WHERE uid=\'${req.query.uid}\'`;
    console.log(SQL);
    pool.connect(function (err, client) {
        if (err) {
            console.log(err);
            res.send(false);
        } else {
            client.query(SQL, function (err, result) {
                if (err) {
                    console.log(err);
                    res.send(false);
                }
                console.log(result.rows[0]);
                if (result.rows[0] == undefined) {
                    res.send(false);
                } else if (result.rows[0].pwd == req.query.pwd) {
                    res.send(true);
                } else {
                    res.send(false);
                }

            });
        }
    });
});

router.get('/register', function (req, res) {

    res.set({ 'Access-Control-Allow-Origin': '*' });

    var SQL = `INSERT INTO users VALUES (\'${req.query.uid}\',\'${req.query.pwd}\')`;
    console.log(SQL);

    pool.connect(function (err, client) {
        if (err) {
            console.log(err);
            res.send(true);
        } else {
            client.query(SQL, function (err, result) {
                if (err) {
                    console.log(err);
                    res.send(false);
                }
                console.log(result.command);
            });
        }
    });
    res.send(true);
});



//テスト用
//router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../../../public/testpage.html')));


router.post('/upload', function (req, res) {

    res.set({ 'Access-Control-Allow-Origin': '*' });

    upload(req, res, function (err) {
        if (err) {
            res.send("Failed to write " + req.file.destination + " with " + err);
        } else {

            var Uidx = 'uid' + req.body.koma;
            var Kx = 'k' + req.body.koma;
            var Path = ("http://localhost:3000/images/" + req.file.filename);
            var SQL = `UPDATE sakuhin SET ${Uidx} =\'${req.body.uid}\', ${Kx} = \'${Path}\' WHERE sid = \'${req.body.sid}\'`;
            console.log(SQL);

            pool.connect(function (err, client) {
                if (err) {
                    console.log(err);
                    res.send(false);
                } else {
                    client.query(SQL, function (err, result) {
                        console.log(result.command);
                        res.send(true);
                    });
                }
            });
        }
    })
});


router.post('/newupload', function (req, res) {

    res.set({ 'Access-Control-Allow-Origin': '*' });
    console.log(req.body.title);
    //console.log(req.body.genre);

    upload(req, res, function (err) {
        if (err) {
            res.send(false);
        } else {
            var Path = ("http://localhost:3000/images/" + req.file.filename);
            var SQL = `INSERT INTO sakuhin (sid, title, genre, uid1, k1) VALUES (\'${Date.now() + req.body.uid}\',\'${req.body.title}\', \'${req.body.genre}\',\'${req.body.uid}\',\'${Path}\')`;
            console.log(SQL);

            pool.connect(function (err, client) {
                if (err) {
                    console.log(err);
                    res.send(false);
                } else {
                    client.query(SQL, function (err, result) {
                        console.log(result.command);
                        res.send(true);
                    });
                }
            });
        }
    })
});


router.get('/delete', function (req, res) {

    res.set({ 'Access-Control-Allow-Origin': '*' });

    var Sid = req.query.sid;
    var SQL = `DELETE FROM sakuhin WHERE sid = \'${Sid}\'`;
    console.log(SQL);

    pool.connect(function (err, client) {
        if (err) {
            console.log(err);
            res.send(false);
        } else {
            client.query(SQL, function (err, result) {
                console.log(result.command);
            });
        }
    });
    res.send(true);
});


router.get('/completed', function (req, res) {

    res.set({ 'Access-Control-Allow-Origin': '*' });

    var page = req.query.page - 1;
    var offset = 12 * page;
    var SQL = `SELECT sid,title,k1,k2,k3,k4 FROM sakuhin WHERE k4 IS NOT NULL ORDER BY sid LIMIT 12 OFFSET ${offset}`;
    var ResJSON = [];

    console.log(SQL);

    pool.connect(function (err, client) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            client.query(SQL, function (err, result) {

                var i = 0;
                while (result.rows[i] != undefined) {

                    /* console.log(result.rows[i].sid);
                    console.log(result.rows[i].title);
                    console.log(result.rows[i].k1);
                    console.log(result.rows[i].k2);
                    console.log(result.rows[i].k3);
                    console.log(result.rows[i].k4); */

                    var d = {
                        sid: result.rows[i].sid,
                        title: result.rows[i].title,
                        image: {
                            k1: result.rows[i].k1,
                            k2: result.rows[i].k2,
                            k3: result.rows[i].k3,
                            k4: result.rows[i].k4,
                        },
                    };
                    //console.log(d);
                    ResJSON.push(d);
                    //console.log(ResJSON);
                    i += 1;
                }
                //res.statusCode = 200;
                res.json(ResJSON);
            });
        }
    });
});


router.get('/sidsearch', function (req, res) {

    res.set({ 'Access-Control-Allow-Origin': '*' });

    var Sid = req.query.sid;
    var SQL = `SELECT k1 FROM sakuhin WHERE sid = \'${Sid}\'`;
    console.log(SQL);

    pool.connect(function (err, client) {
        if (err) {
            console.log(err);
        } else {
            client.query(SQL, function (err, result) {
                var P1 = result.rows[0].k1;
                var P2 = result.rows[0].k2;
                var P3 = result.rows[0].k3;
                var P4 = result.rows[0].k4;
                res.sendFile(Path);
                res.json({ k1: P1, k2: P2, k3: P3, k4: P4 });
            });
        }
    });
});

router.get('/idsearch', function (req, res) {

    res.set({ 'Access-Control-Allow-Origin': '*' });

    var ResJSON = [];
    var Uid = req.query.uid;
    var SQL = `SELECT sid,title,k1,k2,k3,k4 FROM sakuhin WHERE uid1 = \'${Uid}\' OR uid2 = \'${Uid}\' OR uid3 = \'${Uid}\' OR uid4 = \'${Uid}\'`;
    console.log(SQL);

    pool.connect(function (err, client) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            client.query(SQL, function (err, result) {

                var i = 0;
                while (result.rows[i] != undefined) {
                    console.log(result.rows[i].sid);
                    var d = {
                        sid: result.rows[i].sid,
                        title: result.rows[i].title,
                        image: {
                            k1: result.rows[i].k1,
                            k2: result.rows[i].k2,
                            k3: result.rows[i].k3,
                            k4: result.rows[i].k4,
                        },
                    };
                    //console.log(d);
                    ResJSON.push(d);
                    //console.log(ResJSON);
                    i += 1;
                }
                //res.statusCode = 200;
                res.json(ResJSON);
            });
        }
    });
});


router.get('/titlesearch', function (req, res) {

    res.set({ 'Access-Control-Allow-Origin': '*' });

    var ResJSON = [];
    var Title = req.query.title;
    var SQL = `SELECT sid FROM sakuhin WHERE title = \'${Title}\'`;
    console.log(SQL);

    pool.connect(function (err, client) {
        if (err) {
            console.log(err);
        } else {
            client.query(SQL, function (err, result) {

                var i = 0;
                while (result.rows[i] != undefined) {
                    console.log(result.rows[i].sid);
                    var d = {
                        sid: result.rows[i].sid,
                        title: result.rows[i].title,
                        image: {
                            k1: result.rows[i].k1,
                            k2: result.rows[i].k2,
                            k3: result.rows[i].k3,
                            k4: result.rows[i].k4,
                        },
                    };
                    //console.log(d);
                    ResJSON.push(d);
                    //console.log(ResJSON);
                    i += 1;
                }
                //res.statusCode = 200;
                res.json(ResJSON);

            });
        }
    });
});


router.get('/genresearch', function (req, res) {

    res.set({ 'Access-Control-Allow-Origin': '*' });

    var ResJSON = [];
    var Genre = req.query.genre;
    var SQL = `SELECT sid FROM sakuhin WHERE genre = \'${Genre}\'`;
    console.log(SQL);

    pool.connect(function (err, client) {
        if (err) {
            console.log(err);
        } else {
            client.query(SQL, function (err, result) {

                var i = 0;
                while (result.rows[i] != undefined) {
                    console.log(result.rows[i].sid);
                    var d = {
                        sid: result.rows[i].sid,
                        title: result.rows[i].title,
                        image: {
                            k1: result.rows[i].k1,
                            k2: result.rows[i].k2,
                            k3: result.rows[i].k3,
                            k4: result.rows[i].k4,
                        },
                    };
                    //console.log(d);
                    ResJSON.push(d);
                    //console.log(ResJSON);
                    i += 1;
                }
                //res.statusCode = 200;
                res.json(ResJSON);

            });
        }
    });
});


module.exports = router;