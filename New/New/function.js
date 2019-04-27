let GIFSetStop = 1;
let EnyArray=[];
let SetArray=[];
let BulletArray=[];
let FallArray=[];
let FuelArray=[];
/**
 * @return {number}
 */
function GIFFunction(obj) {
    let objw=obj.w;
    let GIF = 0;
    return setInterval(function () {
        if (GIFSetStop) {
            obj.Model.css("background-position", GIF * objw);
            GIF = GIF >= obj.GIFMax ? 0 : ++GIF;
        }
    }, 80);
}
function Set(_Function,_Time) {
    SetArray.push([setInterval(_Function,_Time),_Function,_Time]);
}
/**
 * @return {boolean}
 */
function BOOM(obja,objb) {
    let objar=obja.x+obja.w;
    let objab=obja.y+obja.h;
    let objbr=objb.x+objb.w;
    let objbb=objb.y+objb.h;
    return obja.x<objbr&& objar>objb.x&& obja.y<objbb&&objab>objb.y;
}
function Fall(obja) {
    obja.Model.css('transform','-50deg').css('opacity',0.3);
    clearInterval(obja.GIFSet);
    FallArray.push(obja);
}