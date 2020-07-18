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
    let result1 = false,
        result2 = false,
        result3 = false;
    // 插入用户表
    let password = myutils.routeUtils.md5Encryption(req.body.password);
    let sql = myutils.sqlMap.insert("user", ['username', 'password']);
    result1 = await myutils.sqlQuery(sql, [username, password]);
    // 获取用户id
    if (result1) {
      sql = myutils.sqlMap.select("user", ["id", "username"]);
      sql = myutils.sqlMap.whereAnd(sql, ["username"], "=");
      result2 = await myutils.sqlQuery(sql, [username]);
    }
    // 插入游戏分数表
    if (result2) {
      sql = myutils.sqlMap.insert("score", ['userid']);
      result3 = await myutils.sqlQuery(sql, [result2[0].id]);
    }

    if (result1 && result2 && result3) {
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
