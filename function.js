function GIF(obj = null) {
    let GIFs = 0;
    let GIFMax = obj.GIFMax;
    let Gw = obj.w;
    let SetId = setInterval(function () {
        obj.model.css('background-position', GIFs * Gw + 'PX');
        GIFs = GIFs >= GIFMax ? 0 : ++GIFs;
    }, 50);
    return SetId
}
function Boom(obj_a, obj_b) {
    let objar = obj_a.x + obj_a.w;
    let objab = obj_a.y + obj_a.h;
    let objbr = obj_b.x + obj_b.w;
    let objbb = obj_b.y + obj_b.h;
    if (
        objab > obj_b.y &&
        objar > obj_b.x &&
        obj_a.x < objbr &&
        obj_a.y < objbb
    ) {
        return true
    } else {
        return false
    }
}
function Tips(Class, obj, time, text) {
    let numx=50;
    numx=Math.floor(Math.random()*numx)-numx/2;
    let objx = obj.x+numx;
    let objy = obj.y;
    let model = $('<div class="Boxtips"></div>');
    text = (text < 0 ? '' : '+') + text;
    $('#Game_box').append(model);
    model.addClass(Class);
    model.css('left', objx);
    model.css('top', objy);
    model.text(text);
    model.animate({'opacity': 0, top: objy - 20 + 'px'}, time, function () {
        model.remove();
    })
}
