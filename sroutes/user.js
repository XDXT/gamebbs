var socketServer = require('../module/my-socket');
var router = socketServer.router();
var myutils = require('bbs-utils');

socketServer.iouse((socket, next) => {
    //console.log(socket.conn.request.session);
    let session = socket.request.session;
    if (session.isLogin === true) {
        next();
    }
});

router.on('login', async function (data, socket, io) {
    if (socket.request.session.isLogin !== true) {
        socket.emit('login', {
            state: 'fail',
            content: '请先登录'
        });
        return;
    }

    let sql = myutils.sqlMap.update('user', ['socketid', 'isonline']);
    sql = myutils.sqlMap.whereAnd(sql, ['id'], '=');
    let result = await myutils.sqlQuery(sql, [socket.id, 1, socket.request.session.userId]);
    if (result) {
        socket.request.session.isOnline = true;
        socket.emit('login', {
            state: 'ok',
            content: '登录成功'
        });
    };

    // 更新在线用户列表
    let usersSql = myutils.sqlMap.userInfo();
    let users = await myutils.sqlQuery(usersSql);
    io.sockets.emit('users', {
        state: 'ok',
        users: users
    });

    // 未读消息
    let msgSql = myutils.sqlMap.simpleSelect('chat');
    msgSql = myutils.sqlMap.whereAnd(msgSql, ['isread', 'receiver'], '=');
    let msgs = await myutils.sqlQuery(msgSql, [0, socket.request.session.userId]);
    if (msgs.length > -1) {
        socket.emit("unreadMsg", {
            state: 'ok',
            messages: msgs,
            time: new Date()
        });
    }

    // 加入房间
    socket.join('flappy');
    socket.join('escape');
})


router.on('disconnect', async function (data, socket, io) {
    console.log(socket.id + ' 断开连接');
    socket.request.session.isOnline = false;
    // 更新个人状态
    let sql = myutils.sqlMap.update('user', ['socketid', 'isonline']);
    sql = myutils.sqlMap.whereAnd(sql, ['id'], '=');
    await myutils.sqlQuery(sql, [null, 0, socket.request.session.userId]);

    // 更新用户在线情况
    let usersSql = myutils.sqlMap.userInfo();
    let users = await myutils.sqlQuery(usersSql);
    io.sockets.emit('users', {
        state: 'ok',
        users: users
    });
});


module.exports = router;