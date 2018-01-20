/**
 * Created by blucexie on 2017/9/20.
 */
$(function () {
    var  vName = sessionStorage.getItem("verifyName");
    var enterpriseName = sessionStorage.getItem("enterpriseName");
    var verifyIdCard = sessionStorage.getItem("verifyIdCard");
    var  aaName = sessionStorage.getItem("name");
    var  aid = sessionStorage.getItem("id");
    var  auCompanyName = sessionStorage.getItem("companyName");
    $('.inpNameA').val(vName);
    $('.inpNumA').val(verifyIdCard);
    $('.inpCompanyA').val(enterpriseName);



    /*················*/

    $('.rBtn').click(function () {
        $(this).css('background','#463e4c');
        window.history.back(-1);
    })
});