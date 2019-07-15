/**
 * 设置顶部导航标题样式
 * @param {*} navTitle 标题菜单项
 * @param {*} dropList 下拉列表项
 */
var headerNavTitleChange = function (navTitle, dropList) {
    var currentDom,
        index = 0,
        listItem;
    for (var i = 0; i < navTitle.length; i++) {
        navTitle[i].setAttribute('data-index', 'tit' + i);
        navTitle.eq(i).hover(function (e) {
            e.stopPropagation();
            /* 鼠标停留在顶部导航标题时事件 */
            currentDom = $(this);
            currentDom.css('backgroundColor', 'white').children('a').css('color', 'red');
            currentDom.children('img').attr('src', 'img/icon/24.png').css('top', '4px');
            /* 获取当前选中项的索引 */
            index = parseInt(currentDom[0].getAttribute('data-index').replace(/\D+/i, ''));
            listItem = dropList.eq(index);
            /* 显示下拉列表 */
            listItem.stop().slideDown(100);
            /* 鼠标停留或离开下拉列表时事件 */
            var items = $(this).find('li');
            for (var j = 0; j < items.length; j++) {
                items.eq(j).hover(function () {
                    $(this).css('backgroundColor', '#cdd0d4');
                }, function () {
                    $(this).css('backgroundColor', '#fff');
                });
            }
        }, function (e) {
            e.stopPropagation();
            /* 鼠标离开顶部导航标题时事件 */
            currentDom.css('backgroundColor', '#f3f5f7').children('a').css('color', '#000');
            currentDom.children('img').attr('src', 'img/icon/22.png').css('top', '3px');
            /* 隐藏下拉列表 */
            listItem.stop().slideUp(100);
        });
    }
}

/**
 * 鼠标悬停在购物车上时事件
 * @param {*} shopCar 购物车元素
 */
var shoppingCarHover = function (shopCar) {
    var car,
        carPic,
        carTxt,
        commodityList,
        item;
    shopCar.eq(0).hover(function (e) {
        e.stopPropagation();
        /* 设置logo区 购物车内容样式 */
        car = $(this);
        carPic = car.css('backgroundColor', 'white').children('img');
        carPic.eq(0).attr('src', 'img/icon/25.png');
        carPic.eq(1).attr('src', 'img/icon/21.png');
        carTxt = car.children('span').css('color', 'red');
        /* 显示购物车的下拉列表 并设置样式 */
        commodityList = car.children('.commodityList').stop().slideDown(100);
        var commodityItems = commodityList.children('.box-commodity').find('.commodity-item');
        /* 购物车下拉列表选中项 样式设置 */
        for (var i = 0; i < commodityItems.length; i++) {
            commodityItems.eq(i).hover(function (e) {
                e.stopPropagation();
                item = $(this).css('backgroundColor', '#F4F4F8');
                /* 停留与离开字体 颜色改变 */
                var itemTxt = item.children('.introduce').eq(0).children('span').eq(0);
                itemTxt.hover(function (e) {
                    e.stopPropagation();
                    itemTxt.css('color', 'red');
                }, function (e) {
                    e.stopPropagation();
                    itemTxt.css('color', 'black');
                });
            }, function (e) {
                e.stopPropagation();
                item.css('backgroundColor', '#FFF');
            });
        }
    }, function (e) {
        e.stopPropagation();
        /* 设置logo区 购物车内容样式 */
        car.css('backgroundColor', 'red');
        carPic.eq(0).attr('src', 'img/icon/26.png');
        carPic.eq(1).attr('src', 'img/icon/23.png');
        carTxt.css('color', '#fff');
        /* 隐藏购物车的下拉列表 */
        commodityList.stop().slideUp(100);
    });
}

/**
 * banner区 广告图片 的切换样式设置
 * @param {*} bannerPic banner区广告图片元素（class 为 banner-pic）
 */
var bannerPicHideAndShow = function (bannerPic) {
    /* banner广告区 图片元素 */
    var picImg = bannerPic.children('.box-pic').find('.picItem'),
        timer = null,
        index = 0,
        len = picImg.length;
    /* 上一张、下一张 按钮元素 圆点按钮元素 */
    var prev = bannerPic.children('.prev'),
        next = bannerPic.children('.next'),
        circles = bannerPic.children('.circle').children('span');
    /* 图片的显示 与 隐藏 */
    function changeImg() {
        for (var i = 0; i < len; i++) {
            picImg[i].className = 'picItem';
            circles[i].className = '';
        }
        picImg[index].className = 'picItem slide-active';
        circles[index].className = 'active';
    }
    /* 鼠标 离开 停留 广告区 图片时 事件 */
    bannerPic.hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(function () {
            index++;
            if (index >= len) index = 0;
            changeImg();
        }, 3000);
    });
    /* 自动触发鼠标离开 广告图片 事件 */
    bannerPic.mouseleave();
    /* 鼠标点击 上一张 下一张 按钮时 事件 */
    prev.click(function () {
        index--;
        if (index < 0) index = len - 1;
        changeImg();
    });
    next.click(function () {
        index++;
        if (index >= len) index = 0;
        changeImg();
    });
    /* 圆点 按钮 点击事件 */
    for (var i = 0; i < len; i++) {
        circles.eq(i).attr('data-index', 'circle' + i);
        circles.eq(i).click(function () {
            index = parseInt(this.getAttribute('data-index').replace(/\D+/i, ''));
            changeImg();
        });
    }
}

/**
 * banner区 菜单样式设置
 * @param {*} menuItems banner区 主菜单元素
 * @param {*} boxMenu banner区 二级菜单背景框
 * @param {*} subMenus banner区 二级菜单元素
 */
var changeMenuAndSubmenu = function (menuItems, boxMenu, subMenus) {
    var len = menuItems.length,
        index = 0;
    /**
     * banner区 二级菜单的显示与隐藏
     * @param {boolean} ishide 布尔值，是显示，还是隐藏banner区二级菜单
     */
    function changeSubMenu(ishide) {
        for (var i = 0; i < len; i++) {
            subMenus[i].className = 'sub-row';
        }
        if (ishide) {
            subMenus[index].className = 'sub-row sub-menu-active';
            boxMenu[0].className = 'sub-menu';
            /* 主菜单 选中项 背景色 */
            menuItems.eq(index).css({
                'backgroundColor': '#fff',
                'color': 'red'
            });
        } else {
            boxMenu[0].className = 'sub-menu box-menu-hide';
            menuItems.eq(index).css({
                'backgroundColor': 'red',
                'color': '#fff'
            });
        }
    }
    /* banner区 鼠标在 主菜单 停留、离开 事件 */
    for (var i = 0; i < len; i++) {
        menuItems.eq(i).attr('data-menu-index', 'menuItem' + i);
        menuItems.eq(i).hover(function () {
            index = parseInt(this.getAttribute('data-menu-index').replace(/\D+/i, ''));
            changeSubMenu(true);
        }, function () {
            changeSubMenu(false);
        });
    }
    /* banner区 鼠标在 二级菜单区 停留与离开 事件 */
    boxMenu.hover(function () {
        changeSubMenu(true);
    }, function () {
        changeSubMenu(false);
    });
}

/**
 * 楼层区 元素 样式设置
 * @param {*} floor 楼层区 元素
 */
var mouseMoveFloor = function (floor) {
    var boxFloors = [floor.children("[data-floor='1F']"), floor.children("[data-floor='2F']")],
        /* 楼层区 右侧 标题 元素 */
        tits = [boxFloors[0].children('.floor-top').find('li').find('a'),
            boxFloors[1].children('.floor-top').find('li').find('a')
        ],
        /* 楼层区 右侧 下面 三角图片 元素 */
        triangles = [boxFloors[0].children('.floor-top').find('img'),
            boxFloors[1].children('.floor-top').find('img')
        ],
        /* 楼层区 内容容器 元素 */
        floorContents = [boxFloors[0].children('.floor-bottom').children('.floorBox'),
            boxFloors[1].children('.floor-bottom').children('.floorBox')
        ],
        /* 楼层区 内容 元素 */
        floorAqare = [floorContents[0].children('.content-row').find('.content-cell'),
            floorContents[1].children('.content-row').find('.content-cell')
        ],
        index = 0,
        len = tits[0].length;
    /**
     * 对某一楼层的 右侧小标题和内容 一起随之切换
     * @param {number} floorIndex 楼层区 楼层 标题行 索引 如 1F、2F 楼等...
     */
    function changeFloor(floorIndex) {
        for (var i = 0; i < len; i++) {
            tits[floorIndex].eq(i).removeClass('floor-tit-active');
            triangles[floorIndex].eq(i).removeClass('img-active');
            floorContents[floorIndex].eq(i).removeClass('floorBox-active');
        }
        // 楼层区 右侧标题切换
        tits[floorIndex].eq(index).addClass('floor-tit-active');
        // 楼层区 右侧三角切换
        triangles[floorIndex].eq(index).addClass('img-active');
        // 楼层区 内容随标题切换
        floorContents[floorIndex].eq(index).addClass('floorBox-active');
    }
    /* 楼层区 标题添加 自定义属性 */
    for (var k = 0; k < boxFloors.length; k++) {
        for (var i = 0; i < len; i++) {
            tits[k].eq(i).attr('data-index', 'tit' + i);
        }
    }
    /**
     * 楼层区 标题行 与 内容行 样式设置
     * @param {number} floorBoxindex 楼层内容 容器索引
     */
    function floorBoxCycle(floorBoxindex) {
        /* 楼层区 标题与内容 切换 */
        tits[floorBoxindex].mouseenter(function () {
            index = parseInt(this.getAttribute('data-index').replace(/\D+/i, ''));
            changeFloor(floorBoxindex);
        });
        /* 楼层区 内容样式选中状态 切换 */
        for (var i = 0; i < floorAqare[0].length; i++) {
            floorAqare[floorBoxindex].eq(i).hover(function () {
                $(this).addClass('cell-active');
            }, function () {
                $(this).removeClass('cell-active');
            });
        }
    }
    floorBoxCycle(0);
    floorBoxCycle(1);
}

/**
 * 设置右侧 固定 导航栏 样式
 * @param {*} flxedNav 右侧导航元素
 */
var changeFixedNav = function (flxedNav) {
    // console.log(flxedNav);
    var index = 0,
        len = flxedNav.length;
    /**
     * 右侧 固定 导航栏 鼠标停留 样式设置
     * @param {boolean} ishide 显示 或 隐藏
     */
    function mouseEnterFixedNav(ishide) {
        if (ishide) {
            flxedNav.eq(index).css('backgroundColor','#71777d');
            flxedNav.eq(index).children('.nav-item').children('span').addClass('nav-placeholder');
            // console.log(ss[0]);
        }else{
            flxedNav.eq(index).css('backgroundColor','#b7bbbf');
            flxedNav.eq(index).children('.nav-item').children('span').removeClass('nav-placeholder');
        }
    }
    // 绑定鼠标停留 事件
    for (var i = 0; i < len; i++) {
        flxedNav.eq(i).attr('data-fixed-index', 'fixedNav' + i);
        // console.log(flxedNav.eq(i).attr('data-fixed-index'));
        flxedNav.eq(i).hover(function () {
            index = parseInt(this.getAttribute('data-fixed-index').replace(/\D+/i, ''));
            mouseEnterFixedNav(true);
        }, function () {
            mouseEnterFixedNav(false);
        });
    }
}

/* 页面html加载完后 事件 */
$(document).ready(function () {
    var headerNav = $('#header-nav'),
        /* 页头顶部导航 标题元素 */
        navTitle = headerNav.find('.nav-title'),
        /* 页头顶部导航 下拉列表元素  */
        dropList = headerNav.find('.drop-list'),
        /* logo区 购物车元素 */
        shopCar = $('#logo').children('.shop-car'),
        /* banner区元素 */
        banner = $('.banner'),
        /* banner广告区元素 */
        bannerPic = banner.children('.banner-pic'),
        /* banner区 二级菜单背景框 元素 */
        boxMenu = banner.children('.menu').children('.sub-menu'),
        /* banner区 主菜单 元素 */
        menuItems = banner.children('.menu').children('.menu-item'),
        /* banner区 二级菜单元素 */
        subMenus = boxMenu.children('.sub-row'),
        /* 楼层区 元素 */
        floor = $('.floor'),
        /* 最右侧 垂直居中的 导航栏 */
        flxedNav = $('.main > .flex-right-nav .nav');

    /* 鼠标停留顶部导航标题 互动 */
    headerNavTitleChange(navTitle, dropList);
    /* 鼠标停留在购物车上 下拉列表展示 */
    shoppingCarHover(shopCar);
    /* banner区 广告图片的 显示与隐藏 */
    bannerPicHideAndShow(bannerPic);
    /* 主菜单 与 二级菜单 切换显示 */
    changeMenuAndSubmenu(menuItems, boxMenu, subMenus);
    /* 楼层区 鼠标移动到楼层元素 样式变化设置 */
    mouseMoveFloor(floor);
    /* 右侧 固定定位 导航栏样式设置 */
    changeFixedNav(flxedNav);
});