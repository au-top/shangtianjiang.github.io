function GOPlay() {
    $('#GamePlay').animate({top: `-999px`}, 1000, function () {
        $('#GamePlay').css('display', 'none');
    });
    Game();
}
function Game() {
    let GameObj = $('#Game');
    let GameW = GameObj.width();
    let GameH = GameObj.height();
    let EnyModel = "<div class=\"EnyClass\" style=\"background-image: url('images/ship_1.png')\"></div>";
    let AllyModel = "<div class=\"EnyClass\" style=\"background-image: url('images/you.png')\"></div>";
    let StoneModel = "<div class=\"StoneClass\" style=\"background-image: url('images/aestroid_dark.png')\"></div>";
    let PlayerModel = "<div class=\"EnyClass\" style=\"background-image: url('images/Player.png')\"></div>";
    let BulletModel="<div class=\"BulletClass\"></div>";
    let PlayerObj = new Init(0, GameH / 2, PlayerModel,4, 5, 15, 0, 0);
    function Init(_x, _y, _model,_GIFMax, _speed, _fuel, _fraction, _bullet) {
        this.x = _x;
        this.y = _y;
        this.Model = $(_model);
        this.Speed = _speed;
        this.Fuel = _fuel;
        this.GIFMax=_GIFMax;
        this.Fraction = _fraction;
        this.Bullet = _bullet;
        this.init = function () {
            GameObj.append(this.Model);
            this.w = this.Model.width();
            this.h = this.Model.height();
            this.Model.css('left', this.x);
            this.Model.css('top', this.y);
            this.GIFSet=GIF(this);
            this.Movex = function (f, Min = -1, Max = -1) {
                this.x += f * this.Speed;
                if (Min !== Max) {
                    this.x = this.x < Min ? 0 : this.x;
                    this.x = this.x + this.w > Max ? Max - this.w : this.x;
                }
                this.Model.css('left', this.x);
            };
            this.Movey = function (f, Min = -1, Max = -1) {
                this.y += f * this.Speed;
                if (Min !== Max) {
                    this.y = this.y < Min ? 0 : this.y;
                    this.y = this.y + this.h > Max ? Max - this.h : this.y;
                }
                this.Model.css('top', this.y);
            };
            this.Clear = function () {
                clearInterval(this.GIFSet);
                this.Model.remove();
            }
        };
        this.init();
    }
    let PlayerL, PlayerR, PlayerT, PlayerB;
    $('html').keydown(function (e) {
        switch (e.keyCode) {
            case 37:
                PlayerL = 1;
                break;
            case 38:
                PlayerT = 1;
                break;
            case 39:
                PlayerR = 1;
                break;
            case 40:
                PlayerB = 1;
                break;
            case 32:
                BulletArray.push( new Init(PlayerObj.x+PlayerObj.w,PlayerObj.y+PlayerObj.h/2,BulletModel,0,PlayerObj.Speed+10,0,0,1) );
                break;
        }
    });
    $('html').keyup(function (e) {
        switch (e.keyCode) {
            case 37:
                PlayerL = 0;
                break;
            case 38:
                PlayerT = 0;
                break;
            case 39:
                PlayerR = 0;
                break;
            case 40:
                PlayerB = 0;
                break;
        }
    });
    /**
     * Set
     * */
    Set(function () {
        EnyArray.push(
            new Init(GameW, Math.floor((GameH - 100) * Math.random()), EnyModel,4, 10, 0, 10, 1)
        )
    }, 1500);
    Set(function () {
        EnyArray.push(
            new Init(GameW, Math.floor((GameH - 100) * Math.random()), AllyModel,4, 10, 0, -10, 0)
        )
    }, 2800);
    Set(function () {
        EnyArray.push(
            new Init(GameW, Math.floor((GameH - 100) * Math.random()), StoneModel,0, 10, 0, 10, 0)
        )
    }, 3800);
    Set(function () {
        for (let i = 0; i < EnyArray.length; i++) {
            let obj = EnyArray[i];
            obj.Movex(-1);
            if (Boom(obj,PlayerObj)){
                clearInterval(obj.GIFSet);
                Fall(obj);
                EnyArray.splice(i,1);
            }
            if (obj.x < -100) {
                obj.Clear();
                EnyArray.splice(i, 1);
            }
        }
    }, 30);
    Set(function () {
        if (PlayerL) {
            PlayerObj.Movex(-1, 0, GameW);
        }
        if (PlayerT) {
            PlayerObj.Movey(-1, 0, GameH);
        }

        if (PlayerR) {
            PlayerObj.Movex(1, 0, GameW);
        }
        if (PlayerB) {
            PlayerObj.Movey(1, 0, GameH);
        }
    }, 15);
    Set(function () {
        for (let i=0;i<BulletArray.length;i++){
            let obj=BulletArray[i];
            obj.Movex(obj.Bullet);
            if (obj.Bullet){
                for (let ii=0;ii<EnyArray.length;ii++){
                    if (
                        Boom(obj,EnyArray[ii])
                    ){
                        obj.x=999;
                        clearInterval( obj.GIFSet);
                        Fall(EnyArray[ii]);
                        EnyArray.splice(ii,1);
                    }
                }
            }
            if (obj.x<-100||obj.x>GameW){
                obj.Clear();
                BulletArray.splice(i,1);
            }
        }
        },30);
    Set(function () {
        for (let i=0;i<FallArray.length;i++) {
            FallArray[i].Movex(-0.8);
            FallArray[i].Movey(0.8);
            if (FallArray[i].x<-100||FallArray[i].y>GameH){
                FallArray[i].Clear();
                FallArray.splice(i,1);
            }
        }
    },30)
}