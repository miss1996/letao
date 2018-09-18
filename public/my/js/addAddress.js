$(function(){
    var picker = new mui.PopPicker({layer:3});
    picker.setData(cityData);
    $("#showCityPicker").on('tap',function(){
        picker.show(function(selectItems){
            // console.log(selectItems[0].text);
            // console.log(selectItems[1].text);
            // console.log(selectItems[2].text);
            $("#showCityPicker").val(selectItems[0].text +
                selectItems[1].text + selectItems[2].text);
        });
    });

    $("#addAddressBtn").on('tap',function(){
        var username = $("[name='username']").val().trim();
        var postCode = $("[name='postCode']").val().trim();
        var city = $("[name='city']").val().trim();
        var detail = $("[name='detail']").val().trim();

        if(!username){
            mui.toast('请输入收货人姓名');
            return;
        }
        if(!postCode){
            mui.toast('请输入正确的邮政编码');
            return;
        }
        if(!city){
            mui.toast('请选择省市区');
            return;
        }
        if(!detail){
            mui.toast('请输入详细地址');
            return;
        }
        $.ajax({
            type:'post',
            url:' /address/addAddress',
            data:{
                recipients:username,
                postcode:postCode,
                address:city,
                addressDetail:detail
            },
            success:function(res){
               //console.log(res);
                if(res.success){
                    location.href = "adress.html";
                }
            }
        });
    });
});