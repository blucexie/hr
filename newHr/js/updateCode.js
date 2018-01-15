/**
 * Created by blucexie on 2017/9/25.
 */
$(function () {

    /*短信验证*/
    $('.btn').click(function () {
        $(this).css('background','#463e4c');
        $(this).attr('disabled','disabled');
        showLoader();
        var code=$("#inpId").val();

        if(code =="" || code.length!=7){
            layer.open({
                content: '请正确输入授权码'
                ,btn: '确定'
            });
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
                var verifyIdCard = jsonData.item.verifyIdCard;
                var userCode = jsonData.item.userCode;
                var enterpriseName = jsonData.item.enterpriseName;
                var verifyCode = jsonData.item.verifyCode;
                var result = jsonData.item.result;
                var resultInfo = jsonData.item.resultInfo;
                sessionStorage.clear();
                sessionStorage.setItem("verifyName", verifyName);
                sessionStorage.setItem("verifyIdCard", verifyIdCard);
                sessionStorage.setItem("userCode", userCode);
                sessionStorage.setItem("enterpriseName", enterpriseName);
                sessionStorage.setItem("verifyCode", verifyCode);
                sessionStorage.setItem("authenCode", code);
                if(result===1001){
                    window.location.replace("/hr/employeeH.html");
                }else {
                    layer.open({
                        content: resultInfo
                        ,btn: '确定'
                    });
                    $('.btn').removeAttr('disabled','disabled');
                    hideLoader();
                }
            },
            error: function (XMLHttpRequest, textStatus) {
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