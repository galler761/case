/**
 *依赖 
 */
function Dep(){
	this.list = {}
}
Dep.prototype = {
	/**
	 * 加事件
	 * @param {Object} event
	 * @param {Object} fn
	 */
	on:function(event,fn){
		var self = this;
		var list = self.list;
		if(typeof list[event]=='undefined'){
			list[event] = [];
			list[event].push(fn);
		}else{
			list[event].push(fn);
		}
	}
	/**
	 * 回收垃圾
	 */
	,collect:function(arrLength){
		var list = this.list;
		for(var k in list){
			if(k.indexOf("$index")>-1 || k.indexOf("$el")>-1){
				list[k]=[];
			}
		}
	}
	/**
	 * 触发事件
	 */
	,emit:function(event){
		var isExist = event in this.list;
		if(isExist){
			var arr = this.list[event];
			for(var i=0;i<arr.length;i++){
				arr[i]();
			}
			this.collect();
		}
		
	}
	
}

//var dep = new Dep();
/**
 *包装定时器 
 */
var raf = (function () {return window.requestAnimationFrame ||window.webkitRequestAnimationFrame ||window.mozRequestAnimationFrame ||function (callback) {window.setTimeout(callback, 1000 / 60);};
})();
/**
 * 非数组拦截
 * @param {Object} o
 * @param {String} p
 * @param {String} paths 路径 用来记录key位于object的层级
 */
function obs(o,p,paths,scope){
	var old = o[p];
	if(!type(old,'Array') && !type(old,'Function')){
		Object.defineProperty(o,p,{
			set:function(v){
				if(old!=v){
					old = v;
					//handler
					scope.$dep.emit(paths);
				}	
			}
			,get:function(){
				return old
			}
		})
		loop(o[p],paths,scope);
	}	
}

/**
 * 数组拦截
 * @param {Object} o
 * @param {String} k
 * @param {String} paths 路径 用来记录key位于object的层级
 */
function obsarr(o,k,paths,scope){
	if(type(o[k],'Array')){
		if(o.$d[k] != JSON.stringify(o[k])){
			//handler
			scope.$dep.emit(paths);
			o.$d[k] = JSON.stringify(o[k])
		}
		loopArr(o[k],paths,scope);
	};	
}

/**
 * 递归非数组
 * @param {Object} o
 * @param {String} path 路径 用来记录key位于object的层级
 */
function loop(o,path,scope){
	if(type(o,'Object')){
		for(var k in o){
			if(typeof path=='undefined'){
				var paths = k;
			}else{
				var paths = path+'.'+k;
			}
			if(typeof scope=='undefined'){
				var scopes = o;
			}else{
				var scopes = scope;
			}
			obs(o,k,paths,scopes);
		}
	}
}
/**
 * 递归数组
 * @param {Object} o
 * @param {String} path 路径 用来记录key位于object的层级
 */
function loopArr(o,path,scope){ 
	if(type(o,'Object')){
		for(var k in o){
			if(typeof path=='undefined'){
				var paths = k;
			}else{
				var paths = path+'.'+k;
			}
			if(typeof scope=='undefined'){
				var scopes = o;
			}else{
				var scopes = scope;
			}
			obsarr(o,k,paths,scopes)
		}
	}
}
/**
 * 挂载脏数据
 * @param {Object} o
 */
function addD(o){		
	if(type(o,'Object')){
		if(typeof o.$d==='undefined'){			
			Object.defineProperty(o,'$d',{
				value:{},
				writrable:true
			});
		}
		for(var k in o){
			addD(o[k]);
			var value = o[k];
			if(type(value,"Array")){
				o.$d[k] = JSON.stringify(value);
			}
		}
	}
}
/**
 * 挂载Dep
 * @param {Object} o
 */
function loadDep(o){
	var dep = new Dep();
	if(isExist('dep',o)==false){
		Object.defineProperty(o,'$dep',{
			writrable:true
			,value:dep
		})
	}
};
/**
 * 观测
 * @param {Object} o
 */
var obsArr=[];//数组观察组
function observe(o){
	loadDep(o);
	addD(o);
	loop(o);
}
/**
 * 入口函数，绑定scope 扫描node
 * @param {String} id
 * @param {Object} scope
 */
window.xx = function(id,scope){
	observe(scope);
	scan(id,scope);
	var obj = {nodeID:id,scope:scope};
	if(obsArr.length>0){
		for(var i=0;i<obsArr.length;i++){
			var item = obsArr[i];
			if(item.nodeID == obj.nodeID){
				obsArr.splice(i,1);
			}
		}
		obsArr.push(obj);
	}else{
		obsArr.push(obj);
	}
	return scope;
}
/**
 * 脏检查
 */
function dirty(){
	raf(dirty);
	obsArr.forEach(function(item){
		if(type(item.scope,'Object')){
			loopArr(item.scope);
		}
	});	
}
dirty();
/**
 * 扫描解析
 * @param {Object} node
 * @param {Object} scope
 */
var ajaxLock=false;
function Scan(id,scope){
	var id = id.substr(1);
	var node = document.getElementById(id);
	this.frag = this.nodeToFrag(node);
	this.parse(this.frag,scope);
	node.appendChild(this.frag);
}
Scan.prototype = {	
	/**
	 * node转fragment
	 * @param {Object} node
	 */
	nodeToFrag:function(node){
		var frag = document.createDocumentFragment();
		var childs= [].slice.call(node.childNodes);
		childs.forEach(function(item){
			frag.appendChild(item);
		})
		return frag;
	}
	/**
	 * 解析自己
	 */
	,parseMe:function(node,scope){
		var self = this;
		if(node.nodeType==1){
			self.parseNode(node,scope);
		}
	}
	/**
	 * 解析后代
	 */
	,parse:function(node,scope){
		var self = this;
		(!!node.childNodes) && +function(){
			var childs = [].slice.call(node.childNodes);
			for(var i=0;i<childs.length;i++){
				var child = childs[i];
				var type = child.nodeType;
				if(child.nodeName == 'Script')continue;
				if(type==1){
					self.parseNode(child,scope);
				}else if(type==3){
					self.parseText(child,scope);
				}
			}		
		}();		
	}
	/**
	 * 解析text
	 */
	,parseText:function(node,scope){
		var self = this;
		var html = node.nodeValue;
		var parseItem = function(){
			var tpl = tplE(html,scope);
			node.nodeValue = tpl;
		};
		parseItem()
		//parse textNode exp;
		var patt = /\{\{(.+?)\}\}/g;
		var match = '';
		var explist = [];
		var exp = ''
		html = html.replace(/[\n\t]/g,'');
		while(match = patt.exec(html)){
			exp = getBindExp(match[1])
			explist.push(exp);
		}
		explist.forEach(function(exp){
			//bind watch
			watch(scope,exp,parseItem);
		})
	}
	/**
	 * 解析node
	 */
	,parseNode:function(node,scope){
		var self = this;
		var attrs = [].slice.call(node.attributes);
		var laze = '';
		var lazeType='';
		var dir='';
		var exp = '';
		var value='';
		attrs = filter(attrs);
		if(node.getAttribute("x-for")!=null){
			laze="for";
			dir="x-for";
			value = node.getAttribute("x-for");
			exp = getBindExp(node.getAttribute("x-for"));
		}else if(node.getAttribute("x-if")!=null){
			laze="if";
			dir="x-if";
			value = node.getAttribute("x-if");
			exp = getBindExp(node.getAttribute("x-if"));
		}else{
			attrs.forEach(function(attr){
				dir = attr.name;
				exp = getBindExp(attr.value);
				value = attr.value;		
				//解析指令
				var dirType = checkDir(dir);
				if(dirType!=false){
					self[dirType+'Cbk'](node,scope,dir,exp,value);
					node.removeAttribute(dir);
				}
			})
		}
		
		if(laze=="for"){
			self[laze+'Cbk'](node,scope,dir,exp,value);
		}else if(laze=="if"){
			self[laze+'Cbk'](node,scope,dir,exp,value);
		}else{
			self.parse(node,scope);
		}
	}
	/**
	 * 事件渲染
	 */
	,onCbk:function(node,scope,dir,exp,value){
		var event = dir.substr(dir.lastIndexOf('-')+1);
		var parseItem = function(){
			node.addEventListener(event,compute(scope,value));
		}();
	}
	/**
	 * attribute渲染
	 */
	,attrCbk:function(node,scope,dir,exp,value){
		var attrName = dir.substr(dir.lastIndexOf('attr-')+5);
		var parseItem = function(){
			node.setAttribute(attrName,compute(scope,value));
		}		
		//bind watch
		watch(scope,exp,parseItem);
	}
	/**
	 * prop渲染
	 */
	,propCbk:function(node,scope,dir,exp,value){
		var propName = dir.substr(dir.lastIndexOf('prop-')+5);
		var parseItem = function(){
			node[propName] = compute(scope,value);
		}
		//bind watch
		watch(scope,exp,parseItem);
	}
	/**
	 * innerHTML渲染
	 */
	,htmlCbk:function(node,scope,dir,exp,value){
		var parseItem = function(){		
			node.innerHTML = compute(scope,value);
		}
		//bind watch
		watch(scope,exp,parseItem);
	}
	/**
	 * value渲染
	 */
	,valueCbk:function(node,scope,dir,exp,value){
		var parseItem = function(){
			node.value = compute(scope,value);
		}
		//bind watch
		watch(scope,exp,parseItem);
	}
	/**
	 * 列表元素渲染后回调
	 */
	,renderedCbk:function(node,scope,dir,exp,value){
		var timer = setTimeout(function(){
			var fn = compute(scope,value);
			fn.call(node);
			clearTimeout(timer);
			timer = null;
		});		
	}
	/**
	 *列表渲染
	 */
	,forCbk:function(node,scope,dir,exp,value){	
		var self = this;
		var start = document.createComment("start");
		var end = document.createComment("end");
		var parent = node.parentNode;
		parent.replaceChild(end,node);
		parent.insertBefore(start,end);
		var range = document.createRange();
		node.removeAttribute(dir);
		var parseItem = function(){
			var arr = compute(scope,value);
			var parent = end.parentNode;
			range.setStart(start,start.nodeValue.length);
			range.setEnd(end,0);
			range.deleteContents();
			arr.forEach(function(item,index){	
				var obj= Object.create(scope);
				var clone = node.cloneNode(true);
				parent.insertBefore(clone,end);
				obj['$el']= item;
				obj['$index'] = index;
				self.parse(clone,obj);
				self.parseMe(clone,obj);
			});
		}
		//bind watch
		watch(scope,exp,parseItem);
	}
	
	/**
	 *条件渲染
	 */
	,ifCbk:function(node,scope,dir,exp,value){
		var self = this;
		self.parse(node,scope);
		var parent = node.parentNode;
		var end = document.createComment('if'+Date.now());
		parent.insertBefore(end,node);
		node.removeAttribute('x-if');
		var parseItem = function(){
			var parent = end.parentNode;
			if(!compute(scope,value)){				
				parent.removeChild(node);
			}else{
				parent.insertBefore(node,end);
			}
			self.parseMe(node,scope);
		}
		//bind watch
		watch(scope,exp,parseItem);
	}
	/**
	 *ajax模板渲染
	 */
	,tplurlCbk:function(node,scope,dir,exp,value){
		var self = this;
		var parseItem = function(){
			var url = compute(scope,value)+'?timestamp='+Date.now();
			if(ajaxLock==true)return;
			node.innerHTML = '';
			ajaxLock = true;
			get(url,function(res){
				var html = res.responseText;
				var frag = htmlToFrag(html);
				node.appendChild(frag);
				runJs(node.innerHTML);
				ajaxLock = false;
			})
		}
		watch(scope,exp,parseItem);
	}
	
}

function scan(node,scope){
	return new Scan(node,scope);
}

/**
 * attrs中过滤出指令
 * @param {Object} arr
 */
function filter(arr){
	for(var i=arr.length;i--;){
		var item = arr[i].name;
		if(item.indexOf('x-')==-1){
			arr.splice(i,1)
		}
	}
	return arr;
}
/**
 * 解析ajax中的脚本
 * @param {Object} html
 */
function runJs(html){
	var div = document.createElement('div');
	div.innerHTML = html;
	var scripts = div.getElementsByTagName('script');
	([].slice.call(scripts)).forEach(function(item){
		eval(item.innerHTML);
	})
}
/**
 * html转frag
 * @param {String} html
 */
function htmlToFrag(html){
	var div = document.createElement('div');
	var frag = document.createDocumentFragment();
	var child='';
	div.innerHTML = html;
	while(child = div.firstChild){
		frag.appendChild(child);
	}
	return frag
}
/**
 * ajax加载
 */
function get(url,fn){
	var xhr = new XMLHttpRequest();
	xhr.open('GET',url);
	xhr.onload = function(){
		if((xhr.status>=200 && xhr.status<300)||xhr.status==304){
			fn(xhr);
		}
	}
	xhr.send();
}
/**
 * console.log缩写
 * @param {Object} str
*/
function l(str){
	console.log(str);
}
/**
 * 判断有没有属性
 * @param {String} prop
 * @param {Object} scope
 */
function isExist(prop,scope){
	return prop in scope;
}
/**
 * 判断数据类型
 * @param {Object} o
 * @param {Object} str
 */
function type(o,str){
	return {}.toString.call(o).slice(8,-1)==str;
}
/**
 * 表达式传换成js代码
 * @param {Object} scope
 * @param {Object} value
 */
function compute(scope,value){
	var patt = /\{\{(.+?)\}\}/g;
	var match = patt.exec(value);
	if(match==null){
		with(scope){
			return eval(value);
		}
	}else{
		return eval(tplE(value,scope));
	}
	
}

/**
 * 返回表达式
 * @param {Object} exp
 */
function getBindExp(exp){
	var patt = /\{\{(.+?)\}\}/g;
	var match = patt.exec(exp);
	if(match==null){
		return exp;
	}else{
		return match[1];
	}
	
}
/**
 * 提取指令
 * @param {Object} name
 */
function checkDir(name){
	var type = '';
	var patt = /(?:x-)([a-zA-Z]+)(?:[-]*)/g;
	if(name.indexOf('x-')!=-1){
		type = patt.exec(name)[1];
	}else{
		type = false;
	}
	return type;
}
/**
 * 花括号解析
 * @param {Object} html
 * @param {Object} option
 */
function tplE(html,option){
	var html = html.replace(/[\n\t]/g,'');
	html = html.replace(/["]/g,'');
	var patt = /\{\{(.+?)\}\}/g;
	var match = '';
	var index = 0;
	var code ='with(obj){var r="";\n';
	while(match = patt.exec(html)){
		code += 'r+="'+html.slice(index,match.index)+'";\n';
		code += 'r+='+match[1]+';\n';
		index=match.index + match[0].length;
	}
	code += 'r+="'+html.substr(index)+'";\n};\n';
	code +='return r;\n';
	var fn = new Function('obj',code).call(option,option);
	return fn;
}
/**
 * watch
 * 
 */
function Watch(scope,exp,fn){
	fn();
	scope.$dep.on(exp,fn);
}
function watch(scope,exp,fn){
	new Watch(scope,exp,fn);
}