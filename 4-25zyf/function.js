let EnyArray=[];
let SetArray=[];
let BulletArray=[];
let FallArray=[];
let PlayerArray=[];
let FuelArray=[];
let GIFSTOP=1;

/**
 * @return {number}
 */
function GIF(obj) {
    let w=obj.w;
    let gif=0;
   return setInterval(function () {
        obj.Model.css('background-position',gif*w);
        gif=gif>=obj.GIFMax?0:++gif;
        },100);
}

/**
 * @return {boolean}
 */
function Boom(obja,objb) {
    let objar=obja.x+obja.w;
    let objab=obja.y+obja.h;
    let objbr=objb.x+objb.w;
    let objbb=objb.y+objb.h;
    return obja.x<objbr &&
        objar>objb.x&&
        objab>objb.y&&
        obja.y<objbb
}

function Fall(obj) {
    FallArray.push(obj);
    obj.Array=FallArray;
    obj.speed=5;
    clearInterval(obj.GIFSet);
    obj.Model.css('transform','rotate(-50deg)');
    obj.Model.animate({opacity:'0.3'},1000);
}