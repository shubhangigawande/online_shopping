var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session')
var sessionConfing = {
  secret: 'keyboard cat',
  cookie: { maxAge: 6000 }
}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var validaterouter = require("./routes/validatingCredentials");
var getProductDetails = require("./routes/getProductDetails");
var newUsersignup = require("./routes/addNewUser");
var addNewRProductRouter = require("./routes/addNewProduct");
var uploadResourceRouter = require("./routes/uploadResource");
var checkloginRouter = require("./routes/checkUserSession");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session(sessionConfing));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/validate/userCredentials', validaterouter);
app.use('/get/product/details', getProductDetails);
app.use("/new/user/signup", newUsersignup );
app.use("/new/addProduct", addNewRProductRouter);
app.use("/upload/productImage", uploadResourceRouter);
app.use("/user/validateSession", checkloginRouter);


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