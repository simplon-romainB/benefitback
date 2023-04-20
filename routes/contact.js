const superagent = require('superagent');
var express = require('express');
const mailgun = require("mailgun-js");
var router = express.Router();
var domain = "sandboxd6a0305b58a547febd8cb23b89d0fd32.mailgun.org";
var apiKey = "9b92e952daf94ce95ae71510b84e08f1-d1a07e51-2c9dc59b";
const mg = mailgun({apiKey: apiKey, domain: domain});
const mysql = require('mysql')
const multer  = require('multer')
const upload = multer({ dest: '../' })
var nodemailer = require('nodemailer')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'benefit'
});
  const secretKey = "6Ld4jTIjAAAAAPQVwX3ZreT3Qm2N11fLwWvw8sB5"



/* inscription */
router.post('/', function(req, res, next) {
  const token = req.query.recaptcha
  const url =  `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
  superagent.get(url)
  .end((err, res) => {
  if (err) { return console.log(err); }
  if (res.body.success) {
  
    let transporter = nodemailer.createTransport({
      host: "node54-eu.n0c.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'romain.barry@yysh.fr', // generated ethereal user
        pass: 'Magicstar198.', // generated ethereal password
      },
    })
    let info = transporter.sendMail({
      from: 'romain.barry@yysh.fr', // sender address
      to: "romain.barry69@gmail.com",// list of receivers
      subject: "Hello ✔", // Subject line
      html: req.body.message + ' ' +req.body.email, // html body
    });


}
else {
  console.log("erreur recaptcha")
}
});
});

module.exports = router;