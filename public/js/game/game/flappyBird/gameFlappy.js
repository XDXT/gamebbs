class GameFlappy extends Game {
    constructor(gameFrame) {
        super(gameFrame);
        this.resetLevel();
        this.registerKey();
    }

    static new(gameFrame) {
        log('------------GameFlappy:create game------------');
        let game = new this(gameFrame);
        log('------------GameFlappy:   got game------------');
        return game;
    }

    createScene() {
        log('---->GameFlappy: createScene');
        log('-------> createPipes')
        this.createPipes();
        log('-------> createBackground')
        this.createBackground();
        log('-------> createBanner')
        this.createBanner();
        log('-------> createBird')
        this.createBird();
        log('---->GameFlappy: createScene end');
        this.initScene();
    }

    createBackground() {
        this.background = FlappyBackground.new(this.gf);
    }

    createBanner() {
        this.banner= FlappyBanner.new(this.gf);
    }

    createBird() {
        this.bird = FlappyBird.new(this.gf, 'bird1', [70, 50]);
    }

    createPipes() {
        this.pipes = FlappyPipes.new(this.gf, [90, 300]);
    }

    resetLevel() {
        this.clearElement();
        this.createScene();
    }

    initScene() {
        log('---->GameFlappy: initScene');
        log('-------> addElement Background');
        this.addElement(this.background);
        log('-------> addElement pipes')
        this.pipes.initPipes(this.bird);
        this.addElement(this.pipes);
        log('-------> addElement banner');
        this.addElement(this.banner);
        log('-------> addElement bird');
        this.addElement(this.bird);
        log('---->GameFlappy: initScene end');
    }

    registerKey() {
        // this.gf.bindKeyAction([' '], (keyStatus) => {
        //     this.bird.fly(keyStatus);
        // });
        this.gf.bindKeyAction(['j', 'J'], (keyStatus) => {
            this.bird.fly(keyStatus);
        });

        this.gf.bindKeyAction(['click'], (keyStatus) => {
            this.bird.fly(keyStatus);
        });

        this.gf.bindKeyAction(['touch'], (keyStatus) => {
            this.bird.fly(keyStatus);
        });
    }
}