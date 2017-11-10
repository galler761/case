/**
 * Created by Administrator on 2016/3/15.
 */
$(document).ready(function () {
    var i=0;
    $(".box ul li").first().clone().appendTo(".box ul");
    var size=$(".box ul li").size();


/*点击调用moveL*/
    $(".btn_l").click(function(){
        moveL();
    });

/*点击调用moveR*/
    $(".btn_r").click(function(){
        moveR();
    });

/*自动轮播--定时器*/
    var t=setInterval(moveL,2000);
    $(".box").hover(function(){
        clearInterval(t);
        $(".btn").css({
            "background-color":"rgba(197, 197, 197, 0.80)",
            "box-shadow":"0 0 5px #ccc"
        })
    },function(){
        t=setInterval(moveL,2000);
        $(".btn").css({
            "background-color":"rgba(197, 197, 197, 0.50)",
            "box-shadow":"none"
        })
    });

/*向左移动函数*/
    function moveL(){
        i++;
        if(i==size){
            $(".box ul").css({left:0});
            i=1;
        }
        $(".box ul").stop().animate({left:-i*1280},500);
    }
/*向右移动函数*/
    function moveR(){
        i--;
        if(i==-1){
            $(".box ul").css({left:-(size-1)*1280});
            i=size-2;
        }
        $(".box ul").stop().animate({left:-i*1280},500);
    }
});

