// 注册页面  

window.onload = function() {
	var reg = document.getElementById('reg');
	var gtw = window.getComputedStyle(reg).width; //rem单位是浏览器自动计算  
	var gth = window.getComputedStyle(reg).height; //要使用getComputedStyle获取浏览器中的reg的宽高  
	var htm = document.getElementsByTagName('html')[0];
	var htmF = window.getComputedStyle(htm).fontSize; //css中的font-size值  
	var inputs = reg.getElementsByTagName('input');

	//矩形平板,效果不理想  
	if(screen.width >= screen.height) {
		if(screen.width <= parseFloat(gth)) {
			htm.style.fontSize = parseFloat(screen.width) / parseFloat(gth) * parseFloat(htmF) + 'px';

		}
		if(screen.height <= parseFloat(gtw)) {
			htm.style.fontSize = parseFloat(screen.height) / parseFloat(gtw) * parseFloat(htmF) + 'px';
		}
		gth = parseFloat(screen.width) - 200 + 'px';
		gtw = parseFloat(screen.height) - 150 + 'px';
		reg.style.width = gth;
		reg.style.height = gtw;
	}

}