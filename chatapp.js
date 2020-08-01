var socketServer = require('./module/my-socket');
var chatapp = socketServer;

// router
var userRouter = require('./sroutes/user');
var chatRouter = require('./sroutes/chat');


// add
chatapp.use(userRouter);
chatapp.use(chatRouter);

module.exports = chatapp;