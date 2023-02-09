require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan'); 
// removing morgan in production
const session = require('express-session');
const DetaStore = require('./data-access/DetaSessionStore');
const favicon = require('serve-favicon');

process.env.TZ = "Asia/Calcutta"

var usersRouter = require('./routes/users');
const notesRouter = require('./routes/notes');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const signupRouter = require('./routes/signup');
const importRouter = require('./routes/import');
const exportRouter = require('./routes/export');
const staticRouter = require('./routes/static');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(session({ secret: process.env.sessionKey, store: DetaStore.create({projectKey: process.env.detaProjectKey, dbName: "session"}), resave: true, saveUninitialized: false}));
// app.use(logger('short'));
// removing morgan in production
app.use(express.json()); //puts the JS object corresponding to the incoming JSON to the req.body
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',loginRouter);
app.use('/login',loginRouter);
app.use('/users', usersRouter);
app.use('/notes', notesRouter);
app.use('/logout',logoutRouter);
app.use('/signup',signupRouter);
app.use('/import',importRouter);
app.use('/export',exportRouter);
app.use('/static',staticRouter);
app.use('/favicon.ico',(req,res,next)=>{
  res.redirect('/static/favicon.ico');
});


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
