/**
 * Created by blucexie on 2017/9/25.
 */
$(function () {
    //控制输入框只能输入一位并且是数字
    $(".inputCont-one").focus();
    $(".line-one").hide()
    onload = function () {
        var txts = on.getElementsByTagName("input");
        for (var i = 0; i < txts.length; i++) {
            var t = txts[i];
            t.index = i;
            t.setAttribute("readonly", true);
            t.onkeyup = function () {
                if (this.value = this.value.replace(/\D/g, '')) {
                    var next = this.index + 1;
                    if (next > txts.length - 1) return;
                    txts[next].removeAttribute("readonly");
                    txts[next].focus();
                } else {
                    $(this).focus();
                }
            }
        }
        txts[0].removeAttribute("readonly");
    }

    /*短信验证*/
    $('.btn').click(function () {
        var code="";
        $('.passInput input').each(function(index,element){
            code+=$(this).val()
        })
        $(this).attr('disabled','disabled');
        showLoader();
        if(code =="" || code.length!=7){
            layer.open({
                content: '请输入7位授权码'
                ,btn: '确定'
            });
            $(this).removeAttr('disabled','disabled');
            hideLoader();
            return;
        }

        $.ajax({
            url:'https://apix.funinhr.com/api/agree/verify/before',
            type: "POST",
            timeout:5000,
            dataType:"json",
            data:"{\"authenCode\":\""+code+"\"}",
            success: function (data) {
                var jsonData = eval("data="+data['plaintext']);
                var verifyName = jsonData.item.verifyName;
                var enterpriseName = jsonData.item.enterpriseName;
                var verifyMobile = jsonData.item.verifyMobile;
                var verifyJob = jsonData.item.verifyJob;
                var verifyCode = jsonData.item.verifyCode;
                var userCode = jsonData.item.userCode;
                var result = jsonData.item.result;
                var resultInfo = jsonData.item.resultInfo;
                try {
                    sessionStorage.clear();
                    sessionStorage.setItem("verifyName", verifyName);
                    sessionStorage.setItem("verifyMobile", verifyMobile);
                    sessionStorage.setItem("verifyJob", verifyJob);
                    sessionStorage.setItem("verifyCode", verifyCode);
                    sessionStorage.setItem("enterpriseName", enterpriseName);
                    sessionStorage.setItem("userCode", userCode);
                    sessionStorage.setItem("authenCode", code);
                } catch(e) {
                    layer.open({
                        content: "请关闭无痕模式重新尝试"
                        ,btn: '确定'
                    });
            
                }
                
                if(result===1001){
                    window.location.replace("verifyPre.html");
                }else {
                    layer.open({
                        content: resultInfo
                        ,btn: '确定'
                    });
                    $('.btn').removeAttr('disabled','disabled');
                    hideLoader();
                }
            },
            error: function (XMLHttpRequest, textStatus){
                layer.open({
                    content: '网络异常，请稍后重试'
                    ,btn: '确定'
                });
                $('.btn').removeAttr('disabled','disabled');
                hideLoader();
            }
        });
    });
});