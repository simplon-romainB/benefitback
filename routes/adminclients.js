var express = require('express');
var router = express.Router();
const mysql = require('mysql')
const jwt = require('jsonwebtoken');
const multer  = require('multer')
const upload = multer({ dest: '../' })
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
      const profRequete = 'SELECT * FROM client '
      const request =  connection.query(profRequete,(err, response) => {
      
      res.send(response)
      })
    }
})

module.exports = router;