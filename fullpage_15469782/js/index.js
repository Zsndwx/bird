// rem响应式布局公式
(function(doc,win){
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
        recalc = function(){
            var clientWidth = docEl.clientWidth;
            if(!clientWidth) return;
            if(clientWidth >= 750){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
        };
    if(!doc.addEventListener) return;
    win.addEventListener(resizeEvt,recalc,false);
    doc.addEventListener('DOMContentLoaded',recalc,false);
    recalc();
})(document,window);


$(document).ready(function(){
    $('#fullpage').fullpage({
		sectionsColor:['#fff','#2b333b','#1bbc9b','#b01e2b'],
        navigation:true,
        verticalCentered: false,    //去掉自动添加的div标签
        navigationPosition: 'right',    //导航位置 右边 默认
		continuousVertical: true,   //循环滚动
		scrollingSpeed: 700,        //页面滚动时间
		easing:'easeInOutCubic',    //滚动动画
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage'], //导航
        licenseKey: 'YOUR_KEY_HERE',
        onLeave: function(origin, destination, dir){
            // 滑动到任一页面时触发
            // console.log(origin,, destination, direction);
            var curpage = $(destination.item);
            var index = destination.index;
            if(index == 0){
                curpage.find('h2').fadeIn();
                curpage.find('.section1_p1').delay(500).fadeIn();
                curpage.find('.section1_p2').delay(1000).fadeIn();
                curpage.find('.section1_div1').delay(1500).fadeIn();
                curpage.find('.section1_div2').delay(2000).fadeIn();
                curpage.find('.section1_div3').delay(2500).fadeIn();
            }else if(index == 1){
                curpage.find('h2').fadeIn();
                curpage.find('.section2_p1').delay(500).fadeIn();
                curpage.find('.section2_p2').delay(1000).fadeIn();
                curpage.find('div').delay(1500).fadeIn();
            }else if(index == 2){
                curpage.find('h2').fadeIn();
                curpage.find('p').delay(500).fadeIn();
                curpage.find('div').delay(1000).fadeIn();
            }else if(index == 3){
                curpage.find('div').fadeIn();
                curpage.find('h2').delay(500).fadeIn();
                curpage.find('p').delay(1000).fadeIn();
            }
        },
	    afterLoad: function(origin, destination, dir){
            // 离开当前页面时触发
            var prepage = origin === null ? null : $(origin.item);
            if(!prepage) return;
            var index = destination.index;
            if(dir === 'down'){
                index --;
            }else if(dir === 'up'){
                index ++;
            }
            if(index == 0){
                prepage.find('h2').fadeOut();
                prepage.find('.section1_p1').fadeOut();
                prepage.find('.section1_p2').fadeOut();
                prepage.find('.section1_div1').fadeOut();
                prepage.find('.section1_div2').fadeOut();
                prepage.find('.section1_div3').fadeOut();
            }else if(index == 1){
                prepage.find('h2').fadeOut();
                prepage.find('.section2_p1').fadeOut();
                prepage.find('.section2_p2').fadeOut();
                prepage.find('div').fadeOut();
            }else if(index == 2){
                prepage.find('h2').fadeOut();
                prepage.find('p').fadeOut();
                prepage.find('div').fadeOut();
            }else if(index == 3){
                prepage.find('h2').fadeOut();
                prepage.find('p').fadeOut();
                prepage.find('div').fadeOut();
            }

        },
        afterRender: function(){
            // 页面加载完成时事件
            var curpage = $('.section1');
            curpage.find('h2').fadeIn();
            curpage.find('.section1_p1').delay(500).fadeIn();
            curpage.find('.section1_p2').delay(1000).fadeIn();
            curpage.find('.section1_div1').delay(1500).fadeIn();
            curpage.find('.section1_div2').delay(2000).fadeIn();
            curpage.find('.section1_div3').delay(2500).fadeIn();
        },
	});
    
});