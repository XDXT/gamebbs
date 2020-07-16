class GameEscape extends Game {
    constructor(gameFrame) {
        super(gameFrame);
        this.level = escapeLevel;
        this.loadLevel();
        this.registerKey();
    }

    static new(gameFrame) {
        log('------------GameEscape:create game------------');
        let game = new this(gameFrame);
        log('------------GameEscape:   got game------------');
        return game;
    }

    createScene() {
        log('---->GameEscape: createScene');
        log('-------> createPlayer')
        this.createPlayer();
        log('-------> createCave')
        this.createCave();
        log('-------> createBackground')
        this.createBackground();
        log('-------> createEnemy')
        this.createEnemy();
        log('---->GameEscape: createScene end');
        this.initScene();
    }

    createBackground() {
        this.background = EscapeBackground.new(this.gf);
    }

    createPlayer() {
        this.player = EscapePlayer.new(this.gf, 'play1', [50, 80]); 
    }

    createCave() {
        this.cave = EscapeCave.new(this.gf, 'cave');
    }

    createEnemy() {
        this.enemys = [];
        for (let i = 0; i < gameConfig.enemy.number; i++) {
            let enemy = EscapeEnemy.new(this.gf, 'play2', [50, 80]);
            this.enemys.push(enemy);
        }
    }

    loadLevel() {
        this.levelIndex = randomValue(0, this.level.length-1);
        this.resetLevel();
    }

    resetLevel() {
        this.clearElement();
        this.createScene();
    }

    initScene() {
        log('---->GameEscape: initScene');
        log('-------> Background')
        this.background.createGrounds(this.player, this.level[this.levelIndex]);
        this.addElement(this.background);
        log('-------> cave')
        this.cave.init(this.background, this.player);
        this.gf.gameapp.gameTips = 'Escape cave (' + this.cave.x + ', ' + this.cave.y + ')';
        this.addElement(this.cave);
        log('-------> enemy')
        for (let i = 0; i < this.enemys.length; i++) {
            let enemy = this.enemys[i];
            enemy.initSize(this.background, this.player);
        }
        this.addListElement(this.enemys);
        log('-------> player')
        this.addElement(this.player);
        log('---->GameEscape: initScene end');
    }

    registerKey() {
        this.gf.bindKeyAction(['Shift'], (keyStatus) => {
            this.player.setMoveMode(keyStatus);
            this.background.setMoveMode(keyStatus);
        });
        this.gf.bindKeyAction(['d','D'], (keyStatus) => {
            this.player.moveX(keyStatus, 'right');
            this.background.moveX(keyStatus, 'right');
        });
        this.gf.bindKeyAction(['a', 'A'], (keyStatus) => {
            this.player.moveX(keyStatus, 'left');
            this.background.moveX(keyStatus, 'left');
        });
        this.gf.bindKeyAction(['w', 'W'], (keyStatus) => {
            this.player.moveY(keyStatus, 'up');
            this.background.moveY(keyStatus, 'up');
        });
        this.gf.bindKeyAction(['s', 'S'], (keyStatus) => {
            this.player.moveY(keyStatus, 'down');
            this.background.moveY(keyStatus, 'down');
        });
        this.gf.bindKeyAction(['r', 'R'], (keyStatus) => {
            if (keyStatus == 'down') {
                this.resetLevel();
            }
        });
    }
}