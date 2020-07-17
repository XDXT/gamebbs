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
    res.json({
      state: 'ok',
      message: '删除成功',
    });
  } else {
    res.status(500).json('oh noes!');
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
    res.status(500).json('oh noes!');
  }
}); 


module.exports = router;
