window.onload = function(){
	/*1、城市样式切换操作*/
	var oCity = document.getElementsByClassName("city")[0];
	var cityList = oCity.getElementsByTagName("li");
	for(var i=0;i<cityList.length;i++){
		changeCity(i);
	}
	function changeCity(n){
		cityList[n].onclick = function(){
			for(var i=0;i<cityList.length;i++){
				cityList[i].className = "";
			}
			this.className = "active";
		}
	}
	
	/*icon图切换*/
//	var nav = document.getElementById("nav");
//	var iconList = nav.getElementsByTagName("li");

	/*search切换*/
	var search = document.getElementById("search");
	var sList = search.getElementsByTagName("li");
	for(var i=0;i<sList.length;i++){
		searchChange(i);
	}
	function searchChange(n){
		sList[n].onclick = function(){
			for(var i=0;i<sList.length;i++){
				sList[i].className = "";
			}
			this.className = "active";
		}
	}
	/*消息更新*/
	var msg = document.getElementsByClassName("msg")[0];
	var oSpan = msg.getElementsByTagName("span")[0];
	var oStrong = oSpan.getElementsByTagName("strong")[0];
	var oEm = oSpan.getElementsByTagName("em")[0];
	setInterval(function(){
		move(oSpan,{top:25,opacity:0},500,"easeOut",function(){
			move(oSpan,{top:0,opacity:1},500,"easeOut");
		})
	},3000);
	
	var common = document.getElementsByClassName("common_title")[0];
	var comLis = common.getElementsByTagName("ul")[0].getElementsByTagName("li");
	var oDiv = common.getElementsByTagName("div")[0];
	var data = [
		{
			img:"img/content/hot_list_pic1.gif",
			href:"御舟和涵珍园国际酒店",
			addr:"区域省：朝阳CBD",
			money:"人均：180元",
			people:"人气:232323"
		},
		{
			img:"img/content/hot_list_pic2.gif",
			href:"全聚德北京烤鸭",
			addr:"区域省：望京SOHO",
			money:"人均：220元",
			people:"人气:288888"
		}];
	for(var i=0;i<comLis.length;i++){
		(function(n){
			comLis[n].onclick = function(){
				for(var i=0;i<comLis.length;i++){
					comLis[i].className = "";
				}
				this.className = "active";
				var shopLis = oDiv.getElementsByTagName("li");
				for(var i=0;i<shopLis.length;i++){
					shopLis[i].innerHTML = '<img src="'+data[n].img+'" />'+
									'<a href="#">'+data[n].href+'</a>'+
									'<p>'+
										'<span>'+data[n].addr+'</span>'+
										'<span>'+data[n].money+'</span>'+
										'<span>'+data[n].people+'</span>'+
									'</p>';
				}
			}
		})(i);
	}
	
	/*每日活动*/
	var act = document.getElementsByClassName("activity")[0];
	var oH1 = act.getElementsByTagName("h1")[0];//存储当前日期
	var theme = act.getElementsByClassName("theme")[0];
	var spans = theme.getElementsByTagName("span");//存储当前几月几号
	var curDate = document.getElementById("date");//渲染日期
	var oOl = curDate.getElementsByTagName("ol")[0];
	var num = 0;
	var allCells = 42;//初始化：42个单元格
	/**************日历的实现**************/
	setInterval(function(){
		setTime();
	},1000);
	function setTime(){
		var str = "";
		var date = new Date();
		var year = date.getFullYear();//年
		var month = date.getMonth() + num;//月
		var day = date.getDate();//日
		var hour = date.getHours();//时
		var minute = date.getMinutes();//分
		oH1.innerHTML = year +"."+toDou(month+1)+"."+toDou(day);
		spans[0].innerHTML = toDou(hour);
		spans[1].innerHTML = toDou(minute);
		
		/*1、确定今天是几号*/
		var today = date.getDate();
		
		/*2、确定今天是周几*/
		var week = date.getDay();
		
		/*3、确定当前月有多少天*/
		var date = new Date();
		date.setMonth(date.getMonth()+num);//当前月
		date.setMonth(date.getMonth()+1);//下一个月
		date.setDate(0);//获取当前月的天数
		var days = date.getDate();
		
		/*4、确定当前月1号是周几*/
		var date = new Date();
		date.setDate(1);
		var week1 = date.getDay();
		/*5、确定上一个月有多少天*/
		date.setMonth(date.getMonth()+num);
		date.setDate(0);
		var prevMonth = date.getDate();
		/*6、开始渲染页面*/
		for(var i=week1;i>0;i--){
			str += "<li style='color:#ccc;'>"+(prevMonth-i+1)+"</li>";
		}
		for(var i = 0;i<days;i++){
			str += "<li>"+(i+1)+"</li>";
		}
		for(var i=0;i<allCells-days-week1;i++){
			str += "<li style='color:#ccc;'>"+(i+1)+"</li>";
		}
		oOl.innerHTML = str;
		var olis = oOl.getElementsByTagName("li");
		for(var i=0;i<olis.length;i++){
			if(olis[i].innerHTML == today){
				olis[i].style.color = "#CA0309";
				olis[i].style.fontWeight = "600";
				olis[i].style.background = "#aff";
			}
		}
	}
	
	/*图片轮播效果*/
	var pic = document.getElementsByClassName("pic")[0];
	var oImg = pic.getElementsByTagName("img")[0];
	var imgLis = pic.getElementsByTagName("li");
	var picArr = [{img:"img1.gif",txt:"爸爸去哪儿"},{img:"img2.gif",txt:"清新小萝莉"},{img:"img3.gif",txt:"性感女神"}];
	var oP = pic.getElementsByTagName("p")[0];
	var time = null;
	var num1 = 0;
	play();
	function play(){
		time = setInterval(function(){
			oImg.src = "img/content/"+picArr[num1].img;
			oP.innerHTML = picArr[num1].txt;
			for(var i=0;i<imgLis.length;i++){
				imgLis[i].className = "";
			}
			imgLis[num1].className = "active";
			num1++;
			if(num1 >= imgLis.length){
				num1 = 0;
			}
		},2000)
	}
	
	for(var i=0;i<picArr.length;i++){
		(function(n){
			imgLis[n].onclick = function(){
				for(var i=0;i<picArr.length;i++){
					imgLis[i].className = "";
				}
				this.className = "active";
				oImg.src = "img/content/"+picArr[n].img;
				oP.innerHTML = picArr[n].txt;
			}
		})(i);
	}
	pic.onmouseover = function(){
		clearInterval(time);
	}
	pic.onmouseout = function(){
		play();
	}
	/*trans实现*/
	var trans = document.getElementsByClassName("trans")[0];
	var tlis = trans.getElementsByTagName("li");
	var tImg = trans.getElementsByTagName("img")[0];
	var tArr = ["123.gif","456.jpg"];
	for(var i=0;i<tlis.length;i++){
		(function(n){
			tlis[n].onclick = function(){
				for(var i=0;i<tlis.length;i++){
					tlis[i].className = "";
				}
				this.className = "active";
				tImg.src = "img/content/" + tArr[n];
			}
		})(i);
	}
	/*BBS*/
	var bbs = document.getElementsByClassName("bbs")[0];
	var blis = bbs.getElementsByTagName("li");
	for(var i=0;i<blis.length;i++){
		(function(n){
			blis[i].onmouseover = function(){
				for(var i=0;i<blis.length;i++){
					blis[i].className = "";
				}
				this.className = "active";
			}
		})(i);
	}
	
	/*ADVICE*/
	var advice = document.getElementsByClassName("advice")[0];
	var atitle = advice.getElementsByClassName("atitle")[0].getElementsByTagName("li");
	var alist = advice.getElementsByClassName("ad_list")[0];
	var adviceArr = [{t1:"美食",t2:"北京炸酱面"},{t1:"娱乐",t2:"北京欢乐谷"},{t1:"人文",t2:"军事博物馆"}];
	for(var i=0;i<atitle.length;i++){
		(function(n){
			atitle[n].onmouseover = function(){
				for(var i=0;i<atitle.length;i++){
					atitle[i].className = "";
				}
				this.className = "active";
				alist.innerHTML = "";
				createEle(n);
			}
		})(i);
	}
	
	function createEle(n){
		var ul = document.createElement("ul");
		var li1 = document.createElement("li");
		li1.innerHTML = '<span class="fl" style="margin-left: 20px;">标题</span><span class="fr" style="margin-right: 20px;">状态</span>';
		ul.appendChild(li1);
		for(var i=1;i<6;i++){
			var li = document.createElement("li");
			var ii = document.createElement("ii");
			ii.style.cssText = "display: block;width: 3px;height: 3px;background: url(img/dot.gif) no-repeat;"+
			"float: left;vertical-align: middle;margin-left: 5px;margin-top: 11px;margin-right: 5px;";
//			ii.style.background = "background: url(../img/dot.gif) no-repeat;";
			var strong = document.createElement("strong");
			strong.innerHTML = adviceArr[n].t1;
			var a = document.createElement("a");
			a.innerHTML = adviceArr[n].t2;
			var em = document.createElement("em");
			li.appendChild(ii);
			li.appendChild(strong);
			li.appendChild(a);
			li.appendChild(em);
			ul.appendChild(li);
		}
		alist.appendChild(ul);
	}
	
	/*抢卷儿------实现*/
	var newList = document.getElementsByClassName("new")[0];
	var newTitle = newList.getElementsByClassName("atitle")[0].getElementsByTagName("li");
	var nlist = newList.getElementsByClassName("newlist")[0];
	var newArr = [{t1:"悦荟万科啦啦啦",t2:"23",t3:"mm"},{t1:"奥体中心啦啦啦",t2:"43",t3:"ll"},{t1:"水长城啦啦啦",t2:"22",t3:"yy"}];
	for(var i=0;i<newTitle.length;i++){
		(function(n){
			newTitle[n].onmouseover = function(){
				for(var i=0;i<newTitle.length;i++){
					newTitle[i].className = "";
				}
				this.className = "active";
				nlist.innerHTML = "";
				createElem(n);
			}
		})(i);
	}
	
	function createElem(n){
		var ul = document.createElement("ul");
		var li1 = document.createElement("li");
		li1.innerHTML = '<h2><span>商店名</span><em>人气</em><em>用户</em></h2>';
		ul.appendChild(li1);
		for(var i=1;i<6;i++){
			var li = document.createElement("li");
			var ii = document.createElement("ii");
			
			ii.style.cssText = "display: block;width: 3px;height: 3px;background: url(img/dot.gif) no-repeat;"+
			"float: left;vertical-align: middle;margin-left: 5px;margin-top: 11px;margin-right: 5px;";
//			ii.style.background = "background: url(../img/dot.gif) no-repeat;";
			var strong = document.createElement("strong");
			strong.innerHTML = newArr[n].t2;
			var a = document.createElement("a");
			a.innerHTML = newArr[n].t1;
			var span = document.createElement("span");
			span.innerHTML = newArr[n].t3;
			li.appendChild(ii);
			li.appendChild(a);
			li.appendChild(strong);
			li.appendChild(span);
			ul.appendChild(li);
		}
		nlist.appendChild(ul);
	}
	/*时间单变双*/
	function toDou(n){
		return n>=10?n:"0"+n;
	}
}
