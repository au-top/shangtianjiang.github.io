GifStop=1;
/**
 * @return {number}
 */
function GIF(obj) {
    let w = obj.w;
    let Max = obj.GIFMax;
    let Num = 0;
    return setInterval(
        function () {
            if (GifStop) {
                obj.model.css('background-position', Num * w);
                Num = Num === Max ? 0 : ++Num;
            }
        }, 100
    )
}
let SetArray = [];
let EnyArray = [];
let BulArray = [];
let FallArray = [];
let FuelArray = [];
/**
 * @return {number}
 */
function Set(_function, _Time) {
    let Set = setInterval(
        _function,
        _Time
    );
    SetArray.push([Set, _function, _Time]);
    return Set;
}
/**
 * @return {boolean}
 */
function Boom(obja, objb) {
    let objar = obja.x + obja.w;
    let objab = obja.y + obja.h;
    let objbr = objb.x + objb.w;
    let objbb = objb.y + objb.h;
    return objar > objb.x &&
        obja.x < objbr &&
        objab > objb.y &&
        obja.y < objbb;
}
function Fall(obj) {
    obj.model.css('opacity', 0.5);
    obj.speed = 8;
    clearInterval(obj.GIFSet);
    FallArray.push(obj);
}
let StopP=1;
function Stop() {

    if (StopP) {
        let length=SetArray.length;
        for (let i=0;i<length;i++) {
           clearInterval(SetArray[i][0]);
        }
        GifStop=0;
        StopP=0
    }else{
        let length=SetArray.length;
        for (let i=0;i<length;i++){
            SetArray[i][0]=setInterval(SetArray[i][1],SetArray[i][2])
        }
        GifStop=1;
        StopP=1
    }
}