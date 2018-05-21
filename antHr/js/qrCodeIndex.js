/**
 * Created by blucexie on 2017/9/26.
 */
$(function () {

        /*获取userCode*/
        function GetQueryString(name)
        {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
        }
        var userCode = GetQueryString("userCode");
      //  var userCode = '59c0cbdeab5a444c7e91a786';
        $.ajax({
            url:'https://apix.funinhr.com/api/get/qr/enterprise',
            type: "POST",
            dataType:"json",
            data:"{\"userCode\":\""+userCode+"\"}",
            success: function (data) {
              //  console.log(data);
                var jsonData = eval("data="+data['plaintext']);
                var enterpriseName = jsonData.item.enterpriseName;
                $('.companyName').text(enterpriseName)
            }
        });
    /*input校验*/
    var eles = {
        form : $('#deForm'),
        inpName : $('[name="inpName"]'),
        inpJob : $('[name="inpJob"]'),
        inpPhone : $('[name="inpPhone"]'),
        inpId : $('[name="inpId"]'),
        inpNum : $('[name="inpNum"]'),
        inpCbk:$('.input_check'),
        submit : $('#submit'),
        err1 : $('#err1'),
        err2 : $('#err2'),
        err3 : $('#err3'),
        err4 : $('#err4'),
        err5: $('#err5'),
        err6 : $('#err6'),
        errTxt1 : '请输入正确的姓名',
        errTxt2 : '请输入正确的职位',
        errTxt3 : '请输入正确的联系方式',
        errTxt4 : '请输入正确的身份证号',
        errTxt5 : '请输入正确的验证码',
        errTxt6:'阅读并同意协议',
        norm_name : /^(([\u4e00-\u9fa5]{2,8})|([a-zA-Z]{2,16}))$/,
        norm_job: /^(([\u4e00-\u9fa5]{2,16})|([a-zA-Z]{2,16}))$/,
        norm_iph : /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
        norm_id : /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
        norm_cNum : /^\d{6}$/,
        norm_cbk:'1'
    };



    //姓名校验
       eles.inpName.on('change',function(){
     eles.inpName.validator( eles.norm_name, eles.err1, eles.errTxt1 );
     });
     //职位校验
     eles.inpJob.on('change',function(){
     eles.inpJob.validator( eles.norm_job, eles.err2, eles.errTxt2 );
     });
     //联系方式校验
     eles.inpPhone.on('change',function(){
     eles.inpPhone.validator( eles.norm_iph, eles.err3, eles.errTxt3);
     });
    //身份证号码校验
    eles.inpId.on('change',function(){
        eles.inpId.validator( eles.norm_id, eles.err4, eles.errTxt4 );
    });
    //验证码校验
    eles.inpNum.on('change',function(){
        eles.inpNum.validator( eles.norm_cNum, eles.err5, eles.errTxt5 );
    });
    //协议是否选中
    eles.inpCbk.on('change',function(){
        eles.inpCbk.validator( eles.norm_cbk, eles.err6, eles.errTxt6 );
    });

    //提交
    eles.submit.on('click',function(){
        if(
             eles.inpName.validator( eles.norm_name, eles.err1, eles.errTxt1 ) &&
             eles.inpJob.validator( eles.norm_job, eles.err2, eles.errTxt2 ) &&
             eles.inpPhone.validator( eles.norm_iph, eles.err3, eles.errTxt3 ) &&
        eles.inpId.validator( eles.norm_id, eles.err4, eles.errTxt4 ) &&
        eles.inpNum.validator( eles.norm_cNum, eles.err5, eles.errTxt5 )&&
        eles.inpCbk.validator( eles.norm_cbk, eles.err6, eles.errTxt6)
        ) {
            /*eles.form.submit();*/
        }else{
            /* var $error = $('.st-error');
             $error.each(function (index,item) {
             if($(this).attr('style')=="display:inline-block"){
             setTimeout(function () {
             $error.hide();
             },2000)
             }
             });*/
            /*if($error.attr('style')=="display:inline-block"){
             setTimeout(function () {
             $error.hide();
             },2000)
             }*/
            setTimeout(function () {
                $('.st-error').hide()
            },1500);
        }
    });

    /*发送验证码*/
    var $mesBtn = $('.mesBtn');
    var s =60;
    var isLock = true;
    var timer = null;
    function countDown() {
        s--;
        $mesBtn.val(s+'s后重试');
        if(s===0){
            clearInterval(timer);
            $mesBtn.val('重新发送');
            isLock = true;
            s = 60;
        }
    }

    $mesBtn.click(function () {
            if(isLock){
                timer =  setInterval( countDown,1000);
                var mobile = $('#inpPhone').val();
                $.ajax({
                    url:'https://apix.funinhr.com/api/send/qr/verify/SMS',
                    type: "POST",
                    dataType:"json",
                    data:"{\"mobile\":\""+mobile+"\"}",
                    success: function (data) {
                        console.log(data);
                        var jsonData = eval("data="+data['plaintext']);
                        var result = jsonData.item.result;
                        var msg = jsonData.item.msg;
                        if(result===2001){

                        }else if(result===2002){
                            alert('短信发送失败')
                        }else if(result===2003){
                            alert('短信发送次数太多')
                        }
                    }
                });
                isLock = false;
            }

    });

   /*确认核验*/
    $('#submit').click(function () {
        $(this).css('background','#463e4c');
        var $cbk = $('#check1');
       // var userCode = userCode;
        var verifyName = $('#inpName').val();
        var verifyJob = $('#inpJob').val();
        var verifyMobile = $('#inpPhone').val();
        var verifyIdCard = $('#inpId').val();
        var validateCode = $('#inpNum2').val();
        if($cbk.is(':checked') && verifyName!='' &&
            verifyJob!='' && verifyMobile!='' && verifyIdCard!='' && validateCode!=''){
            send()
        }else{
            return false
        }
        function send() {
            $.ajax({
                url:'https://apix.funinhr.com/api/save/qr/verify',
                type: "POST",
                dataType:"json",
                data:"{\"userCode\":\""+userCode+"\"," +
                "\"verifyName\":\""+verifyName+"\"," +
                "\"verifyJob\":\""+verifyJob+"\"," +
                "\"verifyMobile\":\""+verifyMobile+"\"," +
                "\"verifyIdCard\":\""+verifyIdCard+"\"," +
                "\"validateCode\":\""+validateCode+"\"}",
                success: function (data) {
                    console.log(data);
                    var jsonData = eval("data="+data['plaintext']);
                    var result = jsonData.item.result;
                    var msg = jsonData.item.msg;
                    if(result===1001){
                        $('.hint').show().text('授权成功');
                        setTimeout(function (){
                            $('.hint').hide()
                        },1500);
                    }else if(result===1004){
                        $('.hint').show().text('失败');
                        setTimeout(function () {
                            $('.hint').hide()
                        },1500);
                    }else if(result ===3001){
                        $('.hint').show().text('信息已存在');
                        setTimeout(function () {
                            $('.hint').hide()
                        },1500);
                    }else if(result===2004){
                        $('.hint').show().text('验证码错误');
                        setTimeout(function () {
                            $('.hint').hide()
                        },1500);
                    }else if(result===2005){
                        $('.hint').show().text('验证码过期');
                        setTimeout(function () {
                            $('.hint').hide()
                        },1500);
                    }else if(result===2012){
                        $('.hint').show().text('身份证姓名不匹配');
                        setTimeout(function () {
                            $('.hint').hide()
                        },1500);
                    }else if(result===1002){
                        if (msg == 'params error:verifyName') {
                            $('.hint').show().text('姓名格式错误');
                            setTimeout(function () {
                                $('.hint').hide()
                            },1500);
                        }
                        if (msg == 'params error:verifyMobile') {
                            $('.hint').show().text('手机号格式错误');
                            setTimeout(function () {
                                $('.hint').hide()
                            },1500);
                        }
                        if (msg == 'params error:verifyIdCard') {
                            $('.hint').show().text('身份证格式错误');
                            setTimeout(function () {
                                $('.hint').hide()
                            },1500);
                        }
                        if (msg == 'params error:verifyJob') {
                            $('.hint').show().text('申请职位格式错误');
                            setTimeout(function () {
                                $('.hint').hide()
                            },1500);
                        }
                    }
                },
                error: function () {
                    window.location.href ='../nFind.html';
                }
            })
        }

    })
});