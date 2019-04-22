function PlayGame() {
    $('#PlayBut').attr('onclick','');
    $('#GamePlay').animate({height:0},function () {
        $('#GamePlay').css('display','none');
        Game();
    });
}
function Game() {
    let GameObj=$('#Game');
    let GameW=GameObj.width();
    let GameH=GameObj.height();
    let EnyModel1="<div class=\"Eny_Class poab\" style=\"background-image: url('images/ship_1.png')\"></div>";
    let FriendModel="<div class=\"Eny_Class poab\" style=\"background-image: url('images/you.png')\"></div>";
    let StoneModel="<div class='Eny_Class poab Stone_Class' style=\"background-image: url('images/aestroid_gray.png')\"></div>";
    let PlayerModel="<div class=\"Player_Class poab\" style=\"background-image: url('images/Player.png')\"></div>";
    let PlayerObj=new Init(0,GameH/2,PlayerModel,4,10,15,0,0);
    function Init(_x,_y,_model,_GIFMAX,_speed,_fuel,_Fraction,_Bullet) {
        this.Model=$(_model);
        this.x=_x;
        this.y=_y;
        this.GIFMax=_GIFMAX;
        this.Speed=_speed;
        this.Bullet=_Bullet;
        this.Fuel=_fuel;
        this.FuelMax=30;
        this.Fraction=_Fraction;
        this.init = function () {
            GameObj.append(this.Model);
            this.Model.css('left', this.x).css('top',this.y);
            this.w=this.Model.width();
            this.h=this.Model.height();
            this.GIFSet=GIFFunction(this);
            this.Movex=function (f,Max=-1,Min=-1) {
                this.x+=this.Speed*f;
                if (Max!==Min){
                    this.x=this.x+this.w>Max?Max-this.w:this.x;
                    this.x=this.x<Min?Min:this.x;
                }
                this.Model.css('left',this.x);
            };
            this.Movey=function (f,Max=-1,Min=-1) {
                this.y+=this.Speed*f;
                if (Max!==Min){
                    this.y=this.y+this.h>Max?Max-this.h:this.y;
                    this.y=this.y<Min?Min:this.y;
                }
                this.Model.css('top',this.y);
            };
            this.clear=function () {
                clearInterval( this.GIFSet );
                this.Model.remove();
            }
        };
        this.init();
    }

        let PlayerLeft,PlayerRight,PlayerTop,PlayBottom=0;
        $(' html').keydown(function (e) {
            switch (e.keyCode) {
                case 37:
                    PlayerLeft=1;
                    break;
                case 38:
                    PlayerTop=1;
                    break;
                case 39:
                    PlayerRight=1;
                    break;
                case 40:
                    PlayBottom=1;
                    break;
            }
        });
        $(' html').keyup(function (e) {
            switch (e.keyCode) {
                case 37:
                    PlayerLeft=0;
                    break;
                case 38:
                    PlayerTop=0;
                    break;
                case 39:
                    PlayerRight=0;
                    break;
                case 40:
                    PlayBottom=0;
                    break;
            }
        });
        /**
         * Set
         * */
        Set(function () {
            EnyArray.push( new Init(GameW,(GameH-100)*Math.random(),EnyModel1,4,10,0,15) );
        },1200);
        Set(function () {
            EnyArray.push( new Init(GameW,(GameH-100)*Math.random(),FriendModel,4,10,0,15) );
        },4300);
        Set(function () {
            EnyArray.push( new Init(GameW,(GameH-100)*Math.random(),StoneModel,0,10,0,15) );
        },2800);
        Set(function () {
            for (let i=0;i<EnyArray.length;i++){
                let obj=EnyArray[i];
                obj.Movex(-1);
                if (obj.x<-100){
                    obj.clear();
                    EnyArray.splice(i,1)
                }
            }},30);
        Set(function () {
            if (PlayerLeft) {
                PlayerObj.Movex(-1,0,GameW);
            }
            if (PlayerRight){
                PlayerObj.Movex(1,0,GameW);
            }
            if (PlayerTop) {
                PlayerObj.Movey(-1,0,GameH);
            }
            if (PlayBottom){
                PlayerObj.Movey(-1,0,GameH);
            }
        })
}