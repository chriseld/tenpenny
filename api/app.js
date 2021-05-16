var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var db = require('./routes/DbConnection');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
var emailcheckRouter = require('./routes/emailcheck');
var usernamecheckRouter = require('./routes/usernamecheck');
var registeruserRouter = require('./routes/registeruser');
var getuserbyemailRouter = require('./routes/getuserbyemail');
var loginuserRouter = require('./routes/loginuser');
var passwordcompareRouter = require('./routes/passwordcompare');
var mailerRouter = require('./routes/mailer');
var updateuseremailRouter = require('./routes/updateuseremail');
var updateuserpasswordRouter = require('./routes/updateuserpassword');
var forgotpasswordRouter = require('./routes/forgotpassword');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/emailcheck', emailcheckRouter);
app.use('/usernamecheck', usernamecheckRouter);
app.use('/registeruser', registeruserRouter);
app.use('/getuserbyemail', getuserbyemailRouter);
app.use('/loginuser', loginuserRouter);
app.use('/passwordcompare', passwordcompareRouter);
app.use('/mailer', mailerRouter);
app.use('/updateuseremail', updateuseremailRouter);
app.use('/updateuserpassword', updateuserpasswordRouter);
app.use('/forgotpassword', forgotpasswordRouter);
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
