function GOPLAY() {
    let lenght = $('#GamePlayText>li');
    for (let i = 0; i < lenght.length; i++) {
        // $(lenght[i]).css(i % 4 < 2 ? 'top' : 'left', (i % 2 ? 1 : -1) * 500 + 'px');
        let TextArray=($(lenght[i]).text()).split('');
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
            $(TextArray[id]).animate({'left': 0, 'top': 0, 'opacity': 1}, i*200+id * 50 + 1000);
        }
        // $(lenght[i]).animate({'left': 0, 'top': 0, 'width': `100%`, 'opacity': 1}, i * 150 + 1000);
    }
    $('#GamePlayText').css('opacity','1');
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
    let EnyModel = "<div class=\"EnyClass MeiHua\" style=\"background-image: url('images/ship_1.png')\"></div>";
    let PlayerModel = "<div class=\"EnyClass MeiHua\" style=\"background-image: url('images/Player.png')\"></div>";
    let BulletModel="<div class=\"BulletClass MeiHua\"></div>";
    let PlayerObj = new Init(0, GameH / 2, PlayerModel, 5, 4, 0, 0, 15);
    function Init(_x, _y, _model, _Speed, _GIFMax, _Bullet, _Fraction, _Fuel) {
        this.x = _x;
        this.y = _y;
        this.Model = $(_model);
        this.Speed = _Speed;
        this.GIFMax = _GIFMax;
        this.Bullet = _Bullet;
        this.Fraction = _Fraction;
        this.Fuel = _Fuel;
        this.Init = function () {
            $('#Game').append(this.Model);
            this.Model.css('left', this.x);
            this.Model.css('top', this.y);
            this.w = this.Model.width();
            this.h = this.Model.height();
            this.Movex = function (f, Min = -1, Max = -1) {
                this.x += this.Speed * f;
                if (Min !== Max) {
                    this.x = this.x < Min ? Min : this.x;
                    this.x = this.x + this.w > Max ? Max - this.w : this.x;
                }
                this.Model.css('left', this.x)
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
    Set(function () {
        EnyArray.push(new Init(GameW, (GameH - 100) * Math.random(), EnyModel, 10, 4, 1, 15, 0))
    }, 2000);
    Set(function () {
        for (let enyi = 0; enyi < EnyArray.length; enyi++) {
            EnyArray[enyi].Movex(-1);
            if (EnyArray[enyi].x < -100) {
                EnyArray[enyi].Clear();
                EnyArray.splice(enyi, 1);
            }
        }
    }, 30);
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
                BulletArray.push(
                    new Init(PlayerObj.x+PlayerObj.w,
                    PlayerObj.y+PlayerObj.h/2,BulletModel,10+PlayerObj.Speed,0,1,0,0)
                );
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
        if (PL) {
            PlayerObj.Movex(-1,0,GameW);
        }
        if (PR) {
            PlayerObj.Movex(1,0,GameW);
        }
        if (PT) {
            PlayerObj.Movey(-1,0,GameH);
        }
        if (PB) {
            PlayerObj.Movey(1,0,GameH);
        }
    }, 15);
    Set(function () {
        for (let BulletI=0;BulletI<BulletArray.length;BulletI++) {
            BulletArray[BulletI].Movex(BulletArray[BulletI].Bullet);
            for (let Enyi=0;Enyi<EnyArray.length;Enyi++) {
                if (Boom(BulletArray[BulletI],
                    EnyArray[Enyi])){
                    BulletArray[BulletI].x=999;
                    Fall(EnyArray[Enyi]);
                    EnyArray.splice(Enyi,1);
                }
            }
            if(BulletArray[BulletI].x<-100||BulletArray[BulletI].x>GameW){
                BulletArray[BulletI].Clear();
                BulletArray.splice(BulletI,1);
            }
        }
    },10);
    Set(function () {
        for (let Falli=0;Falli<FallArray.length;Falli++){
            FallArray[Falli].Movex(-1);
            FallArray[Falli].Movey(1);
            if(FallArray[Falli].x<-100||FallArray[Falli].y>GameH){
                FallArray[Falli].Clear();
                FallArray.splice(Falli,1);
            }
        }
    },30);
    Set(function () {
        console.log(EnyArray.length,SetArray.length,BulletArray.length,FallArray.length);
        },5000);
}
