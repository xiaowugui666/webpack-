$(function(){

    var code = getUrlParam('code');
    var app_id = getUrlParam('app_id');
    var state = getUrlParam('state');

    if (code == null) {
        var uri =  'https://retail-static-test.51zan.com/red-packet/transfer.html';
        // 首次进入
        window.location.href = 'https://retail.51zan.com/public/mps/auth/code?app_id=wx2840761b6d4a722a&scope=snsapi_userinfo&redirect_uri=' + uri;
    }
    else {
        if(code){
            alert(code)
        }
        else if(state !== ''){
            alert('未授权')
        }
    }

    console.log(getUrlParam('code') == null);
    console.log(getUrlParam('code') === '');
    console.log(getUrlParam('app_id'));

    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }


    // var app_id = getParam('app_id')
    // var id = getParam('id')   
    // var host = location.host
    // window.location.href= 'https://retail.51zan.com/public/mps/auth?scope=snsapi_userinfo&app_id='+app_id+'&redirect_uri='+encodeURIComponent("https://"+host+"/red-packet/transfer.html?id="+id)
    // function getParam(name) {
    //     var paramUrl = window.location.search.substr(1);
    //     var paramStrs = paramUrl.split('&');
    //     var params = {};
    //     for (var index = 0; index < paramStrs.length; index++) {
    //         params[paramStrs[index].split('=')[0]] = decodeURI(paramStrs[index].split('=')[1]);
    //     }
    //     return params[name];
    // }
})