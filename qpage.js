/*
 * qpage 1.0 - jQuery plugin to show pages
 * 
 * Copyright (c) 2015 qyt
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * example:
 *  	<script type="text/javascript" src="jquery/jquery.js"></script>

		<!--页码-->
		<link type="text/css" rel="stylesheet" href="jquery/qpage/qpage.css" />
		<script type="text/javascript" src="jquery/qpage/qpage.js"></script>
		
		<script type="text/javascript">
			$(function(){
				/* 页码对象声明
					//pageBlock 显示页码块的div ID
					//470571 总记录数
					//20 每页显示的记录数
					//gopage 翻页时的响应函数名
				var mypage = new QPAGE("pageBlock",470571,20, "gopage");

				/* 设置说明 
				mypage.showTotalPage = false; //是否显示总页码数，默认为true
				mypage.showTotalNumber = false; //是否显示总记录数，默认为true
				mypage.showJumpPage = false; //是否显示页数跳转块，默认为true
				mypage.showPages = 7;  //显示的页码块数，可修改为5、7、9、11等

				/* 页码块生成
				//23520 当前要选中的页数
				mypage.generate(23520);
			});
		</script>
 *
 */
function QPAGE(objID, totalNumber, perPage, funname) {
	if (!objID || !funname) {
		console.log("参数错误：显示页码块的div ID 或 翻页时的响应函数名");
		return false;
	}
	if (perPage <= 0) {
		console.log("参数错误：每页显示的记录数不正确");
		return false;
	}
	if (totalNumber < 0) {
		console.log("参数错误：总记录数不正确");
		return false;	
	}
	
	this.param = true;

	this.HTMLSTR = "";
	
	this.showTotalPage = true;
	this.showTotalNumber = true;
	this.showJumpPage = true;
	this.showPages = 7;
	
	this.SHOWOBJID = objID;
	this.totalNumber = totalNumber;
	this.perPage = perPage;	
	this.funname = funname;

	this.totalPage = Math.ceil(totalNumber/perPage);
}

/* 初始化 */
QPAGE.prototype.generate = function(curP) {
	if (!this.param || this.totalNumber == 0) {
		this.HTMLSTR = "";
		$("#"+this.SHOWOBJID).html(this.HTMLSTR);
		return;
	}

	if (this.showTotalNumber) this.HTMLSTR = "<span class='qpageTotalNumber'>共 "+this.totalNumber+" 条记录</span>";

	this.HTMLSTR += "<a href='javascript:void(0);' class='previousBtn'>上一页</a>";
	if (this.totalPage <= this.showPages) { //显示所有页数
		for (var i = 1; i <= this.totalPage; i++) {
			var tClass = "";
			if (i == curP) {
				tClass += " selectedPage";
			}

			this.HTMLSTR += "<a href='javascript:void(0);' class='aPage" + tClass + "'>" + i + "</a>";
		}
	}else{  /*需要显示“...”的情况*/
		var mid = Math.ceil(this.showPages/2);
		if (curP <= mid) {  //侧重点在前面，即只需在后面显示一个“...”
			for (var i = 1; i <= (this.showPages-2); i++) {
				var tClass = "";
				if (i == curP) {
					tClass += " selectedPage";
				}

				this.HTMLSTR += "<a href='javascript:void(0);' class='aPage" + tClass + "'>" + i + "</a>";
			}
			this.HTMLSTR += "<a href='javascript:void(0);' class='morePage'>...</a>";
			this.HTMLSTR += "<a href='javascript:void(0);' class='aPage'>" + this.totalPage + "</a>";
		} else {
			this.HTMLSTR += "<a href='javascript:void(0);' class='aPage'>1</a>";
			this.HTMLSTR += "<a href='javascript:void(0);' class='morePage'>...</a>";

			if (this.totalPage - curP + 1 <= mid) {  //侧重点在后面，即只需在前面显示一个“...”
				for (var i = (this.totalPage-(this.showPages-3)); i <= this.totalPage; i++) {
					var tClass = "";
					if (i == curP) {
						tClass += " selectedPage";
					}

					this.HTMLSTR += "<a href='javascript:void(0);' class='aPage" + tClass + "'>" + i + "</a>";
				}
			} else {  //侧重点在中间，即前后都需要显示一个“...”
				if (this.showPages%2 == 0) {
					var mid2 = (this.showPages-4)/2;
					for (var i = (curP - mid2 +1); i <= (curP + mid2); i++) {
						var tClass = "";
						if (i == curP) {
							tClass += " selectedPage";
						}
						this.HTMLSTR += "<a href='javascript:void(0);' class='aPage" + tClass + "'>" + i + "</a>";
					}
				} else {
					var mid2 = Math.floor((this.showPages-4)/2);
					for (var i = (curP - mid2); i <= (curP + mid2); i++) {
						var tClass = "";
						if (i == curP) {
							tClass += " selectedPage";
						}
						this.HTMLSTR += "<a href='javascript:void(0);' class='aPage" + tClass + "'>" + i + "</a>";
					}
				}
				this.HTMLSTR += "<a href='javascript:void(0);' class='morePage'>...</a>";
				this.HTMLSTR += "<a href='javascript:void(0);' class='aPage'>"+this.totalPage+"</a>";
			}			
		}
	}
	this.HTMLSTR += "<a href='javascript:void(0);' class='nextBtn'>下一页</a>";

	if (this.showTotalPage) this.HTMLSTR += "<span class='qpageTotalPage'>共 "+this.totalPage+" 页</span>";	
	if (this.showJumpPage) this.HTMLSTR += " <input type='text' value='' class='pageInput' /> <a href='javascript:void(0);' class='pageBtn'>跳转</a>";

	$("#"+this.SHOWOBJID).addClass("QPAGE").html(this.HTMLSTR);

	var curPageObj = this;
	$("#"+this.SHOWOBJID).find(".aPage").each(function(){
		$(this).unbind().bind("click",function(){
			curPageObj.go( parseInt($(this).text(),10) );
		});
	});
	$("#"+this.SHOWOBJID).find(".previousBtn").eq(0).unbind().bind("click",function(){
		curPageObj.previous();
	});
	$("#"+this.SHOWOBJID).find(".nextBtn").eq(0).unbind().bind("click",function(){
		curPageObj.next();
	});
	$("#"+this.SHOWOBJID).find(".pageInput").eq(0).unbind().bind("keyup",function(event){
		if(event.keyCode == 13){
			curPageObj.go2();
		}
	});
	$("#"+this.SHOWOBJID).find(".pageBtn").eq(0).unbind().bind({
		click:function(){
			curPageObj.go2();
		}
	});
}
QPAGE.prototype.previous = function(){
	var curpage = parseInt($("#"+this.SHOWOBJID).find(".selectedPage").text(),10);
	if (curpage <= 1) return;
	else var gopage = curpage - 1;
	this.funname(gopage)
	// eval(this.funname+'('+gopage+')');
	//this.generate(gopage);
}
QPAGE.prototype.next = function(){
	var curpage = parseInt($("#"+this.SHOWOBJID).find(".selectedPage").text(),10);
	if (curpage >= this.totalPage) return;
	else var gopage = curpage + 1;
	this.funname(gopage)
	// eval(this.funname+'('+gopage+')');
	//this.generate(gopage);
}
QPAGE.prototype.go = function(gopage){
	this.funname(gopage)
	// eval(this.funname+'('+gopage+')');
	//this.generate(gopage);
}
QPAGE.prototype.go2 = function(){
	var str = $("#"+this.SHOWOBJID).find(".pageInput").val();
	var slen = str.length;
	if (slen == 0) {//空字符串
		alert("请输入正确的页码");
		return;
	}
	
	var NUM = "0123456789";
	for (var i=0; i<slen; i++) {
		var cc = str.charAt(i);
		if (NUM.indexOf(cc)== -1) {
			alert("请输入正确的页码");
			return;
		}
	}

	if(str.charAt(0) == "0" && str.length > 1) {
		alert("请输入正确的页码");
		return;
	}

	var gopage = parseInt(str,10);
	if (gopage<1 || gopage>this.totalPage || isNaN(gopage)) {
		alert("请输入正确的页码");
		return;
	}
	this.funname(gopage)
	// eval(this.funname+'('+gopage+')');
	//this.generate(gopage);
}