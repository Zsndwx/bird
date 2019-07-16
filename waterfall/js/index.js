var data = [{
    "src": "img/1.png",
    "title": "第一怪竹筒当烟袋"
}, {
    "src": "img/2.png",
    "title": "第二怪草帽当锅盖"
}, {
    "src": "img/3.png",
    "title": "第三怪这边下雨那边晒"
}, {
    "src": "img/4.png",
    "title": "第四怪四季服装同穿戴"
}, {
    "src": "img/5.png",
    "title": "第五怪火车没有汽车快"
}, {
    "src": "img/6.png",
    "title": "第六怪火车不通国内通国外"
}, {
    "src": "img/7.png",
    "title": "第七怪老奶爬山比猴快"
}, {
    "src": "img/8.png",
    "title": "第八怪鞋子后面多一块"
}, {
    "src": "img/9.png",
    "title": "第九怪脚趾四季露在外"
}, {
    "src": "img/10.png",
    "title": "第十怪鸡蛋拴着卖"
}, {
    "src": "img/11.png",
    "title": "第十一怪粑粑叫饵块"
}, {
    "src": "img/12.png",
    "title": "第十二怪花生蚕豆数着卖"
}, {
    "src": "img/13.png",
    "title": "第十三怪三个蚊子一盘菜"
}, {
    "src": "img/14.png",
    "title": "第十四怪四个老鼠一麻袋"
}, {
    "src": "img/15.png",
    "title": "第十五怪树上松毛扭着卖"
}, {
    "src": "img/16.png",
    "title": "第十六怪姑娘叫老太"
}, {
    "src": "img/17.png",
    "title": "第十七怪小和尚可以谈恋爱"
}, {
    "src": "img/18.png",
    "title": "第十八怪背着娃娃谈恋爱"
}];

/**
 * 加载瀑布
 * @param {document} wrap 瀑布容器
 * @param {object} boxs 瀑布容器里的盒子
 */
var waterFall = function (wrap, boxs) {
    var windowWidth = document.documentElement.clientWidth;
    var boxWidth = boxs.eq(0).width() + 40;
    var colsNum = Math.floor(windowWidth / boxWidth);
    /* 设置wrap宽度 */
    wrap.width(colsNum * boxWidth);
    /* 声明一个盒子高度数组 */
    var bHeightArray = new Array();
    for (var i = 0; i < boxs.length; i++) {
        if (i < colsNum) {
            bHeightArray[i] = boxs.eq(i).height() + 40;
        } else {
            var minHeight = Math.min.apply(null, bHeightArray);
            var minIndex = bHeightArray.indexOf(minHeight);
            changeBox(boxs.eq(i), minHeight, boxs.eq(minIndex).position().left, i);
            bHeightArray[minIndex] += boxs.eq(i).height() + 40;
        }
        boxs.eq(i).hover(function(e){
            $(this).stop().animate({'opacity':'0.5'},500);
        },function(e){
            $(this).stop().animate({'opacity':'1'},500);
        }).click(function(e){
            // location.href = 'http://www.imooc.com';
            window.open("http://www.imooc.com");
        });
    }
}

//记录盒子数量（索引）,追加图片盒子时不在重复设置已设置过盒子的css样式
var boxNum = 0;
var changeBox = function (box, top, left, index) {
    if (boxNum >= index) {
        return false;
    } else {
        box.css({
            'position': 'absolute',
            'top': top,
            'left': left,
            'opacity': '0'
        }).stop().animate({
            'opacity': '1'
        }, 1000);
    }
    boxNum = index;
}

/**
 * 判断 当滚动条滚动到底部时 返回true
 * @param {document} wrap 瀑布容器
 */
var getCheck = function (wrap) {
    var boxs = wrap.children('div');
    var lastBox = boxs.eq(boxs.length - 1);

    /* 获取最后一个盒子的top与盒子高度 */
    var lastBoxHeight = lastBox.height();//lastBox[0].offsetHeight + 20;
    var lastBoxTop = lastBox.position().top;//lastBox[0].offsetTop + 10;
    var lastColHeight = lastBoxHeight + lastBoxTop;

    /* 获取滚动条高度 */
    var scrollHeight = $(window).scrollTop();//document.documentElement.scrollTop;
    var documentHeight = $(window).height();//window.innerHeight;
    var scrollDomHei = scrollHeight + documentHeight;

    return lastColHeight <= scrollDomHei ? true : false;
}

/**
 * 追加图片盒子
 * @param {document} wrap 瀑布容器
 */
var appendPic = function (wrap) {
    if(getCheck(wrap)){
        for (var i in data) {
            wrap.append("<div><img src=" + data[i].src + "><a href=\"http://www.imooc.com/\" target=\"_blank\">" + data[i].title + "</a></div>")
        }
    }else{
        return false;
    }
    waterFall(wrap, wrap.children('div'));
}

$(document).ready(function () {
    var wrap = $('#wrap'),
        boxs = wrap.children('div');
    waterFall(wrap, boxs);

    /* 设置前置条件 最后一个盒子position的top加上盒子本身的高度Heightd的和 作为触发滚动事件的条件 */
    $(this).scroll(function () {
        /* 追加图片盒子 */
        appendPic(wrap);
    });

});