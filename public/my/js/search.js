$(function(){
    //给搜索按钮添加点击事件
    $('#grabble').on('click',function(){
        //获取用户输入的关键字
        var keyword =  $(this).siblings('input').val();
        //console.log(keyword);
        if(keyword){
            //将用户输入的关键字追加存储在数组中
            keyArr.push(keyword);
            localStorage.setItem('keyArr',JSON.stringify(keyArr));
            //实现搜索跳转到搜索结果页面
            location.href = "search-list.html?keyword="+keyword;
        }else {
            //用户没有输入关键字,提示用户
            alert("请输入搜索的商品关键字");
        }
    });


    //实现历史关键字的存储

    //存储关键字的数组
    var keyArr = [];

    //在页面一上来的时候判断是否已经存储在数据库中
    if(localStorage.getItem('keyArr')){
        //在数据库中取出关键字
        keyArr = JSON.parse(localStorage.getItem('keyArr'));
        //console.log(keyArr);
        var html = template('historyTpl',{result:keyArr});
        //console.log(html);

        $('#history-box').html(html);
    }

    //实现清空历史
    $("#clearBtn").on('click',function(){
       $('#history-box').html("");
       localStorage.removeItem('keyArr');
    });

});