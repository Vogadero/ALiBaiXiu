/* 轮播图数据展示 */
// 向服务器端发送请求 获取轮播图列表
$.ajax({
    type: "get",
    url: "/slides",
    success: function (response) {
        var html = template("slidesTpl", {
            data: response
        });
        $("#slidesBox").html(html);
        //原有的实现轮播图效果的JavaScript代码
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
                // index++;
                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });
        // 上/下一张
        $('.swipe .arrow').on('click', function () {
            var _this = $(this);
            if (_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
        });
    }
});

/* 最新发布文章 */
// 向服务器端发送请求 获取最新发布文章
$.ajax({
    type: "get",
    url: "/posts/lasted",
    success: function (response) {
        var html = template("lastedTpl", {
            data: response
        });
        $("#lastedBox").html(html);
    }
});

// 定义一个处理日期时间格式的函数
function formateDate(date) {
    // 将日期时间字符串转换为日期对象
    date = new Date(date);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
};

/* 文章点赞 */
// 通过事件委托形式为点赞按钮绑定onclick事件
$("#lastedBox").on("click", ".like", function () {
    /* 点赞特效 */
    $(this).html('赞+1').css({
        color: 'red'
    });
    // 获取当前文章的id
    var id = $(this).attr("data-id");
    // 向服务器端发送请求 文章点赞
    $.ajax({
        type: "post",
        url: "/posts/fabulous/" + id,
        success: function (response) {
            location.reload();
        }
    })
});