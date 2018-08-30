$(function(){
    var app_id = getParam('app_id')
    var id = getParam('id')   
    var host = location.host
    window.location.href= 'https://retail.51zan.com/public/mps/auth?scope=snsapi_userinfo&app_id='+app_id+'&redirect_uri='+encodeURIComponent("https://"+host+"/red-packet/transfer.html?id="+id)
    function getParam(name) {
        var paramUrl = window.location.search.substr(1);
        var paramStrs = paramUrl.split('&');
        var params = {};
        for (var index = 0; index < paramStrs.length; index++) {
            params[paramStrs[index].split('=')[0]] = decodeURI(paramStrs[index].split('=')[1]);
        }
        return params[name];
    }
})