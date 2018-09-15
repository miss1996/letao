var keyword = getParamByUrl(location.href,'keyword');
var page = 1;
var html = "";
var priceSort;
var that = null;
$(function(){
    /*
    * 根据用户输入的关键字获取的搜索结果
    * 1.获取到地址栏中用户输入的关键字
    * 2.用关键字去调取搜索接口
    * 3.将搜索结果展示在页面中*/
    // console.log(keyword);
    mui.init({
        pullRefresh : {
            container:"#refreshContainer",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback :getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    $.ajax({
        type:'get',
        url:'/product/queryProduct',
        data:{
            page:1,
            pageSize:3,
            proName:keyword
        },
        success:function(response){
            //console.log(response);
            var html = template('productTpl',response);
            //console.log(html);
            $('#searchBox').html(html);
        }
    });
    //按照价格排序
    $('#priceSort').on('tap',function(){
        console.log(1);
        priceSort = priceSort ==  1 ? 2: 1;

        html = "";
        page = 1;

        //上拉刷新插件
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
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

    //下拉获取数据
function getData(){
    //console.log(!that);
    if(!that){
        //console.log(that);
        that = this;
        //console.log(that);
    }

    $.ajax({
        type:'get',
        url:'/product/queryProduct',
        data:{
            page:page++,
            pageSize:3,
            proName:keyword,
            priceSort:priceSort
        },
        success:function(response){
            //console.log(response);
            if(response.data.length > 0){
                html += template('productTpl',response);
                //console.log(html);
                $('#searchBox').html(html);
                // console.log(that);
                that.endPullupToRefresh(false);
            } else {
                that.endPullupToRefresh(true);
            }

        }
    });
}
