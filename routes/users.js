const superagent = require('superagent');
var bcrypt = require('bcryptjs');
var express = require('express');
const mailgun = require("mailgun-js");
var router = express.Router();
var domain = "sandboxaf7abc0fe7bd4fdba52036c9c49e904b.mailgun.org";
var apiKey = "9c583fcef7f94108654d17400737ae7d-2de3d545-6f854056";
const mg = mailgun({apiKey: apiKey, domain: domain});
const mysql = require('mysql')
const multer  = require('multer')
const upload = multer({ dest: '../' })
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'benefit'
});
  const secretKey = "6Ld4jTIjAAAAAPQVwX3ZreT3Qm2N11fLwWvw8sB5"



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
  var values = [ req.body.siret,  req.body.siren, req.body.nom, req.body.adresse, req.body.email, req.body.nomdirigeant, req.body.prenomdirigeant, req.file?.path,hash, activateLink]
  const requete = 'INSERT INTO client (SIRET,SIREN,denomination,adresse,email, Nom,Prenom, Kbis, password,role, activate, activatelink) VALUES (?,?,?,?,?,?,?,?,?, "user", false, ?)'
  const request = connection.query(requete, values)
  
  link="http://localhost:3000/users/verify?id="+activateLink +"&email=" + req.body.email;
  
  const data = {
    from: "mailgun@" + domain ,
    to: req.body.email,
    subject: 'email verification',
    html: "<p>please click this<a href = "+ link + ">link</a>to activate your account</p>"
  };
  mg.messages().send(data, function (error, body2) {
    console.log(body2);
  });
//}



router.get('/verify', (req,res,next) =>{ 
  const params = [req.query.email]
  const requete = 'SELECT activatelink FROM client WHERE email = ?'
  const request = connection.query(requete, params, (error,response)=>{
    console.log(JSON.parse(JSON.stringify(response))[0].activatelink)
    console.log(req.query.id)
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

module.exports = router;
