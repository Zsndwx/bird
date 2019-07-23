//  ui-search 定义 搜索选项下拉列表
$.fn.UiSearch = function () {
    var ui = $(this);
    $('.ui-search-selected', ui).on('click', function () {
        $('.ui-search-select-list', ui).show();
        return false;
    });
    $('.ui-search-select-list > a', ui).on('click', function () {
        $('.ui-search-selected', ui).text($(this).text());
    });
    $('body').on('click', function () {
        $('.ui-search-select-list', ui).hide();
        return false;
    });
}

// ui-slider 幻灯片播放特效
$.fn.UiSlider = function () {
    var ui = $(this);
    var timer = null;
    var index = 0;
    var tips = $('.ui-slide-process .item', ui);
    var wrap = $('.ui-slider-wrap', ui);
    var prev_btn = $('.ui-slide-arrow-prev', ui);
    var next_btn = $('.ui-slide-arrow-next', ui);

    var len = $('.ui-slider-img .item', wrap).length;
    var width = $('.ui-slider-img .item', wrap).eq(0).width();

    // 鼠标移进去 暂停自动滚动
    var enableAuto = true;
    ui.on('mouseover', function () {
        enableAuto = false;
    }).on('mouseout', function () {
        enableAuto = true;
    });

    // 将 幻灯片 复制 一份,实现 无缝衔接
    wrap.append(wrap.html());

    wrap
        .on('move_next', function () {
            index++;
            if (index > len) index = 1;
            wrap.triggerHandler('move_to', 'next');
        })
        .on('move_prev', function () {
            index--;
            if (index < 1) index = 0;
            wrap.triggerHandler('move_to', 'prev');
        })
        .on('move_to', function () {
            var btn = arguments[1];
            wrap.stop().animate({
                left: -1 * width * index + 'px'
            }, 500);
            if (btn === 'next') {
                if (index == len) {
                    index = 0;
                    setTimeout(function () {
                        wrap.stop().css('left', -1 * width * index + 'px');
                    }, 500);
                }
            }
            tips.removeClass('item_focus').eq(index).addClass('item_focus');
            if (btn === 'prev') {
                if (index == 0) {
                    index = 3;
                    setTimeout(function () {
                        wrap.stop().css('left', -1 * width * index + 'px');
                    }, 500);
                }
            }
        })
        .on('mouseleave', function () {
            timer = setInterval(function () {
                enableAuto && wrap.triggerHandler('move_next');
            }, 3000);
        })
        .on('mouseenter', function () {
            clearInterval(timer);
        })
        .triggerHandler('mouseleave');

    // 上一张、下一张 按钮 绑定点击事件
    prev_btn.on('click', function () {
        wrap.triggerHandler('move_prev');
    });
    next_btn.on('click', function () {
        wrap.triggerHandler('move_next');
    });

    // 圆点 按钮 点击事件
    tips.on('click', function () {
        index = $(this).index();
        wrap.triggerHandler('move_to');
    });
}

// ui-cascading
$.fn.UiCascading = function () {
    var ui = $(this);
    var selects = $('select', ui);

    selects
        .on('change', function () {
            var index = selects.index(this);
            var val = $(this).val();

            var where = $(this).attr('data-where');
            where = where ? where.split(',') : [];
            where.push(val);

            selects.eq(index + 1).attr('data-where', where.join(',')).triggerHandler('reloadOption');

            $("select:gt(" + (index + 1) + ")", ui).each(function () {
                $(this).attr('data-where', '').triggerHandler('reloadOption');
            });
        })
        .on('reloadOption', function () {
            var method = $(this).attr('data-search');
            var args = $(this).attr('data-where').split(',');
            var data = AjaxRemoteGetData[method].apply(this, args);
            var select = $(this);
            select.find('option').remove();
            $.each(data, function (i, item) {
                select.append("<option value='" + item + "'>" + item + "</option>");
            });
        });

    selects.eq(0).triggerHandler('reloadOption');
}

/**
 * ui-tab
 * @param {string} header Tab组件 所有选项卡 item
 * @param {string} content Tab组件 内容区域 所有item
 */
$.fn.UiTab = function (header, content) {
    var ui = $(this);
    var tabs = $(header, ui);
    var cons = $(content, ui);
    var tabIndex = 0;
    // debugger;

    var consCaptions = $('.tab-page-item-caption-item', cons);
    var conIndex = 0;
    var consItems = $('.tab-page-item-content .content-item', cons);

    tabs.on('click', function () {
        tabIndex = tabs.index(this);
        tabs.removeClass('item_focus').eq(tabIndex).addClass('item_focus');
        cons.stop().hide().eq(tabIndex).stop().show();
    });

    consCaptions.on('click', function () {
        conIndex = consCaptions.index(this);
        consCaptions.removeClass('caption-item_focus').eq(conIndex).addClass('caption-item_focus');
        consItems.stop().hide().eq(conIndex).stop().show();
    });

}

// ui-menu
$.fn.UiMenu = function () {
    var ui = $(this);
    var menuItems = $('.ui-menu-item', ui);
    var icons = $('.ui-menu-item-department .icon', menuItems);
    var index = 0;
    var width = icons.eq(0).width();

    icons.each(function (i, item) {
        icons.eq(i).css('background-position-y', (-1 * width * i) + 'px');
    });

    menuItems.on('mouseleave', function () {
            index = menuItems.index(this);
            icons.eq(index).css('background-position-x', (-1 * width) + 'px');
        })
        .on('mouseenter', function () {
            index = menuItems.index(this);
            icons.eq(index).css('background-position-x', '0px');
        });
}

// ui-filter 分页帅选条件  标题项
$.fn.UiFilter = function () {
    var ui = $(this);
    var groups = $('.group', ui);
    var method = '';

    var area, level, type;
    // 加载筛选条件数据
    groups.each(function (i) {
        method = groups.eq(i).attr('data-search');
        var data = AjaxRemoteGetData[method]();
        data.shift();
        // console.log(data);
        $.each(data, function (index, item) {
            groups.eq(i).append("<a class='caption'>" + item + "</a><span>|</span>");
        });
    });
    // 加载 全部 的页面内容数据
    var args = [];
    $('.caption_focus', ui).each(function (i, item) {
        args.push(item.innerText);
    });
    $().PaginationGetData.apply(this, args);

    // 鼠标点击 样式设置
    var groupNews = $('.group', ui);
    var captionIndex = 0;
    console.log(groupNews);
    groupNews.each(function (i) {
        var captions = groupNews.eq(i).find('.caption');
        captions.on('click', function () {
                captionIndex = captions.index(this);
                captions.removeClass('caption_focus').eq(captionIndex).addClass('caption_focus');
                captions.triggerHandler('filterDatalist');
            })
            .on('filterDatalist', function () {
                // 加载 条件筛选后 的页面内容数据
                var args = [];
                $('.caption_focus', ui).each(function (i, item) {
                    args.push(item.innerText);
                });
                area = args[2], level = args[1], type = args[0];
                $().PaginationGetData(area, level, type);
            });
    });
}

/**
 * 通过筛选条件  查找需要的 分页数据
 * @param {string} area 医院地区
 * @param {string} level 医院等级
 * @param {string} type 医院类型
 */
$.fn.PaginationGetData = function(area, level, type, currentPage = 1){
    // 一次性查询所有数据
    var datalist = AjaxRemoteGetData.getHospitalArrByFilter(type, level, area);
    datalist.shift();
    var page = {};
    page.currentPage = currentPage;   //当前页
    page.data = datalist;   //所有数据
    page.pageSize = 3;  //每页的数据量
    page.pageCount = Math.ceil(datalist.length / 3);  //总页数
    if(page.currentPage > page.pageCount) page.currentPage = page.pageCount;
    // 分页内容 加载
    $().UiDatalist(page);
    // 分页跳转 加载
    $().UiPagination(page);
}

/**
 * ui-datalist
 * 加载 分页内容
 * @param {object} page 分页数据
 */
$.fn.UiDatalist = function (page) {
    var ui = $('.ui-datalist');
    if(page.currentPage > page.pageCount) page.currentPage = page.pageCount;

    var data = page.data.concat();
    var currentContent = data.splice((page.currentPage-1)*3, 3);  //分页数据
    // console.log('currentPage:',page.currentPage);
    // console.log('currentContent:',currentContent);
    // console.log('storage.hospital:', storage.hospital);
    // console.log('(page.currentPage-1)*3=',(page.currentPage-1)*3);
    var outHtml = '';
    var cons = {};
    $.each(currentContent,function(i,item){
        cons.imgurl = item[6];
        cons.name = item[3];
        cons.level = item[1];
        cons.time = item[7];
        cons.call = item[5];
        cons.address = item[4];
        var html = hospitalTemp;
        for(k in cons){
            var v = cons[k];
            html = html.replace('{'+ k +'}', v);
        }
        outHtml += html;
    });
    ui.empty();
    ui.append(outHtml);
    return currentContent;
}

// 加载 分页 页数跳转
$.fn.UiPagination = function(page){
    var ui = $('.ui-pagination');
    var pageCount = page.pageCount;
    var pageNum = $('.pageNum',ui);

    var search = $('.search-icon',ui);
    var number = $('.number',ui);

    var html = '';
    for(var i =0; i<pageCount - 1; i++){
        html += `<div class="pageNum">`+ (i+2) +`</div>`;
    }
    if(pageNum.length>1){
        pageNum.eq(0).siblings('.pageNum').remove();
        pageNum.after(html);
    }else{
        pageNum.after(html);
    }
    $('.pageCount', ui).text('共计'+ page.pageCount +'页');

    // 给按钮 绑定 点击事件
    var pageNumNews = $('.pageNum',ui);
    var curentPage = 0;
    // 前一页、后一页 按钮
    var prev = $('.prevBtn',ui);
    var next = $('.nextBtn',ui);
    prev.on('click',function(){
        curentPage = page.currentPage;
        curentPage--;
        if(curentPage < 1) {
            curentPage = 1;
            return false;
        }
        next.triggerHandler('move_to');
    });
    next.on('click',function(){
        curentPage = page.currentPage;
        curentPage++;
        if(curentPage > page.pageCount) {
            curentPage = page.pageCount;
            return false;
        }
        next.triggerHandler('move_to');
    })
    .on('move_to',function(){
        page.currentPage = curentPage;
        $().UiDatalist(page);
        pageNumNews.removeClass('pageNum_focus').eq(curentPage-1).addClass('pageNum_focus');
    });
    // 页 按钮 绑定点击事件
    pageNumNews.on('click',function(){
        curentPage = parseInt($(this).text());
        next.triggerHandler('move_to');
    });
    // 跳转 按钮 绑定点击事件
    search.on('click',function(){
        var pageVal = parseInt(number.val());
        if(pageVal> page.pageCount || pageVal < 1){
            return false;
        }
        curentPage = pageVal;
        next.triggerHandler('move_to');
    });
}


$(function () {
    $('.ui-search').UiSearch();
    $('.ui-slider').UiSlider();
    $('.ui-cascading').UiCascading();
    $('.content-tab').UiTab('.cpation > .item', '.tab-page > .tab-page-item');
    $('.ui-menu').UiMenu();
    $('.ui-filter').UiFilter();
});