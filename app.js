var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport')
var bodyParser = require('body-parser')
require('./config/config')

const {to} = require('./global_functions');
const cryptoService = require('./services/crypto.service');

var indexRouter = require('./routes/router');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json({limit:"200mb"}))
app.use(bodyParser.urlencoded({extended: true,limit:'200mb'}))

// app.use('/users', usersRouter);
app.use(passport.initialize());
app.use(async function (req,res,next){
  console.log('check34',req.headers.authorization);
  if(req && req.headers && req.headers.authorization){
    [err,data] = await to(cryptoService.decrypt(req.headers.authorization));
    req.headers.authorization =  data;
  }
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Controll-Allow-Methods','GET,POST,PUT,PATCH,OPTIONS,DELETE');
  res.setHeader('Access-Controll-Allow-Headers','X-Requested-With,content-type,Authorization,Content-Type');
  res.setHeader('Access-Controll-Allow-Credentials',true);
  next();
});

//SEQUELIZE CONNECTION

const models= require('./models')
models.sequelize.authenticate().then(()=>{
  console.log("Connecter to the database:sequelize")
}).catch((err)=>{
  console.log("Connection refused",err.message)
})
models.sequelize.sync({alter:true});

app.use('/', indexRouter);


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

//passport middleware



module.exports = app;
