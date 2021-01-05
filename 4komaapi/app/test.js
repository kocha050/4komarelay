const path = require('path')
const express = require('express')
//const multer = require('multer')
var router = require('./testroutes/')

const app = express()
const port = 3000

/* var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) //Appending .jpg
  }
})

const upload = multer({ dest: './public/images/' ,storage:storage}) */

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', router)

/* app.get('/', (req, res) => res.send('Hello World!'))

app.get('/upload', (req, res) => res.sendFile(path.join(__dirname, '../public/upload.html')))

app.post('/upload', upload.single('file'), function (req, res) {
  res.send(req.file.originalname + 'ファイルのアップロードが完了しました。');
}) */



app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})