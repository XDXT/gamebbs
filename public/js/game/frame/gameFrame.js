/**
 * 游戏框架部分
 * 定义：画图，刷新率，按键事件的注册于执行
 */
class GameFrame {
    constructor(imageDoms, gameapp) {
        this.fps = gameConfig.common.fps;
        this.images = imageDoms;
        this.gameapp = gameapp;
        this.keydowns = {};
        this.keyAction = []; 
        this.actions = {};
        this.moveDirection = '';
        this.moveCapacity = 1;
        this.pause = false;
        this.canvas = query('#canvas');
        this.context = this.canvas.getContext('2d');
        this.runCount = 0;
        this.isRunning = false;
        this.init();
    }

    /**
     * 绑定键盘按键事件
     */
    init() {
        let self = this;

        window.addEventListener('keydown', event => {
            self.keydowns[event.key] = 'down';
        });

        window.addEventListener('keyup', function (event) {
            if (event.key.length == 1) {
                self.setKeysValue(event.key, 'up');
                if (event.key.toLowerCase() == 'p') {
                    self.setKeysValue(event.key, null);
                    self.tooglePause('up');
                }
            } else {
                self.keydowns[event.key] = 'up';
            }
        });
        
        // let game = window;
        let game = query(".game");

        game.addEventListener('mousedown', event => {
            self.keydowns['click'] = 'down';
        });

        game.addEventListener('mouseup', event => {
            self.keydowns['click'] = 'up';
        });

        game.addEventListener('touchstart', event => {
            self.keydowns['touch'] = 'down';
        });

        game.addEventListener('touchend', event => {
            self.keydowns['touch'] = 'up';
        });
    }

    setKeysValue(key, value) {
        this.keydowns[key.toUpperCase()] = value;
        this.keydowns[key.toLowerCase()] = value;
    }

    static getInstance(...args) {
        log('------------GameFrame: create/get frame-----------');
        this.instance = this.instance || new this(...args);
        log('------------GameFrame:    got instance------------');
        return this.instance;
    }

    /**
     * @param {Array} keyArray 按键内容，如['a', 'A']
     * @param {function} fun 按键触发的方法 this.actions['a-A'] = fun
     */
    bindKeyAction(keyArray, fun) {
        let keyValue = '';
        for (let i = 1; i < keyArray.length; i++) {
            keyValue += '-' + keyArray[i]
        }
        keyValue = keyArray[0] + keyValue;
        this.actions[keyValue] = fun;
        this.keyAction.push(keyArray);
    }

    clearKey() {
        let gf = this;
        gf.keydowns = {};
        gf.keyAction = [];
        gf.actions = {};
        gf.bindKeyAction(['p', 'P'], (keyStatus) => {
            gf.tooglePause(keyStatus);
        });
    }
    /**
     * 获取已经按下的注册按键，执行绑定的方法
     */
    runAction() {
        let index = 0;
        for (const keyName in this.actions) {
            let allKey = this.keyAction[index];
            for (let i = 0; i < allKey.length; i++) {
                if (this.keydowns[allKey[i]] == 'up') {
                    this.keydowns[allKey[i]] = null;
                    this.actions[keyName]('up');
                    break;
                }
                if (this.keydowns[allKey[i]] == 'down') {
                    this.actions[keyName]('down');
                    break;
                }
            }
            index++;
        }
        this.count++;
    }

    /**
     * 清除画板
     */
    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * 循环执行绘画，内容需要子类实现
     */
    runGame() {
        var gf = this;
        if (this.breakFrame) {
            return;
        }
        if (!gf.pause) {
            gf.runAction();
            gf.clearCanvas();
            // gf.setBlackBg();
            gf.update();
            gf.draw();
        }
        setTimeout(()=> {
            gf.runGame();
        }, 1000/gf.fps)
    }

    tooglePause(keyStatus) {
        if (keyStatus == 'up') {
            this.pause = !this.pause;
        }
    }

    logRealFps() {
        var self = this;
        self.count = this.runCount;
        setInterval(() => {
            let gameFps = self.count - this.runCount;
            // gameFps /= 10;
            // gameFps = Math.round(gameFps)*10;
            // if (gameFps == 60 || gameFps == 70) {
            //     gameFps = 60;
            // } 
            self.gameapp.gameFps = gameFps;
            self.count = this.runCount;
        }, 1000)
    }

    runWithGame(game) {
        log('------------GameFrame:        run instance------------');
        this.game = game;
        if (this.isRunning) { return; }
        this.isRunning = true;
        this.logRealFps();
        this.runGame();
    }

    replaceGame(game) {
        log('------------GameFrame:   replace game or scene--------');
        this.game = game;
    }

    getImageByName(name) {
        return this.images[name];
    }

    draw() {
        this.game.draw();
    }

    update() {
        this.game.update();
    }

    drawImage(imgObj) {
        if (imgObj.hasOwnProperty('cx')) {
            this.context.drawImage(imgObj.img, imgObj.cx, imgObj.cy, imgObj.cw, imgObj.ch, imgObj.x, imgObj.y, imgObj.w, imgObj.h);
        } else if (imgObj.hasOwnProperty('w')) {
            this.context.drawImage(imgObj.img, imgObj.x, imgObj.y, imgObj.w, imgObj.h);
        } else {
            this.context.drawImage(imgObj.img, imgObj.x, imgObj.y);
        }
    }
}