let kits = {
    //获取当前路由名称
    getRouterName(href) {
        let routerName = '';
        if (href.indexOf('?') === -1) {
            routerName = href.substring(href.lastIndexOf('/') + 1);
        } else {
            routerName = href.substring(href.lastIndexOf('/') + 1, href.indexOf('?'));
        }
        return routerName;
    }
}

//状态模式
let regxMethods = {
    isEmpty(val, msg) {
        if (val.trim().length === 0) {
            return msg;
        }
    },
    minLength(val, len, msg){
        if(val.length < len){
            return msg
        }
    },
    isNoReal(val1, val2, msg) {
        if (val1 !== val2) {
            return msg;
        }
    },
    isEmail(val, msg) {
        if (! /(\w+[@]\w+[.]\w+)/.test(val)) {
            return msg;
        }
    }
}

function regxFun() {
    this.regxArr = [];
}

regxFun.prototype.add = function (dom, rules) {
    for (let i = 0; i < rules.length; i++) {
        let rule = rules[i];
        let fn = function () {
            let params = rule.funName.split(':');
            let fname = params.shift();
            params.unshift(dom.value);
            params.push(rule.msg);
            return regxMethods[fname].apply(dom, params);
        }
        this.regxArr.push(fn);
    }
}
regxFun.prototype.start = function () {
    for (let i = 0; i < this.regxArr.length; i++) {
        let errMsg = this.regxArr[i]();
        if (errMsg) {
            return errMsg;
        }
    }
}

//获得url？后的参数并用键值对存储
function getUrlSearch(){
    let href = location.search.substring(1).split('&');
    let params = {};
    href.forEach((e,i) => {
        let arr = e.split('=');
        params[arr[0]] = arr[1];
    })
    return params;
}
