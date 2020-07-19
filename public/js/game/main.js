var choseapp = new Vue({
    el: '#choseapp',
    data: { 
        ishidden: false,
        button: '关闭选项',
        isActive: [false, false]

    },
    methods: {
        toogleChose(event, value) {
            if (typeof value !== "undefined") {
                this.ishidden = value;
            } else {
                this.ishidden = !this.ishidden;
            }
            if (this.ishidden) {
                this.button = '切换游戏';
            } else {
                this.button = '关闭选项';
            }
        },
        replaceGame(gameName, id) {
            for (let i = 0; i < this.isActive.length; i++) {
                this.isActive[i] = false;
            }
            this.isActive[id] = true;
            this.toogleChose("", true);
            localStorage.game = gameName;
            window.gf.runWithGame(SimpleScene.new(gf, gameName, "start"));
        }
    }
});

var gameapp = new Vue({
    el: '#gameapp',
    data: { // return data{}
        title: 'Welcome',
        isVertical: false,
        gameFps: 0,
        gameTips: 'none',
        scope: 0,
        rankPlayers: [ // TODO ajax: /game/api/rank?game=escape
            { name: '小米', scope: 889 },
            { name: 'JS', scope: 885 },
            { name: '按时啊', scope: 884 },
        ]
    },
    methods: {
        updateRanking() {},
    }
});

var setRemSize = function (htmlDom) {
    var screenWidth = window.innerWidth;
    if (screenWidth < window.innerHeight) {
        gameapp.isVertical = true;
    } else {
        gameapp.isVertical = false;
    }
    var remSize = screenWidth / 10;
    if (remSize >= 30) {
        if (remSize > 120) {
            remSize = 120;
        }
        htmlDom.style.fontSize = remSize + 'px';
    }
}

var bindRem = function () {
    let htmlDom = query('html');
    setRemSize(htmlDom);
    window.onresize = function () {
        setRemSize(htmlDom);
    }
}

var initGameFrame = function () {
    // 载入游戏资源
    loadJsData(gameEngine, () => {
        loadImageData(gameImages, function (imageDoms) {
            window.gf = GameFrame.getInstance(imageDoms, gameapp);
            if (typeof localStorage.game === "undefined") {
                choseapp.ishidden = false;
            } else {
                choseapp.ishidden = true;
            }

            setTimeout(() => {
                if (choseapp.ishidden) {
                    let id = localStorage.game == "escape"?1:0;
                    choseapp.replaceGame(localStorage.game, id);
                }
            }, 200);
        });
    })

}

var __main = function () {
    bindRem();
    initGameFrame();
    query(".unselect").addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
}

__main();