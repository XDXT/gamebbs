class EscapeGround {
    constructor(gameFrame, name) {
        this.gf = gameFrame;
        this.imageName = name;
        this.imageList = []
        this.minX = 0;
        this.minY = 0;
        this.maxX = 0;
        this.maxY = 0;
    }
    
    initImage(player, sizeInfo) {
        this.player = player;
        // sizeInfo: x, y, width, height, number(可选 cutwidth, cutheight,)
        this.size = sizeInfo;
        let image = GameImage.new(this.gf, this.imageName);
        if (this.size.length == 5) {
            image.setSize(this.size[2], this.size[3])
            for (let i = 0; i < this.size[4]; i++) {
                this.imageList.push(image.cloneByAxis(this.size[0], this.size[1]));
                this.size[0] += this.size[2];
            }
        } else if (this.size.length == 7) {
            image.setSize(this.size[2], this.size[3], 0, 0, this.size[5], this.size[6])
            for (let i = 0; i < this.size[4]; i++) {
                let img = image.cloneByCutAxis(0, 0);
                img.x = this.size[0];
                img.y = this.size[1];
                this.imageList.push(img);
                this.size[0] += this.size[2];
            }
        } else {
            throw new Error('EscapeGround: size.length must 5 or 7');
        }
        setRangeSize(this, this.imageList[0].x, this.imageList[0].y);
        setRangeSize(this, this.imageList[this.imageList.length-1].x, 
                    this.imageList[this.imageList.length-1].y);
    }

    static new(gameFame, name) {
        return new this(gameFame, name);
    }

    moveImage(axis, distance) {
        for (let i = 0; i < this.imageList.length; i++) {
            let image = this.imageList[i];
            image[axis] += distance;
        }
    }
}