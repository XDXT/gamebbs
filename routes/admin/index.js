var express = require('express');
var router = express.Router();

// 用户验证
router.use((req, res, next) => {
  if (!req.session.isAdmin) {
    res.render("tip/tips", myutils.routeUtils.simpleTip("auth"));
  } else {
    next();
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
