var express = require('express');
var router = express.Router();

// routerにルーティングの動作を書いてく
router.use('/works', require('./works.js'));
router.use('/user', require('./user.js'))

//routerをモジュールとして扱う準備
module.exports = router;