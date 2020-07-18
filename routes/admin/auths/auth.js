var express = require('express');
var myutils = require('bbs-utils');
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res) {
    res.render('admin/auths/auth');
});

router.get('/all', async function (req, res) {
    let sql = myutils.sqlMap.simpleSelect("auth");
    let result = await myutils.sqlQuery(sql);
    if (result) {
        res.json({
            code: 0,
            data: result
        });
    } else {
        res.json({
            code: 500,
            msg: "请求错误",
            data: {}
        });
    }
});

router.get('/authlist', async function (req, res) {
    let page = req.query.page || 1;
    let limit = req.query.limit || 20;
    page = parseInt(page);
    limit = parseInt(limit);

    let sql = myutils.sqlMap.simpleSelect("auth");
    sql = myutils.sqlMap.limit(sql);

    let auths = await myutils.sqlQuery(sql, [(page - 1) * limit, limit]);

    let numberSql = myutils.sqlMap.count("role");
    let numbers = await myutils.sqlQuery(numberSql);
    if (auths) {
        res.json({
            code: 0,
            msg: "权限数据",
            count: numbers[0].number,
            data: auths
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


router.get('/add', function (req, res) {
    res.render("admin/auths/addauth")
});

router.post('/add', async function (req, res) {
    // 插入权限表
    if (req.body.authname !== "" && req.body.authurl !=="") {
        let authSql = myutils.sqlMap.insert("auth", ['authname', 'authurl']);
        let result = await myutils.sqlQuery(authSql, [req.body.authname, req.body.authurl]);

        if (result) {
            res.json({
                state: "ok",
                message: "添加成功"
            })
        } else {
            res.json({
                state: "fail",
                message: "添加失败"
            })
        }
    } else {
        res.json({
            state: "fail",
            message: "数据为空"
        })
    }

});

// todo token=? md5(timstamp+xxx) / uuid
router.get('/delete/:authId', async function (req, res) {
    let authId = req.params.authId || "";
    let reg = /^[0-9]{1,}$/;
    let result = reg.test(authId);

    if (!result || authId == 0) {
        res.json({
            state: "fail",
            message: "id为数字且不能为0"
        });
    } else {
        // TODO begin deleterole
        let dauthSql = myutils.sqlMap.delete("auth");
        dauthSql = myutils.sqlMap.whereAnd(dauthSql, ["id"], "=");
        let result1 = myutils.sqlQuery(dauthSql, [authId]);

        // result1 == false  rollback, return
        let dshipSql = myutils.sqlMap.delete("role_auth");
        dshipSql = myutils.sqlMap.whereAnd(dshipSql, ["authid"], "=");
        let result2 = myutils.sqlQuery(dshipSql, [authId]);

        if (result1 && result2) {
            // commit deleterole
            res.json({
                state: "ok",
                message: "删除成功"
            });
        } else {
            res.json({
                state: "fail",
                message: "删除失败"
            });
        }
    }
});

module.exports = router;