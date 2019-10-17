/**
 *  获取时间戳 和时间， 转换时间 Y-m-d H:i:s
 */

/**
 * 获得当前时间
 * @returns {*}
 */
'use strict';
function Dates() {


    // 转如时间戳 转 yyyy-MM-dd hh:mm:ss ，不传， 显示当前时间
    this.getData = function (time) {
        // 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
        var date;
        if (typeof time === "number" && time) {

            if (String(time).length > 11) {
                date = new Date(time);
            } else {
                date = new Date(time * 1000);
            }
        } else {
            date =  new Date();
        }

        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y + M + D + h + m + s;
    };

    // 获取当前时间戳
    this.now = function () {

        if (!Date.now()) {
            Date.now = function () {
                return (new Date()).getTime();
            }
        }

        return parseInt( Date.now() / 1000, 10);
    };

    // YY-mm .... 转 时间戳
    this.dateToTime = function (strtime) {
        if (typeof strtime === "string" && strtime) {
            var date = new Date(strtime);
            return date.getTime() / 1000;
        }
        return null;
    };

    // 获取当前时间前 前 几秒
    this.timeBefore = function (m) {
        var nowTime = this.now();
        var item = Number(nowTime) - Number(m);
        return this.getData(item);
    };

    // 获取当前时间 后几秒
    this.timeAfter = function (m) {
        var nowTime = this.now();
        var item = Number(nowTime) + Number(m);
        return this.getData(item);
    }
    
                        /**
                     * 判断是否 ‘0000-00-00 00：00：00' 是返回 ture, 不是 false
                     * @param strtime
                     * @returns {boolean}
                     */
      this.isZeroTime(strtime) {
                        if (typeof strtime === "string" && strtime) {
                            var timeChou = new Date(strtime);
                            if (isNaN(timeChou.getTime())) {
                                return true;
                            }
                            return false;
                        }
                    }
    
}
