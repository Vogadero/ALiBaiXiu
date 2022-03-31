$(function () {
    // 当修改密码表单发生提交行为时触发onsubmit事件
    $("#modifyPassForm").on("submit", function () {
        // 获取用户在表单中输入的内容
        var dataForm = $(this).serialize();
        if (confirm("您确认修改密码？")) {
            // 向服务器发送请求 修改密码
            $.ajax({
                type: "put",
                url: "/users/password",
                data: dataForm,
                success: function (response) {
                    // 修改成功浏览器返回登录页面
                    location.href = "/admin/login.html";
                }
            })
        };
        // 阻止表单默认提交行为
        return false;
    })
});