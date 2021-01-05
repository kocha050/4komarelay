var express = require('express');
var router = express.Router();

// routerにルーティングの動作を書いてく
router.use('/method',require('./method.js'));

//routerをモジュールとして扱う準備
module.exports = router;