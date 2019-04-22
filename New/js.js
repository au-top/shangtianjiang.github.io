function GameGo() {
    $('#GoPlayBut').attr('onclick', '');
    let GamePlay = $('#GamePlay');
    GamePlay.animate({width: '0px'}, function () {
        GamePlay.css('display', 'none');

        GAME();
    });
}

function GAME() {
    let GameObj = $('#Game');
    let GameW = GameObj.width();
    let GameH = GameObj.height();
    let EnyModel1 = "<div class=\"poab Eny_Class\" style=\"background-image: url('images/ship_1.png')\"></div>";
    let PlayerModel = "<div class=\"poab Eny_Class\" style=\"background-image: url('images/Player.png')\"></div>";
    let BulletModel1 = "<div class=\"poab Bullet_Class\"></div>";
    let FuelModel1 = "<div class=\"deg poab Fuel_Class\"></div>";
    let YouModel1 = "<div class=\"poab Eny_Class\" style=\"background-image: url('images/you.png')\"></div>";
    let StoneModel1 = "<div class=\"deg poab Stone_Class\" style=\"background-image: url('images/aestroid_dark.png')\"></div>"
    function init(_x, _y, _GIFMax) {
        this.x = _x;
        this.y = _y;
        this.GIFMax = _GIFMax;
        this.ClearMod=this.ClearMod||function () {};
        this.init = function () {
            GameObj.append(this.model);
            this.model.css('left', this.x);
            this.model.css('top', this.y);
            this.w = this.model.width();
            this.h = this.model.height();
            this.GIFSet = GIF(this);
            this.Movex = function (f, MIN = -1, MAX = -1) {
                this.x += this.speed * f;
                if (MIN !== MAX) {
                    this.x = this.x > MAX ? MAX : this.x;
                    this.x = this.x < MIN ? MIN : this.x;
                }
                this.model.css('left', this.x + 'px');
            };
            this.Movey = function (f, MIN = -1, MAX = -1) {
                this.y += this.speed * f;
                if (MIN !== MAX) {
                    this.y = this.y > MAX ? MAX : this.y;
                    this.y = this.y < MIN ? MIN : this.y;
                }
                this.model.css('top', this.y);
            };
            this.Clear = function () {
                this.model.remove();
                clearInterval(this.GIFSet);
                this.ClearMod();
            };
            this.initMod();
        };
        this.init();
    }
    function NEWEny(_x, _y, _model, _speed, _GIFMAX, _fuel, _fraction, _life, _launch = 0) {
        this.model = $(_model);
        this.fuel = _fuel;
        this.fraction = _fraction;
        this.life = _life;
        this.speed = _speed;
        this.launch = _launch;
        this.initMod = function () {
        };
        this.ClearMod=function(){

        };
        init.call(this, _x, _y, _GIFMAX);
    }
    function NewPlayer(_x, _y, _model, _speed, _GIFMAX) {
        this.model = $(_model);
        this.fuel = 0;
        this.fuelMax = 30;
        this.fraction = 0;
        this.fuelFunction = function (s) {
            this.fuel += s;
            this.fuel = this.fuel >= 30 ? 30 : this.fuel;
            $('#Fuel').text(this.fuel);
            let num = this.fuel / this.fuelMax;
            console.log((1 - num) * 100);
            $('#GameRed').css('opacity', 1 - num);
            $('#Fuel_main').css('width', `${num * 100}%`)
        };
        this.FractionFunction = function (s) {
            this.fraction += s;
            $('#Fraction').text(this.fraction);
        };
        this.initMod = function () {
            this.fuelFunction(15);
            this.FractionFunction(0);
        };
        this.speed = _speed;
        init.call(this, _x, _y, _GIFMAX);
    }

    function NewBullet(_x, _y, _model, _speed, _party) {
        this.model = $(_model);
        this.speed = _speed;
        this.party = _party;
        this.initMod = function () {
        };
        BulArray.push(this);
        init.call(this, _x, _y, 0);
    }

    let PlayerLeft = 0, PlayerRight = 0, PlayerTop = 0, PlayerBottom = 0;
    $(' html').keydown(function (e) {
        switch (e.keyCode) {
            case 37:
                PlayerLeft = 1;
                break;
            case 38:
                PlayerTop = 1;
                break;
            case 39:
                PlayerRight = 1;
                break;
            case 40:
                PlayerBottom = 1;
                break;
            case 32:
                new NewBullet(
                    PlayerObj.x + PlayerObj.w,
                    PlayerObj.y + PlayerObj.h / 2,
                    BulletModel1,
                    10 + PlayerObj.speed, 1
                );
                break;
            case 80:

                Stop();
                break;
        }
    });
    $(' html').keyup(function (e) {
        switch (e.keyCode) {
            case 37:
                PlayerLeft = 0;
                break;
            case 38:
                PlayerTop = 0;
                break;
            case 39:
                PlayerRight = 0;
                break;
            case 40:
                PlayerBottom = 0;
                break;
        }
    });
    let PlayerObj = new NewPlayer(
        0, GameH / 2,
        PlayerModel,
        5,
        4
    );
    /**
     * Set
     */
    Set(function () {
        let Obj = new NEWEny(GameW,
            Math.random() * (GameH - 100),
            EnyModel1, Math.floor(Math.random() * 10) + 5,
            4,
            -15, 10,
            1, 1
        );
        EnyArray.push(Obj);
    }, 2300);
    Set(function () {
        let Obj = new NEWEny(GameW,
            Math.random() * (GameH - 100),
            YouModel1, Math.floor(Math.random() * 10) + 5,
            4,
            -15, -10,
            1
        );
        EnyArray.push(Obj);
    }, 1200);
    Set(function () {
        let Obj = new NEWEny(GameW,
            Math.random() * (GameH - 100),
            StoneModel1, 5,
            0,
            -15, 10,
            2
        );
        EnyArray.push(Obj);
    }, 1300);
    Set(function () {
        for (let i = 0; i < EnyArray.length; i++) {
            let obj = EnyArray[i];
            obj.Movex(-1);
            if (Boom(obj, PlayerObj)) {
                obj.life = 0;
                PlayerObj.fuelFunction(obj.fuel);
            }
            if (obj.life <= 0) {
                PlayerObj.FractionFunction(obj.fraction);
                Fall(obj);
                EnyArray.splice(i, 1);
            } else {
                if (Math.floor(Math.random() * 100) < 2 && EnyArray[i].launch) {
                    new NewBullet(obj.x, Math.floor(obj.y + obj.h / 2),
                        BulletModel1,
                        obj.speed + 10,
                        -1
                    )
                }
                if (obj.x < -100) {
                    obj.Clear();
                    EnyArray.splice(i, 1);
                }
            }
        }
    }, 30);
    Set(function () {
        if (PlayerLeft) {
            PlayerObj.Movex(-1, 0, GameW - PlayerObj.w);
        }
        if (PlayerRight) {
            PlayerObj.Movex(1, 0, GameW - PlayerObj.w);
        }
        if (PlayerTop) {
            PlayerObj.Movey(-1, 0, GameH - PlayerObj.h);
        }
        if (PlayerBottom) {
            PlayerObj.Movey(1, 0, GameH - PlayerObj.h);
        }
    }, 10);
    Set(function () {
        let length = BulArray.length;
        for (let i = 0; i < length; i++) {
            let obj = BulArray[i];
            obj.Movex(obj.party);
            if (obj.party === 1) {
                let length = EnyArray.length;
                for (let i = 0; i < length; i++) {
                    if (Boom(EnyArray[i], obj)) {
                        obj.x = -999;
                        EnyArray[i].life -= 1;
                        length = EnyArray.length;
                    }
                }
            } else {
                if (Boom(PlayerObj, obj)) {
                    PlayerObj.fuelFunction(-15);
                    obj.x = -999;
                }
            }
            if (obj.x < -100 || obj.x > GameW) {
                obj.Clear();
                BulArray.splice(i, 1);
                length = BulArray.length;
            }
        }
    }, 10);
    Set(function () {
        PlayerObj.fuelFunction(-1);
    }, 1000);
    Set(function () {
        let length = FallArray.length;
        for (let i = 0; i < length; i++) {
            FallArray[i].Movex(-0.8);
            FallArray[i].Movey(0.8);
            if (FallArray[i].x < -100 || FallArray[i].y > GameH + FallArray[i].h) {
                FallArray[i].Clear();
                FallArray.splice(i, 1);
                length = FallArray.length
            }
        }
    }, 30);
    Set(function () {
        let obj = new NEWEny(
            Math.random() * GameW,
            0, FuelModel1,
            10, 0, 15, 0, 0
        );
        FuelArray.push(obj);
    }, 1000);
    Set(function () {
        let length = FuelArray.length;
        for (let i = 0; i < length; i++) {
            FuelArray[i].Movey(1);
            FuelArray[i].Movex(0.2);
            if (Boom(FuelArray[i], PlayerObj)) {
                FuelArray[i].y = 999;
                PlayerObj.fuelFunction(15);
            }
            if (FuelArray[i].y > GameH + 100) {
                FuelArray[i].Clear();
                FuelArray.splice(i, 1);
                length = FuelArray.length;
            }
        }
    }, 30);
}