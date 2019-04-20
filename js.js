function Game() {
    var GameVar = $('#Game_box');
    let GameW = GameVar.width();
    let GameH = GameVar.height();
    let Eny_model1 = "<div style=\"background-image: url('images/ship_1.png')\" class=\"Eny_Class\"></div>";
    let Eny_model2 = "<div style=\"background-image: url('images/you.png')\" class=\"Eny_Class\"></div>";
    let Eny_model3 = "<div style=\"background-image: url('images/aestroid_dark.png')\" class=\"aestroid Eny_Class\"></div>";
    let Player_model1 = "<div style=\"background-image: url('images/Player.png')\" class=\"Eny_Class\"></div>";
    let Bullet_model1 = "<div class=\"Bullet_Class\"></div>";
    $('#Game_play').css('display', 'none');
    let SetArray = Array();
    let SetControl = 1;
    function Eny(_x, _y, _model, _move, _GIFMax, _HP, _fuel, _integral, _faya) {
        this.x = _x;
        this.y = _y;
        this.model = $(_model);
        this.GIFMax = _GIFMax;
        this.move = _move;
        this.HP = _HP;
        this.fuel = _fuel;
        this.integral = _integral;
        this.faya = _faya;
        this.init = function () {
            GameVar.append(this.model);
            this.w = this.model.width();
            this.h = this.model.height();
            this.model.css('left', this.x);
            this.model.css('top', this.y);
            this.GIF = GIF(this);
            this.Movex = function (f) {
                this.x += (this.move * f);
                this.model.css('left', this.x);
            };
            this.Movey = function (f) {
                this.y += (f * this.move);
                this.model.css('top', this.y);
            };
            this.Clear = function () {
                this.model.remove();
                clearInterval(this.GIF);
            };
        };
        this.init();
    }
    function Player(_x, _y, _model, _move, _GIFMax) {
        this.x = _x;
        this.y = _y;
        this.FuelMax = 30;
        this.fuel = 15;
        this.fraction = 0;
        this.model = $(_model);
        this.GIFMax = _GIFMax;
        this.move = _move;
        this.fractionFuntion = function (s) {
            this.fraction += s;
            if (s > 0) {
                Tips('green', this, 500, s);
            }
            $('#fraction').text(this.fraction);
        };
        this.fuelFunction = function (s) {
            this.fuel += s;
            this.fuel = this.fuel > 30 ? 30 : this.fuel;
            $('#fuel').css('width', (this.fuel / this.FuelMax) * 100 + '%');
            if (s > 0) {
                Tips('blue', this, 500, s);
            } else {
                if (s !== -1) {
                    Tips('red', this, 300, s);
                }
            }
            $('#fuel_num').text(this.fuel);
        };
        this.init = function () {
            GameVar.append(this.model);
            this.w = this.model.width();
            this.h = this.model.height();
            this.model.css('left', this.x);
            this.model.css('top', this.y);
            this.GIF = GIF(this);
            this.Movex = function (f) {
                this.x += (this.move * f);
                this.x = this.x < 0 ? 0 : this.x;
                this.x = this.x + this.w > GameW ? GameW - this.w : this.x;
                this.model.css('left', this.x + 'px');
            };
            this.Movey = function (f) {
                this.y += (f * this.move);
                this.y = this.y < 0 ? 0 : this.y;
                this.y = this.y + this.h > GameH ? GameH - this.h : this.y;
                this.model.css('top', this.y + 'px');

            };
            this.Clear = function () {
                this.model.remove();
                clearInterval(this.GIF);
            };
            this.fractionFuntion(0);
            this.fuelFunction(0);
        };
        this.init();
    }
    let PlayerObj = new Player(0, 0, Player_model1, 5, 4, 0);
    let PlayerLeft = 0;
    let PlayerRight = 0;
    let PlayerTop = 0;
    let PlayerBottom = 0;
    $(' html').keydown(function (a) {
        switch (a.keyCode) {
            case 37:
                PlayerLeft = -1;
                break;
            case 38:
                PlayerTop = -1;
                break;
            case 39:
                PlayerRight = 1;
                break;
            case 40:
                PlayerBottom = 1;
                break;
            case 32:
                new Bullet(
                    PlayerObj.x + PlayerObj.w,
                    PlayerObj.y + PlayerObj.h / 2,
                    Bullet_model1,
                    PlayerObj.move + 20,
                    1, 1);
                break;
            case 80:
                NOSet(SetControl);
                SetControl = SetControl ? 0 : 1;
                break;
        }
    });
    $(' html').keyup(function (a) {
        switch (a.keyCode) {
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
            case 32:
                break;
        }
    });
    let BulletArray = Array();
    function Bullet(_x, _y, _model, _move, _party, _direction) {
        this.x = _x;
        this.y = _y;
        this.model = $(_model);
        this.move = _move;
        this.party = _party;
        this.direction = _direction;
        this.init = function () {
            GameVar.append(this.model);
            BulletArray.push(this);
            this.w = this.model.width();
            this.h = this.model.height();
            this.model.css('left', this.x);
            this.model.css('top', this.y);
            this.Movex = function () {
                this.x += (this.move * this.direction);
                this.model.css('left', this.x + 'px');
                if (this.party) {
                    length = EnyArray.length;
                    for (let i = 0; i < length; i++) {
                        if (Boom(this, EnyArray[i])) {
                            EnyArray[i].HP -= 1;
                            this.x = 999;
                        }
                    }
                } else {
                    if (Boom(this, PlayerObj)) {
                        PlayerObj.fuelFunction(-15);
                        this.x = -100;
                    }
                }
            };
            this.Clear = function () {
                this.model.remove();
                clearInterval(this.GIF);
            }
        };
        this.init();
    }
    let EnyArray = Array();
    SetTime(function () {
        let Enyobj = new Eny(GameW,
            (GameH - 100) * Math.random(),
            Eny_model1,
            Math.floor(Math.random() * 10) + 5,
            4,
            1,
            -15, 10, 1);
        EnyArray.push(Enyobj);
    }, 1000);
    SetTime(function () {
        let Enyobj = new Eny(GameW,
            (GameH - 100) * Math.random(),
            Eny_model2,
            Math.floor(Math.random() * 10) + 5,
            4,
            1,
            -15, -10, 0);
        EnyArray.push(Enyobj);
    }, 3300);
    SetTime(function () {
        let Enyobj = new Eny(GameW,
            (GameH - 100) * Math.random(),
            Eny_model3,
            Math.floor(Math.random() * 10) + 5,
            0,
            2,
            -15, 10, 0);
        EnyArray.push(Enyobj);
    }, 1000);
    SetTime(function () {
        let fuel = new Eny((GameW - 100) * Math.random(),
            -100,
            Fuelmodel,
            5,
            0,
            0, 15);
        FuelArray.push(fuel);
    }, 2000);
    let FuelArray = Array();
    let Fuelmodel = `<div class="fuel_Class" style="background-image: url('images/ran.png')"></div>`;
    SetTime(function () {
        let length = FuelArray.length;
        for (let i = 0; i < length; i++) {
            FuelArray[i].Movey(1);
            FuelArray[i].Movex(0.3);
            if (
                Boom(FuelArray[i], PlayerObj)
            ) {
                FuelArray[i].y = 999;
                PlayerObj.fuelFunction(FuelArray[i].fuel)
            }
            if (FuelArray[i].y > GameH) {
                FuelArray[i].Clear();
                FuelArray.splice(i, 1);
                length = FuelArray.length;
            }
        }
    }, 30);
    SetTime(function () {
        let length = EnyArray.length;
        for (let i = 0; i < length; i++) {
            EnyArray[i].Movex(-1);
            if (Math.floor(Math.random() * 100) < 2 && EnyArray[i].faya) {
                new Bullet(
                    EnyArray[i].x,
                    EnyArray[i].y + EnyArray[i].h / 2,
                    Bullet_model1,
                    EnyArray[i].move + 10,
                    0, -1);
            }
            if (
                Boom(EnyArray[i], PlayerObj)
            ) {
                EnyArray[i].HP = 0;
                PlayerObj.fuelFunction(EnyArray[i].fuel)
            }
            if (EnyArray[i].HP <= 0) {
                PlayerObj.fractionFuntion(EnyArray[i].integral);
                Fall(EnyArray[i]);
                EnyArray.splice(i, 1);
                length = EnyArray.length;
            } else if (EnyArray[i].x < -100) {
                EnyArray[i].Clear();
                EnyArray.splice(i, 1);
                length = EnyArray.length;
            }
        }
    }, 30);
    SetTime(function () {
        if (PlayerLeft) {
            PlayerObj.Movex(PlayerLeft);
        }
        if (PlayerRight) {
            PlayerObj.Movex(PlayerRight);
        }
        if (PlayerTop) {
            PlayerObj.Movey(PlayerTop);
        }
        if (PlayerBottom) {
            PlayerObj.Movey(PlayerBottom);
        }
    }, 10);
    SetTime(function () {
        let length = BulletArray.length;
        for (let i = 0; i < length; i++) {
            BulletArray[i].Movex();
            if (BulletArray[i].x > GameW || BulletArray[i].x < -20) {
                BulletArray[i].Clear();
                BulletArray.splice(i, 1);
                length = BulletArray.length;
            }
        }
    }, 30);
    SetTime(function () {
        PlayerObj.fuelFunction(-1);
    }, 1000);
    let FallArray = Array();
    function Fall(obj) {
        obj.model.css('transform', 'rotate(-35deg)');
        obj.model.animate({opacity: 0.3}, 1000);
        obj.model.css('filter', '');
        obj.move = 10;
        clearInterval(obj.GIF);
        FallArray.push(obj);
    }
    SetTime(function () {
        let length = FallArray.length;
        for (let i = 0; i < length; i++) {
            FallArray[i].Movex(-1);
            FallArray[i].Movey(1);
            if (FallArray[i].y > 900 || FallArray[i].x < -100) {
                FallArray[i].Clear();
                FallArray.splice(i, 1);
                length = FallArray.length;
            }
        }
    }, 50);
    SetTime(function () {
        let FuelMax = PlayerObj.FuelMax * 0.7;
        let fuel = FuelMax - PlayerObj.fuel;
        fuel /= FuelMax;
        $('#Game_Filter').css('opacity', fuel);
    }, 30);
    function NOSet(but) {
        length = SetArray.length;
        if (but) {
            for (let i = 0; i < length; i++) {
                clearInterval(SetArray[i][0]);
            }
        } else {
            for (let i = 0; i < length; i++) {
                SetArray[i][0]=setInterval(SetArray[i][2], SetArray[i][1]);
            }
        }
    }
    function SetTime(_function, _time) {
        let Set = setInterval(_function, _time);
        SetArray.push([Set, _time,_function]);
    }
}