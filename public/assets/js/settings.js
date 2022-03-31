/* 添加网站图标 */
/* 网站图标上传 */
// 当管理员点击选择文件上传网站图标时
$(function () {
    $("#logo").on("change", function () {
        // 创建formData对象用于二进制文件上传
        const formData = new FormData();
        // this.files[0] 用户选择到的文件
        formData.append("logo", this.files[0]);
        // 向服务器发送请求 添加网站图标
        $.ajax({
            type: "post",
            url: "/upload",
            data: formData,
            // 告诉$.ajax()方法不用解析请求参数
            processData: false,
            // 告诉$.ajax()方法不用设置请求参数的类型
            contentType: false,
            success: function (response) {
                // 将图片地址存储在隐藏域中提交到服务器端
                $("#hiddenLogo").val(response[0].logo);
                // 将logo图片显示在页面中
                $("#preview").prop("src", response[0].logo);
            }
        })
    })
});

/* 添加网站配置数据 */
// 当网站配置表单发生提交行为时
$(function () {
    $("#settingsForm").on("submit", function () {
        // serialize()方法获取用户在网站配置表单中输入的内容并且格式化成参数字符串
        var formData = $(this).serialize();
        // 向服务器端发送请求 添加网站配置
        $.ajax({
            type: "post",
            url: "/settings",
            data: formData,
            success: function (response) {
                location.reload();
            }
        });
        // 阻止表单默认提交行为
        return false;
    })
});

/* 显示网站设置数据 */
// 向服务器端发送请求 获取网站配置数据
$.ajax({
    type: "get",
    url: "/settings",
    success: function (response) {
        // 判断服务器端返回的数据是否为真 如果为真 将数据展示在表单中
        if (response) {
            // 将logo地址存储在隐藏域中
            $("#hiddenLogo").val(response.logo);
            // 将logo显示在图片中
            $("#preview").prop("src", response.logo);
            // 将网站标题显示在页面中
            $("input[name='title']").val(response.title);
            // 将是否开启评论功能显示在页面中
            $("input[name='comment']").prop("checked", response.comment);
            // 将评论是否经过人工审核显示在页面中
            $("#input[name='review']").prop("checked", response.review);
        }
    }
})