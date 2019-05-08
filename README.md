# qpage
一个分页的jquery组件

# 示例代码
```
<div id="pageBlock"></div>

<script type="text/javascript" src="jquery/jquery.js"></script>

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
    var mypage = new QPAGE("pageBlock",470571,20, gopage);

    /* 设置说明 
    mypage.showTotalPage = false; //是否显示总页码数，默认为true
    mypage.showTotalNumber = false; //是否显示总记录数，默认为true
    mypage.showJumpPage = false; //是否显示页数跳转块，默认为true
    mypage.showPages = 7;  //显示的页码块数，可修改为5、7、9、11等

    /* 页码块生成
    //23520 当前要选中的页数
    mypage.generate(23520);
  });
  
  function gopage (page) {
    console.log("正在跳转到第" + page + "页")
  }
</script>
```
