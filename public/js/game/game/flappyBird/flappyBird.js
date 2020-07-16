class FlappyBird extends GameAnimation {
    constructor(gameFrame, name, size) {
        super(gameFrame);
        this.imageName = name;
        // 图像数据 [width, height]
        this.width = size[0];
        this.height = size[1];
        this.w = this.width;
        this.h = this.height;
        // 移动速度
        this.speed = gameConfig.flappy.bird.speed;
        // 移动边界上下
        this.minY = 0;
        this.maxY = this.gf.canvas.height - this.height;
        this.live = 1;
        this.preStatus = 'drop';
        this.moveStatus = 'drop';
        this.dropCoolDown = 10;
        this.dropCount = 0;
        this.cooldown = gameConfig.flappy.bird.cooldown;
        // 重力加速度
        this.aSpeed = gameConfig.flappy.bird.aSpeed;
        this.deadDelayCount = 0;
        this.deadDelay = gameConfig.flappy.bird.deadDelay;
        this.initSize();
    }

    initSize() {
        // 初始化人物坐标
        this.x = this.gf.canvas.width / 4;
        this.y = this.gf.canvas.height / 3 - this.height;
        // 定义动作名称
        
        this.names = ['idle', 'fly'];
        // 多图片则载入左上角第一张图片
        let image = GameImage.new(this.gf, this.imageName);
        let w = image.img.width;
        let h = image.img.height / 3;
        image.setSize(this.width, this.height, 0, 0, w, h);
        this.nameObj[this.names[0]] = [image];
        
        // 依据第一张图片裁剪其他图片，
        // 这里cloneBySize是返回全新的GameImage对象
        this.nameObj[this.names[1]] = [];
        for (let i = 0; i < 3; i++) {
            let cutxy = [0, h * i];
            this.nameObj[this.names[1]].push(image.cloneByCutAxis(cutxy));
        }
        this.initAction();
    }

    // 获取游戏实例
    static new(gameFame, name, sizeInfo) {
        return new this(gameFame, name, sizeInfo);
    }

    /**
     * 让人物保持在框内移动，不出界
     * @param {String} axis 移动坐标轴
     * @param {String} distance 移动距离
     */
    moveAxisRange(distance) {
        let newAxis = this.y + distance;
        if (newAxis < this.minY || newAxis > this.maxY) {
            return;
        }
        this.y = newAxis;
    }

    /**
     *  切换动画
     *  移动人物坐标
     * @param {String} actionName 
     * @param {Number} distance 
     */
    move(actionName, distance) {
        if (this.statusChange()) {
            this.replaceAction(actionName);
        }
        this.nameObj['idle'][0] = this.img;
        this.moveAxisRange(distance);
    }

    fly(keyStatus) {
        if (keyStatus == 'up') {
            this.moveStatus = 'drop';
            this.statusChange();
            this.replaceAction(this.names[0]);
            return;
        }
        this.moveStatus = 'fly';
        this.move(this.names[1], -this.speed);
    }

    statusChange() {
        if (this.preStatus != this.moveStatus) {
            this.preStatus = this.moveStatus;
            this.speed = gameConfig.flappy.bird.speed;
            return true;
        }
        return false;
    }

    update() {
        super.update();
        if (this.live <= 0 || this.y > this.maxY) {
            if (this.deadDelayCount == 0) {
                setTimeout(() => {
                    this.gf.tooglePause('up');
                }, 600);
                this.gf.tooglePause('up');
            }
            this.deadDelayCount++;
            if (this.deadDelayCount > this.deadDelay) {
                this.gf.replaceGame(SimpleScene.new(this.gf, 'flappyBird', 'end'));
            }
        }

        if (this.moveStatus == "drop") {
            this.y += this.speed;
            this.dropCount++;
            if (this.dropCount >= this.dropCoolDown) {
                this.dropCount = 0;
                this.speed += this.aSpeed;
            }
            // log(this.speed )
        }
    }
}