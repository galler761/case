### (1)谈谈This对象的理解
+ this总是指向函数的直接调用者（而非间接调用者）； 如果有new关键字，this指向new出来的那个对象； 在事件中，this指向触发这个事件的对象，特殊的是，IE中的attachEvent中的this总是指向全局对象Window；

### (2)eval是做什么的？
+ 它的功能是把对应的字符串解析成JS代码并运行； 应该避免使用eval，不安全，非常耗性能（2次，一次解析成js语句，一次执行）。 由JSON字符串转换为JSON对象的时候可以用eval，var obj =eval('('+ str +')');

### (3)什么是window对象? 什么是document对象?
+ window对象是指浏览器打开的窗口。 document对象是Documentd对象（HTML 文档对象）的一个只读引用，window对象的一个属性。

### (4)["1", "2", "3"].map(parseInt) 答案是多少？
+ ["1", "2", "3"].map(parseInt) 答案也就是：[1, NaN, NaN]

### (5)什么是闭包（closure），为什么要用它？
+ 闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量,利用闭包可以突破作用链域，将函数内部的变量和方法传递到外部。

### (6)javascript 代码中的"use strict";是什么意思 ? 使用它区别是什么？
+ 使JS编码更加规范化的模式,消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为。 默认支持的糟糕特性都会被禁用，比如不能用with，也不能在意外的情况下给全局变量赋值; 全局变量的显示声明,函数必须声明在顶层，不允许在非函数代码块内声明函数,arguments.callee也不允许使用； 保证代码运行的安全,限制函数中的arguments修改; 提高编译器效率，增加运行速度；

### (7)如何判断一个对象是否属于某个类？
<pre>
    // 判断对象类型最好的方式 
    // 对于 Object 对象，直接调用 toString() 就能返回 [object Object] 。
    // 而对于其他对象，则需要通过 call / apply 来调用才能返回正确的类型信息。 
    Object.prototype.toString.call('');             // [object String] 
    Object.prototype.toString.call(1);              // [object Number] 
    Object.prototype.toString.call(true);           // [object Boolean] 
    Object.prototype.toString.call(Symbol());       // [object Symbol] 
    Object.prototype.toString.call(undefined);      // [object Undefined] 
    Object.prototype.toString.call(null);           // [object Null] 
    Object.prototype.toString.call(new Function()); // [object Function] 
    Object.prototype.toString.call(new Date());     // [object Date] 
    Object.prototype.toString.call([]);             // [object Array] 
    Object.prototype.toString.call(new RegExp());   // [object RegExp] 
    Object.prototype.toString.call(new Error());    // [object Error] 
    Object.prototype.toString.call(document);       // [object HTMLDocument] 
    Object.prototype.toString.call(window);         // [object global] 
    window //是全局对象 global 的引用
</pre>

### (8)new一个对象的过程
1. 创建一个空对象，将它的引用赋给 this，继承函数的原型。
2. 通过 this 将属性和方法添加至这个对象
3. 最后返回 this 指向的新对象，也就是实例（如果没有手动返回其他的对象）

### (9)Ajax 解决浏览器缓存问题
1. 在ajax发送请求前加上 anyAjaxObj.setRequestHeader("If-Modified-Since","0")。
2. 在ajax发送请求前加上 anyAjaxObj.setRequestHeader("Cache-Control","no-cache")。 
3. 在URL后面加上一个随机数： "fresh=" + Math.random();。 
4. 在URL后面加上时间戳："nowtime=" + new Date().getTime();。 
5. 如果是使用jQuery，直接这样就可以了 $.ajaxSetup({cache:false})。这样页面的所有ajax都会执行这条语句就是不需要保存缓存记录。

### (10)如何解决跨域问题?
+ jsonp、 iframe、window.name、window.postMessage、服务器上设置代理页面

### (11)DOM操作——怎样添加、移除、移动、复制、创建和查找节点?
- （1）创建新节点 
1. createDocumentFragment() //创建一个DOM片段 
2. createElement() //创建一个具体的元素 
3. createTextNode() //创建一个文本节点
- （2）添加、移除、替换、插入 
1. appendChild() 
2. removeChild() 
3. replaceChild() 
4. insertBefore() //在已有的子节点前插入一个新的子节点
- （3）查找 
1. getElementsByTagName() //通过标签名称 
2. getElementsByName() //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的) 
3. getElementById() //通过元素Id，唯一性

### (12)如何判断当前脚本运行在浏览器还是node环境中？（阿里）
+ js this === window ? 'browser' : 'node';


### (13)我们给一个dom同时绑定两个点击事件，一个用捕获，一个用冒泡。会执行几次事件，会先执行冒泡还是捕获？
+ 按照W3C的标准，先发生捕获事件，后发生冒泡事件。所有事件的顺序是：其他元素捕获阶段事件 -> 本元素代码顺序事件 -> 其他元素冒泡阶段事件
<pre>
// div-capture > btn-bubble > btn-capture > div-bubble
var btn = document.querySelector('button');
var div = document.querySelector('div');

btn.addEventListener('click', function(){
    console.log('bubble','btn');
},false);
btn.addEventListener('click', function(){
    console.log('capture','btn');
},true);

div.addEventListener('click', function(){
    console.log('bubble','div');
},false);
div.addEventListener('click', function(){
    console.log('capture','div');
},true);
</pre>
### (14)自动播放音乐
<pre>
//JS绑定自动播放（操作window时，播放音乐）
$(window).one('touchstart', function(){
    music.play();
})

//微信下兼容处理
document.addEventListener("WeixinJSBridgeReady", function () {
    music.play();
}, false);
</pre>

### (15)javascript中的严格模式以及严格模式的限制
+ 'use strict;'指令是ECMAscript添加的第二种运行模式，严格模式(strict mode)即在严格的条件下运行，"use strict" 指令只允许出现在脚本或函数的开头。
##### 设立“严格模式”的目的：
1. 消除javascript语法中的一些不合理、不严谨之处，减少一些怪异行为；
2. 消除代码运行的一些不安全之处，保证代码运行的安全；
3. 提高编译器效率，增加运行速度；
4. 为未来新版本的javascript做好铺垫。
+ “严格模式”体现了javascript更合理、更安全、更严谨的发展方向。
##### 严格模式对比非严格模式主要做了哪些限制：
1. 不允许使用未声明的变量；
2. 不允许使用delete x;这种方式删除变量或对象；
3. 不允许delete fun;这种方式删除函数；
4. 不允许函数参数重名；
5. 不允许使用八进制；
6. 不允许使用转义符；
7. 不能对只读属性赋值；
8. 不允许对一个使用getter方法读取的属性进行赋值；
9. 不允许删除一个不允许删除的属性；
10. 变量名不能使用“eval”字符串；
11. 变量名不能使用“arguments”字符串；
12. 不允许使用with；
13. eval不会在它的外层作用域引入变量；
14. 禁止this关键字指向全局对象；
15. 保留关键字；implements, interface, let, package, private, protected, public, static, yield
### (16)
### (17)
### (18)
### (19)
### (20)