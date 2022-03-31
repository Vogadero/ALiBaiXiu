/* 退出登录 */
$(function () {
    $("#logout").on("click", function () {
        // 点击确定confirm()方法返回true
        var isConfirm = confirm("您确定要退出？");
        if (isConfirm) {
            $.ajax({
                type: "post",
                url: "/logout",
                success: function (response) {
                    confirm("退出成功！");
                    location.href = "login.html";
                },
                error: function () {
                    alert('退出失败！');
                }
            })
        };
    })
});

// 定义一个处理日期时间格式的函数
function formateDate(date) {
    // 将日期时间字符串转换为日期对象
    date = new Date(date);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
};

/* 展示登录用户信息 */
// 向服务器端发送请求 根据id查询用户
$.ajax({
    type: "get",
    // userId是除了/admin/login.html所有html开头/login/status请求地址返回的参数
    url: "/users/" + userId,
    success: function (response) {
        // 将首页左上侧展示栏的头像显示
        $(".avatar").prop("src", response.avatar);
        // 将首页左上侧展示栏的用户名显示
        $(".profile .name").html(response.nickName);
    }
});