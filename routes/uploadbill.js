
var express = require('express');
var router = express.Router();
const mysql = require('mysql')
const jwt = require('jsonwebtoken');
const multer  = require('multer')
const upload = multer({ dest: './uploads' })
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'benefit'
});

secret = 'secret' //bien penser aux variables d'environnement
let data = {time: Date()}

router.post('/',upload.single('pdf'),(req, res, next) =>{
    const comparison = jwt.verify(req.header('authorization'), secret)
    if (comparison === false) {
        return res.status(401).send(error)
       }
    else {
    const profRequete = 'INSERT INTO factures (siret, path, numero, email) VALUES (?,?,?,?)'
    const email = [req.body.siret,req.file.filename, req.body.numero, req.body.email]
    const request =  connection.query(profRequete, email, (err, response) => {
      res.send(response)
      });
    }
    });

module.exports = router;