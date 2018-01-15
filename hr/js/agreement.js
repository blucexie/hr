/**
 * Created by blucexie on 2017/9/20.
 */
$(function () {

    var  aaName = sessionStorage.getItem("name");
    var  aid = sessionStorage.getItem("id");
    var  auCompanyName = sessionStorage.getItem("companyName");
    $('.inpNameA').val(aaName);
    $('.inpNumA').val(aid);
    $('.inpCompanyA').val(auCompanyName);



    /*················*/

    $('.rBtn').click(function () {
        $(this).css('background','#463e4c');
        window.history.back(-1);
    })
});