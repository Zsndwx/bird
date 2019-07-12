window.onload = function () {
    // 页面宽度变化事件
    resizeWinW();
}

// 页面宽度变化 事件
var resizeWinW = function () {
    // header 头部区域的元素
    // 头部下拉列表
    var listDown = $('header #page-header');
    var anable = true;
    // gallery区域的元素
    // 500px宽度以下改为2列，500px-768px改为3列
    var imgItems = $('.gallery .thumbnail .img-box > img');
    var columns = $('.gallery > .container > .row > div');
    var isCol_01 = true,
        isCol_02 = true;
    window.onresize = function () {
        headerDown(listDown, anable);
        setGallery(imgItems, columns, isCol_01, isCol_02);
    }
    window.onresize();
}

/**
 * header头部下拉列表样式设置
 * @param {jQuery} 头部header区域 下拉列表元素
 * @param {boolean} 头部header区域 布尔值，用于条件范围内不重复执行
 */
var headerDown = function (listDown, anable) {
    var winW = $('body').width();
    if (winW < 768) {
        listDown.css('width', (winW - 30) + 'px');
        anable = true;
    } else {
        if (anable) {
            listDown.attr('style', '');
            anable = false;
        }
    }
}

/**
 * 获取并返回 小数点后 第三位 小数
 * @param {number} num 浮点数
 */
function rNThree(num) {
    var num1 = num.toFixed(4).toString();
    var i = num1.indexOf(".") + 1;
    return parseInt(num1.substr(i + 2, 1));
}

/**
 * 将小数点后 第三位 小数 替换为5,并返回浮点数
 * @param {number} num 浮点数
 */
function rNA(num) {
    var numStr = num.toFixed(4).toString();
    return parseFloat(numStr.slice(0, -2) + '5');
}

/**
 * 返回指定索引图片的高度 向上取整，保留两位小数（return float）
 * @param {*} imgItems list imgs 图片组
 * @param {*} i 索引
 */
function getIH(imgItems, i) {
    var h = imgItems.eq(i).height();
    return rNThree(h) < 5 ? rNA(h) : parseFloat(h.toFixed(2));
}

/**
 * 设置gallery区域的样式
 * @param {jQuery} imgItems gallery区域 所有img图片元素 items
 * @param {jQuery} columns gallery区域 items 所有列元素
 * @param {boolean} isCol_01 gallery区域 布尔值，用于条件范围内不重复执行
 * @param {boolean} isCol_02 gallery区域 布尔值，用于条件范围内不重复执行
 */
var setGallery = function (imgItems, columns, isCol_01, isCol_02) {
    // 500px宽度以下改为2列，500px-768px改为3列
    // 设置列高度相同，

    // 图片高度
    var h1, h2;

    // 页面宽度
    var winW = $('body').width();
    // 既定条件下修改列数 与 高度相同
    if (winW < 500) {
        // 小于500px宽度 2列
        isCol_02 = true;
        if (isCol_01) {
            isCol_01 = false;
            columns.each(function (i) {
                i == 0 ? columns.eq(i).removeClass('col-xs-8').addClass('col-xs-12') : columns.eq(i).removeClass('col-xs-4').addClass('col-xs-6');
            });
        }
        h2 = getIH(imgItems, 2);
        // 既定条件下修改高度
        imgItems.each(function (i) {
            i == 0 ? true : imgItems.eq(i).css('height', h2 + 'px');
        });
    } else {
        // 大于等于500px宽度 3列
        isCol_01 = true;
        if (isCol_02) {
            isCol_02 = false;
            columns.each(function (i) {
                i == 0 ? columns.eq(i).removeClass('col-xs-12').addClass('col-xs-8') : columns.eq(i).removeClass('col-xs-6').addClass('col-xs-4');
            });
        }
        h1 = getIH(imgItems, 0);
        h2 = getIH(imgItems, 2);
        // 既定条件下修改高度
        imgItems.each(function (i) {
            i == 0 ? true : (i == 1 ? imgItems.eq(i).css('height', h1 + 'px') : imgItems.eq(i).css('height', h2 + 'px'));
        });
    }
}