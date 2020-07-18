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

// todo token=? md5(timstamp+xxx) / uuid
router.get('/delete/:roleId', async function (req, res) {
    let roleId = req.params.roleId || "";
    let reg = /^[0-9]{1,}$/;
    let result = reg.test(roleId);

    if (!result || roleId == 0) {
        res.json({
            state: "fail",
            message: "id为数字且不能为0"
        });
    } else {
        let result1 = false,
            result2 = false,
            result3 = false;

        // TODO begin deleterole
        let droleSql = myutils.sqlMap.delete("role");
        droleSql = myutils.sqlMap.whereAnd(droleSql, ["id"], "=");
        result1 = myutils.sqlQuery(droleSql, [roleId]);
        // result1 == false  rollback, return | 以下result2，result3类推
        if (result1) {
            let dauthSql = myutils.sqlMap.delete("role_auth");
            dauthSql = myutils.sqlMap.whereAnd(dauthSql, ["roleid"], "=");
            result2 = myutils.sqlQuery(dauthSql, [roleId]);
        }

        if (result2) {
            let updateSql = myutils.sqlMap.update("user", "roleid");
            updateSql = myutils.sqlMap.whereAnd(updateSql, ["roleid"], "=");
            result3 = myutils.sqlQuery(updateSql, [0]);
        }
        
        if (result1 && result2 && result3) {
            // commit deleterole
            let content = "id: " + req.session.id + " " + req.session.username + "删除了";
            content += "角色 roleid id =" + roleId;
            myutils.routeUtils.mylog(content);
            res.json({
                state: "ok",
                message: "删除成功"
            });
        } else {
            let content = "id: " + req.session.id + " " + req.session.username + "删除";
            content += "角色 roleid id =" + roleId + "失败";
            myutils.routeUtils.mylog(content);
            res.json({
                state: "fail",
                message: "删除失败"
            });
        }
    }
});






module.exports = router;