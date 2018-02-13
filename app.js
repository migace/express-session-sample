const express = require('express'),
      path = require('path'),
      favicon = require('serve-favicon'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      session = require('express-session'),
      parseurl = require('parseurl'),
      cors = require('cors');

const index = require('./routes/index');
const users = require('./routes/users');
const admin = require('./routes/admin');

const app = express();

mongoose.connect('mongodb://localhost/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(session({
  secret: 'my cats name again',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { 
    httpOnly: false, // key
    maxAge: null
  }
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules/', express.static(__dirname + '/node_modules'));

app.use('/', index);
app.use('/users', users);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
