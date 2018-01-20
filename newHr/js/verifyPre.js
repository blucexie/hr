/**
 * Created by blucexie on 2017/12/16.
 */
$(function () {
    var enterpriseName = sessionStorage.getItem("enterpriseName");
    var  vName = sessionStorage.getItem("verifyName");
    var  vMobile = sessionStorage.getItem("verifyMobile");
    var  verifyCode = sessionStorage.getItem("verifyCode");
    var verifyJob = sessionStorage.getItem("verifyJob");
    var authenCode = sessionStorage.getItem("authenCode");
    var userCode = sessionStorage.getItem("userCode");
    $('.companyName').text(enterpriseName);
    $('#resumeName').val(vName);

    $('#resumeMobile').val(vMobile);
    $('#jobInterview').val(verifyJob);



    /*发送验证码*/
   /* $('#mesBtn').click(function () {
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
    });*/
    /*下一步*/
    $('.nextStep button').click(function () {
        var verifyIdCard = $('#resumeIdCard').val();
        showLoader();
        var basicInfo = {};
        var basicPass = true;
        var inputObject;
        $('.basicForm input').each(function () {
            if( $(this).val()== ''){
                inputObject = $(this);
                layer.open({
                    content: $(this).attr('placeholder')
                    ,btn: '确定',
                    yes: function(index){
                        layer.close(index);
                        inputObject.focus();
                    }
                });

                $(this).addClass('errorShow');
                basicPass = false;
                return false;
            }
            var itemPass = true;
            var itemVal = $(this).val();
            var itemName = $(this).attr('name');
            if (itemName == 'resumeIdCard'){
                itemPass = checkICCard(itemVal);
            }else if(itemName == 'resumeName'){
                itemPass = checkUserFullName(itemVal);
            }else if(itemName == 'resumeMobile'){
                itemPass = isValidPhone(itemVal);
            }

            if (!itemPass){
                inputObject = $(this);
                layer.open({
                    content: $(this).attr('data-attribute'),
                    btn: '确定',
                    yes: function(index){
                        layer.close(index);
                        inputObject.focus();
                    }
                });

                $(this).addClass('errorShow');
                basicPass = false;
                return false;
            }
            $(this).removeClass('errorShow');
            basicInfo[itemName] = itemVal;
        });
        basicInfo.userCode = userCode;
       // basicInfo.userCode ="5a4c42422384751673a1134d";
            $.ajax({
            url:'https://apix.funinhr.com/api/get/latest/resume',
            type: "POST",
            timeout:5000,
            dataType:"json",
            data:JSON.stringify(basicInfo),
            success: function (data){
                console.log(data);
                hideLoader();
                var jsonData = JSON.parse(data['plaintext']);
                if (jsonData == undefined || jsonData.item == undefined){
                    layer.open({
                        content: '网络异常，请稍后重试'
                        ,btn: '确定'
                    });
                    return;
                }
                var result = jsonData.item.result;
                var resumeStatus = jsonData.item.resumeStatus;
                var resultInfo = jsonData.item.resultInfo;
                var resumeArray = jsonData.item.resumeArray;
                var resumeStr = JSON.stringify(resumeArray);
                var basicStr = JSON.stringify(basicInfo);
                sessionStorage.userCode =userCode;
                if(result===1001){
                    if(resumeStatus==0){
                        sessionStorage.basicInfo = basicStr;
                        sessionStorage.verifyIdCard = verifyIdCard;
                        window.location.replace("employeeM.html");
                    }else if(resumeStatus==1){
                        layer.open({
                            content: '发现您曾经在易职信上传过简历，是否使用以前简历'
                            ,btn: ['使用旧简历', '创建新简历']
                            ,yes: function(index){
                                sessionStorage.basicInfo = basicStr;
                                sessionStorage.resumeArray = resumeStr;
                                sessionStorage.verifyIdCard = verifyIdCard;
                                window.location.replace("employeeM.html");
                            },no: function () {
                                sessionStorage.basicInfo = basicStr;
                                sessionStorage.verifyIdCard = verifyIdCard;
                                window.location.replace("employeeM.html");
                            }
                        });
                    }
                }else {
                    layer.open({
                        content: resultInfo,
                        btn: '确定'
                    });
                }
            },
            error: function () {
                layer.open({
                    content: '网络异常，请稍后重试'
                    ,btn: '确定'
                });
                hideLoader();
            }
        });
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