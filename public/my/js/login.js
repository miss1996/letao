$(function () {
    var that = this;
    $("#login-btn").on("tap", function () {
        var username = $('[name="username"]').val().trim();
        var password = $('[name="password"]').val().trim();
        // console.log(username);
        // console.log(password);
        if (!username) {
            mui.toast("请输入用户名");
            return;
        }
        if (!password) {
            mui.toast("请输入密码");
            return;
        }
        $.ajax({
            type: "post",
            url: '/user/login',
            data:{
                username:username,
                password:password
            },
            success:function(res){
                // console.log(res);
                if(res.success){
                    that.html('登录成功');
                }
            }
        });
    });
});