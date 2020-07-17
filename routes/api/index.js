var express = require('express');
var router = express.Router();

var userRouter = require("./users/users");

/* GET users listing. */
router.get('/', function(req, res) {
  res.json({
    state: "ok",
    message: "这里是api区"
  });
});

router.use("/users", userRouter);

module.exports = router;
