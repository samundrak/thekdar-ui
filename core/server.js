var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const cors = require('cors');
const basicAuth = require('express-basic-auth');
var app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(
    basicAuth({
      challenge: true,
      users: {
        [process.env.BASIC_AUTH_USERNAME]: process.env.BASIC_AUTH_PASSWORD,
      },
    })
  );
}
// view engine setup

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../build')));
// app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

app.use('/', require('./routes'));

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
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

// const configs = { port: 3000 }
module.exports = ({ configs, thekdar } = {}, done = () => null) => {
  console.log(`Thekdar ui is running on port :${configs.port}`);
  const server = app.listen(configs.port);
  const io = require('./socket')(server, thekdar);
  done(io, server);
};
