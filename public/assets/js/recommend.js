/* 热门推荐 */
// 向服务器端发送请求 获取热门推荐
$.ajax({
    type: "get",
    url: "/posts/recommend",
    success: function (response) {
        // 为了将模版变为公共的 所以写在了js中
        var recommendTpl = `
        {{each data}}
        <li>
            <a href="detail.html?id={{$value._id}}">
              <img src="{{$value.thumbnail}}" alt="">
              <span>{{$value.title}}</span>
            </a>
          </li>
          {{/each}}`;
        var html = template.render(recommendTpl, {
            data: response
        });
        // 将拼接好的热门推荐数据显示在页面中
        $("#recommendBox").html(html);
    }
});