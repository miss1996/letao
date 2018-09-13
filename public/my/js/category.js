$(function(){
   //滚动条插件
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    //分类页面模板连接数据库请求
    $.ajax({
       type:"get",
       url:"/category/queryTopCategory",
       success:function(result){
           // console.log(result);
           $("#leftCate").html(template("leftCateTpl",{data:result.rows}));

           if(result.rows.length > 0){
               var id = result.rows[0].id;
               $.ajax({
                   type:'get',
                   url:'/category/querySecondCategory',
                   data:{
                       id:id
                   },
                   success:function(result){
                       console.log(result);
                       $("#rightCate").html(template("rightCateTpl",{data:result.rows}));

                       $('#leftCate').find('a:first-child').addClass('active');
                   }
               })

           }
       }
    });
    //右侧模板连接数据库请求
    $("body").on('tap','.getSecond',function(){
       var id = $(this).attr('data-id');
        $(this).addClass('active').siblings().removeClass('active');
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{
                id:id
            },
            success:function(result){
                console.log(result);
                $("#rightCate").html(template("rightCateTpl",{data:result.rows}));
            }
        })
    });
});