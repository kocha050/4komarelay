const path = require('path')
const express = require('express');
const multer = require('multer');
const router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ dest: './public/images/', storage: storage }).single('file');

router.get('/', (req, res) => res.send('Hello World!'));

router.get('/upload', (req, res) => res.sendFile(path.join(__dirname, '../../public/upload.html')));

router.post('/upload',function (req, res) {
  upload(req,res,function(err){
    if(err) {
      res.send("Failed to write " + req.file.destination + " with " + err);
    } else {
      //console.log(req.file.filename + " wo upload shitayo" );
      res.send("Uploaded " + req.file.originalname + " AS " + req.file.filename + " !!!");
    }
  })
 
});

module.exports = router;

