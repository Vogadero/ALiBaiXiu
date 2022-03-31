/* 导航 */
// 向服务器端发送请求 查询分类列表数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var navTpl = `
        {{each data}}
        <li>
            <a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a>
        </li>
        {{/each}}
        `;
        var html = template.render(navTpl, {
            data: response
        });
        $("#navBox").html(html);
        $("#topnavBox").html(html);
    }
})