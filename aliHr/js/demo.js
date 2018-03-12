/**
 * Created by blucexie on 2017/11/27.
 */
$(function () {
    /*增加教育信息*/
$('#submit').click(function () {

    $('.educationTable').each(function (index,demo){
       $(demo).find('input').each(function (i,dd) {
           if($(this).val()==""){
               $('.hint').show().text($(this).attr('data-s'));
               setTimeout(function (){
                   $('.hint').hide()
               },1500);
               return false;
           }
       })
    })
});

    var eIndex = 1;
    var x = 1;
    var isZ = true;
    $('.addEducation').click(function () {
        eIndex++;
        if(eIndex===4){
            isZ =false;
        }
        if(isZ){
            var starClass = 'StartTime';
            var endClass = 'EndTime';
            var eduClass = 'eduS';
            x++;
            starClass+=x;
            endClass+=x;
            eduClass+=x;
            var $school = ('<div class="lineSpacingE"></div><form class="educationTable" action="">' +
            '<div><span>学校名称</span><input class="schoolName"  type="text" name="schoolName" placeholder="请输入学校名称"></div>' +
            '<div><span class="edu">学历</span><input  class='+eduClass+'   type="text" name="eduS" placeholder="请选择学历"></div>' +
            '<div><span class="career">专业</span><input  class="specialty"   type="text" name="specialty" placeholder="请输入专业名称"></div>' +
            '<div><span>入学时间</span><input class='+starClass+'  type="text" name="StartTime" placeholder="请选择入学时间"></div>'+
            '<div><span>毕业时间</span><input  class='+endClass+'  type="text" name="EndTime" placeholder="请选择毕业时间"></div></form>');

            $('.upEducation').before($school);




        }
    });
})