$(function () {
    //控制输入框只能输入一位并且是数字
    $(".inputCont-one").focus();
        var txts = on.getElementsByTagName("input");
        for (var i = 0; i < txts.length; i++) {
            var t = txts[i];
            t.index = i;
            t.setAttribute("readonly", true);
            t.onkeyup = function (e) {
                if (this.value = this.value.replace(/\D/g, '')) {
                    var next = this.index + 1;
                    if (next > txts.length - 1) return;
                    txts[next-1].setAttribute("readonly", true);
                    txts[next].removeAttribute("readonly");
                    txts[next].focus();
                } 
                else if (e.key == 'Backspace') {
                    var text = this.value;
                    if (!text) {
                        var prev = this.index - 1;
                        txts[prev].focus();
                        for (var i = 0; i < txts.prev; i++) {
                            txts[i].prev.setAttribute("readonly", true);
                        }
                    }
                }
                else {
                    $(this).focus();
                }
                 if (e.key == 'Backspace') {
                     var text = this.value;
                     if(text===0) return;
                     if (!text) {
                         var prev = this.index - 1;
                         if(prev==-1) return false;
                         txts[prev].removeAttribute("readonly");
                         txts[prev].focus(); 
                     }
                 }
            }
        }
        txts[0].removeAttribute("readonly");


  
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
            timeout:5000,
            dataType:"json",
            data:"{\"authenCode\":\""+code+"\"}",
            success: function (data) {
               var jsonData = JSON.parse(data['plaintext']);
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