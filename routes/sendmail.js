
var express = require('express');
const mailgun = require("mailgun-js");
const { removeAllListeners } = require('superagent');
var router = express.Router();
var nodemailer = require('nodemailer')



  const secretKey = "6Ld4jTIjAAAAAPQVwX3ZreT3Qm2N11fLwWvw8sB5"

  router.post('/', function(req, res, next) {
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
      to: req.body.email,// list of receivers
      subject: "Hello ✔", // Subject line
      html: req.body.message, // html body
    });
  });
  
  
  module.exports = router;