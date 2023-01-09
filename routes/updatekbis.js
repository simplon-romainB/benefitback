var bcrypt = require('bcryptjs');
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

router.post('/',upload.single('kbis'),(req, res, next) =>{
    const comparison = jwt.verify(req.header('authorization'), secret)
    if (comparison === false) {
        return res.status(401).send(error)
       }
    else {
    const profRequete = 'UPDATE client SET Kbis = ? WHERE siret = ?'
    const email = [req.file.path,req.body.siret]
    const request =  connection.query(profRequete, email, (err, response) => {
        res.send('ok')
    
      });
    }
    });

module.exports = router;