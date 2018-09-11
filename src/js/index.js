import config from '../config'
import setRem from './setRem'

const load = function(){
    var id = getParam('id')   
    var nick_name = getParam('nick_name')
    var open_id = getParam('open_id')
    // 红包详情
    if(open_id){
        $.ajax({
            url:`${config.apiHost}/public/packets/${id}`,
            type:'get',
            dataType:'json',
            success:function(data){
                var response = data.data
                if(response){
                    querySelector('.photo').style.background = 'url('+response.sender_wechat_avatar_url+') no-repeat center'
                    querySelector('.photo').style.backgroundSize = '100% 100%'
                    querySelector('.photo').style.display = 'block'
                    querySelector('.name').innerHTML = response.sender_wechat_nickname
                    querySelector('.remark').innerHTML = response.remark
                    querySelector('.tips').innerHTML = response.remark
                    querySelector('.tip').style.display = 'block'
                    if(response.status==1){
                        querySelectorAll('.photo')[1].style.background = 'url('+response.sender_wechat_avatar_url+') no-repeat center'
                        querySelectorAll('.photo')[1].style.backgroundSize = '100% 100%'
                        querySelectorAll('.name')[1].innerHTML  =response.sender_wechat_nickname
                        querySelector('.money').innerHTML =(response.amount/100).toFixed(2);
                        querySelector('.new-year-but1').style.display = 'block'
                    } else if(response.status==2){
                        querySelector('.remark').innerHTML = '红包已领取'
                    } else if(response.status==3){
                        querySelector('.remark').innerHTML = '24小时内未领取，红包已失效请联系商家重新领取'
                    } else if(response.status==4){
                        querySelector('.remark').innerHTML = '红包领取失败请联系商家重新领取'
                    }
                } 
            },
            fail:function(xhr){
                $('.remark').html(xhr.meta.message)
            }
        })
    }

    // 拆红包
    $(".new-year-but1").click(function(){
        ajax({
            url:`${config.apiHost}/public/packets/${id}/open`,
            type:'get',
            dataType:'json',
            data:{
                open_id: open_id,
                nick_name:nick_name
            },
            success:function(data,text,xhr){
                $(".new-year-but1").addClass("main_jb2");
                setTimeout(function() {
                    $(".new-year-but1").removeClass("main_jb2");
                    $('#receive1').show()
                }, 1000);
            },
            fail:function(xhr){
                $(".new-year-but1").hide()
                $('.remark').html(xhr.meta.message)
            },
        })
    });

    function getParam(name) {
        var paramUrl = window.location.search.substr(1);
        var paramStrs = paramUrl.split('&');
        var params = {};
        for (var index = 0; index < paramStrs.length; index++) {
            params[paramStrs[index].split('=')[0]] = decodeURI(paramStrs[index].split('=')[1]);
        }
        return params[name];
    }

    function ajax(opt) {
        opt = opt || {};
        opt.method = opt.method.toUpperCase() || 'POST';
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
        if (opt.method.toUpperCase() === 'POST') {
            xmlHttp.open(opt.method, opt.url, opt.async);
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            xmlHttp.send(postData);
        }else if (opt.method.toUpperCase() === 'GET') {
            xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
            xmlHttp.send(null);
        } 
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState ===4) {
                if (xmlHttp.status >= 200 && xmlHttp.status < 300) {
                    opt.success && opt.success(JSON.parse(xmlHttp.responseText));                    
                } else {
                    opt.fail && opt.fail(JSON.parse(xmlHttp.responseText))
                }
            }
        }
    }

}

$(function(){
    setRem()
    load()
})