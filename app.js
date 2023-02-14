var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fileUploadRouter = require('./routes/fileUpload');
var loginRouter = require('./routes/login');
var updateRouter = require('./routes/update');
var updatekbisRouter = require('./routes/updatekbis');
var updatedocRouter = require('./routes/updatedoc');
var getdocRouter = require('./routes/getdoc');
var adminRouter = require('./routes/admin');
var clientRouter = require('./routes/client');
var uploadbillRouter = require('./routes/uploadbill');
var getbillRouter = require('./routes/getbill')
var getbilltoRouter = require('./routes/getbillto')
var logoRouter = require('./routes/logo');
var profilRouter = require('./routes/profil');
var adminClientsRouter= require('./routes/adminclients');
var checkfactureRouter = require('./routes/checkfacture');
var contactRouter = require('./routes/contact');
var pushRouter = require('./routes/push');
var usersSiretRouter = require('./routes/usersSiret');
var sendmailRouter = require('./routes/sendmail')
var dlfilesRouter = require('./routes/dlfiles')
var dlbillRouter = require('./routes/dlbill')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('uploads'))
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "authorization, content-type");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Allow-Origin-With-Credentials");
  res.header("Access-Control-Allow-Methods","GET,HEAD,POST,PUT,DELETE,CONNECT,OPTIONS,TRACE,PATCH")
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/fileUpload', fileUploadRouter);
app.use('/login', loginRouter);
app.use('/update', updateRouter);
app.use('/updatekbis', updatekbisRouter);
app.use('/updatedoc', updatedocRouter);
app.use('/getdoc', getdocRouter);
app.use('/admin', adminRouter);
app.use('/client', clientRouter);
app.use('/uploadbill', uploadbillRouter);
app.use('/getbill', getbillRouter);
app.use('/getbillto', getbilltoRouter);
app.use('/logo', logoRouter);
app.use('/profil', profilRouter);
app.use('/adminclients', adminClientsRouter);
app.use('/checkfacture', checkfactureRouter);
app.use('/contact', contactRouter);
app.use('/push', pushRouter);
app.use('/usersSiret', usersSiretRouter);
app.use('/sendmail', sendmailRouter);
app.use('/dlfiles', dlfilesRouter);
app.use('/dlbill', dlbillRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
