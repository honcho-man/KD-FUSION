const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config();
const http = require('http')
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./config/config').get(process.env.NODE_ENV);
var app = express();
var path = require('path')
//routes
const indexRouter = require('./routes/index')

app.use('/', indexRouter);

var port = db.PORT;

// view engine setup
var cons = require('consolidate');

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'))

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
    res.render('error', { title: 'Error!' });
});
/** Create HTTP server. */
const server = http.createServer(app);

server.listen(port);
/** Event listener for HTTP server "listening" event. */
//Start Server
server.on("listening", () => {
    console.log(`App listening on port::${port}`)
});

module.exports = app;