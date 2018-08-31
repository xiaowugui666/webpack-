import config from '../config'
import setRem from './setRem'

const load = function(){
    var app_id = getParam('app_id')
    var id = getParam('id')   
    var nick_name = getParam('nick_name')
    var haveOpenId = location.search.indexOf('open_id')> -1 ? 1 : ''
    var host = location.host
    if(haveOpenId){
        var open_id = getParam('open_id')
        if(open_id){
            $.ajax({
                url:`${config.apiHost}/public/packets/${id}`,
                type:'get',
                dataType:'json',
                success:function(data,text,xhr){
                    console.log(xhr.status)
                    var response = data.data
                    if(response){
                        $('.photo').eq(0).css({
                            "background":'url('+response.sender_wechat_avatar_url+') no-repeat center',
                            "background-size":'100% 100%'
                        });
                        $('.red-packet').show()
                        $('.name').eq(0).html(response.sender_wechat_nickname);
                        $('.remark,.tips').html(response.messages);
                        var m = (response.amount/100).toFixed(2);
                        if(response.status==1){
                            $('.photo').eq(1).css({
                                "background":'url('+response.sender_wechat_avatar_url+') no-repeat center',
                                "background-size":'100% 100%'
                            });
                            $('.name').eq(1).html(response.sender_wechat_nickname)
                            $('.money').html(m)
                            $('.new-year-but1').show()
                        } else if(response.status==2){
                            $('.remark').html('红包已领取')
                        } else if(response.status==3){
                            $('.remark').html('24小时内未领取，红包已失效请联系商家重新领取')
                        } else if(response.status==4){
                            $('.remark').html('红包领取失败请联系商家重新领取')
                        }

                    }
                },
                error:function(data){
                    console.log(data)
                    console.log('请稍后重试！');
                }
            })
        }else{
            alert('未授权')
        }

    }
    else{
        window.location.href= 'https://retail.51zan.com/public/mps/auth?scope=snsapi_userinfo&app_id='+app_id+'&redirect_uri='+encodeURIComponent("https://"+host+"/red-packet/index.html?id="+id)
    }

    $(".new-year-but1").click(function(){
        $.ajax({
            url:`${config.apiHost}/public/packets/${id}/open`,
            type:'get',
            dataType:'json',
            data:{
                open_id: open_id,
                nick_name:nick_name
            },
            success:function(data,text,xhr){
                alert('222'+xhr.status)
                if( xhr.status >=200   && xhr.status <300 ){
                    $(".new-year-but1").addClass("main_jb2");
                    setTimeout(function() {
                        $(".new-year-but1").removeClass("main_jb2");
                        $('#receive1').show();
                    }, 1000);
                }else{
                    $('.new-year-but1').hide()
                    $('.remark').html(data.meta.message)
                }
            },
            error:function(data,text,xhr){
                alert('111'+xhr.status)
                $('.new-year-but1').hide()
                $('.remark').html(data.meta.message)
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
}

$(function(){
    setRem()
    load()
})