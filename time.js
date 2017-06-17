/**
 *  获取时间戳 和时间， 转换时间 Y-m-d H:i:s 
 */

/**
 * 获得当前时间
 * @returns {*}
 */
'use strict';
function Dates() {

    var date = (function() {
        return new Date(time);
    }());

    // 返回天数
    this.getData = function (time) {
        // 比如需要这样的格式 yyyy-MM-dd hh:mm:ss

        if (typeof time !== "undefined" || !time) {
            date = new Date(time);
        }

        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y + M + D + h + m + s;
    };

    // 获取当前时间
    this.now = function () {

        if (!Date.now()) {
            Date.now = function () {
                return (new Date()).getTime();
            }
        }

        return String(Date.now()).substring();
    };

    // YY-mm .... 转 时间戳
    this.dateToTime = function (strtime) {
        if (typeof strtime === "string" && strtime) {
            var date = new Date(strtime);
            return Number(String(date.getTime()).substring(0, 10));
        }
        return null;
    }
}