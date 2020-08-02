var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

var myutils = require('bbs-utils');
var chatapp = require('./chatapp')

// 引入路由
var indexRouter = require('./routes/index');
var gameRouter = require('./routes/game/index');
var adminRouter = require('./routes/admin/index');
var apiRouter = require('./routes/api/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var sessionMiddleware = session({
  secret: "ascsacfs'.,/#@!scuHJG",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 配置cookie默认值 7天
});

chatapp.bindSession(sessionMiddleware);

// 待删除
// app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(express.static(path.join(__dirname, 'public')));

// 路由拦截
// 主路由
app.use('/', indexRouter);
// api
app.use('/api', apiRouter);
// 游戏区
app.use('/game', gameRouter);
// 管理模块
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('tip/error');
  res.render("tip/tips", myutils.routeUtils.simpleTip("404"));
});

myutils.routeUtils.mylog("启动网站");

module.exports = app;
