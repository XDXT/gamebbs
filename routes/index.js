var express = require('express');
var myutils = require('bbs-utils');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('tip/tips', myutils.routeUtils.simpleTip("404"));
});

module.exports = router;
