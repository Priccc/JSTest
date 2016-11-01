window.onload = function(){
			var con = document.getElementById('con');
			var btn = document.getElementById('btn');
			var imgs = document.getElementById('score').getElementsByTagName('img');
			var speed = 500;
			var left = 0;
			var top = 0;
			var count = 3;  //蛇块的数量
			var direct = 'up'; //蛇默认方向
 			var timer;
			var snake = [];
			var snum = count;
			var ben = true;
			var fdcolor = 'url(images/food.png) center center no-repeat'; //果实

			//创建格子
			for(var i = 0;i < 400;i++){
				var box = document.createElement('div');
				con.appendChild(box);
				box.className = 0;
				if(left < 400){
					box.style.left = left + 'px';
					box.style.top = top + 'px';
					left+=20;
				}else{
					top+=20;
					left=0;
					box.style.left = left + 'px';
					box.style.top = top + 'px';
					left+=20;
				}
			}
			var divs = con.getElementsByTagName('div');
			//分数计数器
			function score(num){
				if(num == 0){
					for(var i = 0;i < 3;i++){
						imgs[i].src = 'images/0.png';
					}
				}else{
					var cnts = count - 3;
					var arr = [0,0,0];
					for(var i = 0;cnts > 0;i++){
						arr[i] = cnts%10;
						cnts = parseInt(cnts / 10);
						console.log(arr[i]);
					}
					for(var j = 0,k = 2;k >= 0;k--,j++){
						imgs[k].src = 'images/'+arr[j]+'.png';
					}
				}
			}
			//样式改变包装函数
			function changeDivs(offset,prop,value){
				if(prop == 'cn'){
					divs[offset].className = value;
				}else{
					var div = divs[offset];
					if(value == 1){
						div.style.background = 'url(images/top'+div.className+'.png) center center no-repeat';
					}else if(value == 3){
						div.style.background = 'url(images/bottom'+div.className+'.png) center center no-repeat';
					}else if(value == 2){
						if(div.className == 'left' || div.className == 'right'){
							div.style.background = 'url(images/middle2.png) center center no-repeat';
						}else{
							div.style.background = 'url(images/middle2.png) center center no-repeat';
						}
					}else if(value == 'fd'){
						div.style.background = fdcolor;
					}else{
						div.style.background = '';
					}
				}
			}
			//游戏结束
			function gameover(){
				alert('Game Over');
				window.location.reload();
			}
			//游戏结束条件
			function gover(topsn){
				clearTimeout(timer);
				if(direct == 'left'){
					if((topsn.className=='left' && topsn.offsetLeft == 0) || (divs[snake[0]-2].className != '0' && divs[snake[0]-2].className != 'fd')){
						gameover();
					}
				}else if(direct == 'up'){
					if(divs[snake[0]-21] == undefined){
						gameover();
					}else{
						if(divs[snake[0]-21].className != '0' && divs[snake[0]-21].className != 'fd'){
							gameover();
						}
					}
				}else if(direct == 'right'){
					if((topsn.className=='right' && topsn.offsetLeft == 380) || (divs[snake[0]].className != '0' && divs[snake[0]].className != 'fd')){
						gameover();
					}
				}else if(direct == 'down'){
					if(divs[snake[0]+19] == undefined){
						gameover();
					}else if(divs[snake[0]+19].className != '0' && divs[snake[0]+19].className != 'fd' ){
						gameover();
					}
				}
			}
			//判断键盘方向案件
			document.onkeydown = function(event){
				var e = window.event || event;
				var keyCode = null;
		        if(e.which){
		            keyCode = e.which;
		        }
		        else if(e.keyCode) {
		            keyCode = e.keyCode;
		        }
		        if(ben){
		        	if(keyCode == 37){
			        	if(direct != 'right' && direct != 'left'){
			        		direct = 'left';
			        		ben=false;
			        		var tt = setTimeout(function(){
					        	ben=true;
					        	clearTimeout();
					        },350);
		        		}
			        }else if(keyCode == 38){
			        	if(direct != 'down' && direct != 'up'){
			        		direct = 'up';
			        		ben=false;
			        		var tt = setTimeout(function(){
					        	ben=true;
					        	clearTimeout();
					        },350);
			        	}
			        }else if(keyCode == 39){
			        	if(direct != 'left' && direct != 'right'){
			        		direct = 'right';
			        		ben=false;
			        		var tt = setTimeout(function(){
					        	ben=true;
					        	clearTimeout();
					        },350);
			        	}
			        }else if(keyCode == 40){
			        	if(direct != 'up' && direct != 'down'){
			        		direct = 'down';
			        		ben=false;
			        		var tt = setTimeout(function(){
					        	ben=true;
					        	clearTimeout();
					        },350);
			        	}
			        }
		        }
			}
			//头部移动自动
			function topSnake(){
				var sntop = divs[snake[0]-1];
				if(direct!=sntop.className){
					sntop.className = direct;
				}
				sntop.style.background = '';
				if(sntop.className=='left'){
					snake[0] = snake[0] - 1;
					if(divs[snake[0]-1].className == 'fd'){
						grow(divs[snake[0]-1]);
					}
				}else if(sntop.className=='up'){
					snake[0] = snake[0] - 20;
					if(divs[snake[0]-1].className == 'fd'){
						grow(divs[snake[0]-1]);
					}
				}else if(sntop.className=='right'){
					snake[0] = snake[0] + 1;
					if(divs[snake[0]-1].className == 'fd'){
						grow(divs[snake[0]-1]);
					}
				}else if(sntop.className=='down'){
					snake[0] = snake[0] + 20;
					if(divs[snake[0]-1].className == 'fd'){
						grow(divs[snake[0]-1]);
					}
				}
				changeDivs(snake[0]-1,'cn',direct);
				changeDivs(snake[0]-1,'sbg',1);
			}
			//中部移动自动
			function middleSnake(){
				for(var i = 1;i < snum-1;i++){
					var middle = divs[snake[i]-1].className;
					changeDivs(snake[i]-1,'sbg','');
					if(middle=='left'){
						snake[i]-=1;
					}else if(middle=='up'){
						snake[i]-=20;
					}else if(middle=='right'){
						snake[i]+=1;
					}else if(middle=='down'){
						snake[i]+=20;
					}
					changeDivs(snake[i]-1,'sbg',2);
				}
			}
			//尾部移动自动
			function bottomSnake(){
				var last = count-1;
				var lastd = divs[snake[last]-1].className;
				changeDivs(snake[last]-1,'cn',0);
				changeDivs(snake[last]-1,'sbg','');
				if(lastd == 'left'){
					snake[last]-=1;
				}else if(lastd == 'up'){
					snake[last]-=20;
				}else if(lastd == 'right'){
					snake[last]+=1;
				}else if(lastd == 'down'){
					snake[last]+=20;
				}
				changeDivs(snake[last]-1,'sbg',3);
			}
			//吃掉果实，蛇变长
			function grow(grows){
				grows.style.background = '';
				grows.className = 0;
				count++;
				var bb = divs[snake[snum-1]-1];
				var po;
				var arrow;
				snum++;
				if(bb.className=='left'){
					po = 1;
					arrow = 'left';
				}else if(bb.className=='up'){
					po = 20;
					arrow = 'up';
				}else if(bb.className=='right'){
					po = -1;
					arrow = 'right';
				}else if(bb.className=='down'){
					po = -20;
					arrow = 'down';
				}
				snake[snum-1] = snake[snum-2]+po;
				changeDivs(snake[snum-1]-1,'cn',arrow);
				changeDivs(snake[snum-1]-1,'sbg',3);
				if(speed <= 100){
					speed = 100;
				}
				speed-=20;
				score(1);
				food();
			}
			//随机生成果实
			function food(){
				var pos = Math.floor(Math.random()*400);
				if(divs[pos].className != '0'){
					food();
				}else{
					changeDivs(pos,'sbg','fd');
					changeDivs(pos,'cn','fd');
				}
			}
			//初始化
			function initialize(){
				for(var i = 0;i < 400;i++){
					divs[i].className = 0;
					divs[i].style.background='';
				}
				var index = 0;
				var fl = 1;
				for(var i = 169;i <= 209;i+=20){
					changeDivs(i,'cn','up');
					changeDivs(i,'sbg',fl++);
					snake[index++] = i+1;
				}
				direct = 'up';
				food();
			}
			//定时器
			function goo(){
				timer = setTimeout(function(){
					gover(divs[snake[0]-1]);
					topSnake();
					middleSnake();
					bottomSnake();
					goo();
				},speed);
			}
			btn.onclick = function start(){
				if(btn.innerHTML == '开始'){
					btn.innerHTML = '重新开始';
					clearTimeout(timer);
					initialize();
					goo();
				}else{
					window.location.reload();
				}
			}
		}