(function () {
    var EventUtil = {
        addHandler: function (element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler
            }
        },
        removeHandler: function (element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent("on" + type, handler);
            } else {
                element["on" + type] = null;
            }
        },
        getTarget: function (event) {
            return event.target || event.srcElement;
        },
        preventDefault: function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },
        stopPropagation: function (event) {
            if (event.stopPropagation) {
                event.stopPropagation()
            } else {
                event.cancelBubble = true;
            }
        }
    };
    var ClassUtil = {
        getClass: function (ele) {
            return ele.className.replace(/\s+/, " ").split(" ");
        },
        hasClass: function (ele, cls) {
            return -1 < (" " + ele.className + " ").indexOf(" " + cls + " ");
        },
        addClass: function (ele, cls) {
            if (!this.hasClass(ele, cls))
                ele.className += " " + cls;
        },
        removeClass: function (ele, cls) {
            if (this.hasClass(ele, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)', "gi");
                ele.className = ele.className.replace(reg, " ");
            }
        },
        toggleClass: function (ele, cls) {
            if (this.hasClass(ele, cls)) {
                this.removeClass(ele, cls);
            } else {
                this.addClass(ele, cls);
            }
        }
    };
    var $ = function (sector, doc) {
        doc = doc || document;
        return doc.querySelectorAll(sector);
    }

    function each(arr, fn) {
        if (arr) {
            if (arr.length) {
                for (var i = 0; i < arr.length; i++) {
                    fn(arr[i], i);
                }
            } else {
                for (var i in arr) {
                    fn(arr[i], i);
                }
            }
        }
    }
    var form = $(".register > .form")[0];
    var formEle = {
        item: $(".item", form),
        agreement: $(".agreement input[type='checkbox']", form)[0],
        submit: $("button[type='submit']", form)[0],
        select: [],
    };
    var formVidity = {
        username: {
            prompt: "6-30位字母、数字或'_'，字母开头",
            pattern: /^[a-zA-Z]\w{5,29}$/,
            verify: false,
            ok: "用户名输入正确",
            empty: "请输入用户名",
        },
        loginPwd: {
            prompt: "6-20位字母、数字或符号",
            pattern: /^[\w\.!@#\$%\^&\*,\?\-\+]{5,19}$/,
            regNum: /\d/,
            regChar: /[a-zA-Z]/,
            regSymbol: /[-_\.!@#\$%\^&\*,\?\+]/,
            verify: false,
            ok: "密码输入正确",
            empty: "请输入密码"
        },
        canPwd: {
            prompt: "两次密码输入不一致，请重新输入",
            verify: false,
            ok: "两次输入一致",
            empty: "输入框不能为空",
        },
        name: {
            prompt: "姓名只能包含中文或者英文,且字符在3-30个之间",
            pattern: /^[a-zA-Z\u4e00-\u9fa5]{3,30}$/,
            verify: false,
            ok: "姓名输入正确",
            empty: "姓名填写规则",
        },
        idNumber: {
            prompt: "18位数字，最后一位可以是大写或者小写的x",
            pattern: /^\d{17}(\d|[xX])$/,
            verify: false,
            ok: "号码输入正确",
            empty: "请输入18位身份证号码",
        },
        email: {
            prompt: "@符号前面可以是数字、大小写字母，符号“_或-”，@后面是数字、大小写字母，符号“_或-”加上符号“.”再以数字、大小写字母，符号“_或-”为结尾",
            pattern: /^[\w\.]+@[\w\-]+\.[\w-]+$/,
            verify: false,
            ok: "邮箱格式正确",
            empty: "请输入正确的邮箱",
        },
        tel: {
            prompt: "第一位必须是数字1，第二位不能是1和2，必须是11位数字",
            pattern: /^1[^(12)]\d{9}$/,
            verify: false,
            ok: "手机格式正确",
            empty: "您输入的手机号码不是有效的格式！",
        },
    }
    // 正则验证表单
    function verification(ele, span) {
        if (checkPwd(ele, span)) return;
        if (onPwd(ele, span)) return;
        var name = ele.name;
        if (ele.value) {
            var reg = formVidity[name].pattern;
            if (reg.exec(ele.value)) {
                if (reg.exec(ele.value)[0] == ele.value) {
                    span.innerHTML = formVidity[name].ok;
                    span.style.color = "green";
                    formVidity[name].verify = true;
                } else {
                    span.innerHTML = formVidity[name].prompt;
                    span.style.color = "red";
                    formVidity[name].verify = false;
                }
            } else {
                span.innerHTML = formVidity[name].prompt;
                span.style.color = "red";
                formVidity[name].verify = false;
            }
        } else {
            span.innerHTML = formVidity[name].empty;
            span.style.color = "red";
            formVidity[name].verify = false;
        }
    }
    // 密码强度验证
    function onPwd(ele, span) {
        var name = ele.name;
        if (name == "loginPwd") {
            if (ele.value) {
                var reg = formVidity[name].pattern;
                if (reg.exec(ele.value)) {
                    if (reg.exec(ele.value)[0] == ele.value) {
                        var strength = 0;
                        // 数字验证：是否包含数字
                        if (formVidity[name].regNum.exec(ele.value)) {
                            strength += 1;
                        }
                        // 字母验证：是否包含字母
                        if (formVidity[name].regChar.exec(ele.value)) {
                            strength += 1;
                        }
                        // 符号验证：是否包含符号
                        if (formVidity[name].regSymbol.exec(ele.value)) {
                            strength += 1;
                        }
                        if (strength == 1) {
                            span.innerHTML = "";
                            span.className = "";
                            ClassUtil.addClass(span, "pwd-one");
                            var txt = "<span></span>";
                            var text = "<div>一般</div>";
                            while (strength) {
                                strength--;
                                text += txt;
                            }
                            span.insertAdjacentHTML("afterbegin", text);
                        } else if (strength == 2) {
                            span.innerHTML = "";
                            span.className = "";
                            ClassUtil.addClass(span, "pwd-two");
                            var txt = "<span></span>";
                            var text = "<div>中等</div>";
                            while (strength) {
                                strength--;
                                text += txt;
                            }
                            span.insertAdjacentHTML("afterbegin", text);
                        } else {
                            span.innerHTML = "";
                            span.className = "";
                            ClassUtil.addClass(span, "pwd-three");
                            var txt = "<span></span>";
                            var text = "<div>超强</div>";
                            while (strength) {
                                strength--;
                                text += txt;
                            }
                            span.insertAdjacentHTML("afterbegin", text);
                        }
                        formVidity[name].verify = true;
                    } else {
                        span.innerHTML = formVidity[name].prompt;
                        span.style.color = "red";
                        formVidity[name].verify = false;
                    }
                } else {
                    span.innerHTML = formVidity[name].prompt;
                    span.style.color = "red";
                    formVidity[name].verify = false;
                }
            }else{
                span.innerHTML = formVidity[name].empty;
                span.style.color = "red";
                formVidity[name].verify = false;
            }
            return true;
        }
        return false;
    }
    // 确认密码单独验证
    function checkPwd(ele, span) {
        var name = ele.name;
        if (name == "canPwd") {
            if (ele.value) {
                if ($("input[name='loginPwd']", form)[0].value == ele.value) {
                    span.innerHTML = formVidity[name].ok;
                    span.style.color = "green";
                    formVidity[name].verify = true;
                } else {
                    span.innerHTML = formVidity[name].prompt;
                    span.style.color = "red";
                    formVidity[name].verify = false;
                }

            } else {
                span.innerHTML = formVidity[name].empty;
                span.style.color = "red";
                formVidity[name].verify = false;
            }
            return true;
        }
        return false;
    }
    // 给输入框添加 获得焦点 与 失去焦点 事件
    (function () {
        each(formEle.item, function (ele) {
            var input = $("input", ele)[0];
            var select = $("select", ele)[0];
            var span = $("span", ele)[0];
            if (input) {
                EventUtil.addHandler(input, "focus", function () {
                    span.innerHTML = formVidity[this.name].empty;
                    span.style.color = "orange";
                });
                EventUtil.addHandler(input, "blur", function () {
                    verification(this, span);
                });
            } else if (select) {
                formEle.select.push(select);
            }
        });
    })();
    // 证件类型 与 旅客类型 选择是否已选，返回布尔值
    function isOption() {
        var result = true;
        each(formEle.select, function (ele) {
            if (ele.value == "default") {
                result = false;
            }
        });
        return result;
    }
    // 提交验证
    function submitVerify() {
        var verify = {
            input: true,
            select: true
        };
        each(formVidity, function (ele) {
            if (!ele.verify) {
                verify.input = false;
            }
        });
        if (verify.input) {
            verify.input = formEle.agreement.checked;
        }
        verify.select = isOption();
        if (verify.input && verify.select) {
            return true;
        } else {
            return false;
        }
    }
    // 提交按钮 添加点击事件
    EventUtil.addHandler(formEle.submit, "click", function () {
        if (submitVerify()) {
            window.open(this.getAttribute("data-url"));
        }else{
            alert("提交失败！");
        }
    });
})();