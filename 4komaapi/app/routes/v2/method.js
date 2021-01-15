// import cors from 'cors;'//追加1/15

// const app = express();
// app.use(cors({ origin: true, credentials: true }));

//http://localhost:3000/api/method/命令?**=**&**=**

const path = require("path");
var express = require("express");
const multer = require("multer");
var router = express.Router();
var moment = require("moment");
var pg = require("pg");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

var upload = multer({ dest: "./public/images/", storage: storage }).single(
  "file"
);

var pool = new pg.Pool({
  database: "4koma",
  user: "snowman",
  password: "snowman",
  host: "localhost",
  //port: 5432,
});

router.get("/login", function (req, res) {
  res.set({ "Access-Control-Allow-Origin": "*" });

  var SQL = `SELECT pwd FROM user WHERE uid=\'${req.query.uid}\'`;

  pool.connect(function (err, client) {
    if (err) {
      console.log(err);
    } else {
      client.query(SQL, function (err, result) {
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

//テスト用
// router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../../../public/testpage.html')));
//router.get('/upload', (req, res) => res.sendFile(path.join(__dirname, '../../../public/testpage.html')));
//router.get('/newupload', (req, res) => res.sendFile(path.join(__dirname, '../../../public/testpage.html')));
//router.get('/delete', (req, res) => res.sendFile(path.join(__dirname, '../../../public/testpage.html')));
//router.get('/completed', (req, res) => res.sendFile(path.join(__dirname, '../../../public/testpage.html')));
//router.get('/idsearch', (req, res) => res.sendFile(path.join(__dirname, '../../../public/testpage.html')));
//router.get('/titlesearch', (req, res) => res.sendFile(path.join(__dirname, '../../../public/testpage.html')));
//router.get('/genresearch', (req, res) => res.sendFile(path.join(__dirname, '../../../public/testpage.html')));

router.post("/upload", function (req, res) {
  res.set({ "Access-Control-Allow-Origin": "*" });

  upload(req, res, function (err) {
    if (err) {
      res.send("Failed to write " + req.file.destination + " with " + err);
    } else {
      var Uidx = "uid" + req.body.koma;
      var Kx = "k" + req.body.koma;

      var Path = path.join(
        __dirname,
        "../../../public/images/",
        req.file.filename
      );
      var SQL = `UPDATE sakuhin SET ${Uidx} =\'${req.body.uid}\', ${Kx} = \'${Path}\' WHERE sid = \'${req.body.sid}\'`;
      console.log(SQL);

      pool.connect(function (err, client) {
        if (err) {
          console.log(err);
        } else {
          client.query(SQL, function (err, result) {
            console.log(result.command);
          });
        }
      });

      res.send(
        " originalname=" +
        req.file.originalname +
        " filename=" +
        req.file.filename +
        " path=" +
        Path +
        " body.sid=" +
        req.body.sid +
        " body.uid=" +
        req.body.uid +
        " body.koma=" +
        req.body.koma +
        " SQL=" +
        SQL
      );
    }
  });
});

router.post("/newupload", function (req, res) {
  res.set({ "Access-Control-Allow-Origin": "*" });
  //res.set({ "Access-Control-Allow-Origin": true });
  //res.set({ "Access-Control-Allow-Credentials": true });

  /*
  //-------------------
  const ALLOWED_METHODS = [
    'POST',
  ];
  const origin = req.headers.origin;
  sess.cookie.secure = true;
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', ALLOWED_METHODS.join(','));
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Accept,X-Custom-Header');

  //-------------------
  */


  upload(req, res, function (err) {
    if (err) {
      res.send("Failed to write " + req.file.destination + " with " + err);
    } else {
      var Path = path.join(
        __dirname,
        "../../../public/images/",
        req.file.filename
      );
      var SQL = `INSERT INTO sakuhin (sid, title, genre, uid1, k1) VALUES (\'${Date.now() + req.body.uid
        }\',\'${req.body.title}\', \'${req.body.genre}\',\'${req.body.uid
        }\',\'${Path}\')`;
      console.log(SQL);

      pool.connect(function (err, client) {
        if (err) {
          console.log(err);
        } else {
          client.query(SQL, function (err, result) {
            console.log(result.command);
          });
        }
      });

      res.send(
        " originalname= " +
        req.file.originalname +
        " filename= " +
        req.file.filename +
        " path=" +
        Path +
        " body.title=" +
        req.body.title +
        " body.genre=" +
        req.body.genre +
        " body.uid=" +
        req.body.uid
      );
    }
  });
});

router.get("/delete", function (req, res) {
  res.set({ "Access-Control-Allow-Origin": "*" });

  var Sid = req.query.sid;
  var SQL = `DELETE FROM sakuhin WHERE sid = \'${Sid}\'`;
  console.log(SQL);

  pool.connect(function (err, client) {
    if (err) {
      console.log(err);
    } else {
      client.query(SQL, function (err, result) {
        console.log(result.command);
      });
    }
  });

  res.send(Sid + " was Deleted. Date=" + Date.now() + " SQL=" + SQL);
});

router.get("/completed", function (req, res) {
  res.set({ "Access-Control-Allow-Origin": "*" });

  // var Completed = '';
  // var SQL = `SELECT sid FROM sakuhin WHERE k4 IS NOT NULL`;
  // console.log(SQL);

  // pool.connect(function (err, client) {
  //     if (err) {
  //         console.log(err);
  //     } else {
  //         client.query(SQL, function (err, result) {

  //             var i = 0;
  //             while (result.rows[i] != undefined) {
  //                 console.log(result.rows[i]);
  //                 Completed = `${Completed},${result.rows[i].sid}`;
  //                 console.log(Completed);
  //                 i += 1;
  //             }

  //             res.send(`Searched. Completedsakuhin=(${Completed}) SQL=${SQL}`);

  //         });
  //     }
  // });
  const page = req.query.page; //クエリパラメータの取得
  //   let result = [];

  //   var Path1 = path.join("http://localhost:3000/images/Apex1copy.jpg");
  //   var Path2 = path.join("http://localhost:3000/images/1609718450388Apex2.jpg");
  //   var Path3 = "http://localhost:3000/images/Apex1copy.jpg";
  //   var Path3 = "http://localhost:3000/images/1609718450388Apex2.jpg";
  //   if (page < 5) {
  //     result.push(Path1);
  //     result.push(Path2);
  //   }

  //処理成功
  res.statusCode = 200;
  //   res.send(Path)
  //   res.sendFile(Path)
  // res.json(result);
  //   console.log(result);
  //   console.log(Path3);
  //   console.log(Path2);
  console.log("page" + page);

  if (page < 5) {
    console.log("5未満です");
    res.json([
      { url: "http://localhost:3000/images/1609716527298Apex1.jpg", sid: "1" },
      { url: "http://localhost:3000/images/1609718450388Apex2.jpg", sid: "2" },
    ]);
  } else {
    res.json([]);
  }
});

router.get("/idsearch", function (req, res) {
  res.set({ "Access-Control-Allow-Origin": "*" });

  var Searched = "";
  var Uid = req.query.uid;
  var SQL = `SELECT sid FROM sakuhin WHERE uid1 = \'${Uid}\' OR uid2 = \'${Uid}\' OR uid3 = \'${Uid}\' OR uid4 = \'${Uid}\'`;
  console.log(SQL);

  pool.connect(function (err, client) {
    if (err) {
      console.log(err);
    } else {
      client.query(SQL, function (err, result) {
        let i = 0;
        while (result.rows[i] != undefined) {
          console.log(result.rows[i]);
          Searched = `${Searched},${result.rows[i].sid}`;
          i += 1;
        }

        res.send(`Searched. IDhitted sid=(${Searched}) SQL=${SQL}`);
      });
    }
  });
});

router.get("/titlesearch", function (req, res) {
  res.set({ "Access-Control-Allow-Origin": "*" });

  var Searched = "";
  var Title = req.query.title;
  var SQL = `SELECT sid FROM sakuhin WHERE title = \'${Title}\'`;
  console.log(SQL);

  pool.connect(function (err, client) {
    if (err) {
      console.log(err);
    } else {
      client.query(SQL, function (err, result) {
        let i = 0;
        while (result.rows[i] != undefined) {
          console.log(result.rows[i]);
          Searched = `${Searched},${result.rows[i].sid}`;
          i += 1;
        }

        res.send(`Searched. Titlehitted sid=(${Searched}) SQL=${SQL}`);
      });
    }
  });
});

router.get("/genresearch", function (req, res) {
  res.set({ "Access-Control-Allow-Origin": "*" });

  var Searched = "";
  var Genre = req.query.genre;
  var SQL = `SELECT sid FROM sakuhin WHERE genre = \'${Genre}\'`;
  console.log(SQL);

  pool.connect(function (err, client) {
    if (err) {
      console.log(err);
    } else {
      client.query(SQL, function (err, result) {
        let i = 0;
        while (result.rows[i] != undefined) {
          console.log(result.rows[i]);
          Searched = `${Searched},${result.rows[i].sid}`;
          i += 1;
        }

        res.send(`Searched. Genrehitted sid=(${Searched}) SQL=${SQL}`);
      });
    }
  });
});

module.exports = router;
