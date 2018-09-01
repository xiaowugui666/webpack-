export default function(){
    var rem=0;
    var htmlDOM=document.documentElement;
    var currentWidth=htmlDOM.clientWidth;
    rem=currentWidth/3.75;
    htmlDOM.style.fontSize=rem+'px';
}