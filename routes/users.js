const superagent = require('superagent');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var express = require('express');
const mailgun = require("mailgun-js");
var nodemailer = require('nodemailer')
var router = express.Router();
var domain = "sandboxd6a0305b58a547febd8cb23b89d0fd32.mailgun.org";
var apiKey = "9b92e952daf94ce95ae71510b84e08f1-d1a07e51-2c9dc59b";
const mg = mailgun({apiKey: apiKey, domain: domain});
const mysql = require('mysql')
const multer  = require('multer')
const upload = multer({ dest: '/uploads' })
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'benefit'
});
  const secretKey = "6Ld4jTIjAAAAAPQVwX3ZreT3Qm2N11fLwWvw8sB5"
  const secret = "secret"
  let transporter = nodemailer.createTransport({
    host: "node54-eu.n0c.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'romain.barry@yysh.fr', // generated ethereal user
      pass: 'Magicstar198.', // generated ethereal password
    },
  });

/* inscription */
router.post('/',upload.single('thumbnail'), function(req, res, next) {
  const token = req.body.recaptcha
  const url =  `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
  superagent.get(url)
  .end((err, res) => {
  if (err) { return console.log(err); }
  console.log(res.body);
  if (res.body.success) {  
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);
  var activateLink = Math.round(Math.random()*1000)
  var values = [ req.body.siret,  req.body.siren, req.body.nom, req.body.adresse, req.body.email, req.body.nomdirigeant, req.body.prenomdirigeant, req.file?.filename,hash, activateLink]
  const requete = 'INSERT INTO client (SIRET,SIREN,denomination,adresse,email, Nom,Prenom, Kbis, password,role, activate, activatelink) VALUES (?,?,?,?,?,?,?,?,?, "user", false, ?)'
  const request = connection.query(requete, values)
  
  link="http://localhost:3000/users/verify?id="+activateLink +"&email=" + req.body.email;
  
  /*const data = {
    from: "mailgun@" + domain ,
    to: req.body.email,
    subject: 'email verification',
    html: "<p>Cliquez sur ce<a href = "+ link + ">lien</a> pour activer votre compte</p>"
  };
  mg.messages().send(data, function (error, body2) {
    console.log(body2);
  });*/
  let info = transporter.sendMail({
    from: 'romain.barry@yysh.fr', // sender address
    to: req.body.email,// list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<p>Cliquez sur ce<a href = "+ link + ">lien</a> pour activer votre compte</p>", // html body
  });
  console.log(info)
  router.get('/verify', (req,res,next) =>{ 
    
  const params = [req.query.email]
  const requete = 'SELECT activatelink FROM client WHERE email = ?'
  const request = connection.query(requete, params, (error,response)=>{
    if (JSON.parse(JSON.stringify(response))[0].activatelink === req.query.id)  {
      const requete2 = 'UPDATE client SET activate = 1 WHERE email = ?'
      const request2 = connection.query(requete2, params)
      res.render('index', { title: 'compte activé', message: 'compte activé'});
    }
    else {
      res.render('index', { title: 'erreur', message: 'erreur'})
    }
  })
})
}
else {
  console.log("erreur recaptcha")
}
});
});

router.put('/', (req,res,next) =>{ 
  const comparison = jwt.verify(req.header('authorization'), secret)
    if (comparison === false) {
        return res.status(401).send(error)
       }
    else {
      const siret = (req.query.siret).slice(0,9)
      const params = [req.query.siret, siret, req.query.email ] 
      const requete2 = 'UPDATE client SET SIRET = ( CASE WHEN  SIRET = "" THEN ? END) , SIREN = ( CASE WHEN SIREN = "" THEN  ? END) WHERE email = ?'
      const request2 = connection.query(requete2, params, (response)=> {
        res.send(response)
        
      })
    }
  })

router.delete('/', (req,res,next) =>{ 
  const comparison = jwt.verify(req.header('authorization'), secret)
    if (comparison === false) {
        return res.status(401).send(error)
       }
    else {
      const params = [req.query.email] 
      const requete2 = 'DELETE FROM client WHERE email = ?'
      const request2 = connection.query(requete2, params, (response)=> {
        res.send(response)
        
      })
    }
})

module.exports = router;
