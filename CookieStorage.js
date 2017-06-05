/**
 * Created by W on 2017/6/4.
 * cookie 的相关操作， getItem, setItem, remove, clear,
 */

/*
 ** 实现像 localStorage 和 sessionStorage 一样的存储方式
 *  maxage 最大的存储时间
 *  path 路径
 */
function CookieStorage(maxage, path) {

    // 获取一个储存全部cookie 信息的对象
    var cookie = (function () {
        var cookies = {};
        var all = document.cookie;
        if (all === '')
            return cookies;
        var list = all.split("; ");
        for (var i = 0; i < list.length; i++) {
            var cookie = list[i];
            var p = cookie.indexOf("=");
            var name = cookie.substring(0, p);
            var value = cookie.substring(p + 1);
            value = decodeURIComponent(value);
            cookies[name] = value;
        }
        return cookies;
    }());

    // 将所以 cookie 的 name 储存到一个数组中
    var keys = [];
    for (var key in cookie) {
        keys.push(key);
    }

    // cookie 的个数
    this.length = keys.length;

    // 返回第 n 个 cookie 的名字，如果 n 越界这放回 null
    this.key = function (n) {
        if (n < 0 || n > this.length)
            return null;
        return keys[n];
    };

    // 返回指定名字 cookie 值， 如果不存在则返回 null
    this.getItem = function (name) {
        return cookie[name] || null;
    };

    // 储存 cookie 的 值
    this.setItem = function (key, value) {

        if (! (key in cookie)) { // 如果key  不存在
            keys.push(key);
            this.length++;
        }

        cookie[key] = value;    // 储存在 对象中

        // 正式储存到 cookie
        var cookieString = key + "=" + encodeURIComponent(value);

        if (maxage) cookieString += "; max-age=" + maxage;
        if (path) cookieString += "; path=" + path;

        document.cookie = cookieString;
    };

    // 删除某个指定的 cookie
    this.removeItem = function (key) {
        if (! (key in cookie)) {
            return;
        }

        // 维护内部 cookie ，删除 key
        delete cookie[key];

        // 维护 keys, 删除 key
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] === key) {
                keys.splice(i, 1);      // 从 i 开始，删除 1个
                break;
            }
        }
        this.length--;

        document.cookie = key + "=; max-age=0";
    };

    // 删除所以的 cookie
    this.clear = function () {
        for (var i = 0; i < this.length; i++) {
            document.cookie = keys[i] + "=; max-age=0";
        }

        // 重置个个选项
        cookie = {};
        keys = [];
        this.length = 0;
    }
}