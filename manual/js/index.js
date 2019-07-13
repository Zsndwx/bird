(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth == 640) {
                docEl.style.fontSize = '100px';
            } else if (clientWidth > 640) {
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    recalc();
})(document, window);

$(function(){
    var menu = $('header > .nav > .menu');
    var sqare = menu.children('a');
    var menuItem = $('.menu-items', menu);
    var enable = true;
    sqare.on('click',function(){
        if(enable){
            enable = false;
            menuItem.slideDown(300);
        }else{
            enable = true;
            menuItem.slideUp(300);
        }
    });
});