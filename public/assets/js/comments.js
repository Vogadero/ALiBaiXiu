/* 评论列表展示 */
// 向服务器端发送请求 获取评论列表
$.ajax({
    type: "get",
    url: "/comments",
    success: function (response) {
        var html = template("commentsTpl", response);
        $("#commentsBox").html(html);
        var page = template("pageTpl", response);
        $("#pageBox").html(page);
    }
});

// 分页
function changePage(page) {
    $.ajax({
        type: "get",
        url: "/comments",
        data: {
            page: page
        },
        success: function (response) {
            var html = template("commentsTpl", response);
            $("#commentsBox").html(html);
            var page = template("pageTpl", response);
            $("#pageBox").html(page);
        }
    });
};

/* 评论审核 */
// 通过事件委托形式为审核按钮添加onclick事件
$("#commentsBox").on("click", ".status", function () {
    // 获取当前评论的状态
    var status = $(this).attr("data-status");
    // 获取当前要审核的评论id
    var id = $(this).attr("data-id");
    // 判断当前评论的状态 弹出批准或者驳回的提示框
    if (status == 0) {
        if (confirm("您确定批准这条未审核的评论吗？")) {
            // 向服务器端发送请求 更改评论状态
            $.ajax({
                type: "put",
                url: "/comments/" + id,
                data: {
                    // 如果评论未批准则审核状态为批准否则为驳回
                    state: status == 0 ? 1 : 0
                },
                success: function (response) {
                    location.reload();
                }
            })
        }
    } else {
        if (confirm("您确定驳回这条已批准的评论吗？")) {
            // 向服务器端发送请求 更改评论状态
            $.ajax({
                type: "put",
                url: "/comments/" + id,
                data: {
                    // 如果评论未批准则审核状态为批准否则为驳回
                    state: status == 0 ? 1 : 0
                },
                success: function (response) {
                    location.reload();
                }
            })
        }
    }

});

/* 评论删除 */
// 通过事件委托形式为删除按钮添加onclick事件
$("#commentsBox").on("click", ".delete", function () {
    // 获取当前管理员要删除的评论id
    var id = $(this).attr("data-id");
    if (confirm("您确定删除当前评论？")) {
        // 向服务器端发送请求 根据id删除评论
        $.ajax({
            type: "delete",
            url: "/comments/" + id,
            success: function (response) {
                location.reload();
            }
        })
    }
});