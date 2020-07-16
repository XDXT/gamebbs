class EscapeEnemy extends GameAnimation {
    constructor(gameFrame, name, size) {
        super(gameFrame);
        this.imageName = name;
        // 图像数据 [width, height]
        this.width = size[0];
        this.height = size[1];
    }

    initSize(background, player) {
        this.player = player;
        this.background = background;
        this.reset();
        this.names = ['idle', 'upleft', 'upright', 'downleft', 'downright'];
        let image = GameImage.new(this.gf, this.imageName);
        let w = image.img.width / 6;
        image.setSize(this.width, this.height, 0, 0, 120, 224);
        let cutsize = [[3, 207, 427, 611, 818, 1010], [14, 208, 413, 622, 819, 1005]];
        // 依据第一张图片裁剪其他图片，
        for (let i = 0; i < 2; i++) {
            this.nameObj[this.names[i*2 + 1]] = [];
            this.nameObj[this.names[i*2 + 2]] = [];
            for (let j = 0; j < 6; j++) {
                let cutxy = [cutsize[i][j], 366*i];
                if (j < 3) {
                    this.nameObj[this.names[i * 2 + 1]].push(image.cloneByCutAxis(cutxy));
                } else {
                    this.nameObj[this.names[i * 2 + 2]].push(image.cloneByCutAxis(cutxy));
                }
            }
        }
        this.nameObj[this.names[0]] = this.nameObj[this.yDirection + this.xDirection];
        this.initAction();
        this.playDistance = gameConfig.enemy.attack_distance - 1;
    }

    reset() {
        // 移动速度
        this.speed = gameConfig.enemy.walk_speed;
        this.cooldown = 0;
        this.activeDelay = 0;
        this.animaDelay = 0;
        // 移动状态
        this.isRun = false;
        this.energy = gameConfig.enemy.energy;
        this.restCoolDown = 0;
        this.playDistance = 0;
        this.moveDistance = this.speed;
        // 人物的实时移动方向
        this.xDirection = 'right';
        this.yDirection = 'down';
        this.rv = 4;
        // 所处在背景位置
        this.bgx = this.background.x;
        this.bgy = this.background.y;
        this.minX = this.background.minX;
        this.minY = this.background.minY;
        this.maxX = this.background.maxX;
        this.maxY = this.background.maxY;
        this.initAxis();// 初始化人物坐标
    }
    
    initAxis() {
        this.x = randomValue(this.minX + 100, this.maxX - 100);
        this.y = randomValue(this.minY + 100, this.maxY - 100);
        this.playDistance = clacDistance(this, this.player);
        if (this.playDistance < 400) {
            this.initAxis();
        }
    }

    static new(gameFame, name, sizeInfo) {
        return new this(gameFame, name, sizeInfo);
    }

    updateAxis() {
        if (this.bgx != this.background.x || this.bgy != this.background.y) {
            this.x -= (this.background.x - this.bgx);
            this.y -= (this.background.y - this.bgy);
            this.bgx = this.background.x;
            this.bgy = this.background.y;
        }
        this.playDistance = clacDistance(this, this.player);
    }

    randomAct() {
        if (this.playDistance > gameConfig.enemy.sleep_distance) {
            this.sleep = true;
            return;
        }
        if (this.playDistance > gameConfig.enemy.attack_distance && this.animaDelay == 0) {
            this.sleep = false;
            this.openRunMode(false);
            if (this.activeDelay == 0) { this.rv = randomValue(0, 4); }
            this.setActByNumber(this.rv)
        } else if (this.playDistance <= gameConfig.enemy.attack_distance) {
            if (this.playDistance < gameConfig.player.injured_distance) { this.player.live--; }
            this.sleep = false;
            this.openRunMode(true);
            this.limitRun();
            let xd = this.x - this.player.x;
            let yd = this.y - this.player.y;
            if (Math.abs(xd) - Math.abs(yd) > 0) {
                if (xd > 0) {
                    this.setActByNumber(1);
                } else {
                    this.setActByNumber(2);
                }
            } else {
                if (yd > 0) {
                    this.setActByNumber(3);
                } else {
                    this.setActByNumber(4);
                }
            }
        }
    }

    openRunMode(isOpen) {
        if (this.isRun == isOpen) { return; }
        if (isOpen && this.energy > 0) {
            this.isRun = true;
            this.speed = gameConfig.enemy.run_speed;
            this.cooldown = 4;
        } else {
            this.isRun = false;
            this.speed = gameConfig.enemy.walk_speed;
            this.cooldown = 8;
        }
    }

    limitRun() {
        if (this.isRun) {
            if (this.energy > 0) {
                this.energy--;
            } else {
                this.openRunMode(false);
            }
        } else {
            if (this.restCoolDown >= gameConfig.enemy.rest_coolDown) {
                this.restCoolDown = 0;
                this.energy = gameConfig.enemy.energy;
                this.openRunMode(true);
            } else {
                this.restCoolDown++;
            }
        }
    }

    setActByNumber(number) {
        if (number == 0) {
            this.replaceAction(this.yDirection + this.xDirection);
            return;
        }
        if (number == 1) { // left
            this.xDirection = 'left';
            this.move(this.yDirection + this.xDirection, 'x', -this.speed);
        } else if (number == 2) { // right
            this.xDirection = 'right';
            this.move(this.yDirection + this.xDirection, 'x', this.speed);
        } else if (number == 3) { // up
            this.yDirection = 'up';
            this.move(this.yDirection + this.xDirection, 'y', -this.speed);
        } else { // down
            this.yDirection = 'down'
            this.move(this.yDirection + this.xDirection, 'y', this.speed);
        }
    }

    /**aaaaa
     * 运动移动
     *  切换行走的动画
     *  切换静态站立动画
     *  移动人物坐标
     * @param {String} actionName 
     * @param {String} axis
     * @param {Number} distance 
     */
    move(actionName, axis, distance) {
        this.replaceAction(actionName);
        this.replaceAction(actionName);
        this.nameObj['idle'] = this.nameObj[actionName];
        this.moveAxisRange(axis, distance);
    }

    /**
     * 让人物保持在框内移动，不出界
     * @param {String} axis 移动坐标轴
     * @param {String} distance 移动距离
     */
    moveAxisRange(axis, distance) {
        let newAxis = (this[axis] + distance);
        if (axis == 'x') {
            if (newAxis < this.minX || newAxis > this.maxX) {
                this.rangeDirection = this.moveDirection;
                return;
            }
        } else {
            if (newAxis < this.minY || newAxis > this.maxY) {
                this.rangeDirection = this.moveDirection;
                return;
            }
        }
        this.rangeDirection = '';
        this[axis] = newAxis;
    }

    delay() {
        this.animaDelay++;
        if (this.animaDelay >= gameConfig.enemy.anima_delay) {
            this.animaDelay = 0;
            this.activeDelay++;
        }
        if (this.activeDelay >= gameConfig.enemy.active_delay) {
            this.activeDelay = 0;
        }
    }

    update() {
        super.update();
        this.randomAct();
        this.updateAxis();
        this.delay();
    }
}