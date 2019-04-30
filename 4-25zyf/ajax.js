let Fraction=0;
let Fuel=15;
let id;
function PlayGame() {
    let name=$('#PlayerName').val();
    console.log(name);
    $('#ButDiv').animate({height:`0px`},500,function () {
       $('#ButDiv').css('display','none');
    });
    $.ajax({
        type:'post',
        data:{
            Type:0,
            Name:name
        },
        url:'php.php',
        success:function (data) {
            id= data[0]['id'];
            Fraction=Number(data[0]['fraction']);
            fuel=Number(data[0]['fuel']);
            HiddandGame();
        }
    })
}
function PlayDataUpdate() {
}