/**
 * Created by blucexie on 2017/10/18.
 */

$(function () {

    window.eduFn = function (dom) {

        dom.addEventListener('click', function () {
            var bankId = showBankDom.dataset['id'];
            var bankSelect = new IosSelect(1,
                [data],
                {

                    itemHeight: 50,
                    itemShowCount: 3,
                    oneLevelId: bankId,
                    callback: function (selectOneObj) {
                        dom.value = selectOneObj.value;

                    }
                });
        });
    };
    window.workFn1 = function (dom) {

        dom.addEventListener('click', function () {
            var bankId = showBankDom.dataset['id'];
            var bankSelect = new IosSelect(1,
                [data1],
                {

                    itemHeight: 50,
                    itemShowCount: 3,
                    oneLevelId: bankId,
                    callback: function (selectOneObj) {
                        dom.value = selectOneObj.value;

                    }
                });
        });
    };

    /*回填职位*/

    var enterpriseName = sessionStorage.getItem("enterpriseName");
    var  vName = sessionStorage.getItem("verifyName");
    var  vMobile = sessionStorage.getItem("verifyMobile");
    var  verifyCode = sessionStorage.getItem("verifyCode");
    var verifyIdCard = sessionStorage.getItem("verifyIdCard");
    var verifyJob = sessionStorage.getItem("verifyJob");
    var authenCode = sessionStorage.getItem("authenCode");
    var userCode = sessionStorage.getItem("userCode");

    $('#jobInterview').val(verifyJob);

    /*应届生往届生选择*/
    $('.graduatingStudents').click(function (){
        $('.work').hide();
        $('.workExperience').hide();
        $('.upWorkExperience').hide();
    });
    $('.previousStudents').click(function () {
        $('.work').show();
        $('.workExperience').show();
        $('.upWorkExperience').show();
    });

    var resumeStr = sessionStorage.resumeArray;
    if(typeof(resumeStr)!="undefined"){

        resumeArray = JSON.parse(resumeStr);
        console.log(resumeArray);
        $('#jobInterview').val(resumeArray.resumeJob);
        $('#salary').val(resumeArray.resumeExpectSalary);
        if(resumeArray.resumeIsDissmion ==1){
            $('#yDimission').attr('checked',true);
            $('#nDimission').removeAttr("checked")
        }else if(resumeArray.resumeIsDissmion == 0){
            $('#nDimission').attr('checked',true);
            $('#yDimission').removeAttr("checked")
        }
        if(resumeArray.isNewGraduate ==1){
            $('#graduatingStudents').attr('checked',true);
            $('#previousStudents').removeAttr("checked");
            $('.work').hide();
            $('.workExperience').hide();
            $('.upWorkExperience').hide();
        }else if(resumeArray.isNewGraduate ==0){
            $('#previousStudents').attr('checked',true);
            $('#graduatingStudents').removeAttr("checked")
        }
        /*教育*/
        var eduJson = JSON.parse(resumeArray.resumeEducationArray);
        eduLength = eduJson.length;
        for(var i = 0;i<eduLength-1;i++){
            /*学历底部滑动select*/

            var starClass = 'StartTime';
            var endClass = 'EndTime';
            var eduClass = 'eduS';
            var $school = ('<div class="lineSpacingE"></div><form class="educationTable" action="">' +
            '<div class="schoolMsg"><span>学校名称</span> <textarea class="schoolName" name="educationSchoolName"  cols="30" rows="2" data-attribute="请填写学校名称" placeholder="请输入学校名称"></textarea></div>' +
            '<div><span class="edu">学历</span><input onfocus="this.blur();" class='+(eduClass+(i+2))+'  type="text" name="educationGrade" data-attribute="请选择学历" placeholder="请输入学历"></div>'+
            '<div><span class="specialty">专业</span><input class="specialty"  type="text" name="educationMajor" data-attribute="请填写专业" placeholder="请输入专业名称"></div>' +
            '<div><span>入学时间</span><input onfocus="this.blur();" class='+(starClass+(i+2))+'  type="text" name="educationStartTime" data-attribute="请选择入学时间" placeholder="请选择入学时间"></div>'+
            '<div><span>毕业时间</span><input onfocus="this.blur();" class='+(endClass+(i+2))+'  type="text" name="educationEndTime" data-attribute="请选择毕业时间" placeholder="请选择毕业时间"></div></form>');

            $('.upEducation').before($school);

            new datePicker().init({
                'trigger': '.StartTime'+(i+2), /*按钮选择器，用于触发弹出插件*/
                'type': 'ym',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
                'minDate':'1900-1-1',/*最小日期*/
                'maxDate':'2100-12-31',/*最大日期*/
                'onSubmit':function(){/*确认时触发事件*/
                    var theSelectData=calendar.value;
                },
                'onClose':function(){/*取消时触发事件*/
                }
            });
            new datePicker().init({
                'trigger': '.EndTime'+(i+2), /*按钮选择器，用于触发弹出插件*/
                'type': 'ym',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
                'minDate':'1900-1-1',/*最小日期*/
                'maxDate':'2100-12-31',/*最大日期*/
                'onSubmit':function(){/*确认时触发事件*/
                    var theSelectData=calendar.value;
                },
                'onClose':function(){/*取消时触发事件*/
                }
            });
            eduFn($('.'+eduClass+(i+2))[0]);
        }
        for(var i = 0;i<eduLength;i++){
            $('.educationTable:eq('+i+') .schoolName').val(eduJson[i].educationSchoolName);
            $(".educationTable:eq("+i+") input[name='educationGrade']").val(eduJson[i].educationGrade);
            $('.educationTable:eq('+i+') .specialty').val(eduJson[i].educationMajor);
            $(".educationTable:eq("+i+") input[name='educationStartTime']").val(eduJson[i].educationStartTime);
            $(".educationTable:eq("+i+") input[name='educationEndTime']").val(eduJson[i].educationEndTime);
        }

        /*技能*/
        var skillJson = resumeArray.resumeSkillArray;
        if(skillJson){
            skillJson = JSON.parse(skillJson);
            skillLength = skillJson.length;
            for(var i = 0;i<skillLength-1;i++){
                var $skill = ('<div class="lineSpacingS"></div><form class="skill" action="">' +
                '<div><span>证书名称</span><input class="certificateName"  type="text" name="certificateName" placeholder="请输入证书名称"></div></form>');

                $('.upSkill').before($skill);
            }

            for(var i = 0;i<skillLength;i++){
                $('.skill:eq('+i+') .certificateName').val(skillJson[i].skillName);
            }
        }
        if(resumeArray.isNewGraduate !=="1"){
            /*工作*/
            var workJson = JSON.parse(resumeArray.resumeWorkArray);
            workLength =workJson.length;
            for(var i = 0;i<workLength-1;i++){
                var entclass = 'entryTime';
                var outclass = 'outTime';
                var leaveClass = 'leaveCause';
                var $work = ('<div class="lineSpacingW"></div><form class="work"><div class="firmMsg"><span>公司名称</span> <textarea class="firm" name="workEnterpriseName"  cols="30" rows="2"  data-attribute="请填写公司名称" placeholder="请正确填写公司名称，请勿填写简称" maxlength="40"></textarea></div>' +
                '<div> <span>工作岗位</span><input class="job"  type="text" name="verifyJob" data-attribute="请填写工作岗位" placeholder="请输入工作岗位"></div>' +
                '<div> <span>岗位工资</span><input class="workBalance"  type="number" name="workBalance" placeholder="请输入岗位工资" ></div>' +
                '<div><span>入职时间</span><input  onfocus="this.blur();" class='+(entclass+(i+2))+'  type="text" name="workStartTime" data-attribute="请选择入职时间" placeholder="请选择入职时间"></div>' +
                '<div> <span>离职时间</span><input onfocus="this.blur();"  class='+(outclass+(i+2))+'  type="text" name="workEndTime" data-attribute="请选择离职时间" placeholder="请选择离职时间"></div>' +
                '<div> <span>离职原因</span><input onfocus="this.blur();" class='+(leaveClass+(i+2))+'  type="text" name="resumeDissmionReason" placeholder="请选择离职原因"></div>' +
                '<div><span class="certifierName">证明人姓名</span><input class="referenceName"  type="text" name="colleagueName"  data-attribute="请输入证明人姓名" placeholder="请输入证明人姓名"></div>' +
                '<div><span class="certifierTel">证明人电话</span><input class="referenceTel"  type="text" name="colleagueMobile" data-attribute="请输入证明人电话" placeholder="请输入证明人电话" maxlength="11"></div></form>');

                $('.upWorkExperience').before($work);

                new datePicker().init({
                    'trigger': '.entryTime'+(i+2), /*按钮选择器，用于触发弹出插件*/
                    'type': 'ym',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
                    'minDate':'1900-1-1',/*最小日期*/
                    'maxDate':'2100-12-31',/*最大日期*/
                    'onSubmit':function(){/*确认时触发事件*/
                        var theSelectData=calendar.value;
                    },
                    'onClose':function(){/*取消时触发事件*/
                    }
                });
                new datePicker().init({
                    'trigger': '.outTime'+(i+2), /*按钮选择器，用于触发弹出插件*/
                    'type': 'ym',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
                    'minDate':'1900-1-1',/*最小日期*/
                    'maxDate':'2100-12-31',/*最大日期*/
                    'onSubmit':function(){/*确认时触发事件*/
                        var theSelectData=calendar.value;
                    },
                    'onClose':function(){/*取消时触发事件*/
                    }
                });

                workFn1($('.'+leaveClass+(i+2))[0]);
            }
            for(var i = 0;i<workJson.length;i++){
                $('.work:eq('+i+') .firm').val(workJson[i].workEnterpriseName);
                $('.work:eq('+i+') .job').val(workJson[i].verifyJob);
                $('.work:eq('+i+') .workBalance').val(workJson[i].workBalance);
                var sT = workJson[i].workStartTime.split(""),
                    arrST =sT.splice(4,0,'-'),
                    workStartTime = sT.join('');
                var eT = workJson[i].workEndTime.split(""),
                    arrEt = eT.splice(4,0,'-'),
                    workEndTime = eT.join('');
                $(".work:eq("+i+") input[name='workStartTime']").val(workStartTime);
                $(".work:eq("+i+") input[name='workEndTime']").val(workEndTime);
                $(".work:eq("+i+") input[name='resumeDissmionReason']").val(workJson[i].resumeDissmionReason);
                $('.work:eq('+i+') .referenceName').val(workJson[i].colleagueName);
                $('.work:eq('+i+') .referenceTel').val(workJson[i].colleagueMobile);

            }
        }

    }

    var basicStr = sessionStorage.basicInfo;
    if(typeof(basicStr)!="undefined"){
        var basicArr = JSON.parse(basicStr);

    }

    /*收起基本信息*/

    var onOffB = true;

    $('.upBasic').click(function () {
        var sName = $('#resumeName').val();
        if(onOffB){
            $('#deForm').css('display','none');
            var $name = $('<div class="upB"><span class="upName">姓名</span><span class="upNames">'+sName+'</span></div>');
            ($('.basic')).after($name);
            $('.upBasic p').text('展开基本信息');
            $('.upBasic img').removeAttr("src").attr("src","images/downArrows.png");
            onOffB = false;
        }else{
            $('#deForm').css('display','block');
            $('.upB').css('display','none');
            $('.upBasic p').text('收起基本信息');
            $('.upBasic img').removeAttr("src").attr("src","images/upArrows.png");
            onOffB = true;
        }
    });
    /*增加教育信息*/

    /*底部滑动select*/
    var showBankDom = document.querySelector('.edu');

    var data = [
        {'id': '10001', 'value': '专科'},
        {'id': '10002', 'value': '本科'},
        {'id': '10003', 'value': 'EMBA'},
        {'id': '10004', 'value': '硕士'},
        {'id': '10005', 'value': '博士'},
        {'id': '10006', 'value': '博士后'},
        {'id': '10007', 'value': '其他'}
    ];

    window.eduFn = function (dom) {

        dom.addEventListener('click', function () {
            var bankId = showBankDom.dataset['id'];
            var bankSelect = new IosSelect(1,
                [data],
                {

                    itemHeight: 50,
                    itemShowCount: 3,
                    oneLevelId: bankId,
                    callback: function (selectOneObj) {
                        dom.value = selectOneObj.value;

                    }
                });
        });
    };

    eduFn(document.querySelector('.eduS'));

    var eIndex = 1;

    $('.addEducation').click(function () {
        $('.educate').css('display','block');
        eIndex++;
        if(eIndex>3){
            eIndex=3;
            return false
        }
            var starClass = 'StartTime';
            var endClass = 'EndTime';
            var eduClass = 'eduS';

            starClass+=eIndex;
            endClass+=eIndex;
            eduClass+=eIndex;
            var $school = ('<form class="educationTable" action="">' +
            '<p class="educateS clearfix"><i></i><span>教育信息'+eIndex+'</span><!--<button type="button" class="deleteBtn">删除此条记录</button>--></p>'+
            '<div class="schoolMsg"><span>学校名称</span><textarea class="schoolName" name="educationSchoolName"  cols="30" rows="2" data-attribute="请填写学校名称" placeholder="请输入学校名称"></textarea></div>' +
            '<div><span class="edu">学历</span><input onfocus="this.blur();" class='+eduClass+'   type="text" name="educationGrade" data-attribute="请选择学历" placeholder="请选择学历"></div>' +
            '<div><span class="career">专业</span><input  class="specialty"   type="text" name="educationMajor" data-attribute="请填写专业" placeholder="请输入专业名称"></div>' +
            '<div><span>入学时间</span><input onfocus="this.blur();" class='+starClass+'  type="text" name="educationStartTime" data-attribute="请选择入学时间" placeholder="请选择入学时间"></div>'+
            '<div><span>毕业时间</span><input onfocus="this.blur();" class='+endClass+'  type="text" name="educationEndTime" data-attribute="请选择毕业时间" placeholder="请选择毕业时间"></div></form>');

            $('.upEducation').before($school);
            new datePicker().init({
                'trigger': '.StartTime'+eIndex, /*按钮选择器，用于触发弹出插件*/
                'type': 'ym',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
                'minDate':'1900-1-1',/*最小日期*/
                'maxDate':'2100-12-31',/*最大日期*/
                'onSubmit':function(){/*确认时触发事件*/
                    var theSelectData=calendar.value;
                },
                'onClose':function(){/*取消时触发事件*/
                }
            });
            new datePicker().init({
                'trigger': '.EndTime'+eIndex, /*按钮选择器，用于触发弹出插件*/
                'type': 'ym',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
                'minDate':'1900-1-1',/*最小日期*/
                'maxDate':'2100-12-31',/*最大日期*/
                'onSubmit':function(){/*确认时触发事件*/
                    var theSelectData=calendar.value;
                },
                'onClose':function(){/*取消时触发事件*/
                }
            });
            eduFn($('.'+eduClass)[0])
    });

    $('body').on('click','.deleteBtn', function () {
        $(this).parents('.educationTable').remove();
        eIndex--;
    });
    /*收起教育信息*/
    var onOffE = true;
    $('.upEducation p').click(function () {

        var schoolNames = $('.schoolName');
        var schoolArr = [];
        for(var i = 0;i<schoolNames.length;i++){
            schoolArr.push(schoolNames[i].value);
        }
        if(onOffE){
            $('.educationTable').css('display','none');
            $('.lineSpacingE').css('display','none');
            var $epE = "";
            for(var i = 0;i<schoolArr.length;i++){
                $epE+='<p><span class="ed">教育信息</span><span class="schName">'+schoolArr[i]+'</span></p>';
            }
            var $epF = ('<div class="upE">'+$epE+'</div>');
            $('.education').after($epF);
            $('.upEducation p').html('展开教育信息'+'<img src="images/upArrows.png" alt="">');
            $('.upEducation p img').removeAttr("src").attr("src","images/downArrows.png");
            onOffE = false;
        }else{
            $('.educationTable').css('display','block');
            $('.lineSpacingE').css('display','block');
            $('.upE').css('display','none');
            $('.upEducation p').html('收起教育信息'+'<img src="images/downArrows.png" alt="">');
            $('.upEducation p img').removeAttr("src").attr("src","images/upArrows.png");
            onOffE = true;
        }

    });
    /*增加技能信息*/
    var t = 1;
    $('.addSkill').click(function () {
        t++;
        if(t>3){
            return false;
        }
        var skill = ('<div class="lineSpacingS"></div><form class="skill" action="">' +
        '<div><span>证书名称</span><input class="certificateName"  type="text" name="certificateName" placeholder="请输入证书名称"></div></form>');

        $('.upSkill').before(skill);

    });
    /*收起技能信息*/
    var onOffS = true;

    $('.upSkill p').click(function () {
        var certificateNames = $('.certificateName');
        var certificateArr = [];
        for(var i = 0;i<certificateNames.length;i++){
            certificateArr.push(certificateNames[i].value);
        }
        if(onOffS){
            $('.skill').css('display','none');
            $('.lineSpacingS').css('display','none');
            var $skP="";
            for(var j = 0;j<certificateArr.length;j++){
                $skP+='<p><span class="sk">技能信息'+(j+1)+'</span><span class="skName">'+certificateArr[j]+'</span></p>'
            }
            var $skE = ('<div class="upS">'+$skP+'</div>');
            $('.skillInformation').after($skE);
            $('.upSkill p').html('展开技能信息'+'<img src="images/upArrows.png" alt="">');
            $('.upSkill p img').removeAttr("src").attr("src","images/downArrows.png");
            onOffS = false;
        }else{
            $('.skill').css('display','block');
            $('.lineSpacingS').css('display','block');
            $('.upS').css('display','none');
            $('.upSkill p').html('收起技能信息'+'<img src="images/downArrows.png" alt="">');
            $('.upSkill p img').removeAttr("src").attr("src","images/upArrows.png");
            onOffS = true;
        }
    });

    /*增加工作信息*/

    /*底部滑动select*/

    var data1 = [
        {'id': '10001', 'value': '个人发展'},
        {'id': '10002', 'value': '公司问题'},
        {'id': '10003', 'value': '其他'}

    ];

    window.workFn1 = function (dom) {

        dom.addEventListener('click', function () {
            var bankId = showBankDom.dataset['id'];
            var bankSelect = new IosSelect(1,
                [data1],
                {

                    itemHeight: 50,
                    itemShowCount: 3,
                    oneLevelId: bankId,
                    callback: function (selectOneObj) {
                        dom.value = selectOneObj.value;

                    }
                });
        });
    };

    workFn1(document.querySelector('.leaveCause'));

    var jIndex = 1;

    $('.addWork').click(function () {
        $('.workTitle').css('display','block');
        jIndex++;
        if(jIndex>3){
            jIndex=3;
            return false;
        }
            var entclass = 'entryTime';
            var outclass = 'outTime';
            var leaveClass = 'leaveCause';
            entclass+=jIndex;
            outclass+=jIndex;
            leaveClass+=jIndex;
            var $work = ('<form class="work">' +
            '<p class="workTitleS clearfix"><i></i><span>工作经历'+jIndex+'</span><!--<button type="button" class="deleteBtnW">删除此条记录</button>--></p>'+
            '<div class="firmMsg"><span>公司名称</span><textarea class="firm" name="workEnterpriseName"  cols="30" rows="2"  data-attribute="请填写公司名称" placeholder="请正确填写公司名称，请勿填写简称" maxlength="40"></textarea></div>' +
            '<div> <span>工作岗位</span><input class="job"  type="text" name="verifyJob" placeholder="请输入工作岗位"></div>' +
            '<div> <span>岗位工资</span><input class="workBalance"  type="number" name="workBalance" placeholder="请输入岗位工资" ></div>' +
            '<div><span>入职时间</span><input  onfocus="this.blur();" class='+entclass+'  type="text" name="workStartTime" placeholder="请选择入职时间"></div>' +
            '<div> <span>离职时间</span><input onfocus="this.blur();" class='+outclass+'  type="text" name="workEndTime" placeholder="请选择离职时间"></div>' +
            '<div> <span>离职原因</span><input onfocus="this.blur();" class='+leaveClass+'  type="text" name="resumeDissmionReason" placeholder="请选择离职原因"></div>' +
            '<div><span class="certifierName">证明人姓名</span><input class="referenceName"  type="text" name="colleagueName" placeholder="请输入证明人姓名"></div>' +
            '<div><span class="certifierTel">证明人电话</span><input class="referenceTel"  type="text" name="colleagueMobile" placeholder="请输入证明人电话" maxlength="11"></div></form>');

            $('.upWorkExperience').before($work);

            new datePicker().init({
                'trigger': '.entryTime'+jIndex, /*按钮选择器，用于触发弹出插件*/
                'type': 'ym',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
                'minDate':'1900-1-1',/*最小日期*/
                'maxDate':'2100-12-31',/*最大日期*/
                'onSubmit':function(){/*确认时触发事件*/
                    var theSelectData=calendar.value;
                },
                'onClose':function(){/*取消时触发事件*/
                }
            });
            new datePicker().init({
                'trigger': '.outTime'+jIndex, /*按钮选择器，用于触发弹出插件*/
                'type': 'ym',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
                'minDate':'1900-1-1',/*最小日期*/
                'maxDate':'2100-12-31',/*最大日期*/
                'onSubmit':function(){/*确认时触发事件*/
                    var theSelectData=calendar.value;
                },
                'onClose':function(){/*取消时触发事件*/
                }
            });
        workFn1($('.'+leaveClass)[0])
    });
    $('body').on('click','.deleteBtnW', function () {
        $(this).parents('.work').remove();
        jIndex--;
    });

    /*收起工作信息*/
    var onOffW = true;

    $('.upWorkExperience p').click(function () {
        var firmNames = $('.firm');
        var firmArr = [];
        for(var i = 0;i<firmNames.length;i++){
            firmArr.push(firmNames[i].value);
        }
        if(onOffW){
            $('.work').css('display','none');
            $('.lineSpacingW').css('display','none');
            var $wkP="";
            for(var j = 0;j<firmArr.length;j++){
                $wkP+='<p><span class="wk">工作经历</span><span class="wkName">'+firmArr[j]+'</span></p>'
            }
            //var $wkE = ('<div class="upW"><p><span class="wk">工作经历</span><span class="wkName">北京天然科技领袖股份有限公司</span></p></div>');
            var $wkE = ('<div class="upW">'+$wkP+'</div>');
            $('.workExperience').after($wkE);
            $('.upWorkExperience p').html('展开工作经历'+'<img src="images/upArrows.png" alt="">');
            $('.upWorkExperience p img').removeAttr("src").attr("src","images/downArrows.png");
            onOffW = false;
        }else{
            $('.work').css('display','block');
            $('.lineSpacingW').css('display','block');
            $('.upW').css('display','none');
            $('.upWorkExperience p').html('收起工作经历'+'<img src="images/downArrows.png" alt="">');
            $('.upWorkExperience p img').removeAttr("src").attr("src","images/upArrows.png");
            onOffW = true;
        }
    });

    /*日期插件调用*/

        var calendar = new datePicker();
        calendar.init({
            'trigger': '.StartTime', /*按钮选择器，用于触发弹出插件*/
            'type': 'ym',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
            'minDate':'1900-1-1',/*最小日期*/
            'maxDate':'2100-12-31',/*最大日期*/
            'onSubmit':function(){/*确认时触发事件*/
                var theSelectData=calendar.value;
            },
            'onClose':function(){/*取消时触发事件*/
            }
        });
        var calendar1 = new datePicker();
        calendar1.init({
            'trigger': '.EndTime', /*按钮选择器，用于触发弹出插件*/
            'type': 'ym',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
            'minDate':'1900-1-1',/*最小日期*/
            'maxDate':'2100-12-31',/*最大日期*/
            'onSubmit':function(){/*确认时触发事件*/
                var theSelectData=calendar.value;
            },
            'onClose':function(){/*取消时触发事件*/
            }
        });

        var entryTime1 = new datePicker();
        entryTime1.init({
            'trigger': '.entryTime', /*按钮选择器，用于触发弹出插件*/
            'type': 'ym',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
            'minDate':'1900-1-1',/*最小日期*/
            'maxDate':'2100-12-31',/*最大日期*/
            'onSubmit':function(){/*确认时触发事件*/
                var theSelectData=calendar.value;
            },
            'onClose':function(){/*取消时触发事件*/
            }
        });
        var outTime1 = new datePicker();
        outTime1.init({
            'trigger': '.outTime', /*按钮选择器，用于触发弹出插件*/
            'type': 'ym',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
            'minDate':'1900-1-1',/*最小日期*/
            'maxDate':'2100-12-31',/*最大日期*/
            'onSubmit':function(){/*确认时触发事件*/
                var theSelectData=calendar.value;
            },
            'onClose':function(){/*取消时触发事件*/
            }
        });

    /*签名区*/
    $('.nameSpace').click(function () {
       // window.location.href = "qianming.html";
       $('.htmleaf-container').css('display','block');
        $('.js-signature canvas').attr('width',600).css('width','600px');
        $('.zhezhao').css('display','block');
        $('body').css('overflow','hidden')
    });

    if ($('.js-signature').length) {
        $('.js-signature').jqSignature();
    }
        /*清除签名*/
    function clearCanvas() {
        //$('#signature').html('<p><em>Your signature will appear here when you click "Save Signature"</em></p>');
        $('.js-signature').eq(1).jqSignature('clearCanvas');
        $('#saveBtn').attr('disabled', true);
    }

    $('#clearBtn').click(function () {
        clearCanvas()
    });
    /*保存签名*/
    function saveSignature() {
        $('.nameSpace').empty();
        $('#signature').empty();
        var dataUrl = $('.js-signature').eq(1).jqSignature('getDataURL');
        localStorage.setItem('img', dataUrl);

        $('.htmleaf-container').css('display','none');
        $('.zhezhao').css('display','none');
        $('body').css('overflow','auto');
        /*取值填充*/
        var img = localStorage.getItem('img');
        if(img){
            var imgT = $('<img>').attr('src', img);
            $('.nameSpace').append(imgT);
        }
    }
    $('#saveBtn').click(function () {
        saveSignature()
    });
    $('.js-signature').eq(1).on('jq.signature.changed', function() {
        $('#saveBtn').attr('disabled', false);
    });
    /*关闭签名*/
    $('#closeBtn').click(function () {
        $('.htmleaf-container').css('display','none');
        $('.zhezhao').css('display','none');
        $('body').css('overflow','auto');
    });






    /*签名日期填充*/
    var date=new Date();
    var year=date.getFullYear();
    var mon=date.getMonth()+1;
    var da=date.getDate();
    if(mon >= 10){mon=mon;}else{mon="0" + mon;}
    if(da >= 10){da=da;}else{da="0" + da;}
    var myDate = year+'/'+mon+'/'+da;
    var nowTime = year+'-'+mon;
    $('.dataSpace').html($('<p>'+myDate+'</p>'));

    /*点击协议*/
    $('.agreement').click(function () {
        window.location.href = "/hr/newHr/agreement.html"
    });

    $('#submit').click(function () {

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
            $(this).removeClass('errorShow');
            basicInfo[itemName] = itemVal;
        });
        if (!basicPass) return;
        //处理身份，是否离职
        basicInfo['resumeIsDissmion'] = $('input:radio[name="dimission"]:checked').val();
        //应届生往届生选择
        basicInfo['isNewGraduate'] = $('input:radio[name="isNewGraduate"]:checked').val();
        var basicAll = $.extend(basicArr,basicInfo);
        delete basicAll.dimission;

        //处理教育经历
        var educationInfo = [];
        $('.educationTable').each(function () {
            basicPass = true;
            var formEmpty = true;
            $(this).find('input').each(function () {
                if( $(this).val() != ''){
                    formEmpty = false;
                }
            });

            $(this).find('textarea').each(function () {
                if( $(this).val() != ''){
                    formEmpty = false;
                }
            });


            if (formEmpty) return true;
            var educationItem = {};
            $(this).find('input').each(function () {
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
                if (itemName == 'educationEndTime'){
                    if (educationItem['educationStartTime'] >=  itemVal){
                        inputObject = $(this);
                        layer.open({
                            content: '毕业时间需大于入学时间'
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
                }
                $(this).removeClass('errorShow');
                educationItem[$(this).attr('name')] = $(this).val();
            });

            $(this).find('textarea').each(function () {
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
                $(this).removeClass('errorShow');
                educationItem[$(this).attr('name')] = $(this).val();
            });

            //有任何未校验通过的直接退出
            if (!basicPass) return false;


            educationInfo.push(educationItem);
            educationItem['educationStartTime']=educationItem['educationStartTime'].slice(0, 4);
            educationItem['educationEndTime']=educationItem['educationEndTime'].slice(0, 4);
        });
        if (!basicPass) return false;

        if (educationInfo.length == 0){
            layer.open({
                content: '请填写教育信息'
                ,btn: '确定',
                yes: function(index){
                    layer.close(index);
                    $('.educationTable').first().find('.schoolName').first().focus();
                }
            });
            $('.educationTable').first().find('.schoolName').addClass('errorShow');
            $('.educationTable').first().find('input').addClass('errorShow');
            basicPass = false;
            return false;
        }
        if (!basicPass) return;

        //处理工作经历
        var workInfo =[];
        $('.work').each(function () {
            basicPass = true;
            var formEmpty = true;
            $(this).find('input').each(function () {
                if( $(this).val() != ''){
                    formEmpty = false;
                }
            });

            $(this).find('textarea').each(function () {
                if( $(this).val() != ''){
                    formEmpty = false;
                }
            });

            if (formEmpty) return true;
            var workItem = {};
            $(this).find('input').each(function () {
                inputObject = $(this);
                if( $(this).val()== ''){
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
                if (itemName == 'workEndTime'){
                    if(workItem['workStartTime']>=itemVal){
                        layer.open({
                            content: '离职时间需大于入职时间'
                            ,btn: '确定',
                            yes: function(index){
                                layer.close(index);
                                inputObject.focus();
                            }
                        });
                        $(this).addClass('errorShow');
                        basicPass = false;
                        return false;
                    }else if(itemVal>nowTime){
                        layer.open({
                            content: '离职时间需小于当前时间'
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
                }else if (itemName == 'workStartTime'){
                    if(itemVal>nowTime){
                        layer.open({
                            content: '入职时间需小于当前时间'
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
                }else if (itemName == 'colleagueMobile'){
                    /*校验证明人电话*/
                    if(itemVal ==basicInfo['resumeMobile']){
                        layer.open({
                            content: '证明人电话不能与候选人电话相同',
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
                    if(!isValidPhone(itemVal)){
                        layer.open({
                            content: '请输入正确的证明人电话',
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
                }
                if (!basicPass) return false;
                $(this).removeClass('errorShow');

                workItem[$(this).attr('name')] = $(this).val();

            });

            if (!basicPass) return false;

            $(this).find('textarea').each(function () {
                inputObject = $(this);
                if( $(this).val()== ''){
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
                $(this).removeClass('errorShow');
                workItem[$(this).attr('name')] = $(this).val();
            });

            //有任何未校验通过的直接退出
            if (!basicPass) return false;

            workInfo.push(workItem);
            workItem['workStartTime']=workItem['workStartTime'].split("-").join("");
            workItem['workEndTime']=workItem['workEndTime'].split("-").join("");
        });
        if (!basicPass) return false;

        if($('#previousStudents').is(':checked')){
            if (workInfo.length == 0){
                layer.open({
                    content: '请填写工作信息'
                    ,btn: '确定',
                    yes: function(index){
                        layer.close(index);
                        $('.work').first().find('.firm').first().focus();
                    }
                });

                $('.work').first().find('.firm').addClass('errorShow');
                $('.work').first().find('input').addClass('errorShow');
                basicPass = false;
                return false;
            }
        }
        if($('#graduatingStudents').is(':checked')){
            workInfo="";
        }

        if (!basicPass) return;


        /*技能*/

        var  skillInfo = [];
        var skill = document.getElementsByClassName('skill');
        for(var i = 0;i<skill.length;i++){
            var skFn = function () {
                var sInps = skill[i].getElementsByTagName('input');
                skillInfo.push({
                    skillName:sInps[0].value
                    //skillCertificateCode:sInps[1].value
                })
            };
            skFn();
        }
        var $skInputs = $('.skill input');
        for(var i = 0;i<$skInputs.length;i++){
            if($skInputs[i].value==""){
                skillInfo="";
            }
        }

        /*获取签名字符串*/
        var resumeSignURL;
        var imgURL = $('.nameSpace img').attr('src');
        if(imgURL){
            resumeSignURL = imgURL.slice(22);
        }else{
            inputObject = $(this);
            layer.open({
                content: '请签名'
                ,btn: '确定',
                yes: function(index){
                    layer.close(index);
                    inputObject.focus();
                }
            });

            basicPass =false;
            return false;
        }
        if (!basicPass) return;

        if( $("#check1").is(':checked')===false){
            inputObject = $(this);
            layer.open({
                content: '请阅读并同意协议'
                ,btn: '确定',
                yes: function(index){
                    layer.close(index);
                    inputObject.focus();
                }
            });
            basicPass =false;
            return false;
        }
        if (!basicPass) return;

        /*取最高学历*/

        basicAll['resumeGrade'] = educationInfo[0]['educationGrade'];
        basicAll['resumeSchool'] = educationInfo[0]['educationSchoolName'];
        basicAll['resumeMajor'] = educationInfo[0]['educationMajor'];
        delete basicAll.userCode;
        dataJson ={
            userCode:userCode,
            verifyCode: verifyCode,
            authenCode:authenCode,
            resumeArray:[{
                basicInfo:basicAll,
                educationInfo:educationInfo,
                skillInfo:skillInfo,
                workInfo:workInfo,
                signInfo:{
                    resumeSignURL:resumeSignURL,
                    resumeSignTime:myDate.split("/").join("")
                }
            }]
        };
        $('.finalCheck').show();

        layer.open({
            content: '确定提交？提交后只能通过HR修改资料'
            ,btn: ['确定', '取消']
            ,yes: function(index){
                showLoader();
                $.ajax({
                    url:'https://apix.funinhr.com/api/agree/verify',
                    type: "POST",
                    timeout:5000,
                    dataType:"json",
                    data:JSON.stringify(dataJson),
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
                        if(result===1001){
                            window.location.replace("succeed.html");
                        }else {
                            layer.open({
                                content: resultInfo
                                ,btn: '确定'
                            });
                        }
                    },
                    error: function (){
                        layer.open({
                            content: '网络异常，请稍后重试'
                            ,btn: '确定'
                        });
                        hideLoader();
                    }
                });
                layer.close(index);
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