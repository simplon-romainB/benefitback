var express = require('express');
var router = express.Router();
const webpush = require('web-push');

router.get('/',(req, res, next) =>{
        res.send('Hello World!')
    });
module.exports = router;
