class EscapeBackground {
    constructor(gameFrame) {
        this.gf = gameFrame;
        this.grounds = []
        this.x = 0;
        this.y = 0;
        this.minX = 0;
        this.minY = 0;
        this.maxX = 0;
        this.maxY = 0;
        this.speed = gameConfig.player.walk_speed;
        this.distance = this.speed;
        this.couldMove = false;
    }

    static new(gameFame) {
        return new this(gameFame);
    }
    
    /**
     * 根据配置文件创建GameImage
     * @param {Array} levelConfig [[name, x, y, width, height, rowNumber, columnNumber], []]
     */
    createGrounds(player, levelConfig) {
        this.player = player;
        for (let i = 0; i < levelConfig.length; i++) {
            let info = levelConfig[i];
            for (let r = 0; r < info[5]; r++) {
                let rowGround = EscapeGround.new(this.gf, info[0]);
                let y = info[2] + r * info[4];
                rowGround.initImage(player, [info[1], y, info[3], info[4], info[6]]);
                this.grounds.push(rowGround);
                setRangeSize(this, rowGround.minX, rowGround.minY);
                setRangeSize(this, rowGround.maxX, rowGround.maxY);
            }
        }
        this.maxX -= levelConfig[0][3];
        this.maxY -= levelConfig[0][4]*2;
    }

    setGrounds(callback) {
        for (let i = 0; i < this.grounds.length; i++) {
            let rowGround = this.grounds[i];
            callback(rowGround);
        }
    }

    setMoveMode(keyStatus) {
        this.speed = gameConfig.player.walk_speed;
        if (keyStatus == 'down') {
            this.speed = gameConfig.player.run_speed;        
        }
    }

    /**
     * 设置背景移动范围
     * @param {String} axis 移动坐标轴
     * @param {String} distance 移动距离
     */
    canMove(axis, direction) {
        if (direction != this.player.rangeDirection) {
            return false;
        }

        if (direction == 'left' || direction == 'up') {
            this.distance = this.speed;
        } else {
            this.distance = -this.speed;
        }

        let newAxis = this[axis] + (-this.distance); 


        if (axis == 'x') {
            if (newAxis < this.minX || newAxis > this.maxX) {
                return false;
            }
        } else {
            if (newAxis < this.minY || newAxis > this.maxY) {
                return false;
            }
        }

        this[axis] = newAxis;
        return true;
    }

    moveX(keyStatus, direction) {
        if (keyStatus == 'down' && this.canMove('x', direction)) {
            this.setGrounds(rowGround => { rowGround.moveImage('x', this.distance)});
        }
    }

    moveY(keyStatus, direction) {
        if (keyStatus == 'down' && this.canMove('y', direction)) {
            this.setGrounds(rowGround => { rowGround.moveImage('y', this.distance)});
        }
    }

    draw() {
        this.setGrounds(rowGround => { 
            for (let j = 0; j < rowGround.imageList.length; j++) {
                rowGround.imageList[j].draw();
            }        
        });
    }

    update() {}
}