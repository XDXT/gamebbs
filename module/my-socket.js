var socketIO = require('socket.io');

class SocketServer {
    constructor() {
        this.middlewares = [];
        this.routers = [];
    }

    static new(...args) {
        this.ins = this.ins || new this(...args);
        return this.ins;
    }

    /**
     * 存放express-session 中间件
     * @param {express-session} sessionMiddleware
     */
    bindSession = function (sessionMiddleware) {
        this.sessionMiddleware = sessionMiddleware;
    }

    /**
     * 绑定http server
     * @param {http} server http server
     */
    bindServer(server) {
        this.io = socketIO(server);
        this.io.use((socket, next) => {
            this.sessionMiddleware(socket.request, {}, next);
        });
        for (let i = 0; i < this.middlewares.length; i++) {
            const func = this.middlewares[i];
            this.io.use(func);
        }
    }
    
    /**
     * run listen events
     */
    run() {
        this.io.on('connection', (socket) => {
            for (let i = 0; i < this.routers.length; i++) {
                const router = this.routers[i];
                router.listenEvent(socket, this.io);
            }
        })
    }

    /**
     * add router
     * @param {SocketRouter} router
     */
    use (router) {
        this.routers.push(router);
    }

    iouse(func) {
        this.middlewares.push(func);
    }

    /**
     * @return SocketRouter
     */
    router() {
        return new SocketRouter();
    }
}


class SocketRouter {
    constructor() {
        this.events = [];
    }

    on(eventName, eventFunc) {
        let e = {
            name: eventName,
            action: eventFunc
        }
        this.events.push(e);
    }

    listenEvent(socket, io) {
        for (let i = 0; i < this.events.length; i++) {
            const event = this.events[i];
            socket.on(event.name, (data) => {
                event.action(data, socket, io);
            });
        }
    }
}

var socketServer = SocketServer.new();

module.exports = socketServer;