var express = require('express');
var myutils = require('bbs-utils');
var router = express.Router();

/* GET users listing. */
router.get('/exists', async function (req, res) {
    let username = req.query.username || "";
    if (username == "" || username.length < 6 || username.length > 20) {
        res.json({
            state: "fail",
            message: "用户名必须6到20位"
        });
    } else {
        let sql = myutils.sqlMap.hasUser();
        let users = await myutils.sqlQuery(sql, [username]);
        if (users && users.length == 0) {
            res.json({
                state: "ok",
                message: "合法用户名"
            })
        } else {
            res.json({
                state: "fail",
                message: "用户名不合法或已存在"
            })
        }
    }
});

module.exports = router;