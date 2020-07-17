var express = require('express');
var myutils = require('bbs-utils');
var router = express.Router();

router.get('/:userId', async function (req, res) {
  let userId = req.params.userId || "";
  let reg = /^[0-9]{1,}$/;
  let result = reg.test(userId);

  if (!result) {
    res.send("<h1>id错误，必须是全数字</h1>")
  } else {
    let sql = myutils.sqlMap.simpleSelect("user");
    sql = myutils.sqlMap.whereAnd(sql, ["id"], "=");

    let users = await myutils.sqlQuery(sql, [userId]);

    if (users && users.length > 0) {
      let user = users[0];
      sql = myutils.sqlMap.simpleSelect("role");
      let roles = await myutils.sqlQuery(sql);
      res.render('admin/users/edit', { user, roles });
    } else {
      res.send("<h1>用户不存在</h1>")
    }
  }
});


router.post('/:userId', async function (req, res) {
  let userId = req.params.userId || "";
  let reg = /^[0-9]{1,}$/;
  let result = reg.test(userId);

  if (!result) {
    res.send("<h1>id错误，必须是全数字</h1>")
  } else {
    let columns = ["roleid"];
    let values = [req.body.roleid];

    if (req.body.password !== "") {
      columns.push("password");
      values.push(myutils.routeUtils.md5Encryption(req.body.password));
    }

    if (req.body.phone !== "") {
      columns.push("phone");
      values.push(req.body.phone);
    }

    if (req.body.nickname !== "") {
      columns.push("nickname");
      values.push(req.body.nickname);
    }

    if (req.body.email !== "") {
      columns.push("email");
      values.push(req.body.email);
    }
    values.push(userId);

    let sql = myutils.sqlMap.update("user", columns);
    sql = myutils.sqlMap.whereAnd(sql, ["id"], "=");
    let result = await myutils.sqlQuery(sql, values);

    if (result) {
      res.json({
        state: "ok",
        message: "更新成功"
      })
    } else {
      res.json({
        state: "fail",
        message: "更新失败，请检查数据格式"
      })
    }
  }
});



module.exports = router;
