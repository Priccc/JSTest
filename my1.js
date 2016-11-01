function resetArr(arr){//数组去重复排序
	arr.sort(function (a,b){return a-b;});
	var newarr=[];
	for (var i = 0; i < arr.length; i++) {
		if (arr[i]==arr[i+1]) {
			continue;
		};
		newarr.push(arr[i]);
	};
	return newarr;
}

function ifArrVal(arr,value){//多维数组判断是否存在某值
	for(var i = 0;i < arr.length;i++){
		if(arr[i] instanceof Array){
			return ifArrVal(arr[i],value);
		}else{
			if(arr[i] == value){
				return 1;
			}
		}
	}
	return -1;
}

function byClassGlobal(oClass){//全局获取
	var tags=document.all?document.all:document.getElementsByTagName('*');
	var reg = new RegExp('\\b'+oClass+'\\b');
	var arr=[];
	for (var i = 0;i < tags.length;i++) {
		if (reg.test(tags[i].className)) {
			arr.push(tags[i]);
		};
	};
	return arr;
}

function byClassLocal(parentID,oClass){//局部获取
	var parent=document.getElementById(parentID);
	var tags=parent.all?parent.all:parent.getElementsByTagName('*');
	var reg = new RegExp('\\b'+oClass+'\\b');
	var arr=[];
	for (var i = 0; i < tags.length; i++) {
		if (reg.test(tags[i].className)) {
			arr.push(tags[i]);
		};
	};
	return arr;
}

function offsetTL(obj){//获取元素左部和顶部的距离
	var l = 0;t = 0;
	while(obj){
		l = l + obj.offsetLeft + obj.clientLeft;
		t = t + obj.offsetTop + obj.clientTop;
		obj = obj.offsetParent;
	}
	return {left:l,top:t};
}

function ajax(url,sfn,dfn){
	var xhr=null;
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}else{//IE5 6
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.onreadystatechange=function(){
	    if(xhr.readyState==4 && xhr.status==200){
	    	fn(xhr.responseText);
		}else{
			if(dfn){
				dfn();
			}else{
				console.log(xhr.status);
			}
		}
	}
	xhr.open('get',url,true);
	xhr.send();
}