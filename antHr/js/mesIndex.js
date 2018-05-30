/**
 * Created by blucexie on 2017/9/26.
 */
$(function () {

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
        errTxt5 : '请输入正确验证码',
        errTxt6:'阅读并同意协议',
        norm_name : /^(([\u4e00-\u9fa5]{2,8})|([a-zA-Z]{2,16}))$/,
        norm_job: /^(([\u4e00-\u9fa5]{2,16})|([a-zA-Z]{2,16}))$/,
        norm_iph : /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
        //  norm_iph :  /\\d{3})\\d{4}(\\d{4})", "$1****$2"/,
        norm_id : /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
        norm_cNum : /^\d{7}$/,
        norm_cbk:'1'
    };


    //姓名校验
    /*   eles.inpName.on('change',function(){
     eles.inpName.validator( eles.norm_name, eles.err1, eles.errTxt1 );
     });
     //职位校验
     eles.inpJob.on('change',function(){
     eles.inpJob.validator( eles.norm_job, eles.err2, eles.errTxt2 );
     });
     //联系方式校验
     eles.inpPhone.on('change',function(){
     eles.inpPhone.validator( eles.norm_iph, eles.err3, eles.errTxt3);
     });*/
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
            /* eles.inpName.validator( eles.norm_name, eles.err1, eles.errTxt1 ) &&
             eles.inpJob.validator( eles.norm_job, eles.err2, eles.errTxt2 ) &&
             eles.inpPhone.validator( eles.norm_iph, eles.err3, eles.errTxt3 ) &&*/
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
                $('.st-error').hide();
            },1500);
        }
    });

   /*获取cookie*/
    function getCookie(name){
        //document.cookie.setPath("/");
        var arr, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
        {
            return unescape(arr[2]);
        }
        else
        {
            return null;
        }
    }
    var  vName = unescape(getCookie("verifyName"));
    var  vJob =  unescape(getCookie("verifyJob"));
    var  vMobile =  unescape(getCookie("verifyMobile"));
    var  verifyCode =  unescape(getCookie("verifyCode"));
    var enterpriseName = unescape(getCookie("enterpriseName"));
    var cCode = unescape(getCookie("cCode"));
    $('#inpName').val(vName);
    $('#inpJob').val(vJob);
    $('#inpPhone').val(vMobile);
    $('.companyName').text(enterpriseName);
    /*确认核验*/
    $('.submitM').click(function () {
        $(this).css('background','#463e4c');
        var $cbk = $('#check1');
            if($cbk.is(':checked')){
                send()
            }else{
                return false
            }

        function send() {
            var mCode = $('#inpId').val();
            $.ajax({
                url:'https://apix.funinhr.com/api/agree/verify',
                type: "POST",
                dataType:"json",
                data:"{\"verifyIdCard\":\""+mCode+"\"," +
                "\"verifyCode\":\""+verifyCode+"\"," +
                "\"authenCode\":\""+cCode+"\"}",
                success: function (data) {
                    console.log(data);
                    var jsonData = eval("data="+data['plaintext']);
                    var result = jsonData.item.result;
                    var msg = jsonData.item.msg;
                    if(result===1001){
                        $('.hint').show().text(msg);
                        setTimeout(function () {
                            $('.hint').hide()
                        },1500);
                    }else if(result===1004){
                        $('.hint').show().text(msg);
                        setTimeout(function () {
                            $('.hint').hide()
                        },1500);
                    }
                },
                error: function () {
                    window.location.href = '../nFind.html';
                }
            })
        }

    })
});