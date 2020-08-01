var socketServer = require('../module/my-socket');
var router = socketServer.router();
var myutils = require('bbs-utils');

function checkOnline(session) {
    if (session && session.isOnline) {
        return true;
    }
    return false;
}

// 信息发送
router.on('message', async function (data, socket, io) {
    if (checkOnline(socket.request.session)) {
        // 判断私发，并且对方不在线
        if (data.receiver.isroom != 1 && (data.receiver.socketid == null || data.receiver.socketid == '')) {
            // 不在线消息存到数据库
            let sql = myutils.sqlMap.insert('chat', ['sender', 'receiver', 'message', 'time', 'isread']);
            let values = [data.sender.id, data.receiver.id, data.message, data.time, 0];
            await myutils.sqlQuery(sql, values);
        } else {
            // 在线发送消息
            io.to(data.receiver.socketid).emit('message', data);
        }
    } else {
        io.to(socket.socketid).emit('server', {
            state: 'fail',
            message: '请重新登录聊天室'
        });
    }
});

router.on('readMsg', async function (data, socket, io) {
    let sql = myutils.sqlMap.update('chat', ['isread']);
    sql = myutils.sqlMap.whereAnd(sql, ['sender', 'receiver'], '=');

    await myutils.sqlQuery(sql, [1, data.sender, data.receiver]);
});


module.exports = router;