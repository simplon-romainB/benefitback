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
  console.log(res.body);
  if (res.body.success) {
  
  const data = {
    from: "mailgun@" + domain ,
    to: "romain.barry69@gmail.com",
    subject: 'contact',
    html: req.body.message
  };
  mg.messages().send(data, function (error, body2) {
    console.log(body2);
  });


}
else {
  console.log("erreur recaptcha")
}
});
});

module.exports = router;