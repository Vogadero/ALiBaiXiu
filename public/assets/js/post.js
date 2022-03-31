/* 文章数据列表显示 */
// 向服务器端发送请求 查询文章列表
$.ajax({
    type: "get",
    url: "/posts",
    success: function (response) {
        var html = template("postTpl", response);
        $("#postBox").html(html);
        var page = template("pageTpl", response);
        $("#page").html(page);
    }
});

// 分页
function changePage(page) {
    $.ajax({
        type: "get",
        url: "/posts",
        data: {
            page: page
        },
        success: function (response) {
            var html = template("postTpl", response);
            $("#postBox").html(html);
            var page = template("pageTpl", response);
            $("#page").html(page);
        }
    });
};

/* 文章数据列表筛选 */
// 向服务器端发送请求 查询分类列表
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html = template("categoryTpl", {
            data: response
        });
        $("#categoryBox").html(html);
    }
});
// 为筛选按钮添加表单onsubmit事件 进行文章列表筛选
$("#filterForm").on("submit", function () {
    // 获取到表单中管理员选择的过滤条件
    var formData = $(this).serialize();
    // 向服务器端发送请求 查询文章列表数据
    $.ajax({
        type: "get",
        url: "/posts",
        data: formData,
        success: function (response) {
            var html = template("postTpl", response);
            $("#postBox").html(html);
            var page = template("pageTpl", response);
            $("#page").html(page);
        }
    });
    // 阻止表单的默认提交行为
    return false;
});
// 清除筛选效果
$("#clear").on("click", function () {
    $.ajax({
        type: "get",
        url: "/posts",
        success: function (response) {
            var html = template("postTpl", response);
            $("#postBox").html(html);
            var page = template("pageTpl", response);
            $("#page").html(page);
        }
    });
});

/* 文章删除 */
// 通过事件委托为删除按钮添加onclick事件
$("#postBox").on("click", ".delete", function () {
    // 获取当前管理员要删除的文章id
    var id = $(this).attr("data-id");
    // 弹出删除确认框
    if (confirm("您确定删除这篇文章吗？")) {
        // 向服务器端发送请求 根据id删除文章
        $.ajax({
            type: "delete",
            url: "/posts/" + id,
            success: function (response) {
                location.reload();
            }
        })
    }
});