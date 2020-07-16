var gameImages = {
    //background
    sky1: '/img/game/background/bg/bg1.png',
    //ground
    ground1: '/img/game/background/ground/01-long.png',
    ground2: '/img/game/background/ground/02-long.png',
    glasses: '/img/game/background/ground/05-long.png',
    stone1: '/img/game/background/ground/06-long.png',
    stone2: '/img/game/background/ground/08-long.png',
    banner1: '/img/game/background/ground/10.jpg',
    // items
    cave: '/img/game/items/cave.png',
    pipeUp: '/img/game/items/pipeUp.png',
    pipeDown: '/img/game/items/pipeDown.png',
    //player
    play1: '/img/game/player/girl1.png',
    play2: '/img/game/player/zombies1.png',
    bird1: '/img/game/player/bird1.png'
};

var gameEngine = [ 
    /**框架 相关文件**/
    '/js/game/frame/gameFrame.js'
    , '/js/game/frame/game.js'
    , '/js/game/frame/gameScene.js'
    , '/js/game/frame/gameRect.js'
    , '/js/game/frame/gameFont.js'
    , '/js/game/frame/gameImage.js'
    , '/js/game/frame/gameAnimation.js'
    /**开始/结束/过场场景**/
    , '/js/game/game/scene/simpleScene.js'
    /**实例工厂**/
    , '/js/game/game/factory/gameFactory.js'
    /**游戏-逃生 escape**/
    , '/js/game/game/escape/gameEscape.js'
    , '/js/game/game/escape/escapeGround.js'
    , '/js/game/game/escape/escapeBackground.js'
    , '/js/game/game/escape/escapeEnemy.js'
    , '/js/game/game/escape/escapeCave.js'
    , '/js/game/game/escape/escapePlayer.js'
    /**游戏-松鸡 flappy bird**/
    , '/js/game/game/flappyBird/gameFlappy.js'
    , '/js/game/game/flappyBird/flappyPipes.js'
    , '/js/game/game/flappyBird/flappyBird.js'
    , '/js/game/game/flappyBird/flappyBackground.js'
    , '/js/game/game/flappyBird/flappyBanner.js'
];

var sceneConfig = {
    escape: {
        start: [
            '#2b4eea',
            [
                ['50px Arial', 3, '#000', 4, 4, '#f00'],
                [190, 150, 'ESCAPE']
            ],
            [
                ['50px YaHei', 3, 'rgba(255, 0, 0, 0)', 4, 4, 'rgba(178, 34, 34, 0)'],
                [120, 400, 'Press N tutorial']
            ],
            ['255, 0, 0', '178, 34, 34'],
            ['n', 'N'],
            'tutorial'
        ],
        tutorial: [
            '#2b4eea',
            [
                ['30px Arial', 3, '#000', 4, 4, '#f00'],
                [100, 200, 'MOVE: W A S D   RUN: SHIFT']
            ],
            [
                ['60px YaHei', 3, 'rgba(255, 0, 0, 0)', 4, 4, 'rgba(178, 34, 34, 0)'],
                [120, 400, 'Press S start']
            ],
            ['255, 0, 0', '178, 34, 34'],
            ['s', 'S'],
            'game'
        ],
        end: [
            '#2b4eea',
            [
                ['50px Arial', 3, '#000', 4, 4, '#f00'],
                [150, 150, 'YOU FAILED']
            ],
            [
                ['40px YaHei', 3, 'rgba(255, 0, 0, 0)', 4, 4, 'rgba(178, 34, 34, 0)'],
                [100, 400, 'Press R restart game']
            ],
            ['255, 0, 0', '178, 34, 34'],
            ['r', 'R'],
            'game'
        ]
    },
    flappyBird: {
        start: [
            '#2b4eea',
            [
                ['50px Arial', 3, '#9ce659', 4, 4, '#9ce659'],
                [140, 150, 'FLAPPY BIRD']
            ],
            [
                ['50px YaHei', 3, 'rgba(255, 255, 255, 0)', 4, 4, 'rgba(255, 255, 255, 0)'],
                [120, 400, 'Press N or click']
            ],
            ['255, 255, 255', '255, 255, 255'],
            ['n', 'N', 'click', 'touch'],
            'tutorial'
        ],
        tutorial: [
            '#2b4eea',
            [
                ['45px Arial', 3, '#f00', 4, 4, '#f00'],
                [130, 200, 'FLY: -j- or -click-']
            ],
            [
                ['50px YaHei', 3, 'rgba(255, 255, 255, 0)', 4, 4, 'rgba(255, 255, 255, 0)'],
                [120, 400, 'Press S or click']
            ],
            ['255, 255, 255', '255, 255, 255'],
            ['s', 'S', 'click', 'touch'],
            'game'
        ],
        end: [
            '#2b4eea',
            [
                ['50px Arial', 3, '#f00', 4, 4, '#f00'],
                [150, 150, 'YOU FAILED']
            ],
            [
                ['40px YaHei', 3, 'rgba(255, 0, 0, 0)', 4, 4, 'rgba(178, 34, 34, 0)'],
                [100, 400, 'Press R or click restart']
            ],
            ['255, 0, 0', '178, 34, 34'],
            ['r', 'R', 'click', 'touch'],
            'game'
        ]

    }
};

var gameConfig = {
    common: {
        fps: 70,
    },
    scene: {
        _comment: '过场场景配置',
        flash_delay: 3,
        keep_protagonist_delay: 30,
    },
    animation: {
        _comment: '动图属性设置',
        idle_delay: 1,
        walk_cooldown: 10,
        run_cooldown: 6,
    },
    flappy: {
        pipe: {
            _comment: '管道的属性配置',
            speed: 4
        },
        bird: {
            _comment: '小鸟的属性配置',
            speed: 5,
            aSpeed: 3,
            cooldown: 3,
            deadDelay: 60
        },
        banner: {
            _comment: '地面滑条属性配置',
            speed: 5,
        }
    },
    // TODO 归类到 escape
    player: {
        _comment: 'player的属性配置',
        injured_distance: 20,
        padding_range: {
            min: 100,
            max: 100,
        },
        walk_speed: 3,
        run_speed: 5,
        deadDelay: 95
    },
    enemy: {
        _comment: 'enemy的属性配置',
        padding_range: {
            min: 10,
            max: 30,
        },
        number: 25,
        anima_delay: 6,
        active_delay: 30,
        energy: 150, // 150
        rest_coolDown: 280, // 280
        sleep_distance: 600,
        attack_distance: 200,
        walk_speed: 2,
        run_speed: 3,
    }
};
