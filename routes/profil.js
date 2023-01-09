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
    const profRequete = 'INSERT INTO profil (email, ville, capital, numeroRM, numeroTva, formeJuridique, delaiPaiement, societe, conformite, association, TVA, assurance, informations, societeOrComm, TVAna, nom) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
    const email = [req.query.email,req.body.ville, req.body.capital, req.body.numeroRM, req.body.numeroTva, req.body.formeJuridique,req.body.delaiPaiement,req.body.societe, req.body.conformite, req.body.association, req.body.TVA, req.body.assurance, req.body.informations, req.body.societeOrComm, req.body.TVAna, req.body.nom]
    const request =  connection.query(profRequete, email, (err, response) => {
      res.send(response)
      console.log(req.body)
      });
    }
    });

router.get('/', (req, res, next) =>{
  const comparison = jwt.verify(req.header('authorization'), secret)
    if (comparison === false) {
        return res.status(401).send(error)
       }
    else {
    const profRequete = 'SELECT * FROM profil WHERE email = ?'
    const email = [req.query.email]
    const request =  connection.query(profRequete, email, (err, response) => {
      res.send(response)
      console.log(req.body)
      });
    }
})

    module.exports = router;