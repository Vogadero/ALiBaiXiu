/* 文章详情信息 */
// 全局定义一个变量 评论是否经过人工审核
var review;

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

// 获取地址栏中的postId参数
var postId = getUrlParams("id");

// 向服务器端发送请求 根据id获取文章
$.ajax({
    type: "get",
    url: "/posts/" + postId,
    success: function (response) {
        var html = template("detailTpl", response);
        $("#article").html(html);
    }
});

// 通过事件委托形式为点赞按钮绑定onclick事件
$("#article").on("click", "#like", function () {
    /* 点赞特效 */
    $(this).html('赞+1').css({
        color: 'red'
    });
    // 向服务器端发送请求 文章点赞
    $.ajax({
        type: "post",
        url: "/posts/fabulous/" + postId,
        success: function (response) {
            location.reload();
        }
    })
});

/* 获取网站设置信息(开启评论功能) */
// 向服务器端发送请求 获取网站配置
$.ajax({
    type: "get",
    url: "/settings",
    success: function (response) {
        // 将response.review的值复制给全局变量review 以便外部使用
        review = response.review;
        // 判断管理员是否开启了评论功能
        if (response.comment) {
            // 管理员开启了评论功能 渲染评论模版
            var html = template("commentTpl");
            // 渲染评论模版
            $("#commentBox").html(html);
        }
    }
});

/* 获取网站设置信息(文章评论) */
// 通过事件委托形式为评论表单绑定onsubmit事件
$("#commentBox").on("submit", "form", function () {
    // 获取用户输入的评论内容
    var content = $(this).find("textarea").val();
    // 声明一个变量 评论状态
    var state;
    if (review) {
        // 如果review为真 则要经过人工审核 state状态等于0未审核
        state = 0;
    } else {
        // 反之亦然 不经过人工审核
        state = 1;
    };
    // 向服务器端发送请求 创建评论
    $.ajax({
        type: "post",
        url: "/comments",
        data: {
            content: content,
            post: postId,
            state: state
        },
        success: function (response) {
            alert('评论成功！');
            location.reload();
        },
        error: function (response) {
            alert('评论失败！');
        }
    })
    // 阻止表单默认提交行为
    return false;
})