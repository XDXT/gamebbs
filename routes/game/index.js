var express = require('express');
var router = express.Router();

var gameRouter = require("./game/game");
var userRouter = require("./user/user");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('game/index');
});



router.use('/play', gameRouter);
router.use('/user', userRouter);


module.exports = router;
