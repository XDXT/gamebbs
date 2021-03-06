var express = require('express');
var myutils = require('bbs-utils');
var router = express.Router();

router.get('/', function (req, res) {
    res.render("user/info")
});

router.get('/register', function (req, res) {
    res.render("user/register")
});

router.get('/login', function (req, res) {
    res.render("user/login")
});

router.post('/register', async function (req, res) {
    let username = req.body.username;
    let userExists = await isUserExists(username);
    if (userExists) {
        res.render("tip/tips", myutils.routeUtils.simpleTip("registerfailed"));
    } else {
        let result1 = false,
            result2 = false,
            result3 = false;
        // 插入用户表
        let password = myutils.routeUtils.md5Encryption(req.body.password);
        let imageIndex = myutils.routeUtils.randomNumber(0, myutils.data.images.header.length-1);
        let imageUrl = myutils.data.images.header[imageIndex];
        let sql = myutils.sqlMap.insert("user", ['username', 'password', 'headimg']);
        result1 = await myutils.sqlQuery(sql, [username, password, imageUrl]);
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
            res.render("tip/tips", myutils.routeUtils.simpleTip("registersuccess"));
        } else {
            res.render("tip/tips", myutils.routeUtils.simpleTip("registerfailed"));
        }
    }
});

router.post('/login', async function (req, res) {
    let username = req.body.username;
    let userExists = await isUserExists(username);
    if (!userExists) {
        res.render("tip/tips", myutils.routeUtils.simpleTip("namenotexists"));
    } else {
        let password = myutils.routeUtils.md5Encryption(req.body.password);
        let sql = myutils.sqlMap.login();
        let users = await myutils.sqlQuery(sql, [username, password]);
        if (!users || users.length != 1) {
            res.render("tip/tips", myutils.routeUtils.simpleTip("loginfailed"));
        } else {
            let authSql = myutils.sqlMap.select("role_auth", ["authid", "roleid"]);
            authSql = myutils.sqlMap.whereAnd(authSql, ["roleid"], "=");
            let authIdList = await myutils.sqlQuery(authSql, [users[0].roleid]);

            let authList = [];
            let sql = myutils.sqlMap.select("auth", ["id", "authurl"]);
            sql = myutils.sqlMap.whereAnd(sql, ["id"], "=");
            for (let i = 0; i < authIdList.length; i++) {
                let item = authIdList[i];
                let result = await myutils.sqlQuery(sql, [item.authid]);
                authList.push(result[0].authurl);
            }

            req.session.isLogin = true;
            req.session.username = username;
            req.session.userId = users[0].id;
            req.session.isAdmin = (users[0].roleid > 0);
            req.session.authList = authList;

            res.render("tip/tips", myutils.routeUtils.simpleTip("loginsuccess"));
        }
    }
});


async function isUserExists(username) {
    let sql = myutils.sqlMap.hasUser();
    let users = await myutils.sqlQuery(sql, [username]);
    if (users && users.length === 0) {
        return false;
    }
    return true;
}

router.get('/logout', function (req, res, next) {
    req.session.destroy((erro) => {
        if (erro) {
            res.render("tip/tips", myutils.routeUtils.simpleTip("default"));
        } else {
            res.render("tip/tips", myutils.routeUtils.simpleTip("logout"));
        }
    });
});

module.exports = router;