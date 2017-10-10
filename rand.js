//生成从minNum到maxNum的随机数
function randomNum(min, max) {
    min = Number(min);
    max = Number(max);
    return parseInt(Math.random()*(max-min+1)+min,10);
}

// 生成 一串字符串随机字符串
function generate_fun(length = 9) {
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_ []{}<>~`+=,.;:/?|';
  var password = '';
  for (var i = 0; i < length; i++) {
    password += chars[parseInt(Math.random() * chars.length, 10)]
  }
  return password;
}
