var config = require('../config')

var getElement = function(selector){
    // return $(selector)[0]
    return document.querySelector(selector)
}

var getElements = function(selector){
    // return $(selector)
    return document.querySelectorAll(selector)
}

var load = function(){
    var id = decodeURI(getParam('id'))
    var nick_name = ''
    var open_id = decodeURI(getParam('open_id'))
    
    // 红包详情
    if(open_id){
        var url = config.apiHost + '/public/packets/'+ id
        // url='https://retail-api.51zan.com/public/packets/%2B%2FY3SiZLnd6R1hHkTQ'
        ajax({
            url: url,
            type:'get',
            dataType:'json',
            success: function(data){
                getElement("#loading").style.display='none'
                var response = data.data
                if(response){
                    getElement('.photo').style.background = 'url('+response.sender_wechat_avatar_url+') no-repeat center'
                    getElement('.photo').style.backgroundSize = '100% 100%'
                    getElement('.photo').style.display = 'block'
                    getElement('.name').innerHTML = response.sender_wechat_nickname
                    getElement('.remark').innerHTML = response.messages
                    getElement('.tips').innerHTML = response.messages
                    getElement('.tip').style.display = 'block'
                    if(response.status==1){
                        getElements('.photo')[1].style.background = 'url('+response.sender_wechat_avatar_url+') no-repeat center'
                        getElements('.photo')[1].style.backgroundSize = '100% 100%'

                        getElement('.names').innerHTML  = response.sender_wechat_nickname
                        getElement('.money').innerHTML = (response.amount/100).toFixed(2);
                        getElement('.new-year-but1').style.display = 'block'
                    } else if(response.status==2){
                        getElement('.remark').innerHTML = '红包已领取'
                    } else if(response.status==3){
                        getElement('.remark').innerHTML = '24小时内未领取，红包已失效请联系商家重新领取'
                    } else if(response.status==4){
                        getElement('.remark').innerHTML = '红包领取失败请联系商家重新领取'
                    }
                }
            },
            fail:function(xhr){
                try {
                    var resposne = JSON.parse(xhr.responseText)
                    getElement('.remark').innerHTML = resposne.meta.message
                } catch(e) {
                    getElement('.remark').innerHTML = '领取失败，请联系管理员。 错误码：' + xhr.status
                }
                // getElement('.remark').innerHTML = xhr.meta.message
            }
        })
    }

    // 拆红包
    getElement('.new-year-but1').addEventListener('click', function(){
        getElement('.new-year-but1').disabled = true
        getElement('.new-year-but1').className = ' new-year-but1  main_jb2 '
        var start = new Date()
        ajax({
            url: config.apiHost + '/public/packets/' + id + '/open',
            type:'get',
            async:false,
            dataType:'json',   
            data: {
                open_id: open_id,
                nick_name: nick_name
            },
            success:function(data,text,xhr){
                delayExexute(function() {
                    getElement('.new-year-but1').className = ' new-year-but1 '
                    getElement( '#receive1').style.display = 'block'
                }, 1000, start);
            },
            fail:function(xhr){
                delayExexute(function() {
                    getElement( '.new-year-but1').style.display = 'none'
                    try {
                        var resposne = JSON.parse(xhr.responseText)
                        getElement('.remark').innerHTML = resposne.meta.message
                    } catch(e) {
                        getElement('.remark').innerHTML = '领取失败，请联系管理员。 错误码：' + xhr.status
                    }
                }, 1000, start)
            },
        })
    })

    function delayExexute(callback, milliseconds, start ) {
        var ms = milliseconds
        
        if(start) {
            var end = new Date()
            var sub = end-start
            ms = milliseconds - sub 
        }

        return setTimeout(callback, ms)
    }

    function getParam(name) {
        var paramUrl = window.location.search.substr(1);
        var paramStrs = paramUrl.split('&');
        var params = {};
        for (var index = 0; index < paramStrs.length; index++) {
            var paramStrArray = paramStrs[index].split('=')
            params[paramStrArray[0]] = (paramStrArray[1])
        }
        return params[name];
    }

    function ajax(opt) {
        opt = opt || {};
        opt.type = opt.type|| 'POST';
        opt.url = opt.url || '';
        opt.async = opt.async || true;
        opt.data = opt.data || null;
        opt.dataType = opt.dataType || 'json';
        opt.success = opt.success || function () {};
        opt.fail = opt.fail || function () {};
        var xmlHttp = null;
        if (XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        }else {
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        }  
        var params = [];
        for (var key in opt.data){
            params.push(key + '=' + opt.data[key]);
        }
        var postData = params.join('&');
        if (opt.type.toUpperCase() === 'POST') {
            xmlHttp.open(opt.type, opt.url, opt.async);
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            xmlHttp.send(postData);
        }else if (opt.type.toUpperCase() === 'GET') {
            var sendUrl = postData ? opt.url + '?' + postData : opt.url

            xmlHttp.open(opt.type, sendUrl, opt.async)
            xmlHttp.send(null);
        } 
        xmlHttp.onreadystatechange = function(){
            if (xmlHttp.readyState ===4) {
                if (xmlHttp.status >= 200 && xmlHttp.status < 300) {
                    opt.success && opt.success(JSON.parse(xmlHttp.responseText));                    
                } else {
                    opt.fail && opt.fail(xmlHttp)
                }
            }
        }
    }

}
window.onload= function() {
    load()
}