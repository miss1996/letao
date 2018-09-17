$(function () {
    var m;
    $('#register-btn').on('tap', function () {
        var username = $('[name="username"]').val().trim();
        var mobile = $('[name="mobile"]').val().trim();
        var password = $('[name="password"]').val().trim();
        var againPass = $('[name="againPass"]').val().trim();
        var vCode = $('[name="vCode"]').val().trim();
        // console.log(username);
        // console.log(mobile);
        // console.log(password);
        // console.log(againPass);
        // console.log(vCode);
        if(!username){
            mui.toast('请输入用户名');
            return;
        }
        if(mobile.length !== 11){
            mui.toast('请输入合法的手机号');
            return;
        }
        if(!password){
            mui.toast('密码不能为空');
            return;
        }
        if(!againPass){
            mui.toast('密码不能为空');
            return;
        }
        if(vCode!=m){
            mui.toast("验证码错误");
            return;
        }
        if(password != againPass) {
            mui.toast("两次输入的密码不一致");
            return;
        }
        $.ajax({
            type:'post',
            url:"/user/register",
            data:{
                username:username,
                password:password,
                mobile:mobile,
                vCode:vCode
            },
            success:function(res){
                mui.toast("注册成功");

                setTimeout(function(){
                    location.href = "login.html";
                }, 2000);
            }
        });
    })

    $("#getCode").on('tap',function(){
       $.ajax({
           url:'/user/vCode',
           type:'get',
           success:function(res){
               m=res.vCode
               console.log(m);
           }
       })
    });
});