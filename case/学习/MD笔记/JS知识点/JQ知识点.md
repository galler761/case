### (1)jquery中如何将数组转化为json字符串，然后再转化回来？
<pre>
//jQuery中没有提供这个功能，所以你需要先编写两个jQuery的扩展： 
 $.fn.stringifyArray = function(array) {
        return JSON.stringify(array)
    }

    $.fn.parseArray = function(array) {
        return JSON.parse(array)
    }
    //然后调用：
    $.fn.stringifyArray(array)
</pre>

### (2)jquery的$.extend深复制和浅复制原理
<pre>
// 浅复制
$ = { 
     extend : function(target, options) { 
        for (name in options) { 
            target[name] = options[name]; 
        } 
        return target; 
    } 
}; 
// 深复制
$ = { 
   extend : function(deep, target, options) { 
       for (name in options) { 
           copy = options[name]; 
           if (deep && copy instanceof Array) { 
               target[name] = $.extend(deep, [], copy); 
           } else if (deep && copy instanceof Object) { 

              target[name] = $.extend(deep, {}, copy); 
           } else { 
              target[name] = options[name]; 
          } 
      } 
     return target; 
  }
};
</pre>

### (3)jquery.extend 与 jquery.fn.extend的区别？
+ jquery.extend 为jquery类添加类方法，可以理解为添加静态方法
+ jquery.fn.extend: 源码中jquery.fn = jquery.prototype，所以对jquery.fn的扩展，就是为jquery类添加成员函数 使用： jquery.extend扩展，需要通过jquery类来调用，而jquery.fn.extend扩展，所有jquery实例都可以直接调用。

### (4)JQuery一个对象可以同时绑定多个事件，这是如何实现的？
<pre>
  //多个事件同一个函数：
  $("div").on("click mouseover", function(){});
  //多个事件不同函数
  $("div").on({
      click: function(){},
      mouseover: function(){}
  });
</pre>

### (5)

### (6)
### (7)
### (8)
### (9)
### (10)