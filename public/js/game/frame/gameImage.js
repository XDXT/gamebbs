class GameImage {
    constructor(gameFame, name) {
        this.gf = gameFame;
        this.name = name;
        this.img = this.gf.getImageByName(name);
        this.x = 0;
        this.y = 0;
    }

    setSize(width, height, cutX, cutY, cutWidth, cutHeight) {
        if (arguments.length == 2) {
            this.w = width;
            this.h = height;
        } else if (arguments.length == 6) {
            this.w = width;
            this.h = height;
            this.cx = cutX;
            this.cy = cutY;
            this.cw = cutWidth;
            this.ch = cutHeight;
        } else {
            throw new Error('GameImage: arguments must 2 or 6');
        }
    }

    cloneByCutAxis(cutAxis) {
        let img = GameImage.new(this.gf, this.name);
        img.setSize(
            this.w, 
            this.h, 
            cutAxis[0], 
            cutAxis[1], 
            this.cw, 
            this.ch);
        return img;
    }

    cloneByAxis(x, y) {
        let img = GameImage.new(this.gf, this.name);
        img.setSize(this.w, this.h);
        img.x = x;
        img.y = y;
        return img;
    }

    static new(gameFame, name) {
        return new this(gameFame, name);
    }

    draw() {
        this.gf.drawImage(this);
    }

    update() {}
}
