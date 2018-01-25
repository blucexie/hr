/**
 * Created by blucexie on 2017/9/20.
 */
$(function () {
    var  verifyName = sessionStorage.getItem("verifyName");
    var enterpriseName = sessionStorage.getItem("enterpriseName");
    var verifyIdCard = sessionStorage.getItem("verifyIdCard");
    $('.inpNameA').text(verifyName);
    $('.inpNumA').text(verifyIdCard);
    $('.inpCompanyA').text(enterpriseName);

    /*················*/

    $('.rBtn').click(function () {
        $(this).css('background','#463e4c');
        window.history.back(-1);
    })
});