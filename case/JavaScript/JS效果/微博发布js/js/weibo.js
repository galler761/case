// JavaScript Document
window.onload=function(){
	//左上角消息事件
	var email=document.getElementsByClassName('email')[0];
	var up_email=document.getElementById('up_email');
	email.onmouseover=function(){
		up_email.style.display='block';
	}
	email.onmouseout=function(){
		var timer1=setTimeout(function(){
			up_email.style.display='none';
		},300);
		up_email.onmouseover=function(){
			clearTimeout(timer1);
			up_email.style.display='block';
		}
	}	
	up_email.onmouseout=function(){
		up_email.style.display='none';
	}

	//左上角设置事件
	var tool=document.getElementsByClassName('tool')[0];
	var up_tool=document.getElementById('up_tool');
	tool.onmouseover=function(){
		up_tool.style.display='block';
	}
	tool.onmouseout=function(){
		var timer1=setTimeout(function(){
			up_tool.style.display='none';
		},300);
		up_tool.onmouseover=function(){
			clearTimeout(timer1);
			up_tool.style.display='block';
		}
	}	
	up_tool.onmouseout=function(){
		up_tool.style.display='none';
	}

	//左上角发布信息事件 与微博输入框
	var write=document.getElementsByClassName('write')[0];
	var index3=document.getElementById('z-index3');//透明层
	var index4=document.getElementById('z-index4');//输入框
	write.onclick=function(){
		index3.style.display='block';//透明层出现
		index4.style.display='block';//输入框出现
	}
	
	//console.log(parseInt(index4.style.width))
	var index4top=document.getElementsByClassName('index4_top')[0];
	index4top.onmousedown=function(e){    //鼠标按下事件
		var e=window.event||e;
		var resX=e.offsetX;
		var resY=e.offsetY;		
		index4top.style.cssText="cursor:move;";
		index4.style.display='block';
		document.onmousemove=function(e){  //移动事件
			var e=window.event||e;
			var cw=document.documentElement.clientWidth;  //浏览器宽度
			var ch=document.documentElement.clientHeight; //浏览器高度
			var index4w=parseInt(index4.style.width);//index4输入框的宽度
			var index4h=parseInt(index4.style.height);//index4输入框的高度
			var _left=e.clientX-resX;
			var _top=e.clientY-resY;
			//左右边界判断
			if(_left>cw-index4w){
				_left=cw-index4w;
			}else if(_left<0){
				_left=0;
			}
			//上下边界判断
			if(_top>ch-index4h){
				_top=ch-index4h;
			}else if(_top<0){
				_top=0;
			}
			
			index4.style.left=_left+'px';
			index4.style.top=_top+'px';	
			//阻止浏览器默认行为		
			window.event?e.returnValue=false:e.preventDefault();				
		}
		return false;
	}
	index4top.onmouseup=function(){
		document.onmousemove=null;	 //清除鼠移动事件
	}
	
	//还可以输入 个字
	//输入框发布 按钮
	var public_btn=document.getElementsByClassName('public')[0];
	var index4_top_X=document.getElementsByClassName('index4_top_X')[0];//X取消
	var numbers=document.getElementsByClassName('numbers')[0];//剩余字数
	var text=document.getElementsByClassName('index4_text')[0];
	index4_top_X.onclick=function(){//点击左上角x取消
		index3.style.display='none';
		index4.style.display='none';
	}
	var timer=setInterval(function(){ 
	var news2=text.value;
	if(news2.length==0){
		public_btn.setAttribute('disabled','disabled');
		public_btn.style.cssText="margin:5px 0 0 13px;width:82px;height:30px;border:0;background:#FF8140;color:#fff;border-radius:2px;";
	}else{
		public_btn.removeAttribute('disabled');
	}
	numbers.innerHTML=140-news2.length;//获取剩余字数
	},50);	
	
	
	
	//发表的动态插入的父对象
	var new_content=document.getElementById('new_content');

	//动态内容区p标签
	var owner_content=document.getElementById('owner_content');	
	//放置时间的span标签
	var dynamic_time=document.getElementsByClassName('dynamic_time')[0];
	//复制对象
	var owner_clone=document.getElementsByClassName('owner_clone')[0];
	//var owner_clone=document.getElementById('content_dynamic_state1');
	public_btn.onclick=function(){
		var date=new Date();
		var month=date.getMonth()+1;//获取月
		var data=date.getDate();//获取日
		var hours=date.getHours();//获取时
		var minutes=date.getMinutes();//获取分
		var str="";
		str=toTwo(month)+'-'+toTwo(data)+' '+toTwo(hours)+':'+toTwo(minutes);
		
		dynamic_time.innerHTML=str;
		//将输入框中的内容插入到p标签
		owner_content.innerHTML=text.value;
		
		//将对象插入到父对象的第一个子对象之前
		new_content.insertBefore(owner_clone,new_content.childNodes[0]);
		//new_content.appendChild(owner_clone)
		
		text.value='';//清空输入框
		index3.style.display='none';
		index4.style.display='none';
		
	}
	//不足两位补零
	function toTwo(n){
		return n<=9?"0"+n:""+n;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//左边导航部分
	left_nav=document.getElementById('left_nav');
	
	window.onscroll=function(){
		var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
		if(scrolltop>200){
			//console.log(scrolltop)
			left_nav.style.top=50+'px';
		}else{
			left_nav.style.top=60+'px';
		}
	}
	
	//获取index1距左边界的距离
	//var left_nav=document.getElementById('left_nav');
	//var index1=document.getElementById('z-index1');
	//index1.style.left=(left_nav.offsetLeft+150)+'px';

	
	var check=document.getElementsByClassName('check');

	for(var i=0;i<check.length;i++){
		check[i].index=i;
		check[i].onclick=function(){
			state1_content.style.display='block';	
			default_minpic.style.display='none';
			for(var j=0;j<check.length;j++){  
				minpics[j].style.cssText="border:2px solid #f2f2f5;";	
				maxpics[j].style.display='none';	
			}
			//选中对应的大图和小图
			minpics[this.index].style.cssText="border:2px solid #fa7d3c;";
			maxpics[this.index].style.display='block';
				
		}	
	}

	
	//点击小图轮播大图
	var minpics=document.getElementsByClassName('minpics');
	var maxpics=document.getElementsByClassName('maxpics');

	for(var i=0;i<minpics.length;i++){
		minpics[i].index=i;
		minpics[i].onclick=function(){
			for(var j=0;j<minpics.length;j++){  
				minpics[j].style.cssText="border:2px solid #f2f2f5;";	
				maxpics[j].style.display='none';	
			}
			//使对应的信息块display:block;
			this.style.cssText="border:2px solid #fa7d3c;";        
			maxpics[this.index].style.display='block';	
		}	
	}
		
	
	//大图 收起 功能
	var retract=document.getElementsByClassName('li1')[0];
	var default_minpic=document.getElementsByClassName('default_minpic')[0];
	var state1_content=document.getElementsByClassName('state1_content')[0];
	
	default_minpic.onclick=function(){
		state1_content.style.display='block';	
		default_minpic.style.display='none';
	}
	retract.onclick=function(){
		state1_content.style.display='none';	
		default_minpic.style.display='block';	
	}
	
	
//	var 父对象=document.getElementById('new_content');

//	var clone=复制对象.cloneNode(true);
//	var content_dynamic_state1=document.getElementById('content_dynamic_state1');
//	
//	父对象.insertBefore(clone,content_dynamic_state1);








































	
	
	
	
	
}