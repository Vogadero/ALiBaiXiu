/* 搜索信息展示 */

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

// 获取地址栏中的key参数
var key = getUrlParams("key");

// 向服务器端发送请求 文章搜索
$.ajax({
    type: "get",
    url: "/posts/search/" + key,
    success: function (response) {
        var html = template("searchTpl", {
            data: response
        });
        $("#searchBox").html(html);
    }
});

/* 文章点赞 */
// 通过事件委托形式为点赞按钮绑定onclick事件
$("#searchBox").on("click", ".like", function () {
    // 获取当前文章的id
    var id = $(this).attr("data-id");
    // 向服务器端发送请求 文章点赞
    $.ajax({
        type: "post",
        url: "/posts/fabulous/" + id,
        success: function (response) {
            alert('点赞成功！');
            location.reload();
        }
    })
});