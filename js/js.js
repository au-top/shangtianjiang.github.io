var luen_bo_to_top_data=-1;
var lbt_auto=1;
function luen_bo_tu(data)
{
    data%=6;
    data=data?data:1;
    var color=$( $('.lbt')[data-1]).css('color');
    $($(".lbt")[luen_bo_to_top_data]).css("color",color);
    $("#luenbotu").css("background","url(\"img/big_img_no"+data+".jpg\") center no-repeat");
    $($(".lbt")[data-1]).css("color",'red').css("font_size","20px");
    luen_bo_to_top_data=data-1;
}
function qweplay(_ojb,_time){
    $(_ojb).css('display','block');
    //setTimeout("$(_ojb).css('opacity','1')",_time);
    $(_ojb).animate({opacity:1},500)
}
function no_display(_ojb,_time){
    $(_ojb).animate({opacity:0},500,function (){$(_ojb).css('display','none')});
}


function go_ojb(_ojb){
    no_display('.nav_kuandu',200);
    //$("#_debug_").offset().top
    $(" html").animate({scrollTop:1000},2000);
}
luen_bo_tu(1);
$(function () {
   $('.nav_button').click(function () {
       if( Number( $('.nav_kuandu').css('opacity') ) ){
           no_display('.nav_kuandu',500);
       }else{
           qweplay('.nav_kuandu',100);
       }});
    $('.close_bottom').click(function () {
        no_display('.nav_kuandu',500)
    })
});

setInterval(function(){ luen_bo_tu(luen_bo_to_top_data+2)},2000);