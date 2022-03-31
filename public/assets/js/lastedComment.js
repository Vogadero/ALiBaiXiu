/* 最新评论 */
// 向服务器端发送请求 获取最新评论
$.ajax({
    type: "get",
    url: "/comments/lasted",
    success: function (response) {
        var lastedCommentTpl = `
        {{each data}}
        <li>
            <a href="detail.html?id={{$value._id}}">
              <div class="avatar">
                <img src="{{$value.author.avatar}}" alt="">
              </div>
              <div class="txt">
                <p>
                  <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
                </p>
                <p>{{$value.content}}</p>
              </div>
            </a>
          </li>
          {{/each}}
        `;
        var html = template.render(lastedCommentTpl, {
            data: response
        });
        $("#lastedCommentBox").html(html);
    }
});

// 定义一个处理日期时间格式的函数
function formateDate(date) {
    // 将日期时间字符串转换为日期对象
    date = new Date(date);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
};