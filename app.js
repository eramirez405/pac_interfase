var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var config = require('./config/database');
var session = require('express-session');

var db = mongoose.connection;
mongoose.connect(config.database, {useNewUrlParser: true})
  .then(()=> console.log('MongoDB Connected...'))
  .catch((err)=> console.log(err));

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var projectsRouter = require('./routes/projects');
var instrumentsRouter = require('./routes/instruments');
var pacRouter = require('./routes/pac');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'my own secret',
	resave: true,
	saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/projects', projectsRouter);
app.use('/instruments', instrumentsRouter);
app.use('/pac', pacRouter);


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
