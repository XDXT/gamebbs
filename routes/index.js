var express = require('express');
var myutils = require('bbs-utils');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect("game");
});

module.exports = router;
