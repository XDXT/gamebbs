class EscapePlayer extends GameAnimation {
    constructor(gameFrame, name, size) {
        super(gameFrame);
        this.imageName = name;
        // 图像数据 [width, height]
        this.width = size[0];
        this.height = size[1];
        // 移动速度
        this.speed = gameConfig.player.walk_speed;
        // 人物的实时移动方向
        this.moveDirection = this.gf.moveDirection;
        // 同时可激活移动方向个数
        this.moveCapacity = this.gf.moveCapacity;
        // 人物到边界时的移动方向
        this.rangeDirection = ''; 
        // 移动边界（方形）
        this.minX = gameConfig.player.padding_range.min;
        this.minY = gameConfig.player.padding_range.min;
        this.maxX = this.maxX - this.width - gameConfig.player.padding_range.max;
        this.maxY = this.maxY - this.height - gameConfig.player.padding_range.max;
        this.live = 1;
        this.deadDelayCount = 0;
        this.deadDelay = gameConfig.player.deadDelay;
        this.initSize();
    }

    initSize() {
        // 初始化人物坐标
        this.x = this.gf.canvas.width / 2;
        this.y = this.gf.canvas.height / 2;
        // 定义动作名称
        this.names = ['idle', 'walkDown', 'walkLeft', 'walkRight', 'walkUp'];
        // 多图片则载入左上角第一张图片
        let image = GameImage.new(this.gf, this.imageName);
        let w = image.img.width / 4;
        let h = image.img.height / 4;
        image.setSize(this.width, this.height, 0, 0, w, h);
        this.nameObj[this.names[0]] = [image];

        // 依据第一张图片裁剪其他图片，
        // 这里cloneBySize是返回全新的GameImage对象
        for (let i = 0; i < 4; i++) {
            this.nameObj[this.names[i+1]] = [];
            for (let j = 0; j < 4; j++) {
                let cutxy = [w*j, h*i];
                this.nameObj[this.names[i + 1]].push(image.cloneByCutAxis(cutxy));
            }
        }
        this.initAction();
    }

    reset() {
        this.x = this.gf.canvas.width / 2;
        this.y = this.gf.canvas.height / 2;
        this.speed = gameConfig.player.walk_speed;
        this.moveDirection = this.gf.moveDirection;
        this.rangeDirection = '';
        this.live = 1;
    }

    // 获取游戏实例，如果只有一个人物考虑单例
    static new(gameFame, name, sizeInfo) {
        return new this(gameFame, name, sizeInfo);
    }

    /**
     * 切换运动状态
     * @param {String} keyStatus 按键状态 'up'/'down'
     */
    setMoveMode(keyStatus) {
        if (keyStatus == 'down') {
            this.speed = gameConfig.player.run_speed;
            this.cooldown = gameConfig.animation.run_cooldown;
        } else {
            this.speed = gameConfig.player.walk_speed;
            this.cooldown = gameConfig.animation.walk_cooldown;
        }
    }

    activateKey(direction) {
        if (this.moveCapacity >= 1) {
            this.moveCapacity--;
            this.moveDirection = direction;
        }
    }

    /**
     * 让人物保持在框内移动，不出界
     * @param {String} axis 移动坐标轴
     * @param {String} distance 移动距离
     */
    moveAxisRange(axis, distance) {
        let newAxis = (this[axis]  + distance);
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
    
    /**
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
        this.nameObj['idle'][0] = this.img;
        this.moveAxisRange(axis, distance);
    }

    /**
     * 类似锁去控制可用移动按键，这里this.moveCapacity = 1
     * 当有一个方向键被激活，其他方向都无法激活，除非它释放
     * @param {String} keyStatus 按键状态
     * @param {String} direction 按键方向
     */
    isKeyUp(keyStatus, direction) {
        this.activateKey(direction);
        if (keyStatus == 'up' && this.moveDirection == direction) {
            this.replaceAction(this.names[0]);
            this.moveCapacity++;
            return true;
        }
        return false;
    }

    moveX(keyStatus, direction) {
        if (this.isKeyUp(keyStatus, direction)) {return;}

        if (direction == 'right' && this.moveDirection == direction)  {
            this.move(this.names[3], 'x', this.speed);
        } else if (direction == 'left' && this.moveDirection == direction) {
            this.move(this.names[2], 'x', -this.speed);
        }
    }

    moveY(keyStatus, direction) {
        if (this.isKeyUp(keyStatus, direction)) { return; }

        if (direction == 'down' && this.moveDirection == direction) {
            this.move(this.names[1], 'y', this.speed);
        } else if (direction == 'up' && this.moveDirection == direction){
            this.move(this.names[4], 'y', -this.speed);
        }
    }

    update() {
        super.update();
        if (this.live <= 0) { 
            if (this.deadDelayCount == 0) {
                setTimeout(() => {
                    this.gf.tooglePause('up');
                }, 600);
                this.gf.tooglePause('up');
            }
            this.deadDelayCount++;
            if (this.deadDelayCount > this.deadDelay) {
                this.gf.replaceGame(SimpleScene.new(this.gf, 'escape', 'end')); 
            }
        }
    }
}