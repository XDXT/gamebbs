class FlappyPipes {
    constructor(gameFrame, size) {
        this.gf = gameFrame;
        this.width = size[0];
        this.height = size[1];
        this.speed = gameConfig.flappy.pipe.speed;
        this.limitX = this.gf.canvas.width;
        this.limitY = this.gf.canvas.height;
        this.columsOfPipe = 3
        this.pipeRangeX = this.limitX / 4;
        this.pipeRangeY = this.limitY / 2;
        this.pipes = []
    }

    initPipes(bird) {
        this.bird = bird;
        for (var i = 0; i < this.columsOfPipe; i++) {
            let pipeDwon = GameImage.new(this.gf, 'pipeDown');
            let pipeUp = GameImage.new(this.gf, 'pipeUp');

            pipeDwon.setSize(this.width, this.height)
            pipeUp.setSize(this.width, this.height)

            let x = this.limitX*2 + randomValue(this.pipeRangeX*1.8, this.pipeRangeX*2.2)*i;
            pipeDwon.x = x;
            pipeUp.x = x;
            this.resetPipesY(pipeDwon, pipeUp);
            this.pipes.push(pipeDwon);
            this.pipes.push(pipeUp);
        }
    }

    static new(gameFrame, size) {
        return new this(gameFrame, size);
    }

    resetPipesY(pDown, pUp) {
        pDown.y = randomValue(this.pipeRangeY / 2, this.pipeRangeY / 1.2) - pDown.h;
        pUp.y = this.pipeRangeY + randomValue(this.pipeRangeY / 4, this.pipeRangeY / 2);
    }

    getRectRange(obj) {
        return {
            letfX: obj.x,
            rightX: obj.x + obj.w,
            topY: obj.y,
            bottomY: obj.y + obj.h,
        }
    }

    isCoincidence(obj1, obj2) {
        let o1 = this.getRectRange(obj1);
        let o2 = this.getRectRange(obj2);

        if (o1.rightX > o2.letfX && o1.letfX < o2.rightX) {
            if (o1.bottomY > o2.topY && o1.topY < o2.bottomY) {
                return true;
            } 
        }
        return false;
    }

    update() {
        for (let i = 0; i < this.pipes.length/2; i++) {
            let pDown = this.pipes[i * 2]
            let pUp = this.pipes[i * 2 + 1]
            if (this.isCoincidence(this.bird, pDown) || this.isCoincidence(this.bird, pUp)) {
                this.bird.live--;
            }
            pDown.x -= this.speed;
            pUp.x -= this.speed;
            if (pDown.x < (-1*pDown.w)) {
                this.gf.gameapp.scope++;
                let lastPipeIndex = (i + 2) *2 % 6;
                let x = this.pipes[lastPipeIndex].x + randomValue(this.pipeRangeX * 1.7, this.pipeRangeX * 2.2);
                pDown.x = x;
                pUp.x = x;
                this.resetPipesY(pDown, pUp);
            }
        }
    }

    draw() {
        for (let i = 0; i < this.pipes.length; i++) {
            this.pipes[i].draw();
        }
    }
}
