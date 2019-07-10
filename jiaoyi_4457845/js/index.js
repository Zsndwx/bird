
window.onload = function(){
    (function(){
        // 购物区 价格计算
        var settlementE = (function(){
            // 选择器
            var $ = function(sector,doc){
                doc = doc || document;
                return doc.querySelectorAll(sector);
            }
            var settlement = $(".settlement")[0];
            var settlementEle = {
                selectAll : $(".shopCar input[name='selectAll']", settlement)[0],
                conRow : $(".con-row",settlement),
                checks : $(".con-row .all-select",settlement),
                allPrice: $(".settlement-go .price .num",settlement)[0],
            };
            // 循环
            function each(arr,fn){
                for(var i = 0; i< arr.length; i++){
                    fn(arr[i],i);
                }
            }
            // 计算选中的价格
            each(settlementEle.checks,function(ele){
                var arr = new Array();
                arr.push(ele);
                ele.onclick = function(){
                    if(inputCheck()){
                        settlementEle.selectAll.checked = true;
                    }else{
                        settlementEle.selectAll.checked = false;
                    }
                    setTotalPrice();
                }
            });
            // 没有参数：判断是否全选 返回布尔值
            // 设置布尔值，全选或全不选
            function inputCheck(isChecked){
                console.log(arguments);
                if(arguments != undefined && arguments.length != 0){
                    each(settlementEle.checks,function(ele){
                        ele.checked = isChecked;
                    });
                }else{
                    var result = true;
                    each(settlementEle.checks,function(ele){
                        if(!ele.checked){
                            result = false;
                            return;
                        }
                    });
                    return result;
                }
            }
            // 全选与反选
            settlementEle.selectAll.onclick = function(e){
                if(e.target.checked){
                    inputCheck(true);
                    setTotalPrice();
                }else{
                    inputCheck(false);
                    setTotalPrice();
                }
            }
            // 设置总价格
            function setTotalPrice(){
                var price = 0;
                each(settlementEle.conRow, function(ele){
                    if($(".all-select",ele)[0].checked){
                        var priceSize = $(".priceSize > span",ele)[0];
                        price += +priceSize.innerHTML;
                    }
                });
                settlementEle.allPrice.innerHTML = price;
            }
             // 计算价格
            each(settlementEle.conRow, function(ele){
                var numberInput = $(".number > input[type='text']",ele)[0];
                var subtractBtn = $(".number > button[title='subtract']",ele)[0];
                var addBtn = $(".number > button[title='add']",ele)[0];

                var price = $(".price > span",ele)[0];
                var priceSize = $(".priceSize > span",ele)[0];

                function setPrice(priceS){
                    var pre = +price.innerHTML;
                    priceSize.innerHTML = pre * priceS;
                }

                subtractBtn.onclick = function(){
                    var num = +numberInput.value;
                    if(num > 1){
                        numberInput.value = num - 1;
                        setPrice(num-1);
                        setTotalPrice();
                    }
                }
                addBtn.onclick = function(){
                    var num = +numberInput.value + 1;
                    numberInput.value = num;
                    setPrice(num);
                    setTotalPrice();
                }
                numberInput.onchange = function(e){
                    var num = numberInput.value;
                    if(isNaN(num)){
                        numberInput.value = 1;
                        setPrice(1);
                        setTotalPrice();
                    }else{
                        setPrice(num);
                        setTotalPrice();
                    }
                }
            });
        })();
    })();
}















