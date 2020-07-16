class SimpleScene extends GameScene {
    constructor(gameFrame, clearKey, nextGameName, sceneName) {
        super(gameFrame, clearKey);
        this.flashDelay = 10;
        this.flashCount = 0;
        this.colorDiaphaneity = 0;
        this.nextGameName = nextGameName;
        this.init(sceneName);
    }
    
    static new(gameFame, nextGameName, sceneName) {
        return new this(gameFame, true, nextGameName, sceneName);
    }

    init(sceneName) {
        this.bg = GameRect.new(this.gf);
        this.title1 = GameFont.new(this.gf);
        this.title2 = GameFont.new(this.gf);
        this.setStyle(sceneConfig[this.nextGameName][sceneName]);
        this.addElement(this.bg);
        this.addElement(this.title1);
        this.addElement(this.title2);
    }

    /**
     * @param {Array} fontConfig [
     *                              bgColor, 
     *                              [title1Style, title1Content],
     *                              [title2Style, title2Content], 
     *                              [flashColor1, flashColor2],
     *                              [key1, key2...]
     *                           ]
     */
    setStyle(fontConfig) {
        let bgColor = fontConfig[0];
        let title1Style = fontConfig[1][0];
        let title1Content = fontConfig[1][1];
        let title2Style = fontConfig[2][0];
        let title2Content = fontConfig[2][1];
        let flashColor1 = fontConfig[3][0];
        let flashColor2 = fontConfig[3][1];
        let keys = fontConfig[4];
        this.flashTitleStyle = title2Style;
        this.nextScene = fontConfig[5];
        this.bg.setSize(bgColor);
        this.title1.setStyle(title1Style[0], title1Style[1], 
                            title1Style[2], title1Style[3], 
                            title1Style[4], title1Style[5]);
        this.title1.setContent(title1Content[0], title1Content[1], title1Content[2]);
        this.title2.setStyle(title2Style[0], title2Style[1], 
            title2Style[2], title2Style[3], 
            title2Style[4], title2Style[5]);
        this.title2.setContent(title2Content[0], title2Content[1], title2Content[2]);
        this.flashColor1 = 'rgba(' + flashColor1 + ',';
        this.flashColor2 = 'rgba(' + flashColor2 + ',';
        this.resisterKey(keys);
    }


    resisterKey(keys) {
        this.gf.bindKeyAction(keys, (keyStatus) => {
            if (keyStatus == 'down') {
                let factory = GameFactory.getInstance(this.gf);
                if (this.nextScene == 'game') {
                    this.gf.replaceGame(factory.createGame(this.nextGameName));
                } else {
                    this.gf.replaceGame(factory.createScene(this.nextGameName, this.nextScene));
                }
            }
        });
    }

    update() {
        super.update();
        this.flashCount++;
        if (this.flashCount >= this.flashDelay) {
            this.flashCount = 0;
            this.colorDiaphaneity++;
            let diaphaneity = (this.colorDiaphaneity / this.flashDelay).toString();
            this.title2.setStyle(
                this.flashTitleStyle[0],
                this.flashTitleStyle[1],
                this.flashColor1 + diaphaneity + ')',
                this.flashTitleStyle[3],
                this.flashTitleStyle[4],
                this.flashColor2 + diaphaneity + ')');
            if (this.colorDiaphaneity > this.flashDelay) {
                this.colorDiaphaneity = 0;
            }
        } 
    }
}
