/**
 * Created by blucexie on 2017/9/26.
 */
$(function () {
    var verifyName= sessionStorage.getItem("verifyName");/*姓名*/
    $("#verifyName").html(verifyName);
    var companyName= sessionStorage.getItem("companyName");/*公司名称*/
    $("#inpName").html(companyName);

    var verifyJob= sessionStorage.getItem("verifyJob");/*上家职位*/
    $(".verifyJob").html(verifyJob);
    var jobStartTime= sessionStorage.getItem("jobStartTime");/*入职时间*/
    $(".jobStartTime").html(jobStartTime);
    var jobEndTime= sessionStorage.getItem("jobEndTime");/*入职时间*/
    $(".jobEndTime").html(jobEndTime);
    var colleagueName= sessionStorage.getItem("colleagueName");/*同事名字*/
    $("#colleagueName").html(colleagueName);
    var enterpriseName= sessionStorage.getItem("enterpriseName");/*核验人面试公司*/
    $("#enterpriseName").html(enterpriseName);
    var colleagueCode= sessionStorage.getItem("colleagueCode");/*同事编码*/

    var code= sessionStorage.getItem("code");/*授权码*/

    /*确认核验*/
    var basicPass = true;
    $('.real').click(function () {
        showLoader();
        var colleagueResult=1;

            var colleagueIdcard = $("#inpId").val();
            var colleagueRelationship = $('.colleagueRelationship').val();
            if (colleagueIdcard.length !=18) {
                layer.open({
                    content: '请输入有效的证件号',
                    btn: '确定',
                    yes: function(index){
                        layer.close(index);
                    }
                });
                hideLoader();
                basicPass = false;
                return false;
            }
        if (!basicPass) return false;
        //获取json数据
        var json = {
            "colleagueCode":colleagueCode,
            "colleagueIdcard":colleagueIdcard,
            "colleagueResult":colleagueResult,
            "colleagueRelationship":colleagueRelationship,
            "authenCode":code,
            "colleagueResultInfo":{
                "colleagueName":"1",
                "verifyJob":"1",
                "jobStartTime":"1",
                "jobEndTime":"1"}
        };
        //将json数据转换成字符串
        var jsonstring = JSON.stringify(json);
            $.ajax({
                url:'https://apix.funinhr.com/api/agree/colleague/verify',
                type: "POST",
                dataType:"json",
                data:jsonstring,
                success: function (data) {
                   /* console.log(data);*/
                    hideLoader();
                    var jsonData = JSON.parse(data['plaintext']);
                    var result = jsonData.item.result;
                    var resultInfo = jsonData.item.resultInfo;
                    if(result===1001){
                        window.location.replace("succeed.html");
                    }else{
                        layer.open({
                            content: resultInfo
                            ,btn: '确定'
                        });
                        hideLoader();
                    }
                },
                error: function (XMLHttpRequest, textStatus) {
                    window.location.replace("netless.html");
                }
            });
    });


    /* 证明人关系 */
    var data2 = [
        {'id': '10001', 'value': '普通同事'},
        {'id': '10002', 'value': '上级领导'},
        {'id': '10003', 'value': '下级'},
        {'id': '10003', 'value': 'HR'}

    ];

    window.workRe = function (dom) {

        dom.addEventListener('click', function () {
            var bankSelect = new IosSelect(1,
                [data2],
                {

                    itemHeight: 50,
                    itemShowCount: 3,
                    callback: function (selectOneObj) {
                        dom.value = selectOneObj.value;

                    }
                });
        });
    };

    workRe(document.querySelector('.colleagueRelationship'));

    /*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

    var reportArray=[];
    $(":checkbox").click(function() {
        /*选中时，为真*/
        if ($(this).prop("checked")){

                $(this).parent("label").addClass("ling-xuan").removeClass("ling-wei");
                var report =$(this).parent().parent().html();
                var reportType=report.replace(/[^\u4e00-\u9fa5]/gi,"");
                reportArray.push(reportType);
        }else{
            $(this).parent("label").addClass("ling-wei").removeClass("ling-xuan");
            var reportremove =$(this).parent().parent().html();
            var reportTyperemove=reportremove.replace(/[^\u4e00-\u9fa5]/gi,"");
            for (var i = 0; i < reportArray.length; i++) {
                if (reportTyperemove== reportArray[i] ) {
                    reportArray.splice(i, 1);
                }
            }
        }
    });

    /*11111111111111111111111111111111111111*/
    var colleagueIdcard;
    $(".false").click(function () {
        colleagueIdcard = $("#inpId").val();
        if (colleagueIdcard.length !=18) {
            layer.open({
                content: '请输入有效的证件号',
                btn: '确定',
                yes: function(index){
                    layer.close(index);
                }
            });
            hideLoader();
           basicPass = false;
            return false;
        }

            $(".mask").show();
    });
    if (!basicPass) return false;

    $(".mask-cancel").click(function () {
        $(".mask").hide();
    });

    $(".mask-w").click(function(){
        showLoader();
        var colleagueName;
        var verifyJob;
        var jobStartTime;
        var jobEndTime;
        var colleagueResult;
        if (reportArray.length<1){
            layer.open({
                content: '请选择虚假项',
                btn: '确定',
                yes: function(index){
                    layer.close(index);
                    $(".mask").show();
                }
            });
            hideLoader();
            $(".mask").hide();

            return;
        }
        if(reportArray.length == 4){
            colleagueResult=2;
        }else {
            colleagueResult=3;
        }

        for(var i=0; i<reportArray.length; i++){
            if(reportArray[i] == "公司名称"){
                colleagueName="0";
                break;
            }else {
                colleagueName="1";
            }
        }
        for(var j=0; j<reportArray.length; j++){
            if(reportArray[j] == "职位"){
                verifyJob="0";
                break;
            }else{
                verifyJob="1";
            }
        }
        for(var a=0; a<reportArray.length; a++){
            if(reportArray[a] == "入职时间"){
                jobStartTime="0";
                break;
            }else {
                jobStartTime="1";
            }
        }
        for(var b=0; b<reportArray.length; b++){
            if(reportArray[b] == "离职时间"){
                jobEndTime="0";
                break;
            }else {
                jobEndTime="1";
            }
        }
        var json = {
            "colleagueCode":colleagueCode,
            "colleagueIdcard":colleagueIdcard,
            "colleagueResult":colleagueResult,
            "authenCode":code,
            "colleagueResultInfo":{
                "colleagueName":colleagueName,
                "verifyJob":verifyJob,
                "jobStartTime":jobStartTime,
                "jobEndTime":jobEndTime}
        };
        //转为JSON字符串
        var jsonstring = JSON.stringify(json);
        $.ajax({
            url:'https://apix.funinhr.com/api/agree/colleague/verify',
            type: "POST",
            dataType:"json",
            data:jsonstring,
            success: function (data) {
                hideLoader();
                var jsonData = JSON.parse(data['plaintext']);
                var result = jsonData.item.result;
                var resultInfo = jsonData.item.resultInfo;
                if(result===1001){
                    window.location.replace("succeed.html");
                }else{
                    layer.open({
                        content: resultInfo
                        ,btn: '确定'
                    });
                    hideLoader();
                }
            },
            error: function () {
                window.location.replace("netless.html");
            }
        });
    });
});