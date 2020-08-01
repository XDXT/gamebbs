var express = require('express');
var router = express.Router();

var gameRouter = require("./game/game");
var userRouter = require("./user/user");
var chatRouter = require("./chat/chat");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('game/index');
});



router.use('/play', gameRouter);
router.use('/user', userRouter);
router.use('/chat', chatRouter);


module.exports = router;
