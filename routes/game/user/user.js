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
        let password = myutils.routeUtils.md5Encryption(req.body.password);
        let sql = myutils.sqlMap.insert("user", ['username', 'password']);
        await myutils.sqlQuery(sql, [username, password]);
        res.render("tip/tips", myutils.routeUtils.simpleTip("registersuccess"));
    }
});

router.post('/login', async function (req, res) {
    let username = req.body.username;
    let password = myutils.routeUtils.md5Encryption(req.body.password);
    let sql = myutils.sqlMap.login();
    let users = await myutils.sqlQuery(sql, [username, password]);
    if (!users || users.length != 1) {
        res.render("tip/tips", myutils.routeUtils.simpleTip("loginfailed"));
    } else {
        req.session.isLogin = true;
        req.session.username = username;
        req.session.userId = users[0].id;
        req.session.isAdmin = (users[0].roleid > 10);
        res.render("tip/tips", myutils.routeUtils.simpleTip("loginsuccess"));
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
// userlistAll: "SELECT user.id as id, username, phone, email, adress, headimg, deleteFlag, rolename, roleid, privilege"
// + " FROM user LEFT JOIN role ON user.roleid=role.id",
// userlistName: "SELECT user.id as id,username,phone,email,adress,headimg,deleteFlag,rolename,roleid,privilege"
//     + " FROM user LEFT JOIN role ON user.roleid=role.id WHERE user.username LIKE ?",
