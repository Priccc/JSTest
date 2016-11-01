w6       indow.onload = function(){
	var con = document.getElementById("con");
	var slider = document.getElementById("slider");
	var btns = document.getElementById("nav").getElementsByTagName("span");
	var prev = document.getElementById("prev");
	var next = document.getElementById("next");
	var inteval = 3000;
	var len = 4;
	var index = 1;
	var timer;
	var animated = false;
	function animate(offset){
		animated = true;
		var speed = offset/30;
		var left = parseInt(slider.style.left) + offset;
		function go(){
			if((speed < 0 && left < parseInt(slider.style.left)) || (speed > 0 && left > parseInt(slider.style.left))){
				slider.style.left = parseInt(slider.style.left) + speed + 'px';
				setTimeout(go,30);
			}else{
				slider.style.left = left + 'px';
				if(left>-100){
					slider.style.left = -600 * len + 'px';
				}
				if(left<-2400){
					slider.style.left = '-600px';
				}
				animated = false;
			}
		}
		go();
	}
	function chbtn(){
		for(var i = 0;i < btns.length;i++){
			if(btns[i].className=="on"){
				btns[i].className = "";
			}
		}
		btns[index-1].className="on";
	}
	function play(){
		timer = setTimeout(function(){
			next.onclick();
			play();
		},inteval);
	}
	function stop(){
		clearTimeout(timer);
	}
	next.onclick = function(){
		if(animated){
			return;
		}
		if(index == len){
			index = 1;
		}else{
			index+=1;
		}
		animate(-600);
		chbtn();
	}
	prev.onclick = function(){
		if(animated){
			return;
		}
		if(index == 1){
			index = len;
		}else{
			index-=1;
		}
		animate(600);
		chbtn();
	}
	for(var i = 0;i < btns.length;i++){
		btns[i].onclick = function(){
			if(animated){
				return;
			}
			if(this.className == 'on'){
				return;
			}
			var nindex = parseInt(this.getAttribute('index'));
			var offset = -600 * (nindex - index);
			animate(offset);
			index = nindex;
			chbtn();
		}
	}
	con.onmouseover = stop;
	con.onmouseout = play;
	play();
}