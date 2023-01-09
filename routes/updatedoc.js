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

router.post('/',upload.single('thumbnail'),(req, res, next) =>{
    const comparison = jwt.verify(req.header('authorization'), secret)
    if (comparison === false) {
        return res.status(401).send(error)
       }
    else {
    const profRequete = 'INSERT INTO documents (nom, email, path, date) VALUES (?,?,?,DEFAULT)'
    const email = [req.file.originalname,req.body.email, req.file.path]
    const request =  connection.query(profRequete, email, (err, response) => {
      res.send(response)
      console.log(req.file)
      });
    }
    });

module.exports = router;