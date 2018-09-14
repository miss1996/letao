$(function(){
    /*
    * 根据用户输入的关键字获取的搜索结果
    * 1.获取到地址栏中用户输入的关键字
    * 2.用关键字去调取搜索接口
    * 3.将搜索结果展示在页面中*/
    var keyword = getParamByUrl(location.href,'keyword');
    // console.log(keyword);

    $.ajax({
        type:'get',
        url:'/product/queryProduct',
        data:{
            page:1,
            pageSize:6,
            proName:keyword
        },
        success:function(response){
            console.log(response);
            var html = template('productTpl',response);
            console.log(html);
            $('#searchBox').html(html);
        }
    });

});

//获取地址栏参数
function getParamByUrl(url,name){
    var params = url.substr(url.indexOf("?")+1).split("&");
    // console.log(url.indexOf("?"));
    // console.log(params);
    for(var i = 0; i < params.length; i++){
        var current = params[i].split('=');
        // console.log(current);

        if(current[0] == name){
            return current[1];
        }
    }
    return null;
}