
/**
 * 校验手机号码有效性
 * @param  {[type]}  mobile [description]
 * @return {Boolean}        [description]
 */
function isValidPhone(mobile){
/*校验手机号码*/
   // var re = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|19[0-9]|14[57])[0-9]{8}$/;
    var re = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
    return re.test(mobile);
}
// 校验固话
function istel(mobile){
   var tel = /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))?$/;
   return tel.test(mobile);
}
/**
 * 隐藏loader
 * @return {[type]} [description]
 */
function hideLoader(){
	$('#loading').hide();
    $('.zhezhaoL').hide();
}

/**
 * 隐藏loader
 * @return {[type]} [description]
 */
function showLoader(){
	$('#loading').show();
    $('.zhezhaoL').show();
}

/**
 * 校验用户/证明人等名称
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function checkUserFullName(name){
	var jName = /(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\.·。]{0,8}[\u4e00-\u9fa5]{1}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,8}[a-zA-Z]{1}$)/;
	return jName.test(name);
}

function checkICCard(resumeIdCard){
    var idCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    return idCard.test(resumeIdCard);
	/* if(resumeIdCard.length!==18){
             return false;
    }
    return true; */
}
function checkCode(validateCode){
    if(validateCode.length!==7){
        return false;
    }
    return true;
}

//校验工资
function checkBalance(balance){
    var isNum = /^[0-9]*$/;
    return isNum.test(balance);
}

     /**
     *  模糊查询方法
     * @param {*} doc 元素 
     * @param {*} name 参数
     * @param {*} selectName .后面的名称
     * @param {*} parmName 参数名称
     * @param {*} apiName 接口名称
     */
    function autoFinish(doc, name, selectName, parmName, apiName) {
        doc.autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: 'https://apix.funinhr.com/api/get/' + apiName + '/search',
                    type: "POST",
                    dataType: "json",
                    data: "{\"" + parmName + "\":\"" + name + "\"}",
                    success: function (data) {
                        console.log(data)
                        var jsonData = eval("data=" + data['plaintext']);
                        var newArray = [];
                        newArray = jsonData.item[selectName];
                        response(newArray);
                    }
                });
            },
            minLength: 2,
            open: function (event, ui) {
                $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
            }

        });
    }
