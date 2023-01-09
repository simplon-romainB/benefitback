
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
    const profRequete = 'SELECT * FROM documents WHERE email = ?'
    const email = [req.query.email]
    const request =  connection.query(profRequete, email, (err, response) => {
      res.send(response)
    });
});
module.exports = router;