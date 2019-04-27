function PlayGame() {
    $('#PlayBut').attr('onclick', '');
    $('#GamePlay').animate({height: 0}, function () {
        $('#GamePlay').css('display', 'none');
        Game();
    });
}
PlayGame();
function Game() {
    let GameObj = $('#Game');
    let GameW = GameObj.width();
    let GameH = GameObj.height();
    let EnyModel1 = "<div class=\"Eny_Class poab\" style=\"background-image: url('images/ship_1.png')\"></div>";
    let FriendModel = "<div class=\"Eny_Class poab\" style=\"background-image: url('images/you.png')\"></div>";
    let StoneModel = "<div class='Eny_Class poab Stone_Class' style=\"background-image: url('images/aestroid_gray.png')\"></div>";
    let PlayerModel = "<div class=\"Player_Class poab\" style=\"background-image: url('images/Player.png')\"></div>";
    let BulletModel1 = "<div class=\"poab Bullet_Class\"></div>";
    let TipsModel = "<div class=\"Tips_Class\"></div>";
    let FuelModel = "<div class=\"Fuel_Class\" style=\"background-image: url('images/ran.png')\"></div>";
    let PlayerObj = new Init(0, GameH / 2, PlayerModel, 4, 5, 15, 0, 0);
    PlayerObj.FuelFunction(0, 0);

    function Init(_x, _y, _model, _GIFMAX, _speed, _fuel, _Fraction, _Bullet = 0, _life = 0) {
        this.Model = $(_model);
        this.x = _x;
        this.y = _y;
        this.GIFMax = _GIFMAX;
        this.Speed = _speed;
        this.Bullet = _Bullet;
        this.Fuel = _fuel;
        this.FuelMax = 30;
        this.life = _life;
        this.Fraction = _Fraction;
        this.init = function () {
            GameObj.append(this.Model);
            this.Model.css('left', this.x).css('top', this.y);
            this.w = this.Model.width();
            this.h = this.Model.height();
            this.GIFSet = GIFFunction(this);
            this.Movex = function (f, Min = -1, Max = -1) {
                this.x += this.Speed * f;
                if (Max !== Min) {
                    this.x = this.x + this.w > Max ? Max - this.w : this.x;
                    this.x = this.x < Min ? Min : this.x;
                }
                this.Model.css('left', this.x);
            };
            this.Movey = function (f, Min = -1, Max = -1) {
                this.y += this.Speed * f;
                if (Max !== Min) {
                    this.y = this.y + this.h > Max ? Max - this.h : this.y;
                    this.y = this.y < Min ? Min : this.y;
                }
                this.Model.css('top', this.y);
            };
            this.Clear = function () {
                clearInterval(this.GIFSet);
                this.Model.remove();
            };
            this.FractionFunction = function (s) {
                console.log(s);
                this.Fraction += s;
                if (s) {
                    Tips(s,'green');
                }
                $('#Fraction').text(this.Fraction);
            };
            this.FuelFunction = function (s, show = 1) {
                this.Fuel += s;
                this.Fuel = this.Fuel < 0 ? 0 : this.Fuel;
                this.Fuel = this.Fuel > 30 ? 30 : this.Fuel;
                $('#Fuel_text').text(this.Fuel);
                GameRed();
                if (s && show) {
                    Tips(s, 'red');
                }
                $('#Fuel_main').css('width', `${(this.Fuel / this.FuelMax) * 100}%`)
            };
        };
        this.init();
    }

    let PlayerLeft, PlayerRight, PlayerTop, PlayBottom = 0;
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
                PlayBottom = 1;
                break;
            case 32:
                BulletArray.push(new Init(PlayerObj.x + PlayerObj.w, PlayerObj.y + PlayerObj.h / 2,
                    BulletModel1, 0, PlayerObj.Speed + 20, 0, 0, 1));
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
                PlayBottom = 0;
                break;
        }
    });

    function Tips(data, css) {
        let Model = $(TipsModel);
        let y = PlayerObj.y;
        let x = PlayerObj.x + Math.floor(Math.random() * 70) - 35;
        GameObj.append(Model);
        Model.text(data);
        Model.css('left', x).css('top', y).css('background-color', css);
        Model.animate({top: `${y - 50}px`, opacity: 0}, 800, function () {
            Model.remove();
        });
    }

    function GameRed() {
        let Op = PlayerObj.Fuel / PlayerObj.FuelMax;
        $('#GameRed').css('opacity', 1 - Op);
    }

    /**
     * Set
     * */
    Set(function () {
        EnyArray.push(new Init(GameW, (GameH - 100) * Math.random(), EnyModel1, 4, 10, 0, 10, 1, 1));
    }, 1200);
    Set(function () {
        EnyArray.push(new Init(GameW, (GameH - 100) * Math.random(), FriendModel, 4, 10, 0, 10, 0, 1));
    }, 4300);
    Set(function () {
        EnyArray.push(new Init(GameW, (GameH - 100) * Math.random(), StoneModel, 0, 10, 0, 10, 0, 2));
    }, 2800);
    Set(function () {
        for (let i = 0; i < EnyArray.length; i++) {
            let obj = EnyArray[i];
            obj.Movex(-1);
            if (Math.floor(Math.random() * 100) < 2 && obj.Bullet) {
                BulletArray.push(new Init(
                    obj.x,
                    obj.y + obj.h / 2,
                    BulletModel1,
                    0, obj.Speed + 10, -15, 0, -1));
            }
            if (BOOM(obj, PlayerObj)) {
                Fall(obj);
                EnyArray.splice(i, 1);
            }
            if (obj.x < -100) {
                obj.Clear();
                EnyArray.splice(i, 1)
            }
        }
    }, 30);
    Set(function () {
        if (PlayerLeft) {
            PlayerObj.Movex(-1, 0, GameW);
        }
        if (PlayerRight) {
            PlayerObj.Movex(1, 0, GameW);
        }
        if (PlayerTop) {
            PlayerObj.Movey(-1, 0, GameH);
        }
        if (PlayBottom) {
            PlayerObj.Movey(1, 0, GameH);
        }
    }, 10);
    Set(function () {
        for (let i = 0; i < BulletArray.length; i++) {
            let obj = BulletArray[i];
            obj.Movex(obj.Bullet);
            if (obj.Bullet === 1) {
                for (let eny = 0; eny < EnyArray.length; eny++) {

                    let EnyObj = EnyArray[eny];
                    if (BOOM(EnyObj, obj)) {
                        EnyObj.life -= 1;
                        obj.x = GameW + 100;
                    }
                    if (EnyObj.life <= 0) {
                        Fall(EnyObj);
                        PlayerObj.FractionFunction(EnyObj.Fraction);
                        EnyArray.splice(eny, 1);
                    }
                }
            } else {
                if (
                    BOOM(PlayerObj, obj)
                ) {
                    obj.x = -999;
                    PlayerObj.FuelFunction(-15);
                }
            }
            if (obj.x < -100 || obj.x > GameW) {
                obj.Clear();
                BulletArray.splice(i, 1);
            }
        }
    }, 30);
    Set(function () {
        for (let i = 0; i < FallArray.length; i++) {
            FallArray[i].Movex(-0.5);
            FallArray[i].Movey(0.5);
            if (FallArray[i].x < -100 || FallArray[i].y > GameH) {
                FallArray[i].Clear();
                FallArray.splice(i, 1);
            }
        }
    }, 30);
    Set(function () {
        PlayerObj.FuelFunction(-1);
    }, 1000);
    Set(function () {
        FuelArray.push(new Init(GameW * Math.random(), -100, FuelModel, 0, 10, 15, 0));
    }, 1000);
    Set(function () {
            for (let i = 0; i < FuelArray.length; i++) {
                let obj = FuelArray[i];
                obj.Movey(1);
                obj.Movex(-0.5);
                if (BOOM(obj, PlayerObj)) {
                    PlayerObj.FuelFunction(obj.Fuel);
                    obj.y = 999;
                }
                if (obj.y > GameH + 100) {
                    obj.Clear();
                    FuelArray.splice(i, 1);
                }
            }
        }, 30
    );
}