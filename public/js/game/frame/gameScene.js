class GameScene {
    constructor(gameFame, needClearKey) {
        this.gf = gameFame;
        this.gameObj = this.gf.game;
        this.needClearKey = needClearKey || false;
        this.isGameEmpty = true;
        this.flashCount = 0;
        this.elements = [];
        this.initGameValue();
    }
    
    initGameValue() {
        if (this.needClearKey) {
            this.gf.clearKey();
        }
        if (typeof this.gameObj !== 'undefined') {
            this.isGameEmpty = false;
            this.gameObj.elements[0] = GameRect.new(this.gf);
            this.gameElementsLength = this.gameObj.elements.length - 1;
        }
    }

    addElement(element) {
        this.elements.push(element);
    }

    clearElement() {
        this.elements = [];
    }

    drawScene() {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].draw();
        } 
    }

    transitionDelete() {
        this.flashCount++;
        if (this.flashCount >= gameConfig.scene.flash_delay) {
            this.gameObj.elements.splice(1, 1);
            this.gameElementsLength--;
            this.flashCount = 0;
            if (this.gameElementsLength == 1) {
                this.flashCount -= gameConfig.scene.keep_protagonist_delay;
            }
            if (this.gameElementsLength < 0) {
                this.isGameEmpty = true;
            }
        }
    }

    draw() {
        if (!this.isGameEmpty) {
            this.gameObj.draw();
            this.transitionDelete();
        } else {
            this.drawScene();
        }
    }

    update() {
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].update();
        }
    }
}

