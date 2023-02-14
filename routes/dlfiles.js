var express = require('express');
var router = express.Router();
const mysql = require('mysql')
const jwt = require('jsonwebtoken');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'benefit'
});

secret = 'secret' //bien penser aux variables d'environnement
let data = {time: Date()}

router.get('/',(req, res, next) =>{
  const comparison = jwt.verify(req.header('authorization'), secret)
    if (comparison === false) {
        return res.status(401).send(error)
       }
    else {
        res.download( req.query.path)
        
    }
});
module.exports = router;