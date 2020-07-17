var express = require('express');
var myutils = require('bbs-utils');
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res) {
    res.render('admin/auths/role');
});

router.get('/roleList', async function (req, res) {
    let page = req.query.page || 1;
    let limit = req.query.limit || 20;
    page = parseInt(page);
    limit = parseInt(limit);

    let sql = myutils.sqlMap.simpleSelect("role");
    sql = myutils.sqlMap.limit(sql);

    let roles = await myutils.sqlQuery(sql, [(page - 1) * limit, limit]);

    let numberSql = myutils.sqlMap.count("role");
    let numbers = await myutils.sqlQuery(numberSql);

    if (roles) {
        res.json({
            code: 0,
            msg: "角色数据",
            count: numbers[0].number,
            data: roles
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
    res.render("admin/auths/addrole")
});

router.post('/add', async function (req, res) {
    // 可以选择事务 begin  
    // 插入角色表
    let roleSql = myutils.sqlMap.insert("role", ['rolename', 'brief']);
    await myutils.sqlQuery(roleSql, [req.body.rolename, req.body.brief]);

    // 获取角色id
    let sql = myutils.sqlMap.select("role", ["id", "rolename"]);
    sql = myutils.sqlMap.whereAnd(sql, ["rolename"], "=");

    let role = await myutils.sqlQuery(sql, [req.body.rolename]);
    if (role) {
        let roleid = role[0].id;

        // 插入角色与权限关系表
        let roleShipSql = myutils.sqlMap.insert("role_auth", ["roleid", "authid"]);
        req.body.authList.forEach(async (item) => {
            await myutils.sqlQuery(roleShipSql, [roleid, item.value]);
        });
        // 可以选择事务 commit
        res.json({
            state: "ok",
            message: "添加成功"
        });
    } else {
        res.json({
            state: "fail",
            message: "数据有误"
        });
    }
});





module.exports = router;