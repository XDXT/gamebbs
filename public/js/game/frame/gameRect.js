class GameRect {
    constructor(gameFame) {
        this.gf = gameFame;
        this.x = 0;
        this.y = 0;
        this.width = this.gf.canvas.width;
        this.width = this.gf.canvas.height;
        this.style = '#000';
        this.updataContext();
    }

    static new(gameFame) {
        return new this(gameFame);
    }

    setSize(style, x, y, width, height) {
        if (arguments.length == 1) {
            this.style = style;
        } else if (arguments.length == 5) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.style = style;
        } else {
            throw new Error('setSize: must have 1 or 5 argumnets');
        }
    }

    updataContext() {
        this.gf.context.fillStyle = this.style;
    }

    draw() {
        this.updataContext();
        this.gf.context.fillRect(this.x, this.y, this.gf.canvas.width, this.gf.canvas.height);
    }

    update() {}
}
