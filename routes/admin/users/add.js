var express = require('express');
var myutils = require('bbs-utils');
var router = express.Router();

router.get('/', function (req, res) {
  res.render("admin/users/add")
});

async function isUserExists(username) {
  let sql = myutils.sqlMap.hasUser();
  let users = await myutils.sqlQuery(sql, [username]);
  if (users && users.length == 0) {
    return false;
  }
  return true;
}

router.post('/', async function (req, res) {
  let username = req.body.username || "";
  if (username == "" || username.length < 6 || username.length > 20) {
    res.json({
      state: "fail",
      message: "用户名必须6到20位"
    });
  }

  let userExists = await isUserExists(username);
  if (userExists) {
    res.json({
      state: "fail",
      message: "用户名已存在"
    });
  } else {
    let password = myutils.routeUtils.md5Encryption(req.body.password);
    let sql = myutils.sqlMap.insert("user", ['username', 'password']);
    let result = await myutils.sqlQuery(sql, [username, password]);
    if (result) {
      res.json({
        state: "ok",
        message: "添加成功"
      })
    } else {
      res.json({
        state: "fail",
        message: "添加失败，请检查数据格式"
      })
    }
  }
});



module.exports = router;
