let SetArray=[];
let EnyArray=[];
let BulletArray=[];
let FallArray=[];
let SetGIFStop=1;
function  Set (_function ,_time){
    SetArray.push( [setInterval(_function,_time),_function,_time])
}

/**
 * @return {boolean}
 */
function Boom(Obja,Objb) {
    let Objar=Obja.x+Obja.w;
    let Objab=Obja.y+Obja.h;
    let Objbr=Objb.x+Objb.w;
    let Objbb=Objb.y+Objb.h;
    return Obja.x<Objbr&&
        Objar>Objb.x&&
        Obja.y<Objbb&&
        Objab>Objb.y;
}
function Fall(obj) {
    console.log(obj);
    obj.Model.css('transform','rotate(-30deg)');
    obj.Model.animate({opacity:'0.4'},500);
    FallArray.push(obj);
}

/**
 * @return {number}
 */
function GIF(obj) {
    let width=obj.w;
    let GIFMax=obj.GIFMax;
    let GIF=0;
    return setInterval(function () {
            if  (SetGIFStop) {
                obj.Model.css('background-position', GIF * width + 'px');
                GIF = GIF >= GIFMax ? 0 : ++GIF;
            }
        },100)
}