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
    return Math.floor(Math.random() * (max - min + 1)) + min;;
}

