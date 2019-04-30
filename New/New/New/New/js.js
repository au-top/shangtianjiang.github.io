function GameInit() {
    $('#GameInfo').css('display','block');
    let ArrayLi=$('#GameUl>li');
    for (let Lii=0;Lii<ArrayLi.length;Lii++){
        $(ArrayLi[Lii]).css(Lii%4<2?'top':'left',Lii%2?`-100px`:`100px`).css('opacity',0);
        $(ArrayLi[Lii]).animate({top:`0px`,left:`0px`,opacity:`1`},150*Lii+100);
    }
}
GameInit();
function GamePlay() {
    $('#GaneBack').animate({height:`0%`},300);
}