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
    const profRequete = 'SELECT * FROM client WHERE email = ?'
    const email = [req.body.email]
    const request =  connection.query(profRequete, email, (err, response) => {
      if (response[0] === undefined) {
        res.send("numero de siret invalide")
      }
      else {
        const comparison =  bcrypt.compare(req.body.password, response[0].password,(err,pass)=>{
           if (pass === false) {
            res.send(JSON.stringify("mot de passe éronné"))
           }
           else {
            const token = jwt.sign(data, secret);
            let profil = [token, response]
            res.send(JSON.stringify(profil));
           }
        });
      }
    });
});
module.exports = router;















module.exports = router;