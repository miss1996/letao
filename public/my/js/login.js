$(function () {
    $("#login-btn").on("tap", function () {
        var that = $(this);
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
            beforeSend:function(){
                that.html("正在登录中...");
            },
            success:function(res){
                // console.log(res);
                if(res.success){
                    that.html("登录成功");
                    setTimeout(function(){
                        if(localStorage.getItem("returnUrl")){
                            //console.log(returnUrl);
                            location.href = localStorage.getItem('returnUrl');
                            localStorage.removeItem('returnUrl');
                        }else {
                            location.href = "user.html";
                        }

                    });

                }
            }
        });
    });
});