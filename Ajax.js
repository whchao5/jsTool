
/**
 * User: W
 * Date: 2017/6/5
 * Time: 15:41
 */
/*
{
    url :" http:",
    type: "json",
    dataType : "get|post"
    done : function(data)  // success
    fail : function(data)
    always : function(data)
    statusCode :{ 443 : function(data){}, ...}
}
*/

function Ajax(opt) {

    if (!opt.url) {
        return;
    }

    var request = new XMLHttpRequest();


    var url = opt.url;

    request.open(
        opt.dataType ? opt.dataType : "POST",
        url,
        true
    );

    if (!opt.fail) {
        opt.fail = function (data) {
            alert(data ? data : '网络连接失败！');
        }
    }


    request.onreadystatechange = function () {
        if (request.readyState !== 4)
            return;

        if (request.status >= 200 && request.status < 300 || request.status === 304) {
            try {
                if (opt.done) {
                    switch (toLowerCase(opt.type)) {
                        case 'json':
                            var data = JSON.parse(request.response);
                            if (!data) {
                                opt.fail("数据格式有误！");
                            }
                            opt.done(data);
                            break;
                        default :
                            opt.done(request.response);
                    }
                }
            }catch (e) {

            }
        }

        // 处理定义的 状态码
        if (opt.statusCode &&  request.status >= 400) {
            var CodeCallback = opt.statusCode;
            for (var code in opt.statusCode) {
                if (request.status == code) {
                    CodeCallback[code](request.response);
                }
            }
        }
    };

    // 选择 json ,callback
    function switchCallback(callback) {
        switch (toLowerCase(opt.type)) {
            case 'json':
                var data = JSON.parse(request.response);
                if (!data) {
                    opt.fail("数据格式有误！");
                }
                callback(data);
                break;
            default :
                callback(request.response);
        }
    }

}