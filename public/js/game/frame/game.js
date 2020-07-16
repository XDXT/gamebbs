class Game {
    constructor(gameFrame) {
        this.gf = gameFrame;
        this.elements = [];
        this.resetConfig();
    }

    resetConfig() {
        this.gf.clearKey();
        this.gf.gameapp.scope = 0;
        this.gf.context.font = '';
        this.gf.context.shadowBlur = '';
        this.gf.context.shadowColor = '';
        this.gf.context.shadowOffsetX = '';
        this.gf.context.shadowOffsetY = '';
        this.gf.context.strokeStyle = '';
    }

    addElement(element) {
        this.elements.push(element);
    }

    addListElement(elements) {
        for (var i = 0; i < elements.length; i++) {
            this.addElement(elements[i]);
        }
    }

    clearElement() {
        this.elements = [];
    }

    draw() {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].draw();
        }
    }

    update() {
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].update();
        }
    }

}