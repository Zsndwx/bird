var hospital = {};

hospital.scheduling = [
    ['week','date','morning','afternoon','night'],
    ['星期四','2017-01-09','1','约满',''],
    ['星期五','2017-03-11','','约满',''],
    ['星期六','2017-04-22','','约满',''],
    ['星期日','2017-02-19','','约满',''],
    ['星期一','2017-03-10','','约满',''],
    ['星期二','2017-12-13','','约满',''],
    ['星期三','2017-04-05','','约满',''],
    
    ['星期四','2017-01-09','2','约满',''],
    ['星期五','2017-03-11','','约满',''],
    ['星期六','2017-04-22','','约满',''],
    ['星期日','2017-02-19','','约满',''],
    ['星期一','2017-03-10','','约满',''],
    ['星期二','2017-12-13','','约满',''],
    ['星期三','2017-04-05','','约满',''],

    ['星期四','2017-01-09','3','约满',''],
    ['星期五','2017-03-11','','约满',''],
    ['星期六','2017-04-22','','约满',''],
    ['星期日','2017-02-19','','约满',''],
    ['星期一','2017-03-10','','约满',''],
    ['星期二','2017-12-13','','约满',''],
    ['星期三','2017-04-05','','约满',''],

    ['星期四','2017-01-09','4','约满',''],
    ['星期五','2017-03-11','','约满',''],
    ['星期六','2017-04-22','','约满',''],
    ['星期日','2017-02-19','','约满',''],
    ['星期一','2017-03-10','','约满',''],
    ['星期二','2017-12-13','','约满',''],
    ['星期三','2017-04-05','','约满',''],

    ['星期四','2017-01-09','5','约满',''],
    ['星期五','2017-03-11','','约满',''],
    ['星期六','2017-04-22','','约满',''],
    ['星期日','2017-02-19','','约满',''],
    ['星期一','2017-03-10','','约满',''],
    ['星期二','2017-12-13','','约满',''],
    ['星期三','2017-04-05','','约满',''],

    ['星期四','2017-01-09','6','约满',''],
    ['星期五','2017-03-11','','约满',''],
    ['星期六','2017-04-22','','约满',''],
    ['星期日','2017-02-19','','约满',''],
    ['星期一','2017-03-10','','约满',''],
    ['星期二','2017-12-13','','约满',''],
    ['星期三','2017-04-05','','约满',''],

    ['星期四','2017-01-09','7','约满',''],
    ['星期五','2017-03-11','','约满',''],
    ['星期六','2017-04-22','','约满',''],
    ['星期日','2017-02-19','','约满',''],
    ['星期一','2017-03-10','','约满',''],
    ['星期二','2017-12-13','','约满',''],
    ['星期三','2017-04-05','','约满',''],
];

hospital.tableHTMLTemp = {};
hospital.tableHTMLTemp.theadRow = `<td class="cell">{week}<br />{date}</td>`;
hospital.tableHTMLTemp.tbodyRow = `<td class="cell">{cell}</td>`;


var AjaxRemoteGetData = {};

// 周数
AjaxRemoteGetData.getschedulingWeek = function(){
    console.log('远程获取数据','getschedulingWeek');

    var arr = ['周数'];
    for(var i=1, len=hospital.scheduling.length; i < len; i++){
        var _d = hospital.scheduling[i][0];
        arr.push(_d);
    }

    console.log('结果',arr);
    return arr;
}

// 时间
AjaxRemoteGetData.getschedulingDate = function(){
    console.log('远程获取数据','getschedulingDate');

    var arr = ['时间'];
    for(var i=1, len=hospital.scheduling.length; i < len; i++){
        var _d = hospital.scheduling[i][1];
        arr.push(_d);
    }
    console.log('结果',arr);
    return arr;
}

// 上午
AjaxRemoteGetData.getschedulingMorning = function(){
    console.log('远程获取数据','getschedulingMorning');

    var arr = ['上午'];
    for(var i=1, len=hospital.scheduling.length; i < len; i++){
        var _d = hospital.scheduling[i][2];
        arr.push(_d);
    }
    console.log('结果',arr);
    return arr;
}

// 下午
AjaxRemoteGetData.getschedulingAfternoon = function(){
    console.log('远程获取数据','getschedulingAfternoon');

    var arr = ['下午'];
    for(var i=1, len=hospital.scheduling.length; i < len; i++){
        var _d = hospital.scheduling[i][3];
        arr.push(_d);
    }
    console.log('结果',arr);
    return arr;
}

// 晚上
AjaxRemoteGetData.getschedulingNight = function(){
    console.log('远程获取数据','getschedulingNight');

    var arr = ['晚上'];
    for(var i=1, len=hospital.scheduling.length; i < len; i++){
        var _d = hospital.scheduling[i][4];
        arr.push(_d);
    }
    console.log('结果',arr);
    return arr;
}
