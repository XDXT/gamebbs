class GameFactory {
    constructor(gameFrame) {
        this.gf = gameFrame;
    }

    static getInstance(gameFrame) {
        this.instance = this.instance || new this(gameFrame);
        return this.instance;
    }

    createGame(name) {
        switch (name) {
            case 'escape':
                return GameEscape.new(this.gf);        
            case 'flappyBird':
                return GameFlappy.new(this.gf);        
            default:
                break;
        }
    }

    createScene(nextGameName, sceneName) {
        return SimpleScene.new(this.gf, nextGameName, sceneName);
    }
}

