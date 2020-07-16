/**
 * 选择器
 * @param {String} selector dom name e.g: body #id .class 
 */
var queryAll = function (selector) {
    let dom;
    if (document.querySelectorAll != undefined) {
        dom = document.querySelectorAll(selector);
    } else if (selector.indexOf('#')) {
        dom = [document.getElementById(selector)];
    } else if (selector.indexOf('.')) {
        dom = document.getElementsByClassName(selector);
    } else {
        dom = document.getElementsByTagName(selector);
    }
    return dom;
}

var query = function (selector) {
    if (document.querySelector != undefined) {
        return document.querySelector(selector);
    } else {
        return queryAll(selector)[0];
    }
}

var log = function () {
    console.log.apply(console, arguments)
}

var bindEvent = function (element, eventName, fun) {
    element.addEventListtener(eventName, fun);
}

var loadImage = function (imageSrc) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.src = imageSrc;
        img.onload = function () {
            resolve(img);
        };
        img.onerror = function () {
            reject('connect erro');
        }
    })
}

var loadGameJs = function (dom, jsSrc) {
    return new Promise(function (resolve, reject) {
        var script = document.createElement("script"); 
        script.type = 'text/javascript';
        script.src = jsSrc;
        dom.appendChild(script);
        // IE：人间不值得，算了算了放弃我
        // script.onload = script.onreadystatechange = function () {
        //     if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
        //         resolve(img);
        //     }
        // }
        script.onload = function () {
            resolve();
        }
        script.onerror = function () {
            reject('connect erro');
        }
    })
}

// 载入游戏框架与游戏js
var loadJsData = function (jsConfig, callback) {
    var promiseList = [];
    let bodyDom = query("body");
    for (let i = 0; i < jsConfig.length; i++) {
        let jsUrl = jsConfig[i];
        promiseList.push(loadGameJs(bodyDom, jsUrl));
    }
    Promise.all(promiseList).then(() => {
        callback();
    }).catch(function (message) {
        if (message == 'connect erro') {
            log('错误!!无法连接游戏js资源，请查看连接或网络')
        }
    })
}

// 载入游戏资源，成功后回调
var loadImageData = function (imageConfig, callback) {
    var promiseList = [];
    for (const key in imageConfig) {
        promiseList.push(loadImage(imageConfig[key]));
    }

    Promise.all(promiseList).then((imageList) => {
        var imageDoms = {};
        let i = 0;
        for (const key in imageConfig) {
            imageDoms[key] = imageList[i];
            i++;
        }
        callback(imageDoms);
    }).catch(function (message) {
        if (message == 'connect erro') {
            log('错误!!无法连接图片资源，请查看图片连接或网络')
        }
    })
}

// 回调判断条件， 检查是否所有元素满足条件
var isDataRight = function (data, conditionFunc, checkNumber) {
    checkNumber = checkNumber || 'all'
    if (typeof data != 'object') {
        return conditionFunc(data);
    }
    
    for (let key in data) {
        if (!conditionFunc(data[key]) && checkNumber == 'all') {
            return false;
        }
        if (conditionFunc(data[key]) && checkNumber == 'once') {
            return true;
        }
    }
    return checkNumber == 'all' ? true : false;
}

// 对所有元素初始化成value
var initData = function (data, value) {
    if (typeof data != 'object') {
        data = value;
        return data;
    }

    for (let key in data) {
        if (typeof data[key] != 'object') {
            data[key] = value;
        } else {
            data[key] = initData(data[key], value)
        }
    }
    return data;
}

var runAsync = function (callback, ...arg) {
    setTimeout(callback, 0, ...arg);
}

var setRangeSize = function (obj, x, y) {
    if (obj.minX > x) {
        obj.minX = x;
    }
    if (obj.maxX < x) {
        obj.maxX = x;
    }
    if (obj.minY > y) {
        obj.minY = y;
    }
    if (obj.maxY < y) {
        obj.maxY = y;
    }
}

var randomValue = function (min, max) {
    return (Math.random() * (max - min + 1)) | 0 + min;
}

var clacDistance = function (obj1, obj2) {
    let x1 = obj1.x + (obj1.width / 2);
    let y1 = obj1.y + (obj1.height / 2);
    let x2 = obj2.x + (obj2.width / 2);
    let y2 = obj2.y + (obj2.height / 2);
    let dx = Math.abs(x1 - x2);
    let dy = Math.abs(y1 - y2);
    let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    return Math.floor(distance);
}