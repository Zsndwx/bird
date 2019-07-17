/**
 *通过id获取元素
 *
 * @param {*} id string
 * @returns
 */
function byId(id) {
    return typeof id === "string" ? document.getElementById(id) : id;
}


window.onload = function () {
    var banner = byId("banner"),
        bannerPics = banner.getElementsByClassName("banner-pic"),
        index = 0,
        len = bannerPics.length,
        timer = null,
        circles = byId("banner-circle").getElementsByTagName("span"),
        prev = byId("prev"),
        next = byId("next"),
        titItems = byId("menu-title").getElementsByClassName("menu-item"),
        menuNum = titItems.length,
        subMenu = byId("hide"),
        subItems = subMenu.getElementsByClassName("menu-sub"),
        subIndex = 0;

    /* 遍历主菜单栏，鼠标滑到主菜单栏事件 */
    for (var i = 0; i < menuNum; i++) {
        titItems[i].setAttribute("data-index", "item" + i);
        titItems[i].onmouseover = function () {
            subIndex = parseInt(this.getAttribute("data-index").replace(/\D+/i, ""));
            changeMenu('block');
            subItems[subIndex].style.display = 'block';
            this.style.backgroundColor = 'rgba(0,0,0,0.5)';
        }
    }

    /* 鼠标离开主菜单事件 */
    for (var i = 0; i < menuNum; i++) {
        titItems[i].onmouseout = function () {
            changeMenu('none');
            console.log(subIndex);
        }
    }

    /* 鼠标停留在二级菜单区时 */
    subMenu.onmouseover = function () {
        changeMenu('block');
        subItems[subIndex].style.display = 'block';
        titItems[subIndex].style.backgroundColor = 'rgba(0,0,0,0.5)';
    }

    /* 鼠标移出二级菜单区时 */
    subMenu.onmouseout = function(){
        changeMenu('none');
    }

    /**
     * 二级菜单栏背景 background 与影藏显示 display 的操作
     * @param {*string} displayCus 二级菜单栏背景框的 display 属性值，none不显示，block显示
     */
    function changeMenu(displayCus) {
        for (var i = 0; i < menuNum; i++) {
            subItems[i].style.display = 'none';
            titItems[i].style.background = 'none';
        }
        // 二级子菜单背景框显示否
        subMenu.style.display = displayCus;
    }

    /* 圆点按钮点击切换图片 */
    for (var i = 0; i < len; i++) {
        circles[i].id = "circle" + i;
        circles[i].onclick = function () {
            index = parseInt(this.id.replace(/\D+/i, ""));
            changeImg();
        }
    }

    /* 上一张 按钮点击切换图片 */
    prev.onclick = function () {
        index--;
        if (index < 0) index = len - 1;
        changeImg();
    }

    /* 下一张 按钮点击切换图片 */
    next.onclick = function () {
        index++;
        if (index >= len) index = 0;
        changeImg();
    }

    /* 鼠标滑出广告区时，广告图片自动变换 */
    banner.onmouseout = function () {
        timer = setInterval(function () {
            index++;
            if (index >= len) index = 0;
            changeImg();
        }, 3000);
    }

    /* 自动触发鼠标滑出事件 */
    banner.onmouseout();

    /* 鼠标移动到广告时 广告停止滑动 */
    banner.onmouseover = function () {
        clearInterval(timer);
    }

    /**
     * 图片的切换与隐藏，圆点按钮跟随切换
     */
    function changeImg() {
        for (var i = 0; i < len; i++) {
            bannerPics[i].style.display = 'none';
            circles[i].className = "";
        }
        bannerPics[index].style.display = 'block';
        circles[index].className = "active";
    }

}