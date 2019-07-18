/**
 * 简写 封装 getElementById 方法，通过id获取Element元素
 * @param {string} id 元素的id
 */
function byId(id) {
    return typeof id === "string" ? document.getElementById(id) : id;
}

window.onload = function () {
    var index = 0,
        menu = byId("menu"),
        titMenuItems = menu.getElementsByClassName("menu-title")[0].getElementsByTagName("li"),
        len = titMenuItems.length,
        bannerItems = menu.getElementsByClassName('banner-pic'),
        menuBanner = menu.getElementsByClassName('menuBanner')[0],
        timer = null;


    /* banner广告区 鼠标滑出时事件 */
    menu.onmouseout = function () {
        timer = setInterval(function () {
            index++;
            if (index >= len) index = 0;
            console.log(index);
            changeMenu();
        },3000);
    }

    /* 自动启动广告区鼠标滑出时事件 */
    menu.onmouseout();

    /* banner广告区 鼠标停留时事件 */
    menu.onmouseover = function(){
        clearInterval(timer);
    }

    /* 遍历菜单标题栏 鼠标点击菜单标题栏时事件 */
    for (var i = 0; i < len; i++) {
        titMenuItems[i].setAttribute("data-index", "item" + i);
        titMenuItems[i].onclick = function () {
            // alert(this.getAttribute('data-index'));
            index = parseInt(this.getAttribute('data-index').replace(/\D+/i, ''));
            changeMenu();
        }
    }

    /**
     * 菜单栏与banner图片的切换
     */
    function changeMenu() {
        for (var i = 0; i < len; i++) {
            titMenuItems[i].style.background = 'none';
            bannerItems[i].style.display = 'none';
        }
        titMenuItems[index].style.backgroundColor = 'yellow';
        bannerItems[index].style.display = 'block';
    }
}