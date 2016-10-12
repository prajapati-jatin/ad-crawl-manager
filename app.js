require('rootpath')();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var session = require('express-session');
var config = require('config.json');
var expressJwt = require('express-jwt');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var startup = require('./server/controllers/app.controller');
var userapi = require('./server/api/api.user');
//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: config.secret, resave: false, saveUninitialized: true}));
app.use('/api', expressJwt({secret: config.secret}).unless({path: ['/api/users/authenticate', '/api/users/register', '/api/users/createadmin']}));
// app.use(function(req, res, next){
//   var token = req.headers.authorization;
//   console.log('token: ' + token);
//   if(token){
//     req.session.token = token.split(' ')[1];
//   }
//   next();
// });

app.use('/app', express.static(path.join(__dirname, 'node_modules')));
app.use('/app', express.static(path.join(__dirname, 'public/app/components')));
app.use('/assets', express.static(path.join(__dirname, 'public/app')));
app.use('/views', express.static(path.join(__dirname, 'public/app/views')));

app.use('/', startup);
app.use('/api/users', userapi);




//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
