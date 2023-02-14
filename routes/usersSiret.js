
const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'benefit'
});
  
  const secret = "secret"

router.post('/', (req,res,next) =>{ 
    console.log(req.body)
    const comparison = jwt.verify(req.header('authorization'), secret)
      if (comparison === false) {
          return res.status(401).send(error)
         }
      else {
        const siren = (req.body.siret).slice(0,9)
        const params = [req.body.siret, siren, req.body.email ] 
        const requete2 = 'UPDATE client SET SIRET = ( CASE WHEN  SIRET = "" THEN ? END) , SIREN = ( CASE WHEN SIREN = "" THEN  ? END) WHERE email = ?'
        const request2 = connection.query(requete2, params, (response)=> {
          res.send(response)  
        })
      }
    })

module.exports = router;