$(function () {
    $.ajax({
        type: 'get',
        url: '/address/queryAddress',
        success: function (res) {
            console.log(res);
            var html = template("adressTpl",{data:res});
            console.log(html);
            $("#addressBox").html(html);
        }
    });
});