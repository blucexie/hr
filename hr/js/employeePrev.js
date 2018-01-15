/**
 * Created by blucexie on 2017/12/16.
 */
$(function () {
    /*填充企业名称*/
    $.ajax({
        url:'https://apix.funinhr.com/api/get/qr/enterprise',
        type: "POST",
        dataType:"json",
        data: JSON.stringify({
            userCode:"5a2284afab5a442cdf81ab7b"
        }),
        success: function (data) {
            console.log(data);
            var jsonData = JSON.parse(data['plaintext']);
            var enterpriseName = jsonData.item.enterpriseName;
            $('.companyName').text(enterpriseName)
        }
    });

    /*发送验证码*/
    $('#mesBtn').click(function () {
        if($('#mesBtn').attr('disabled')=='disabled'){
            return;
        }
        var mobile = $('#resumeMobile').val();
        if(mobile ==""){
            layer.open({
                content: '手机号不能为空'
                ,btn: '确定'
            });

        }
        else{
            if (isValidPhone(mobile)) {
                showLoader();
                $.ajax({
                    url:'https://apix.funinhr.com/api/send/qr/verify/SMS',
                    type: "POST",
                    timeout:5000,
                    dataType:"json",
                    data:"{\"mobile\":\""+mobile+"\"}",
                    success: function (data) {
                        console.log(data);
                        hideLoader();
                        var jsonData = eval("data="+data['plaintext']);
                        if (jsonData == undefined || jsonData.item == undefined){
                            layer.open({
                                content: '网络异常，请稍后重试'
                                ,btn: '确定'
                            });
                            return;
                        }
                        var result = jsonData.item.result;
                        var resultInfo = jsonData.item.resultInfo;
                        if(result===2001){
                            layer.open({
                                content: '短信发送成功'
                                ,btn: '确定'
                            });
                            timer =  setInterval( countDown,1000);
                        }else {
                            layer.open({
                                content: resultInfo
                                ,btn: '确定'
                            });
                        }
                    },
                    error: function (XMLHttpRequest, textStatus) {
                        layer.open({
                            content: '网络异常，请稍后重试'
                            ,btn: '确定'
                        });
                        hideLoader();
                    }
                });
            } else {
                layer.open({
                    content: '请输入正确的手机号码'
                    ,btn: '确定'
                });

            }
        }
    });
});

var s = 60;
var isLock = true;
var timer = null;
//验证码发送倒计数
function countDown() {
    $('#mesBtn').attr('disabled','disabled');
    s--;
    $('#mesBtn').text(s+'s后重试');
    if(s===0){
        clearInterval(timer);
        $('#mesBtn').removeAttr('disabled');
        $('#mesBtn').text('重新获取');
        isLock = true;
        s = 60;
    }
}