(function(window,document){
    let canChange = true;

    // 1:获取数据，存放并管理数据
    // 2.创建DOM元素
    // 3.添加事件
    // 4.插入DOM元素
    const method = {
        appendChild(parent, ...children){
            for(var i of children.values()){
                parent.appendChild(i);
            }
        },
        $(sector,doc = document){
            return doc.querySelector(sector);
        },
        $$(sector,doc = document){
            return doc.querySelectorAll(sector);
        }
    }
    function Img(options){
        this._init(options);
        this._createElement();
        this._bind();
        this._show();
    }
    // 初始化，获取数据，并分类进行管理
    Img.prototype._init = function({data,initType,parasitifer}){
        this.classfiex = {'全部':[]}; //按照类型分类
        this.types = ['全部'];  //所有类型
        this.all = [];  //所有元素
        this.curType = initType;    //当前类型
        this.parasitifer = method.$(parasitifer);     //挂载点

        this.imgContainer = null;   //图片容器
        this.wrap = null;   //整体容器
        this.typeBtnEls = null;  // 所有分类按钮组成的数组 {btn:[]}
        this.figures = null;  //当前显示的所有图片元素 []
        this._classify(data);
    };
    Img.prototype._classify = function(data){
        let srcs = new Array();
        data.forEach(({type,title,alt,src}) =>{
            
            // 所有类型
            if(!this.types.includes(type)){
                this.types.push(type);
            }

            // 按照类型分类
            if(!Object.keys(this.classfiex).includes(type)){
                this.classfiex[type] = [];
            }

            // 加载图片元素
            if(!srcs.includes(src)){
                // 图片没有生成过
                // 生成图片
                // 加载到对应的分类中
                srcs.push(src);

                let figure = document.createElement("figure");
                let img = document.createElement("img");
                let figcaption = document.createElement("figcaption");

                img.src = src;
                img.setAttribute("alt",alt);
                figcaption.innerText = title;
                method.appendChild(figure,img,figcaption);

                this.all.push(figure);
                this.classfiex[type].push(this.all.length - 1);
            }else{
                this.classfiex[type].push(srcs.findIndex(s1 => s1 === src));
            }

        });
    };
    Img.prototype._getImgsByType = function(type){
        return type === "全部" ? [...this.all] : this.classfiex[type].map(i => this.all[i]);
    }
    // 创建element元素
    Img.prototype._createElement = function(){

        // 按钮
        let typeBtn = new Array();
        this.types.forEach(tpe =>{
            typeBtn.push(`<li class="__Img__classify__type-btn ${tpe === this.curType ? "__Img__type-btn-active" : ""}">${tpe}</li>`);
        });

        // 整体容器
        let wrap = document.createElement("div");
        wrap.className = "__Img__container";

        let templete = `
        <ul class="__Img__classify">
            ${typeBtn.join("")}
        </ul>
        <div class="__Img__img-container"></div>
        `;
        wrap.innerHTML = templete;
        this.wrap = wrap;

        // 图片容器
        this.imgContainer = method.$(".__Img__img-container", this.wrap);

        // 按钮 元素
        this.typeBtnEls = [...method.$$(".__Img__classify__type-btn", this.wrap)];

        // 将当前类型的图片元素 添加到 图片容器
        method.appendChild(this.imgContainer, ...this._getImgsByType(this.curType));

        // 当前显示图片元素
        this.figures = [...method.$$("figure", this.imgContainer)];

        // 遮罩层
        let overlay = document.createElement("div");
        overlay.className = "__Img__overlay";
        overlay.innerHTML = `
            <div class="__Img__overlay-prev-btn"></div>
            <div class="__Img__overlay-next-btn"></div>
            <img src="" alt="">
        `;

        this.wrap.appendChild(overlay);                     // 将遮罩层元素添加到 整体元素里
        this.overlay = overlay;                             //遮罩层 元素
        this.previewImg = method.$("img",this.overlay);     //遮罩层 图片元素
       
        // 计算每张图片位置
        this._caclPosition(this.figures);

    };
    Img.prototype._caclPosition = function(figures){
        
        let horizontalImgIndex = 0;
        let w = 240;
        let h = 140;

        figures.forEach((figure,i) =>{
            figure.style.top = parseInt(i / 4) * h + parseInt(i / 4) * 15 + "px";
            figure.style.left = horizontalImgIndex * w + horizontalImgIndex * 15 + "px";
            figure.style.transform = "scale(0,0) translate(0,-100%)";
            horizontalImgIndex = (horizontalImgIndex + 1) % 4;
        });

        this.imgContainer.style.height = Math.ceil(figures.length / 4) * h + (Math.ceil(figures.length / 4) - 1) * 15 + "px";

    };
    // 绑定事件
    Img.prototype._bind = function(){
        // 按钮绑定事件
        // 上一张、下一张按钮 点击遮罩层  图片点击（使用事件委托） 事件

        // 分类 按钮
        method.$(".__Img__classify",this.wrap).addEventListener('click', ({target}) =>{
            if("LI" !== target.nodeName) return;    //点击的不是按钮时，退出

            const type = target.innerText;
            if(type === this.curType) return;   //点击的还是当前按钮时，退出

            if(!canChange) return;
            canChange = false;

            let eles = this._getImgsByType(type);   //获取点击类型的所有图片元素

            // 获取点击前 和 点击后 图片url地址
            let prevImgs = this.figures.map(figure => method.$("img",figure).src);
            let nextImgs = eles.map(figure => method.$("img",figure).src);

             // 获取点击前后 相同的图片元素的 索引
            const diffArr = this._diff(prevImgs,nextImgs);

            // 删除 点击前 相同的 图片元素
            diffArr.forEach(([,i2]) =>{
                this.figures.every((figure,index) =>{
                    let src = method.$("img",figure).src;

                    if(nextImgs[i2] === src){
                        this.figures.splice(index, 1);  //去掉相同的元素
                        return false;   //退出循环
                    }
                    return true;    //继续循环
                });
            });

            this._caclPosition(eles);  //计算 点击后 所有图片元素位置

            // 获取 点击后 要添加的 没有重复的 图片元素
            let needAppendEls = new Array();
            if(diffArr.length > 0){

                // 有相同 图片元素 时
                let nextElsIndex = diffArr.map(([,i2]) => i2);

                eles.forEach((figure,i) =>{
                   if(!nextElsIndex.includes(i)) needAppendEls.push(figure);
                });

            }else{

                // 没有相同的图片元素时
                needAppendEls = eles;
            }

            // 影藏不需要的 图片元素
            this.figures.forEach(figure =>{
                figure.style.transform = "scale(0,0) translate(0%,100%)";
                figure.style.opacity = "0";
            });

            // 添加 图片元素
            method.appendChild(this.imgContainer, ...needAppendEls);

            // 显示图片元素
            setTimeout(()=>{
                eles.forEach(figure => {
                    figure.style.transform = "scale(1,1) translate(0,0)";
                    figure.style.opacity = "1";
                });
            });

            // 移除多余显示的元素
            setTimeout(()=>{
                this.figures.forEach(figure =>{
                    this.imgContainer.removeChild(figure);
                });
                this.figures = eles;
                this.curType = type;
                canChange = true;
            },600);

            // 点击 按钮 样式 设置
            this.typeBtnEls.forEach(btn => btn.className = "__Img__classify__type-btn");
            target.className = "__Img__classify__type-btn __Img__type-btn-active";
        });

        // 点击图片（使用事件委托） 事件, 显示遮罩层
        this.imgContainer.addEventListener("click", ({target}) =>{
            if(target.nodeName !== "FIGURE" && target.nodeName !== "FIGCAPTION") return;

            if(target.nodeName === "FIGCAPTION") target = target.parentNode;

            // 显示图片，遮罩层，上一张，下一张 按钮  ----> 显示遮罩层 元素
            this.overlay.style.display = 'flex';
            this.overlay.style.opacity = '1';
            let img = method.$("img",target);
            this.previewImg.src = img.src;
            this.previewImg.alt = img.alt;
        });

        // 遮罩层 点击隐藏  与 事件委托，上一张 下一张事件
        this.overlay.addEventListener("click",({target}) =>{

            let prevClass = "__Img__overlay-prev-btn";
            let nextClass = "__Img__overlay-next-btn";

            if(target.className === prevClass){

                // 上一张 按钮
                // 需要获取当前图片 所在的索引
                let curIndex = this.figures.findIndex(figure => this.previewImg.src === method.$("img",figure).src);
                curIndex === 0 ? curIndex = this.figures.length - 1 : curIndex--;
                this.previewImg.src = method.$("img",this.figures[curIndex]).src;

            }else if(target.className === nextClass){

                // 下一张 按钮
                let curIndex = this.figures.findIndex(figure => this.previewImg.src === method.$("img",figure).src);
                curIndex === this.figures.length - 1 ? curIndex = 0 : curIndex++;
                this.previewImg.src = method.$("img",this.figures[curIndex]).src;

            }else{

                // 遮罩层隐藏
                this.overlay.style.display = 'none';
                this.overlay.style.opacity = '0';
            }
        });
    };
    Img.prototype._diff = function(prevImgs,nextImgs){
        let diffArr = new Array();
        
        prevImgs.forEach((src1, i1) =>{
            let i2 = nextImgs.findIndex(src2 => src1 === src2);
            
            if(i2 !== -1){
                diffArr.push([i1,i2]);
            }
        });

        return diffArr;
    };
    Img.prototype._show = function(){
        method.appendChild(this.parasitifer,this.wrap);

        setTimeout(() =>{
            this.figures.forEach(figure =>{
                figure.style.transform = "scale(1,1) translate(0,0)";
                figure.style.opacity = "1";
            });
        });
    };
    window.$Img = Img;
})(window,document);