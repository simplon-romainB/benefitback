
var express = require('express');
const mailgun = require("mailgun-js");
const { removeAllListeners } = require('superagent');
var router = express.Router();
var domain = "sandboxd6a0305b58a547febd8cb23b89d0fd32.mailgun.org";
var apiKey = "9b92e952daf94ce95ae71510b84e08f1-d1a07e51-2c9dc59b";
const mg = mailgun({apiKey: apiKey, domain: domain});


  const secretKey = "6Ld4jTIjAAAAAPQVwX3ZreT3Qm2N11fLwWvw8sB5"

  router.post('/', function(req, res, next) {
    
    const data = {
      from: "mailgun@" + domain ,
      to: "romain.barry69@gmail.com",
      subject: 'contact',
      html: req.body.message
    };
    mg.messages().send(data, function (error, body2) {
      console.log(body2);
    });
  });
  
  
  module.exports = router;