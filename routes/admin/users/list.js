var express = require('express');
var myutils = require('bbs-utils');
var router = express.Router();

router.get('/', async function (req, res) {
  let page = req.query.page || 1;
  let username = req.query.username || "";
  let deleted = req.query.hiddenDelete || "off";

  let values = [];
  let sql = myutils.sqlMap.select(
    "user", 
    ["user.id", "username", "nickname", "phone", "email", "headimg", "deleteFlag", "rolename", "roleid"],
    ["id"]
  );
  sql = myutils.sqlMap.joinTable(sql, "user", "LEFT", "role", ["roleid"], ["id"]);

  let numberValues = [];
  let numberSql = myutils.sqlMap.count("user");

  if (username !== "") {
    sql = myutils.sqlMap.whereAnd(sql, ["username"], "like");
    numberSql = myutils.sqlMap.whereAnd(numberSql, ["username"], "like");
    values.push("%" + username + "%");
    numberValues.push("%" + username + "%");
  }

  if (deleted !== "" && deleted === "on") {
    sql = myutils.sqlMap.filterDeleted(sql);
    numberSql = myutils.sqlMap.filterDeleted(numberSql);
    values.push(0);
    numberValues.push(0);
  }

  sql = myutils.sqlMap.limit(sql);
  values.push(20 * (page - 1));
  values.push(20);
  let users = await  myutils.sqlQuery(sql, values);
  let numbers = await  myutils.sqlQuery(numberSql, numberValues);

  res.render('admin/users/list', {
    number: numbers[0].number,
    page: page,
    users: users,
    filterName: username,
    filterDeleted: deleted
  });
});



module.exports = router;
