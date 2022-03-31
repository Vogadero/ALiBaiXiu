/* 文章列表数据展示 */
// 向服务器端发送请求 查询文章分类列表
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html = template("categoryTpl", {
            data: response
        });
        $("#category").html(html);
    }
});

/* 实现文章封面上传 */
// 当管理员选择文件的时候触发onchange事件
$("#feature").on("change", function () {
    // 获取管理员选择到的文件
    var file = this.files[0];
    // 创建FormData对象 实现二进制文件上传
    const formData = new FormData();
    // 将管理员选择到的文件file追加到FormData对象中 cover是自定义属性名
    formData.append("cover", file);
    // 向服务器端发送请求 实现文章封面图片上传
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 告诉$.ajax()方法不要处理data属性对应的参数
        processData: false,
        // 告诉$.ajax()方法不要设置参数类型
        contentType: false,
        success: function (response) {
            $("#thumbnail").val(response[0].cover);
        }
    })
});
/* 实现添加文章 */
// 当添加文章表单提交的时候触发onsubmit事件
$("#postAddForm").on("submit", function () {
    // 获取管理员在文章表单中输入的全部内容
    var formData = $(this).serialize();
    // 向服务器端发送请求 添加文章
    $.ajax({
        type: "post",
        url: "/posts",
        data: formData,
        success: function (response) {
            // 文章添加成功 跳转到文章列表页面
            location.href = "/admin/posts.html";
        }
    });
    // 阻止表单默认提交行为
    return false;
});

/* 文章编辑 */
// 获取浏览器地址栏中的id参数
var id = getUrlParams("id");
// id不等于-1说明当前管理员是在做修改文章操作
if (id != -1) {
    // 向服务器端发送请求 根据id获取文章
    $.ajax({
        type: "get",
        url: "/posts/" + id,
        success: function (response) {
            // 向服务器端发送请求 查询文章分类列表
            $.ajax({
                type: "get",
                url: "/categories",
                success: function (categories) {
                    response.categories = categories;
                    var html = template("modifyTpl", response);
                    $("#parentBox").html(html);
                }
            });
        }
    })
};
// 从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
    // location.search的值 ?id=623d7baa00b63554ddbf9a99&age=11
    // 先把?分割 再根据&截取 返回一个数组 ["id=623d7baa00b63554ddbf9a99","age=11"]
    var paramsAry = location.search.substr(1).split("&");
    // 循环
    for (let i = 0; i < paramsAry.length; i++) {
        // 根据=分割 返回一个数组 ["id","623d7baa00b63554ddbf9a99"]
        var temp = paramsAry[i].split("=");
        if (temp[0] == name) {
            return temp[1];
        }
    }
    // 如果用户查询的参数不存在 返回标识-1 表示当前在做查看而不是修改操作
    return -1;
};
// 通过事件委托为修改文章信息表单添加onsubmit事件
$("#parentBox").on("submit", "#postModifyForm", function () {
    // 获取管理员在文章表单中输入的全部内容
    var formData = $(this).serialize();
    // 获取当前管理员正在修改的文章的id
    var id = $(this).attr("data-id");
    if (confirm("您确定修改当前文章信息？")) {
        // 向服务器端发送请求 根据id修改文章
        $.ajax({
            type: "put",
            url: "/posts/" + id,
            data: formData,
            success: function (response) {
                location.href = "/admin/posts.html";
            }
        });
    }
    // 阻止表单默认提交行为
    return false;
})