//购物车
var Cart = function () {
		this.Count = 0;// 购买的商品数量
		this.Total = 0;// 总计金额
		this.Items = new Array();// 购买的商品
};
//购物车集合对象
var CartItem = function () {
  	this.Id = 0; // 商品ID
  	this.Name = "";// 商品名称
  	this.Count = 0;// 购买数量
  	this.Price = 0;// 单价
  	this.imgPath="";// 商品图片路径
};
  
//购物车操作
var CartHelper = function () {
  	this.cookieName = "myCart";
  
  	this.Clear = function () {
    		var cart = new Cart();
    		this.Save(cart);
    		return cart;
  	};
  
  //向购物车添加
  this.Add = function (id, name, count, price, imgPath) {
    	var cart = this.Read();
    	var index = this.Find(id);
    	//如果ID已存在，覆盖数量
    	if (index > -1) {
      		var oldCount = cart.Items[index].Count;
      		var newCount = Number(oldCount) + Number(count);
      		cart.Items[index].Count = newCount;
      		cart.Total += (((cart.Items[index].Count * 100) * (cart.Items[index].Price * 100)) / 10000);
    	} else {
     		 var item = new CartItem();
      		item.Id = id;
      		item.Name = name;
      		item.Count = count;
      		item.Price = price;
      		item.imgPath = imgPath;
      
      		cart.Items.push(item);
      		cart.Count++;
      		cart.Total += (((cart.Items[cart.Items.length - 1].Count * 100) * (cart.Items[cart.Items.length - 1].Price * 100)) / 10000);
   		}
    	this.Save(cart);
    	return cart;
  };
  
  //改变数量
  this.Change = function (id, count) {
    	var cart = this.Read();
    	var index = this.Find(id);
    	cart.Items[index].Count = count;
    	this.Save(cart);
    	return cart;
  };
  
  //移出购物车
  this.Del = function (id) {
    	var cart = this.Read();
    	var index = this.Find(id);
    	if (index > -1) {
      		var item = cart.Items[index];
      		cart.Count--;
      		cart.Total = cart.Total - (((item.Count * 100) * (item.Price * 100)) / 10000);
      		cart.Items.splice(index, 1);
      		this.Save(cart);
    	}
    	return cart;
  };
  
  //根据ID查找
  this.Find = function (id) {
    	var cart = this.Read();
    	var index = -1;
    	for (var i = 0; i < cart.Items.length; i++) {
      		if (cart.Items[i].Id == id) {
        			index = i;
      		}
    	}
    	return index;
  };
  
  //COOKIE操作
  this.Save = function (cart) {
    	var source = "";
    	for (var i = 0; i < cart.Items.length; i++) {
      		if (source != "") { source += "|$|"; }
      				source += this.ItemToString(cart.Items[i]);
    			}
    			$.cookie(this.cookieName, source, {expires:7});
  		};
  
  		this.Read = function () {
    			//读取COOKIE中的集合
    			var source = $.cookie(this.cookieName);
    			var cart = new Cart();
    			if (source == null || source == "") {
     					 return cart;
    			}
    			var arr = source.split("|$|");
    			cart.Count = arr.length;
    			for (var i = 0; i < arr.length; i++) {
      				var item = this.ItemToObject(arr[i]);
      				cart.Items.push(item);
      				cart.Total += (((item.Count * 100) * (item.Price * 100)) / 10000);
    			}
    			return cart;
  		};
  		this.ItemToString = function (item) {
    			return item.Id + "||" + escape(item.Name) + "||" + item.Count + "||" + item.Price + "||" + item.imgPath;
  		};
  
  	this.ItemToObject = function (str) {
  	  	var arr = str.split('||');
  	 	 	var item = new CartItem();
  	 	 	item.Id = arr[0];
  	  	item.Name = unescape(arr[1]);
  	  	item.Count = arr[2];
  	  	item.Price = arr[3];
  	  	item.imgPath = arr[4];
  	  	return item;
  	};
};