window.onload = function(){
	window.requestAnimFrame = ( function() {
		return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function( callback ) {
					window.setTimeout( callback, 1000 / 60 );
				};
	})();

	var can = document.getElementById("canvas");
	var canvasBg = document.getElementsByClassName("canvasBg")[0];
	var simple_item = document.getElementsByClassName("simple-item");
	var cxt = can.getContext("2d");
	var cw = canvasBg.clientWidth;
	var ch = canvasBg.clientHeight;
	
	can.width = cw;
	can.height = ch;
	var circles = [];//圆形粒子集合
	var rects = [];//正方形粒子集合
	var  triangles = [];//三角形粒子集合
	var i = 0;
	var x = 0;
	var y = 0;
	//圆形粒子对象
	function Circle(x,y,r){
		this.x = x;
		this.y = y;
		this.r = r;
		//速度：速度值 方向
		this.speed = Math.random()*0.5+0.1;
		this.direction = Math.random()*Math.PI*2;
	}
	//移动圆形粒子
	Circle.prototype.update = function(){
		this.x += Math.cos(this.direction)*this.speed;
		this.y += Math.sin(this.direction)*this.speed;
		if (this.x <= this.r)
		{
			this.x = this.r;
			this.direction = Math.PI - this.direction;
		}else if (this.x >= cw-this.r)
		{
			this.x = cw-this.r;
			this.direction = Math.PI - this.direction;
		}
		if (this.y <= this.r)
		{
			this.y = this.r;
			this.direction = this.direction-Math.PI/2;
		}else if (this.y >= ch-this.r)
		{
			this.y =  ch-this.r;
			this.direction = this.direction-Math.PI/2;
		}
	}
	//绘制圆形粒子
	var mark = false;
	Circle.prototype.draw = function(){
		cxt.beginPath();
		cxt.arc(this.x,this.y,this.r,0,360,false);
		cxt.closePath();
		cxt.fillStyle = "#ff6";
		//alert(simple_item[2]);
		simple_item[2].onmouseover = function(){
			mark = true;
		}
		simple_item[2].onmouseout = function(){
			mark = false;
		}
		if (mark)
		{
			cxt.globalAlpha = 1;
		}
		else if (this.x >= x-50 && this.x <= x+50 && this.y >= y-50 && this.y <= y+50 )
		{
			cxt.globalAlpha = 1;
		}else{
			cxt.globalAlpha = 0.4;
		}
		cxt.fill();
	}
	
	
	//正方形粒子对象
	function Rect(x,y,w,h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		//正方形的中心坐标初始值
		this.x0 = Math.random()*cw;
		this.y0 = Math.random()*ch;
		this.speed = Math.random()*0.5+0.1;
		this.direction = Math.random()*Math.PI*2;
		this.r = Math.sqrt(Math.pow(this.w/2,2)+Math.pow(this.h/2,2));
	}
	Rect.prototype.update = function(){
		this.x0 += Math.cos(this.direction)*this.speed;
		this.y0 += Math.sin(this.direction)*this.speed;
		if (this.x0 <= this.r)
		{
			this.x0 = this.r;
			this.direction = Math.PI - this.direction;
		}else if (this.x0 >= cw-this.r)
		{
			this.x0 = cw-this.r;
			this.direction = Math.PI - this.direction;
		}
		if (this.y0 <= this.r)
		{
			this.y0 = this.r;
			this.direction = this.direction - Math.PI;
		}else if (this.y0 >= ch-this.r)
		{
			this.y0 =  ch-this.r;
			this.direction = this.direction - Math.PI;
		}
	}
	//绘制出正方形粒子
	Rect.prototype.draw = function(){
		cxt.save();
		cxt.translate(this.x0,this.y0);
		cxt.rotate(i*Math.PI/180);
		cxt.fillStyle = "#60c";
		if (this.x0 >= x-50 && this.x0 <= x+50&& this.y0 >= y-50&&this.y0 <= y+50 )
		{
			cxt.globalAlpha = 1;
		}else{
			cxt.globalAlpha = 0.4;
		}
		cxt.beginPath();
		cxt.fillRect(this.x,this.y,this.w,this.h);
		cxt.closePath();
		cxt.restore();
	}

	//三角形粒子对象 
	function  Triangle(x1,y1,x2,y2,x3,y3){
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.x3 = x3;
		this.y3 = y3;
		//三角形的中心坐标
		this.x0 = Math.random()*cw;
		this.y0 = Math.random()*ch;
		this.speed = Math.random()*0.5+0.1;
		this.direction = Math.random()*Math.PI*2;
		this.angle = Math.random()*Math.PI;
		this.r = distance(this.x1,this.y1,this.x2,this.y2)/2/Math.cos(Math.PI/6);
	}
	//旋转三角形粒子
	Triangle.prototype.update = function(){
		this.x1 = this.x0 + Math.cos(this.angle)*this.r;
		this.y1 = this.y0 + Math.sin(this.angle)*this.r;
		this.x2 = this.x0 + Math.cos(this.angle+Math.PI*2/3)*this.r;
		this.y2 = this.y0 + Math.sin(this.angle+Math.PI*2/3)*this.r;
		this.x3 = this.x0 + Math.cos(this.angle+Math.PI*4/3)*this.r;
		this.y3 = this.y0 + Math.sin(this.angle+Math.PI*4/3)*this.r;
		this.angle += Math.PI/100; 
		this.x0 += Math.cos(this.direction)*this.speed;
		this.y0 += Math.sin(this.direction)*this.speed;
		if (this.x0 <= this.r)
		{
			this.x0 = this.r;
			this.direction = Math.PI - this.direction;
		}else if (this.x0 >= cw-this.r)
		{
			this.x0 = cw-this.r;
			this.direction = Math.PI - this.direction;
		}
		if (this.y0 <= this.r)
		{
			this.y0 = this.r;
			this.direction = this.direction - Math.PI;
		}else if (this.y0 >= ch-this.r)
		{
			this.y0 =  ch-this.r;
			this.direction = this.direction - Math.PI;
		}
	}
	//绘制三角形粒子
	Triangle.prototype.draw = function(){
		cxt.beginPath();
		cxt.moveTo(this.x1,this.y1);
		cxt.lineTo(this.x2,this.y2);
		cxt.lineTo(this.x3,this.y3);
		cxt.closePath();
		if (this.x0 >= x-50&& this.x0 <= x+50&& this.y0 >= y-50&&this.y0 <= y+50 )
		{
			cxt.globalAlpha = 1;
		}else{
			cxt.globalAlpha = 0.4;
		}
		cxt.fillStyle = "#c00";
		cxt.fill();
	}
	//添加粒子个数
	function addParticles(){
		var counts = 100;
		while (counts--)
		{
			var w = Math.random()*cw;
			var h = Math.random()*ch;
			//添加圆形粒子对象
			circles.push(new Circle(w,h,5));
			rects.push(new Rect(5,-5,10,10));
			triangles.push(new Triangle(w,h,w+10,h,w+5,h-5*Math.tan(Math.PI/3)));
		}
	}
	
	//勾股定理计算长度
	function distance(sx,sy,tx,ty){
		var x = tx - sx, y = ty - sy;
		return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
	}
	//鼠标坐标位置
	document.onmousemove = function(ev){
		var ev = ev || window.event;
		x = ev.pageX;
		y = ev.pageY;
	}
	function loop(){
		requestAnimFrame(loop);
		//显示后面绘制的元素
		i++;
		if (i>10000)
		{
			i = 0;
		}
		cxt.globalCompositeOperation = 'destination-out';
		cxt.fillStyle = 'rgba(0, 0, 0, 1)';
		//透明度
		cxt.globalAlpha = 1;
		cxt.fillRect( 0, 0, cw, ch );
		//显示重叠部分
		cxt.globalCompositeOperation = 'lighter';
		var n = circles.length;
		while (n--)
		{
			circles[n].draw();
			circles[n].update();
		}
		var n = rects.length;
		while (n--)
		{
			rects[n].draw();
			rects[n].update();
		}
		var n = triangles.length;
		while (n--)
		{
			triangles[n].draw();
			triangles[n].update();
		}
	}
	addParticles();
	loop();
	window.onresize = function(){
		cw = canvasBg.clientWidth;
		ch = canvasBg.clientHeight;
		console.log(ch);
		can.width = cw;
		can.height = ch;
		console.log(can.height);
		circles.length = 0;
		rects.length = 0;
		triangles.length = 0;
		addParticles();
	}
}
	