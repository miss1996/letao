$(function () {
    $.ajax({
        type: 'get',
        url: '/user/queryUserMessage',
        success: function (res) {
            console.log(res);
            if (res.error == 400) {
                location.href = "login.html";
            }
            var html = template('userTpl', res);
            console.log(html);
            $('#user').html(html);
        }
    });
    $('#loginOut').on('tap', function () {
        $.ajax({
            type: 'get',
            url: '/user/logout',
            beforeSend:function(){
              mui.toast("正在登录中...");
            },
            success: function (res) {
                if (res.success) {
                    mui.toast('退出登录成功');
                    setTimeout(function () {
                        location.href = "index.html";
                    }, 2000);
                }
            }
        });
    });

});