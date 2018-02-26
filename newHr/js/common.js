
/**
 * 校验手机号码有效性
 * @param  {[type]}  mobile [description]
 * @return {Boolean}        [description]
 */
function isValidPhone(mobile){
/*校验手机号码*/
    var re = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|19[0-9]|14[57])[0-9]{8}$/;
    return re.test(mobile);
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
	//var jName = /^[\u4e00-\u9fa5]{2,15}$|^[a-zA-Z]{3,30}$/;
	var jName = /(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\.·。]{0,8}[\u4e00-\u9fa5]{1}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,8}[a-zA-Z]{1}$)/;
	return jName.test(name);
}

function checkICCard(resumeIdCard){
	if(resumeIdCard.length!==18){
             return false;
    }
    return true;
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