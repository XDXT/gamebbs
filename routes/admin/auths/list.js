var express = require('express');
var myutils = require('bbs-utils');
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res) {
    res.render('admin/auths/list');
});

router.get('/adminList', async function (req, res) {
    let page = req.query.page || 1;
    let limit = req.query.limit || 20;
    page = parseInt(page);
    limit = parseInt(limit);

    let sql = myutils.sqlMap.select(
        "user",
        ["user.id", "username", "nickname", "rolename", "roleid"],
        ["id"]
    );
    sql = myutils.sqlMap.joinTable(sql, "user", "LEFT", "role", ["roleid"], ["id"]);
    sql = myutils.sqlMap.whereAnd(sql, ["roleid"], ">");
    sql = myutils.sqlMap.limit(sql);

    let numberSql = myutils.sqlMap.count("user");
    numberSql = myutils.sqlMap.whereAnd(numberSql, ["roleid"], ">");

    let users = await myutils.sqlQuery(sql, [0, (page - 1) * limit, limit]);
    let numbers = await myutils.sqlQuery(numberSql, [0]);

    if (users) {
        res.json({
            code: 0,
            msg: "权限数据",
            count: numbers[0].number,
            data: users
        });
    } else {
        res.json({
            code: 500,
            msg: "请求错误",
            count: 0,
            data: {}
        });
    }
});

module.exports = router;