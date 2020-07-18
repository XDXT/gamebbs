var express = require('express');
var myutils = require('bbs-utils');
var router = express.Router();

router.post('/delete', async function (req, res) {
  let idList = req.body.idList;
  if (typeof idList !== "object") {
    idList = [idList];
  }
  let values = [];
  let sql = myutils.sqlMap.updateStatus("user", idList);
  values.push(1);
  values = values.concat(idList);
  let result = await myutils.sqlQuery(sql, values);

  if (result) {
    let content = "id: " + req.session.id + " " + req.session.username + "删除了";
    content += "用户 id =" + idList;
    myutils.routeUtils.mylog(content);
    res.json({
      state: 'ok',
      message: '删除成功',
    });
  } else {
    let content = "id: " + req.session.id + " " + req.session.username + "删除";
    content += "用户 id =" + idList + "失败";
    myutils.routeUtils.mylog(content);
    res.json({
      state: 'fail',
      message: '删除失败',
    });
  }
});

router.post('/restore', async function (req, res) {
  let idList = req.body.idList;
  if (typeof idList !== "object") {
    idList = [idList];
  }

  let values = [];
  let sql = myutils.sqlMap.updateStatus("user", idList);
  values.push(0);
  values = values.concat(idList);
  let result = await myutils.sqlQuery(sql, values);

  if (result) {
    res.json({
      state: 'ok',
      message: '恢复成功',
    });
  } else {
    res.json({
      state: 'fail',
      message: '恢复失败',
    });
  }
}); 


module.exports = router;
