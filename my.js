// window.onload=function (){
	function byclass(classn){//全局获取类
		var tags=document.all ? document.all : document.getElementsByTagName('*');
		var arr=[];
		for (var i = 0; i < tags.length; i++) {
			//获取只有一个类名的元素
			if (tags[i].className==classn) {
				arr.push(tags[i]);
			}
		};
		return arr;
	}
	function byclass2(classn){//全局获取类
		var tags=document.all ? document.all : document.getElementsByTagName('*');
		var arr=[];
		for (var i = 0; i < tags.length; i++) {
			//可获取有多个类名的元素，不能有类似的
			if (tags[i].className.indexOf(classn)!=-1) {
				arr.push(tags[i]);
			}
		};
		return arr;
	}
	function byclass3(classn){//全局获取类
		var tags=document.all ? document.all : document.getElementsByTagName('*');
		var arr=[];
		var reg=new RegExp('\\b'+classn+'\\b');
		for (var i = 0; i < tags.length; i++) {
			//可获取有多个类名的元素
			if (reg.test(tags[i].className)) {
				arr.push(tags[i]);
			}
		};
		return arr;
	}
	function getclass(parentID,classn){//局部获取类
		var parent=document.getElementById(parentID);
		var tags=parent.all?parent.all:parent.getElementsByTagName('*');
		var arr=[];
		for (var i = 0; i < tags.length; i++) {
			//获取只有一个类名的元素
			if (tags[i].className==classn) {
				arr.push(tags[i]);
			}
		};
		return arr;
	}
	function getclass2(parentID,classn){//局部获取类
		var parent=document.getElementById(parentID);
		var tags=parent.all?parent.all:parent.getElementsByTagName('*');
		var arr=[];
		for (var i = 0; i < tags.length; i++) {
			//可获取有多个类名的元素
			if (tags[i].className.indexOf(classn)!=-1) {
				arr.push(tags[i]);
			}
		};
		return arr;
	}
	function getclass3(parentID,classn){//局部获取类
		var parent=document.getElementById(parentID);
		var tags=parent.all?parent.all:parent.getElementsByTagName('*');
		var arr=[];
		var reg=new RegExp('\\b'+classn+'\\b');
		for (var i = 0; i < tags.length; i++) {
			//可获取有多个类名的元素
			if (reg.test(tags[i].className)) {
				arr.push(tags[i]);
			}
		};
		return arr;
	}
	function getstyle(obj,oStyle){//获取元素样式
		if (obj.currentStyle) {
			return obj.currentStyle[oStyle];
		} else{
			return getComputedStyle(obj,null)[oStyle];
		};
	}
	function nextnode(obj){//获取下一个兄弟节点
		if (obj.nextElementSibling) {
			return obj.nextElementSibling;
		} else{
			return obj.nextSibling;
		};
	}
	function prenode(obj){//获取上一个兄弟节点
		if (obj.previousElementSibling) {
			return obj.previousElementSibling;
		} else{
			return obj.previousSibling;
		};
	}
	function firstnode(obj){//获取第一个子节点
		if (obj.firstElementChild) {
			return obj.firstElementChild;//非IE678支持
		} else{
			return obj.firstChild;//IE678支持
		};
	}
	function lastnode(obj){//获取最后一个子节点
		if (obj.lastElementChild) {
			return obj.lastElementChild;//非IE678支持
		} else{
			return obj.lastChild;//IE678支持
		};
	}
	function addEvent(obj,type,fn){//添加事件监听
		if (obj.addEventListener) {
			obj.addEventListener(type,fn,false);
		} else{
			obj.attachEvent('on'+type,fn);
		};
	}
	function removeEvent(obj,type,fn){//删除事件监听
		if (obj.removeEventListener) {
			obj.removeEventListener(type,fn,false);
		} else{
			obj.detachEvent('on'+type,fn);
		};
	}
	function offsetTL(obj){//获取obj到body的offsetTop和offsetLeft
		var t=0,l=0;
		while(obj){
			t=t+obj.offsetTop+obj.clientTop;
			l=l+obj.offsetLeft+obj.clientLeft;
			obj=obj.offsetParent;
		}
		return {top:t,left:l};
	}
	function setCookie(key,Val,Days){//设置cookie
		var dates=new Date();
		dates.setDate(dates.getDate()+Days);
		document.cookie=key+'='+escape(Val)+'; expires='+dates;
	}
	function getCookie(key){//获取cookie
		var cookies=document.cookie;
		var arr1=cookies.split('; ');
		for (var i = 0; i < arr1.length; i++) {
			var arr2=arr1[i].split('=');
			if (arr2[0]==key) {
				return unescape(arr2[1]);//解码
			};
		};
		return false;
	}
	function rmCookie(key){//删除cookie
		setCookie(key,'a',-3);
	}
// }
