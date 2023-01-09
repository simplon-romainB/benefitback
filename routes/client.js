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

router.post('/',(req, res, next) =>{
    const comparison = jwt.verify(req.header('authorization'), secret)
    if (comparison === false) {
        return res.status(401).send(error)
       }
    else {
    const profRequete = 'INSERT INTO client_priv (nom, prenom, adresse, email, telephone, denomination, email_facturant, delaipaiement) VALUES (?,?,?,?,?,?,?,?)'
    const email = [req.body.nom,req.body.prenom, req.body.adresse, req.body.email, req.body.telephone, req.body.denomination,req.query.email, req.body.delaiPaiement]
    const request =  connection.query(profRequete, email, (err, response) => {
      res.send(response)
      });
    }
    });

router.get('/', (req,res,next) => {
  const comparison = jwt.verify(req.header('authorization'), secret)
    if (comparison === false) {
        return res.status(401).send(error)
       }
    else {
      const profRequete = 'SELECT * FROM client_priv WHERE email_facturant = ? '
      const email = [req.query.email]
      const request =  connection.query(profRequete, email, (err, response) => {
      res.send(response)
      
      });

    }
})

module.exports = router;