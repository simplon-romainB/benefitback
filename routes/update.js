var bcrypt = require('bcryptjs');
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

router.post('/',(req, res, next) =>{
    const comparison = jwt.verify(req.header('authorization'), secret)
    if (comparison === false) {
        return res.status(401).send(error)
       }
    else {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const profRequete = 'UPDATE client SET password = ?, Nom = ?, Prenom = ?, SIRET = ?, SIREN = ? WHERE email = ?'
    const email = [hash, req.body.nom, req.body.prenom,req.body.siret,req.body.siren,req.body.email]
    const request =  connection.query(profRequete, email, (err, response) => {
    
    
      });
    }
    });

module.exports = router;