class GameAnimation {
    constructor(gameFame) {
        this.gf = gameFame;
        this.actionImages = [];
        this.nameObj = {};
        this.names = [];
        this.activeName = '';
        this.cooldown = gameConfig.animation.walk_cooldown;
        this.startCoolDown = 3;
        this.count = -1;
        this.x = 0;
        this.y = 0; 
        this.minX = 0;
        this.maxX = this.gf.canvas.width;
        this.minY = 0;
        this.maxY = this.gf.canvas.height;
        this.ildeDelay = -1;
        this.sleep = false;
    }

    updateImage() {
        this.img = this.actionImages[this.frameIndex];
        this.img.x = this.x;
        this.img.y = this.y;
    }

    initAction() {
        this.frameIndex = 0;
        this.activeName = this.names[0];
        this.actionImages = this.nameObj[this.activeName];
        if (this.actionImages.length <= 0) {
            throw new Error('nameObj[name].length must > 0')
        }
        this.updateImage();
    }

    replaceAction(animationName) {
        if (this.activeName != animationName) {
            // 如果是静态动作延迟3秒
            if (this.animationName == 'idle') {
                this.ildeDelay = this.gf.fps * gameConfig.animation.idle_delay;
            } else {
                this.ildeDelay = -1;
            }
            this.activeName = animationName;
            this.frameIndex = 0;
            this.count = this.startCoolDown;
            this.actionImages = this.nameObj[animationName];
            this.updateImage();
        }
    }

    draw() {
        if (this.sleep) {
            return;
        }
        
        this.gf.drawImage(this.img);
    }

    update() { 

        if (this.sleep) {
            return;
        }

        if (this.count < 0 && this.ildeDelay < 0 ) {
            this.count = this.cooldown;
            this.frameIndex = (this.frameIndex + 1) % this.actionImages.length;
        } else {
            this.ildeDelay--;
        }
        
        this.updateImage();  
        this.count--;
    }
}
