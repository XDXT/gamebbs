var express = require('express');
var myutils = require('bbs-utils');
var router = express.Router();

// 用户验证
router.use((req, res, next) => {
    if (!req.session.isLogin) {
        res.render("tip/tips", myutils.routeUtils.simpleTip("login"));
    } else {
        next();
    }
});

/* GET home page. */
router.get('/', function (req, res) {
    res.render('chat/index');
});

module.exports = router;
