$(function(){

 	  var i=0;
   var size=$(".box li").length;



/*********************定时器**********************/


var inter=setInterval(run,"2000");

function run(){

   i++;
     if(i==size){
     	i=0;
     }

     $(".banner .box").stop().animate({left:-i*940},500);
   	$(".banner .list li").eq(i).addClass("active").siblings().removeClass("active");
}


/******************左右按钮**********************/

 $(".banner .list li").first().addClass("active");
 $(".banner .btn_left").click(function(){

     i++;
     if(i==size){
     	i=0;
     }

     $(".banner .box").stop().animate({left:-i*940},500);
   	$(".banner .list li").eq(i).addClass("active").siblings().removeClass("active");


 });

$(".banner .btn_right").click(function(){
   
 i--;
 if(i==-1){
 	i=size-1;
 }
$(".banner .box").stop().animate({left:-i*940},500);
$(".banner .list li").eq(i).addClass("active").siblings().removeClass("active");

});




/***************鼠标悬浮暂停****************/
$(".bannner").on('hover','click',function(){

  
  clearInterval(inter); 

},function(){

   run();

});





});