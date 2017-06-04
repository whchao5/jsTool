/**
 * Created by W on 2017/6/4.
 * ES6 判断类型函数
 */

/*
** 测试一个值是否是整数， 使用ES6定义的Number.isInteger(..)
 */
if (!Number.isInteger) {
    Number.isInteger = function (num) {
        return typeof num === "number" && num % 1 == 0;
    }
}

/*
** 要测试一个值是否是 安全整数
 */
if (!Number.isSafeInteger) {
    Number.isSafeInteger = function (num) {
        return Number.isInteger(num) && Math.abs(num) <= Number.MAX_SAFE_INTEGER;
    }
}

/*
** 检查NaN值   var b = "foo", isNaN(b) // true
 */
if (!Number.isNaN) {
    Number.isNaN = function (n) {
        return (typeof n === "number" && window.isNaN(n))
    }
}

/*
** 两个值的绝对等价性
 */
if (!Object.is) {
    Object.is = function (v1, v2) {
        if (v1 === 0 && v2 === 0) {
            return 1 / v1 === 1 / v2;
        }
        // 测试 NaN
        if (v1 !== v2) {
            return v1 !== v2;
        }
        // 其他情况
        return v1 === v2;
    }
}