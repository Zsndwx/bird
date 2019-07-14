/**
 * ui-tab
 * @param {string} header Tab组件 所有选项卡 item
 * @param {string} content Tab组件 所有内容 item
 */
$.fn.UiTab = function (header, content) {
    var ui = $(this);
    var tabs = $(header, ui);
    var cons = $(content, ui);
    var index = 0;

    tabs.on('click', function () {
            index = tabs.index(this);
            tabs.triggerHandler('move_to');
        })
        .on('move_to', function () {
            tabs.removeClass('item_focus').eq(index).addClass('item_focus');
            cons.removeClass('item_focus').eq(index).addClass('item_focus');
        });
}

// ui-search
$.fn.UiSearch = function () {
    var ui = $(this);
    var selected = $('.ui-search-selected', ui);

    selected.on('click', function () {
        $('.ui-search-select-list', ui).stop().show();
        return false;
    });

    $('body').on('click', function () {
        $('.ui-search-select-list', ui).stop().hide();
    });

    $('.ui-search-select-list > a', ui).on('click', function () {
        selected.text($(this).text());
    });
}

// ui-table-scheduling
$.fn.UiScheduling = function () {
    var ui = $(this);

    // 动态加载table表
    var thead = $('.thead .row',ui);
    var morning = $('.tbody .row:first-of-type',ui);
    var afternoon = $('.tbody .row:nth-of-type(2)',ui);
    var night = $('.tbody .row:last-of-type',ui);
    // 获取第一行数据
    var weeks = AjaxRemoteGetData.getschedulingWeek();
    weeks.shift();
    var dates = AjaxRemoteGetData.getschedulingDate();
    dates.shift();

    var html = '';
    for(var i =0; i< weeks.length; i++){
        var temp = hospital.tableHTMLTemp.theadRow;
        temp = temp.replace('{week}',weeks[i]);
        temp = temp.replace('{date}',dates[i]);
        html += temp;
    }
    thead.append(html);

    // 上午
    var morningData = AjaxRemoteGetData.getschedulingMorning();
    morningData.shift();
    // 下午
    var afternoonData = AjaxRemoteGetData.getschedulingAfternoon();
    afternoonData.shift();
    // 晚上
    var nightData = AjaxRemoteGetData.getschedulingNight();
    nightData.shift();

    $().schedulingTableHTMLTemp(morning, morningData);
    $().schedulingTableHTMLTemp(afternoon, afternoonData);
    $().schedulingTableHTMLTemp(night, nightData);


    // 添加上下按钮滑动事件
    var prev = $('.column .prev', ui);
    var next = $('.column .next', ui);
    var box = $('.ui-table-scheduling', ui);

    var thcloumns = $('.thead .cell', box);
    var colWidth = thcloumns.eq(0).width() + 2;
    var len = thcloumns.length;
    var index = 0;
    var timer = null;

    box.on('move_to', function () {
        if (index < 0 || index > len - 7) {
            if (index < 0) index = 0;
            if (index > len - 7) index = len - 7;
        } else {
            box.animate({
                'left': (-1 * index * colWidth) + 'px'
            }, 200, 'linear');
        }
    });

    prev
        .on('mousedown', function () {
            timer = setInterval(function(){
                index--;
                box.triggerHandler('move_to');
            },200);
        })
        .on('mouseup', function () {
            clearInterval(timer);
        });
    
    next.on('mousedown', function () {
            timer = setInterval(function () {
                index++;
                box.triggerHandler('move_to');
            }, 200);
        })
        .on('mouseup', function () {
            clearInterval(timer);
        });
}

/**
* 动态添加表格内容
* @param  {document} htmlNode Table表格 行节点元素
* @param  {Array} htmlNode Table表格 行节点元素的数据
*/
$.fn.schedulingTableHTMLTemp = function(htmlNode, data){
    var html = '';
    for(var i =0; i< data.length; i++){
        var temp = hospital.tableHTMLTemp.tbodyRow;
        temp = temp.replace('{cell}',data[i]);
        html += temp;
    }
    htmlNode.append(html);
}

$(function () {
    $('.ui-tab').UiTab('.wrap > .caption .item', '.wrap > .content > .content-item');
    $('.ui-search').UiSearch();
    $('.ui-list-table').UiScheduling();
});
