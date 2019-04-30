function GOPLAY() {
    let lenght = $('#GamePlayText>li');
    for (let i = 0; i < lenght.length; i++) {
        $(lenght[i]).css(i % 4 < 2 ? 'top' : 'left', (i % 2 ? 1 : -1) * 500 + 'px');
        let TextArray=($(lenght[i]).text()).split(' ');
        $(lenght[i]).text('');
        for (let is =0 ; is<TextArray.length;is++){
            TextArray[is]=TextArray[is];
            let obj='<span>'+TextArray[is]+'</span>';
            $(lenght[i]).append(obj);
        }
        TextArray=$(lenght[i]).find('span');
        console.log(TextArray);
        for (let id=0;id<TextArray.length;id++){
            $(TextArray[id]).css(id%4<2?'top':'left',id%2?`100px`:`-100px`);
            $(TextArray[id]).animate({'left': 0, 'top': 0, 'opacity': 1}, i*100+id*100+1000);
        }
        $(lenght[i]).animate({'left': 0, 'top': 0, 'opacity': 1}, i * 150 + 1000);
    }
    $('#GamePlay').animate({opacity:1},500);
}
GOPLAY();
function HiddandGame() {
    $('#GamePlayText').animate({'height': `0%`}, 1000, function () {
        Game();
    })
}
function Set(_function, _time) {
    SetArray.push([setInterval(_function, _time), _function, _time]);
}
// Game();
function Game() {
    let GameObj = $('#Game');
    let GameW = GameObj.width();
    let GameH = GameObj.height();
    let EnyModel ="<div class=\"EnyClass MeiHua\" style=\"background-image: url('images/ship_1.png')\"></div>";
    let PlayerModel ="<div class=\"EnyClass MeiHua\" style=\"background-image: url('images/Player.png')\"></div>";
    let BulletModel ="<div class=\"BulletClass MeiHua\"></div>";
    let StoneModel="<div class=\"StoneClass MeiHua\"></div>";
    let AllyModel = "<div class=\"EnyClass MeiHua\" style=\"background-image: url('images/you.png')\"></div>";
    let FuelModel="<div class=\"FuelClass\"></div>";
    new Init(0, GameH / 2, PlayerModel, 5, 4, 0, 0, 15,PlayerArray);
    function Init(_x, _y, _model, _Speed, _GIFMax, _Bullet, _Fraction, _Fuel, _Array,_life=1, MaxLeft = 0 - 200, MaxRight = GameW + 200, MaxHeight=GameH+200) {
        this.x = _x;
        this.y = _y;
        this.Model = $(_model);
        this.Speed = _Speed;
        this.GIFMax = _GIFMax;
        this.Bullet = _Bullet;
        this.Fraction = _Fraction;
        this.Fuel = _Fuel;
        this.Array = _Array;
        this.life=_life;
        this.Init = function () {
            $('#Game').append(this.Model);
            this.Model.css('left', this.x);
            this.Model.css('top', this.y);
            this.Array.push(this);
            this.w = this.Model.width();
            this.h = this.Model.height();
            this.Movex = function (f, Min = -1, Max = -1) {
                this.x += this.Speed * f;
                if (Min !== Max) {
                    this.x = this.x < Min ? Min : this.x;
                    this.x = this.x + this.w > Max ? Max - this.w : this.x;
                }
                this.Model.css('left', this.x);
                if (this.x < MaxLeft || this.x > MaxRight || this.y > MaxHeight) {
                    for (let i = 0; i < this.Array.length; i++) {
                        if (this.Array[i] === this) {
                            this.Array[i].Clear();
                            this.Array.splice(i, 1);
                        }
                    }
                }
            };
            this.Movey = function (f, Min = -1, Max = -1) {
                this.y += this.Speed * f;
                if (Min !== Max) {
                    this.y = this.y < Min ? Min : this.y;
                    this.y = this.y + this.h > Max ? Max - this.h : this.y;
                }
                this.Model.css('top', this.y)
            };
            this.GIFSet = GIF(this);
            this.Clear = function () {
                clearInterval(this.GIFSet);
                this.Model.remove();
            }
        };
        this.Init();
    }
    let PL, PR, PT, PB;
    $(' html').keydown(function (e) {
        switch (e.keyCode) {
            case 37:
                PL = 1;
                break;
            case 38:
                PT = 1;
                break;
            case 39:
                PR = 1;
                break;
            case 40:
                PB = 1;
                break;
            case 32:
                new Init(PlayerArray[0].x + PlayerArray[0].w,PlayerArray[0].y + PlayerArray[0].h / 2, BulletModel, 10 + PlayerArray[0].Speed,
                    0, 1, 0, 0,BulletArray);
                break;
        }
    });
    $('html').keyup(function (e) {
        switch (e.keyCode) {
            case 37:
                PL = 0;
                break;
            case 38:
                PT = 0;
                break;
            case 39:
                PR = 0;
                break;
            case 40:
                PB = 0;
                break;
        }
    });
    Set(function () {
        new Init(GameW, (GameH-100)*Math.random(), EnyModel, 5+Math.floor( Math.random()*10 ), 4, 1, 15, 0, EnyArray)
    }, 3300);
    Set(function () {
        new Init(GameW, (GameH-100)*Math.random(), AllyModel, 5+Math.floor( Math.random()*10 ), 4, 1, 15, 0, EnyArray)
    }, 5800);
    Set(function () {
        new Init(GameW, (GameH-100)*Math.random(), StoneModel,7, 4, 0, -15, 0, EnyArray,2)
    }, 1100);
    Set(function () {
        new Init(GameW*Math.random(),-100,FuelModel,10,0,0,0,10,FuelArray);
    },1000);
    Set(function () {
        if (PL) {
            PlayerArray[0].Movex(-1, 0, GameW);
        }
        if (PR) {
            PlayerArray[0].Movex(1, 0, GameW);
        }
        if (PT) {
            PlayerArray[0].Movey(-1, 0, GameH);
        }
        if (PB) {
            PlayerArray[0].Movey(1, 0, GameH);
        }
    }, 15);
    Set(function () {
        //BulletMove
        for (let BulletI = 0; BulletI < BulletArray.length; BulletI++) {
            for (let Enyi = 0; Enyi < EnyArray.length; Enyi++) {
                if (Boom(BulletArray[BulletI],
                    EnyArray[Enyi])) {
                    BulletArray[BulletI].x = 1500;
                    EnyArray[Enyi].life-=1;
                }
            }
            BulletArray[BulletI].Movex(BulletArray[BulletI].Bullet);
        }
    }, 10);
    Set(function () {
        for (let Falli = 0; Falli < FallArray.length; Falli++) {
            //FallMove
            FallArray[Falli].Movey(1);
            FallArray[Falli].Movex(-1);
        }
    }, 30);
    Set(function () {
        //排泄DeBug
        console.log('DeBug',EnyArray.length, SetArray.length, BulletArray.length, FallArray.length);
    }, 5000);
    Set(function () {
        //EnyArrayMove
        for (let enyi = 0; enyi < EnyArray.length; enyi++) {
            if (Boom(PlayerArray[0], EnyArray[enyi])) {
                EnyArray[enyi].life=0;
            }

            if (EnyArray[enyi].life<=0) {
                Fall(EnyArray[enyi]);
                EnyArray.splice(enyi,1);
            }else if (1)
                EnyArray[enyi].Movex(0.5);
        }
    }, 30);
    Set(function () {
        for (let Fueli=0;Fueli<FuelArray.length;Fueli++) {
            if (Boom(FuelArray[Fueli],PlayerArray[0])) {
                FuelArray[Fueli].y=999;
            }
            FuelArray[Fueli].Movey(1);
            FuelArray[Fueli].Movex(1);
        }
    },30)

}