window.canvasLock = function (context) {
    this.context = context;
    this.textColor = "rgb(126,128,151)";
}
// 文字写入
canvasLock.prototype.rectText = function(x,y,width,height,txt){
    var ctx = this.context;
    ctx.save();
    ctx.fillStyle = this.textColor;
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(txt,x+width/2,y+height/2);
    ctx.restore();
    ctx.save();
}
// 圆角绘制方法
canvasLock.prototype.radius = function (x, y, r, rotate, isFillOrStroke = false) {
    var ctx = this.context;
    ctx.save();

    ctx.beginPath();
    ctx.translate(x, y);
    ctx.rotate(rotate);

    if (!isFillOrStroke) {
        ctx.arc(0, 0, r, 0, Math.PI / 2, false);
        ctx.stroke();
        ctx.restore();
        ctx.save();
    } else {
        ctx.arc(0, 0, r, 0, Math.PI * 2, false);
        ctx.clip();
        ctx.fillRect(0, 0, r, r);
        ctx.restore();
        ctx.save();
    }

}
// 封装 moveTo lineTo 方便直接画一条直线
canvasLock.prototype.line = function (startX, startY, endX, endY) {
    var ctx = this.context;
    ctx.save();

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.beginPath();
    ctx.restore();
    ctx.save();
}
// 圆角矩形绘制方法
canvasLock.prototype.squareRadius = function (x, y, r, width, height, text = null) {
    var self = this;
    var ctx = self.context;
    ctx.strokeStyle = "rgba(152,217,216,1)";
    ctx.fillStyle = "rgba(152,217,216,0.2)";
    ctx.lineWidth = 1;
    ctx.save();

    if(r > height/2){
        r = height /2;
    }
    if (r == height / 2) {
        ctx.beginPath();
        ctx.translate(x + r, y + r);
        ctx.rotate(Math.PI / 2);
        ctx.arc(0, 0, r, 0, Math.PI * 1);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        ctx.save();

        ctx.beginPath();
        ctx.translate(x + width - r, y + r);
        ctx.rotate(Math.PI / -2);
        ctx.arc(0, 0, r, 0, Math.PI * 1);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        ctx.save();

        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + r + (width - 2 * r), y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + r, y + height);
        ctx.lineTo(x + r + (width - 2 * r), y + height);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillRect(x + r, y, (width - 2 * r), height);
        ctx.restore();
        ctx.save();

        if(text){
            self.rectText(x,y,width,height,text);
            ctx.restore();
            ctx.save();
        }
    } else if (r < height / 2) {
        ctx.beginPath();
        ctx.fillRect(x + r, y, width - r * 2, height);
        ctx.beginPath();
        ctx.fillRect(x,y+r,r,height-r*2);
        ctx.beginPath();
        ctx.fillRect(x+width-r,y+r,r,height-r*2);
        ctx.restore();
        ctx.save();

        self.radius(x + r, y + r, r, Math.PI, true);
        self.radius(x + r, y + height - r, r, Math.PI / 2,true);
        self.radius(x + width - r, y + r, r, Math.PI / -2,true);
        self.radius(x + width - r, y + height - r, r, Math.PI * 2,true);

        self.radius(x + r, y + r, r, Math.PI, false);
        self.radius(x + r, y + height - r, r, Math.PI / 2,false);
        self.radius(x + width - r, y + r, r, Math.PI / -2,false);
        self.radius(x + width - r, y + height - r, r, Math.PI * 2,false);

        self.line(x, y + r, x, y + height - r);
        self.line(x+width,y+r,x+width,y+height-r);
        self.line(x+r,y,x+width-r,y);
        self.line(x+r,y+height,x+width-r,y+height);

        if(text){
            self.rectText(x,y,width,height,text);
            ctx.restore();
            ctx.save();
        }
    }
}
// 多边形绘制方法
canvasLock.prototype.polygon = function(arrPoint){
    var self = this;
    var ctx = self.context;
    ctx.beginPath();
    ctx.moveTo(arrPoint[0].x,arrPoint[0].y);
    for(var i=1; i< arrPoint.length; i++){
        ctx.lineTo(arrPoint[i].x,arrPoint[i].y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}
// 调用 squareRadius 与 polygon 方法画圆角矩形 和 多边形
canvasLock.prototype.drawGraph = function(){
    this.squareRadius(50, 180, 20, 100, 40, "HTML");
    this.squareRadius(200, 180, 5, 100, 40, "CSS");
    this.squareRadius(500, 80, 5, 100, 40, "JavaScript");
    this.squareRadius(650, 80, 5, 100, 40, "TypeScript");
    this.squareRadius(800, 80, 5, 100, 40, "Angular");
    this.squareRadius(500, 180, 5, 100, 40, "JQuery");
    this.squareRadius(650, 180, 5, 100, 40, "AngularJS");
    this.squareRadius(500, 280, 5, 100, 40, "HTML5");
    this.squareRadius(650, 280, 5, 100, 40, "CSS3");
    this.squareRadius(800, 280, 5, 100, 40, "SVG");
    var arr = [
        {x:350,y:200},
        {x:400,y:200+30},
        {x:450,y:200},
        {x:400,y:200-30},
    ]
    this.polygon(arr);
    this.rectText(350,180,100,40,"选择方向");
}
// 直线方向箭头 具体绘制方法
canvasLock.prototype.drawArrow = function(x,y,size,fillColor){
    var ctx = this.context;
    ctx.save();
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = fillColor;
    this.line(x,y,x+size-6,y);
    this.polygon([
        {x:x+size-6,y:y-3},
        {x:x+size,y:y},
        {x:x+size-6,y:y+3}
    ]);
    ctx.restore();
    ctx.save();
}
// 转向圆角方向箭头 具体绘制方法
canvasLock.prototype.drawArrowTurn = function(arrArrowTurn){
    var self = this;
    var ctx = self.context;
    ctx.save();
    var a = arrArrowTurn;
    ctx.fillStyle = a.fillColor;
    ctx.strokeStyle = a.fillColor;
    var s = a.serif;
    var x = s[2].x, y = s[2].y;
    if(a.arrow == "top right" || a.arrow == "bottom right"){
        self.polygon([
            {x:x-a.arrowSize,y:y-a.arrowSize/2},
            {x:x,y:y},
            {x:x-a.arrowSize,y:y+a.arrowSize/2}
        ]);
    }else if(a.arrow == "right top"){
        self.polygon([
            {x:x-a.arrowSize/2,y:y+a.arrowSize},
            {x:x,y:y},
            {x:x+a.arrowSize/2,y:y+a.arrowSize}
        ]);
    }

    if(a.arrow == "top right"){
        self.line(s[0].x,s[0].y,s[1].x,s[1].y+a.radius);
        self.line(s[1].x+a.radius,s[1].y,s[2].x-a.arrowSize,s[2].y);
        self.radius(s[1].x+a.radius,s[1].y+a.radius, a.radius, Math.PI);
        
    }else if(a.arrow == "bottom right"){
        self.line(s[0].x,s[0].y,s[1].x,s[1].y-a.radius);
        self.line(s[1].x+a.radius,s[1].y,s[2].x-a.arrowSize,s[2].y);
        self.radius(s[1].x+a.radius,s[1].y-a.radius, a.radius, Math.PI/2);
    }else if(a.arrow == "right top"){
        self.line(s[0].x,s[0].y,s[1].x - a.radius,s[1].y);
        self.line(s[1].x,s[1].y-a.radius,s[2].x,s[2].y+a.arrowSize);
        self.radius(s[1].x-a.radius,s[1].y-a.radius, a.radius, Math.PI*2);
    }
}
// 调用 drawArrowTurn 与 drawArrow 画方向箭头
canvasLock.prototype.drawArrowsInit =function(){
    this.drawArrow(150,200,50,"rgb(147,207,111)");
    this.drawArrow(300,200,50,"rgb(147,207,111)");
    this.drawArrow(300,200,50,"rgb(147,207,111)");
    this.drawArrow(600,100,50,"rgb(147,207,111)");
    this.drawArrow(750,100,50,"rgb(147,207,111)");
    this.drawArrow(450,200,50,"rgb(213,211,216)");
    this.drawArrow(600,200,50,"rgb(213,211,216)");
    this.drawArrow(600,300,50,"rgb(213,211,216)");
    this.drawArrow(750,300,50,"rgb(213,211,216)");
    var turnTop = {
        fillColor:"rgb(147,207,111)",
        arrow:"top right",
        radius:5,
        arrowSize:6,
        serif:[
            {x:400,y:200-30},
            {x:400,y:100},
            {x:500,y:100}
        ]
    };
    this.drawArrowTurn(turnTop);
    var turnBottom = {
        fillColor:"rgb(213,211,216)",
        arrow:"bottom right",
        radius:5,
        arrowSize:6,
        serif:[
            {x:400,y:200+30},
            {x:400,y:300},
            {x:500,y:300}
        ]
    };
    this.drawArrowTurn(turnBottom);
    var turnRight = {
        fillColor:"rgb(213,211,216)",
        arrow:"right top",
        radius:5,
        arrowSize:6,
        serif:[
            {x:750,y:200},
            {x:850,y:200},
            {x:850,y:100+20}
        ]
    };
    this.drawArrowTurn(turnRight);
}
//初始化
canvasLock.prototype.init = function () {
    this.drawGraph();
    this.drawArrowsInit();
}