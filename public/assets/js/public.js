// 获取搜索表单 并为其添加onsubmit事件
$(".search form").on("submit", function () {
    // 获取用户在表单中输入的搜索关键字
    var keys = $(this).find(".keys").val();
    // 跳转到搜索结果页面 并且将用户搜索关键字传递到搜索结果页面
    location.href = "/search.html?key=" + keys;
    // 阻止表单默认提交行为
    return false;
});