/*
 ** 实现一个函数addLoadEvent，如下. 模拟 onload 函数
 */
function addLoadEvent(func) {

    var oldOnLoad = window.onload;
    if (typeof window.onload !== 'function') {
        window.onload = func;

    }
    else {
        window.onload = function () {
            oldOnLoad();
            func();
        }
    }
}


/* 
** 获取数据 URL 的参数
** $_GET("key") 
** return string, null
*/
function $_GET(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r !== null)
        return decodeURIComponent(r[2]);
    return null;
}


/*
 * 获得id 的集合  
 * getObjId("id1", "id2", "id3")
 * return array
*/
function getObjId(/*ids...*/) {
    var elements = {};
    for (var i = 0; i < arguments.length; i++) {
        var id = arguments[i];
        var ele = document.getElementById(id);
        if (ele === null)
            throw new Error('没有该id');
        elements[id] = ele;
    }
    return elements;
}


/*
** 检查 {} 是否为空
*/
function isEmpty(value) {
    return Object.keys(value).length === 0;
}
