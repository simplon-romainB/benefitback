var express = require('express');
var router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: '../' })



router.post('/',upload.single('thumbnail'), function(req, res, next) {
  console.log(req.body)
});

module.exports = router;