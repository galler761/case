$(function(){
    //模态框左侧导航样式滚动
    lanPosScroll();
    //模态框确认事件
    modelConfirm();
    //模态框快捷方式选择
    shortcutChoice();
})
//模态框左侧导航样式滚动
function lanPosScroll() {
    /*右侧区域滚动切换*/
    var index = 0;              //索引值
    var shortcutBox = $('.modal .modal-dialog .shortcut-add-box');              //快捷方式展示区
    var shortcutBoxList = $('.shortcut-add-box-right .shortcut-element-list');  //快捷方式列表

    $('.lanPos').css('top',$('.shortcut-add-box-left .active').position().top);
    $('.shortcut-add-box-left ul li').hover(function(){
        $('.lanPos').css('top',$(this).position().top);
    },function(){
        $('.lanPos').css('top',$('.shortcut-add-box-left .active').position().top);
    })

    //为左侧导航添加active点击样式
    $('.shortcut-add-box-left ul li').click(function () {
        for(var i=0;i<$('.shortcut-add-box-left ul li').size();i++){
            if(this==$('.shortcut-add-box-left ul li').get(i)){
                $('.shortcut-add-box-left ul li').eq(i).addClass('active');
            }else{
                $('.shortcut-add-box-left ul li').eq(i).removeClass('active');
            }
        };
        index = $('.shortcut-add-box-left ul li').index(this);
        //索引右侧快捷方式列表,找到当前点击的列表
        var s_box_cur = shortcutBoxList.eq(index)
        var posi = s_box_cur.position();
        shortcutBox.animate({scrollTop:posi.top},200);
    })
};
//模态框快捷方式按钮选中
function shortcutChoice() {
    //选择快捷方式模块，选中样式添加删除
    var shortcutBtn = $('.shortcut-element-box>li');
    shortcutBtn.click(function () {
        if($(this).hasClass('shortcut-selected')){
            $(this).removeClass('shortcut-selected');
        }else {
            $(this).addClass('shortcut-selected');
        }
    })
};
//模态框确认事件
function modelConfirm() {
    //已选中的快捷方式模块
    var selectShortcut_box = $('#select-shortcut-box');
    //快捷面板上已添加的快捷方式
    var shortcutBoxLi = $('.shortcut-box li:not(:last)');
    //模态框确认按钮
    /*将模态框选中的快捷方式添加到快捷面板上*/

    //模态框确认点击后触发
    $('#shortcutEnter').click(function () {
        $('#myModal').modal('hide');        //隐藏模态框
        shortcutBoxLi.remove();
        //重新计算快捷按钮选中数量
        function init_hasShortcut_html() {
            //选中的快捷方式的i标签的class
            var select_iClass_data = [];
            //选中的快捷方式的span标签的文字
            var select_spanText_data = [];
            /*清空数组，防止遍历后重复添加*/
            var shortcutSelected_data = [];
            var has_p_data =[];                                       //快捷面板上已有的元素文字
            var has_iclass_data =[];                                 //快捷面板上已有的元素类
            //快捷面板上的快捷内容
            var hasShortcut_html = '';
            //模态框中选中快捷方式
            var acticveSelect = null;
            acticveSelect = $('.shortcut-add-box-right').find('.shortcut-selected');
            //遍历选中的按钮元素,将元素添加进select_iClass_data数组和select_spanText_data数组
            $.each(acticveSelect,function (i) {
                //赋值数组
                select_iClass_data.push(acticveSelect.eq(i).find('i').attr('class'));
                select_spanText_data.push(acticveSelect.eq(i).find('span').text());
            });
            //遍历快捷面板上已有的元素
            $.each($('.shortcut-box li:not(:last)'),function (i) {
                has_p_data.push($('.shortcut-box li:not(:last)').find('p').text());
            });
            $.each($('.shortcut-box li:not(:last)'),function (i) {
                has_iclass_data.push($('.shortcut-box li:not(:last)').find('i').attr('class'));
            });

            //去掉重复选择的数据
            function test(a,b) {
                var c = [];
                var tmp = a.concat(b);
                var o = {};
                for (var i = 0; i < tmp.length; i ++) (tmp[i] in o) ? o[tmp[i]] ++ : o[tmp[i]] = 1;
                for (var x in o) if (o[x] == 1) c.push(x);
                return c;
            }

            //将遍历数组循环存入到模态框选中的模态框数组中
            for(var i=0; i<test(has_iclass_data,select_iClass_data).length; i++){
                var select_i_class = test(has_iclass_data,select_iClass_data)[i];
                var select_i_span = test(has_p_data,select_spanText_data)[i];
                var select_person ={"iClass":select_i_class, 'spanText':select_i_span};
                shortcutSelected_data.push(select_person);
            };
            console.log(shortcutSelected_data);
            for(var j =0; j<shortcutSelected_data.length; j++){
                var hasObj = shortcutSelected_data[j];
                hasShortcut_html += '<li class="col-xs-4 col-sm-4 col-md-3 col-lg-3">';
                hasShortcut_html += '<div>';
                hasShortcut_html += '<i class="'+hasObj.iClass+'">'+'</i>';
                hasShortcut_html += '<p>'+hasObj.spanText+'</p>';
                hasShortcut_html += '</div>';
                hasShortcut_html += '</li>';
            };
            return hasShortcut_html;
        }
        $('.shortcut-box li:not(:last)').remove();
        $('.shortcut-box li:last').before(init_hasShortcut_html());
        //样式设置
        $.each($('.shortcut-box li:not(:last)'),function (i) {
            var bgIndex = (i+0)%5;
            switch (bgIndex){
                case 1:
                    $('.shortcut-box li:not(:last)').eq(i).find('div').css('background','#82D5FF');
                    break;
                case 2:
                    $('.shortcut-box li:not(:last)').eq(i).find('div').css('background','#C0E774');
                    break;
                case 3:
                    $('.shortcut-box li:not(:last)').eq(i).find('div').css('background','#E96C96');
                    break;
                case 4:
                    $('.shortcut-box li:not(:last)').eq(i).find('div').css('background','#f7d418');
                    break;
                case 0:
                    $('.shortcut-box li:not(:last)').eq(i).find('div').css('background','#59d6ac');
                    break;
            }
        })

    });
}
