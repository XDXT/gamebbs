var setRemSize = function (htmlDom) {
    var screenWidth = window.innerWidth;
    var remSize = screenWidth / 10;
    if (remSize >= 30) {
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

