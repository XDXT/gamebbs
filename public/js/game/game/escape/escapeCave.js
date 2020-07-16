class EscapeCave extends GameImage {
    constructor(gameFame, name) {
        super(gameFame, name);
    }

    init(background, player) {
        this.player = player;
        this.background = background;
        this.width = 40;
        this.height = 40;
        this.setSize(this.width, this.height, 0, 0, this.img.width, this.img.height);
        this.bgx = this.background.x;
        this.bgy = this.background.y;
        this.minX = this.background.minX;
        this.minY = this.background.minY;
        this.maxX = this.background.maxX;
        this.maxY = this.background.maxY;
        this.initAxis();
    }

    initAxis() {
        this.x = randomValue(this.minX + 100, this.maxX - 100);
        this.y = randomValue(this.minY + 100, this.maxY - 100);
        this.playDistance = clacDistance(this, this.player);
        if (this.playDistance < 400) {
            this.initAxis();
        }
    }

    static new(gameFame, name) {
        return new this(gameFame, name);
    }

    isInCave() {
        if (this.playDistance <= 25) {
            this.gf.gameapp.scope++;
            this.gf.game.loadLevel();
        }
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

    update() {
        super.update();
        this.updateAxis();
        this.isInCave();
    }
}