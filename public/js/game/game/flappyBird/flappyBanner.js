class FlappyBanner extends GameImage {
    constructor(gameFrame) {
        super(gameFrame, "banner1")
        this.w = this.gf.canvas.width * 2+3;
        this.minX = -this.gf.canvas.width;
        this.h = this.gf.canvas.height / 20;
        this.y = this.gf.canvas.height - this.h + 5;
        this.speed = gameConfig.flappy.banner.speed;
    }

    static new(gameFrame) {
        return new this(gameFrame);
    }

    update() {
        if (this.x < this.minX) {
            this.x = 0;
        }
        this.x -= this.speed;
    }
}
