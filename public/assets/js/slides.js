/* 添加轮播图片 */
/* 轮播图片上传 */
// 当管理员点击选择文件上传轮播图片时
$(function () {
    $("#file").on("change", function () {
        // 创建formData对象用于二进制文件上传
        const formData = new FormData();
        // this.files[0] 用户选择到的文件
        formData.append("image", this.files[0]);
        // 向服务器发送请求 添加轮播图片
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
                $("#hiddenImage").val(response[0].image);
                $("#preview").show();
                // 将logo图片显示在页面中
                $("#preview").prop("src", response[0].image);
            }
        })
    })
});

/* 添加轮播图数据 */
// 当轮播图表单发生提交行为时
$(function () {
    $("#slidesForm").on("submit", function () {
        // serialize()方法获取用户在轮播图表单中输入的内容并且格式化成参数字符串
        var formData = $(this).serialize();
        // 向服务器端发送请求 添加轮播图片
        $.ajax({
            type: "post",
            url: "/slides",
            data: formData,
            success: function (response) {
                location.reload();
            }
        });
        // 阻止表单默认提交行为
        return false;
    })
});

/* 轮播图数据展示 */
// 向服务器端发送请求 获取轮播图列表数据
$.ajax({
    type: "get",
    url: "/slides",
    success: function (response) {
        // 使用模版引擎将数据和HTML字符串进行拼接
        var html = template("slidesTpl", {
            data: response
        });
        // 将拼接好的字符串显示在页面中    
        $("#slidesBox").html(html);
    }
});

/* 轮播图数据删除 */
// 通过事件委托的方式为删除按钮添加onclick事件
$("#slidesBox").on("click", ".delete", function () {
    // 获取当前即将被删除的轮播图id
    var id = $(this).attr("data-id");
    // 判断是否要删除轮播图
    if (confirm("您确定删除当前轮播图数据？")) {
        // 向服务器端发送请求 删除轮播图
        $.ajax({
            type: "delete",
            url: "/slides/" + id,
            success: function (response) {
                location.reload();
            }
        })
    }
});