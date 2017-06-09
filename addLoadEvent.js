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