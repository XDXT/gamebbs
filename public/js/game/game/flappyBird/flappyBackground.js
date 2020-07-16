class FlappyBackground extends GameImage {
    constructor(gameFrame) {
        super(gameFrame, "sky1")
        this.w = this.gf.canvas.width;
        this.h = this.gf.canvas.height;
    }

    static new(gameFame) {
        return new this(gameFame);
    }
}
