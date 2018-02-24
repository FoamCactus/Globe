var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var tweets = require('./routes/tweets');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var stream = require('pubnub-twitter/pubnub-twitter');

server.listen(8080);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/users', users);
app.use('/tweets', tweets);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

io.on('connection', function (socket) {
    var tweets = [];
    var t = [];
    var tlocation = [];
    stream(function (tweet) {
        if(tweet["geo"] && tweet["geo"].type === "Point"){
            tlocation[0] = tweet["geo"].coordinates[0];
            tlocation[1] = tweet["geo"].coordinates[1];
            tlocation[2] = Math.random();
            t[0] = tweet["user"].name;
            t[1] = tlocation;
            t[3] = tweet;
            tweets.push(t);
            socket.emit('tweet', JSON.stringify(tweets));
        }
    });
});

module.exports = app;
