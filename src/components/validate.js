export default{
    install(Vue){

        const errmsg = {
            required: '必填',
            exit: '此账号不存在，请先注册',
            length: '长度范围为6~20',
            reg: "只允许包含中文、英文、数字",
            equal: '两次输入不一致',
            mobile: '请输入正确的手机号'
        }
         //检查必填
        //是否填写规范（必填、长度、内容规范）
        Vue.prototype.isStandard = (value)=>{
            if(value.trim() === ""){
                return errmsg.required;
            }
            if(value.length < 6 || value.length > 20){
                return errmsg.length;
            }
            if(!/^[\w]{6,20}$/.test(value)){
                return errmsg.reg;
            }
        }

        Vue.prototype.isRequired = (value) => {
            if(value.trim() === ""){
                return errmsg.required;
            }
        }

        Vue.prototype.isMobile = (value) => {
            if(!/^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/.test(value)){
                return errmsg.mobile;
            }
        }

        Vue.prototype.isEqual = (str1, str2) => {
            if(str1 !== str2){
                return errmsg.equal;
            }
        }
        
        Vue.directive("uname", {
            bind(){
                console.log("bind");
            },
            update(el, binding, vnode){
                console.log(el);
                console.log(binding);
                console.log(vnode);
            }
        })


        // // 步骤：配置-校验-报错-取值

        // // 配置：配置规则 和配置报错，以及优先级
        // // 校验：有在 change 事件校验， 在点击提交按钮的时候校验， 当然也有在input事件取值的
        // // 报错：报错方式一般要分，报错的文字有模板，也有自定义的
        // // 取值：将通过验证的数据返还给开发者调用

        // // 配置
        // function formConfig(type, typeVal, errMsg, name, tag){
        //     this.type = type;  //type: nonvoid(非空), reg(正则), limit(区间), equal(与某个input相等)，unique(不能相同)
        //     this.typeVal = typeVal; //typeVal: 根据不同type设置不同的值
        //     this.errMsg = errMsg; //errMsg: 自定义的报错信息
        //     this.name = name; //name: 用来传ajax的字段，如Password, Username
        //     this.tag = tag; //tag：用来报错的名字，如‘银行账号'，‘姓名'
        // }

        // // 设置三种规则
        // // 1.默认规则： 只要绑定指令，就默认有的校验。 比如非空的校验。 可以额外加修饰符来去除
        // // 2.选项规则： 通过Vue指令的修饰符添加的规则。
        // // 3.自定义规则： Vue指令属性值上添加的规则。
        // // 同一个type的规则只存在一个，也就是说，如果type为reg(正则),那么会互相覆盖。 
        // // 覆盖的优先级： 自定义规则 > 选项规则 > 默认规则
        
        // // 流程： 绑定指令-> 设置配置(vaConfig) -> 校验(check) -> 报错(showErr) 或 自定义报错
        // var formValidate = {};
        // function unique(arr){
        //     var hashTable = {}, newArr = [];
        //     for(var i = 0; i < arr.length; i++){
        //         if(!hashTable[arr[i]]){
        //             hashTable[arr[i]] = true;
        //             newArr.push(arr[i]);
        //         }
        //     }
        //     return newArr;
        // }
        // function addClass(dom, _class){
        //     var hasClass = !!dom.className.match(new RegExp('(\\s|^)'+_class+'(\\s|$)'));
        //     if(!hasClass){
        //         dom.className += ''+_class
        //     }
        // }
        // //校验函数
        // function check(v, conditions){
        //     var res = 0; //0代表ok,若为数组代表是某个字段的错误
        //     //验证函数
        //     var cfg = {
        //         //非空
        //         nonvoid: (v, bool)=>{
        //             if(bool){
        //                 return v.trim() ? 0 : ['nonvoid'];
        //             }else{
        //                 return 0;
        //             }
        //         },
        //         reg: (v, reg) => reg.test(v) ? 0 : ['reg'], //正则
        //         limit: (v, interval) => (+v >= interval[0] && +v <= interval[1]) ? 0 : ['limit', interval],
        //         equal: (v, target) => {
        //             var _list = ddocument.getElementsByName(target), _target;
        //             for(var i = 0; i < _list.length; i++){
        //                 if(_list[i].className.indexOf('va') > -1){
        //                     _target = _list[i];
        //                 }
        //             }
        //             return (_target.value === v) ? 0 : ['equal', _target.getAttribute('tag')]
        //         },
        //         unique: (v) => {
        //             var _list = document.getElementsByClassName('unique'),
        //                 valList = [].map.call(_list, item => item.value);
        //             return (unique(valList).length === valList.length) ? 0 : ['unique']
        //         }
        //     }
        //     for(var i = 0; i < conditions.length; i++){
        //         var condi = conditions[i],
        //             type = condi.type,
        //             typeVal = condi.typeVal;
        //         res = cfg[type](v, typeVal);
        //         console.log(res);
        //         if(res){
        //             res = condi.errMsg || res;
        //             break;
        //         }
        //     }
        //     return res;
        // }
        // function showErr(name, checkResult){
        //     var type = checkResult[0],
        //         ext = checkResult[1] || [];
        //     var ERR_MSG = {
        //         nonvoid: `${name}不能为空`,
        //         reg: `${name}格式错误`,
        //         limit: `${name}必须在${ext[0]}与${ext[1]}之间`,
        //         equal: `两次${ext}不相同`,
        //         unique: `${name}重复`
        //     }
        //     layer.msgWarn(ERR_MSG[type])
        // }

       

    }
}