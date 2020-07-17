var express = require('express');
var router = express.Router();

var addRouter = require("./add");
var statusRouter = require("./status");
var editRouter = require("./edit");
var listRouter = require("./list");

router.get('/', function (req, res) {
  res.send('response admin/ users');
});

// 用户列表
// 增
router.use('/add', addRouter);
// 删除、恢复
router.use('/', statusRouter);
// 改
router.use('/edit', editRouter);
// 查
router.use('/list', listRouter);


module.exports = router;
