$(function () {
    var m;
    $("#modify-btn").on("tap", function () {
        var that = $(this);

        var originPass = $("[name='originPass']").val().trim();
        var newPass = $("[name='newPass']").val().trim();
        var sureNewPass = $("[name='sureNewPass']").val().trim();
        var vCode = $("[name='vCode']").val().trim();
        if(!originPass){
            mui.toast("请输入原密码");
            return;
        }
        if(!newPass){
            mui.toast("请输入新密码");
            return;
        }
        if(newPass!=sureNewPass){
            mui.toast("两次输入的密码不一样");
            return;
        }
        if(vCode != m){
            mui.toast("请输入原密码");
            return;
        }
        $.ajax({
            type:'post',
            url:'/user/updatePassword',
            data:{
                oldPassword:originPass,
                newPassword:newPass,
                vCode:vCode
            },
            beforeSend:function(){
                that.html('修改密码中...');
            },
            success:function(res){
                //console.log(res);
                if(res.success){
                    location.href = "login.html";
                }else {
                    that.html("修改密码成功");
                    mui.toast("修改密码失败:"+res.message);
                    if(res.error == 400){
                        localStorage.setItem('returnUrl',location.href);
                        setTimeout(function(){
                            location.href="login.html";
                        }, 2000);
                    }
                }
            }
        });
    });
    $("#getCheckCode").on('tap',function(){
       $.ajax({
           type:'get',
           url:'/user/vCodeForUpdatePassword',
           success:function(res){
               m = res.vCode;
               console.log(m);
           }
       });
    });
});