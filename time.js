/**
 *  获取时间戳 和时间， 转换时间 Y-m-d H:i:s 
 */

/**
 * 获得当前时间
 * @returns {*}
 */
function getDate() {
    // 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
    var date = new Date();
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y + M + D + h + m + s; //呀麻碟
}