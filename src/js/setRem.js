export default function(){
    var rem=0;
    var currentWidth=document.documentElement.clientWidth ||document.body.clientWidth ;
    rem=currentWidth/3.75;
    document.querySelector('html').style.fontSize=rem+'px';
}