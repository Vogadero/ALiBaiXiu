/* 仪表盘数据展示 */
// 向服务器端发送请求 获取文章数量
$.ajax({
    type: "get",
    url: "/posts/count",
    success: function (response) {
        $("#post").html("<strong>" + response.postCount + "</strong>篇文章（<strong>" + response.draftCount + "</strong>篇草稿）");
    }
})
// 向服务器端发送请求 获取分类数量
$.ajax({
    type: "get",
    url: "/categories/count",
    success: function (response) {
        $("#category").html("<strong>" + response.categoryCount + "</strong>个分类")
    }
})
// 向服务器端发送请求 获取评论数量
$.ajax({
    type: "get",
    url: "/comments/count",
    success: function (response) {
        $("#comment").html("<strong>" + response.commentCount + "</strong>条评论")
    }
})