var express = require('express');
var getMenu = require('./menu');
var myutils = require('bbs-utils');
var router = express.Router();

var usersRouter = require("./users/users");
var topicsRouter = require("./topics/topics");
var authsRouter = require("./auths/auths");


// 用户验证
router.use((req, res, next) => {
  if (!req.session.isAdmin) {
    res.render("tip/tips", myutils.routeUtils.simpleTip("auth"));
  } else {
    next();
  }
});

/* GET admins listing. */
router.get('/', function (req, res) {
  res.render('admin/index', { username: req.session.username });
});

// /admin/welcome
router.get('/menu', function (req, res) {
  res.json(getMenu(["all"]));
});

router.get('/welcome', function (req, res) {
  res.render('admin/welcome');
});


// 后台权限验证中间件
function authMatch(req, res, next) {
  let verifyResult = false;
  for (let i = 0; i < req.session.authList.length; i++) {
    let matchUrl = req.session.authList[i];
    if (req.originalUrl.indexOf(matchUrl) === 0) {
      verifyResult = true;
      break;
    }
  }
  if (verifyResult) {
    next();
  } else {
    res.render("tip/tips", myutils.routeUtils.simpleTip("403"));
  }
}

router.use(authMatch);

// 用户管理
router.use('/users', usersRouter);
// 帖子管理
router.use('/topics', topicsRouter);
// 权限管理
router.use('/auths', authsRouter);


module.exports = router;
