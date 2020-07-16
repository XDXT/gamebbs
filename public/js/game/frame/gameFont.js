class GameFont {
    constructor(gameFame) {
        this.gf = gameFame;
        this.setStyle('50px YaHei', 3, 'rgba(0, 0, 0, 1)', 4, 4, '#f00');
        this.setContent(0, 0, '');
    }

    static new(gameFame) {
        return new this(gameFame);
    }

    setContent(x, y, content) {
        this.x = x;
        this.y = y;
        this.content = content;
    }

    setStyle(font, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, strokeStyle) {
        this.font = font;
        this.shadowBlur = shadowBlur;
        this.shadowColor = shadowColor;
        this.shadowOffsetX = shadowOffsetX;
        this.shadowOffsetY = shadowOffsetY;
        this.strokeStyle = strokeStyle;
    }

    updateContext() {
        this.gf.context.font = this.font;
        this.gf.context.shadowBlur = this.shadowBlur;
        this.gf.context.shadowColor = this.shadowColor;
        this.gf.context.shadowOffsetX = this.shadowOffsetX;
        this.gf.context.shadowOffsetY = this.shadowOffsetY;
        // 描边
        this.gf.context.strokeStyle = this.strokeStyle;
    }

    draw() {
        this.updateContext();
        this.gf.context.fillText(this.content, this.x, this.y)
        this.gf.context.strokeText(this.content, this.x, this.y);
    }

    update() { }
}

