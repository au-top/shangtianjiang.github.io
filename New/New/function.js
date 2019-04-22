let GIFSetStop = 1;
let EnyArray=[];
let SetArray=[];
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