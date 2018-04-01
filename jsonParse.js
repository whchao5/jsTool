//  json 文本解析成 js 数据结构 的函数

var json_parse = function () {

    var at,  // 当前索引
        ch,      // 当前字符
        escapee = {
            '"': '"',
            '\\': '\\',
            '/': '/',
            'b': 'b',
            'f': '/f',
            'n': '/n',
            'r': '/r',
            't': '/t',
        },
        text,

        error = function (m) {
            throw {
                name: 'SyntaxError',
                message: m,
                at: at,
                text: text,
            }
        },  // 谋臣出错是，调用 error

        next = function (c) {

            //  提供了 c, 并检验 是否匹配当前的字符
            if (c && c !== ch) {
                error("Expected '" + c + "' instead of '" + ch + "'");
            }

            ch = text.charAt(at);
            at += 1;
            return ch;
        },

        number = function () {

            var number, string = '';

            if (ch === '-') {
                string = '-';
                next('-');
            }

            while (ch >= '0' && ch <= '9') {
                string += ch;
                next();
            }

            if (ch === '.') {
                string += '.';
                while (next() && ch >= '0' && ch <= '9') {   // 整合 next();
                    string += ch
                }
            }

            if (ch === 'e' || ch === 'E') {
                string += ch;
                next();
                if (ch === '-' || ch === '+') {
                    string += ch;
                    next();
                }
                while (ch >= '0' && ch <= '9') {
                    string += ch;
                    next();
                }
            }
            number += string;

            log(number);
            if (isNaN(number)) {
                error('Bad number');
            } else {
                return number;
            }
        },

        string = function () {

            // 解析一个字符串
            var hex,
                i,
                string = '',
                uffff;

            // 解析字符串时， 必须找到 " 和 \ 字符
            if (ch === '"') {
                while (next()) {
                    if (ch === '"') {
                        next();
                        return string;
                    } else if (ch === '\\') {      // 转义符
                        next();
                        if (ch === 'u') {
                            uffff = 0;
                            for (i = 0; i < 4; i++) {
                                hex = parseInt(next(), 16);
                                if (!isFinite(hex)) {
                                    break;
                                }
                                uffff = uffff * 16 + hex;
                            }
                            string += String.fromCharCode(uffff);
                        } else if (typeof escapee[ch] === 'string') {
                            string += escapee[ch];
                        } else {
                            break;
                        }
                    } else {
                        string += ch;
                    }
                }
            }
            error("Bad string");
        },

        // 空白符
        white = function () {
            while (ch && ch <= ' ') {
                next();
            }
        },

        word = function () {
            // true 或 false , null
            switch (ch) {
                case 't':
                    next('t');
                    next('r');
                    next('u');
                    next('e');
                    return true;
                case 'f':
                    next('f');
                    next('a');
                    next('l');
                    next('s');
                    next('e');
                    return false;
                case 'n':
                    next('n');
                    next('u');
                    next('l');
                    next('l');
                    return null;
            }
            error('Unexpected " ' + ch + '"')
        },

        // value, // 值函数的占位符

        array = function () {
            var array = [];

            if (ch === '[') {
                next('[');

                white();
                if (ch === ']') {
                    next(']');
                    return array;
                }
                while (ch) {
                    array.push(value());
                    log(array);
                    white();
                    if (ch === ']') {
                        next(']');
                        white();
                    }
                    next(',');
                    white();
                }
            }
            error("Bad array");
        },
        log = console.log.bind(console),

        object = function () {
            var key,
                object = {};

            if (ch === "{") {
                next('{');
                white();

                if (ch === "}") {
                    next('}');
                    return object // 空对象
                }

                while (ch) {
                    key = string();
                    white();
                    next(':');
                    object[key] = value();
                    white();
                    if (ch === '}') {
                        next('}');
                        return object;
                    }
                    next(',');
                    white();
                }
            }
            error('Bad object');
        },

        value = function () {

            //解析 一个 json 的值， 它可以是 object， array， string，number
            white();
            switch (ch) {
                case "{":
                    return object();
                case "[":
                    return array();
                case '"':
                    return string();
                case '-':
                    return number();
                default :
                    return ch >= '0' && ch <= '9' ? number() : word();
            }
        };

    // 返回 json_parse 函数， 
    
    return function (source, reviver) {
        var result;

        text = source;
        at = 0;
        ch = ' ';
        result = value();
        white();
        if (ch) {
            error("Syntax error");
        }

        return typeof reviver === 'function' ?
            function walk(holder, key) {
                var k, v, value = holder[key];

                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }({'' : result}, '') : result;
    }
}();

























