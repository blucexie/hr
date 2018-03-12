$(function () {

/*短信验证*/
    $('.btn').click(function () {
        $(this).attr('disabled','disabled');
        showLoader();
         var code=$("#inpId").val();
        if(code =="" || code.length!=7){
            layer.open({
                content: '请正确输入授权码'
                ,btn: '确定'
            });
            $(this).removeAttr('disabled','disabled');
            hideLoader();
            return;
        }
        $.ajax({
            url:'https://apix.funinhr.com/api/agree/colleague/verify/before',
            type: "POST",
            dataType:"json",
            data:"{\"authenCode\":\""+code+"\"}",
            success: function (data) {
               /* console.log(data);*/
                var jsonData = eval("data="+data['plaintext']);
                var verifyName = jsonData.item.verifyName;/*姓名*/
                var companyName = jsonData.item.companyName;/*公司名称*/
                var enterpriseName = jsonData.item.enterpriseName;/*核验人面试的公司*/
                var verifyJob = jsonData.item.verifyJob;/*上家职位*/
                var jobStartTime = jsonData.item.jobStartTime;/*入职时间*/
                var jobEndTime = jsonData.item.jobEndTime;/*离职时间*/
                var colleagueCode = jsonData.item.colleagueCode;/*同事编码*/
                var colleagueName = jsonData.item.colleagueName;/*同事名字*/
                var result = jsonData.result;/*返回结果*/
                var resultInfo = jsonData.item.resultInfo;/*返回结果*/
                try{
                    sessionStorage.clear();
                    sessionStorage.setItem("verifyName", verifyName);/*姓名*/
                    sessionStorage.setItem("companyName", companyName);/*公司名称*/
                    sessionStorage.setItem("verifyJob", verifyJob);/*上家职位*/
                    sessionStorage.setItem("jobStartTime", jobStartTime);/*入职时间*/
                    sessionStorage.setItem("jobEndTime", jobEndTime);/*离职时间*/
                    sessionStorage.setItem("colleagueCode", colleagueCode);/*同事编码*/
                    sessionStorage.setItem("colleagueName", colleagueName);/*同事名字*/
                    sessionStorage.setItem("enterpriseName", enterpriseName);/*核验人面试的公司*/
                }catch(e){
                    layer.open({
                        content: "请关闭无痕模式重新尝试"
                        ,btn: '确定'
                    });
                }
               
                if(result===1001){
                    sessionStorage.setItem("code", code);/*授权码*/
                    window.location.href = 'checkIndex.html';
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