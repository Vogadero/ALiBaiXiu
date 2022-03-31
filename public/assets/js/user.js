/* 添加用户 */
// 当user表单发生提交行为时
$(function () {
    $("#userForm").on("submit", function () {
        // serialize()方法获取用户在user表单中输入的内容并且格式化成参数字符串
        var userFormData = $(this).serialize();
        // 向服务器端发送请求 添加用户
        $.ajax({
            type: "post",
            url: "/users",
            data: userFormData,
            success: function () {
                // 刷新页面
                location.reload();
            },
            error: function () {
                alert('用户添加失败！');
            }
        })
        // 阻止表单默认提交行为
        return false;
    })
});

/* 用户头像上传 */
// 当用户点击头像上传选择文件时
// 因为编辑时也需要触发onchange事件 所以通过事件委托的方式为选择文件按钮添加onchange事件
$(function () {
    $("#modifyBox").on("change", "#avatar", function () {
        // 创建formData对象用于实现图片文件上传
        const formData = new FormData();
        // this.files[0] 用户选择到的文件
        formData.append("avatar", this.files[0]);
        // 向服务器发送请求 实现图片上传
        $.ajax({
            type: "post",
            url: "/upload",
            data: formData,
            // 告诉$.ajax()方法不用解析请求参数
            processData: false,
            // 告诉$.ajax()方法不用设置请求参数的类型
            contentType: false,
            success: function (response) {
                // 实现头像预览功能
                $("#preview").attr("src", response[0].avatar);
                // 将图片地址存储在隐藏域中提交到服务器端
                $("#hiddenAvatar").val(response[0].avatar);
            }
        })
    })
});

/* 展示用户列表 */
// 向服务器端发送请求 展示用户列表
$.ajax({
    type: "get",
    url: "/users",
    success: function (response) {
        // 使用模版引擎将数据和HTML字符串进行拼接
        var html = template("userTpl", {
            data: response
        });
        // 将拼接好的字符串显示在页面中
        $("#userBox").html(html);
    }
});

/* 用户信息修改 */
// 通过事件委托的方式为编辑按钮添加onclick事件
$(function () {
    $("#userBox").on("click", ".edit", function () {
        // 获取被点击用户的id值
        var id = $(this).attr("data-id");
        // 向服务器端发送请求 根据id获取用户详细信息
        $.ajax({
            type: "get",
            url: "/users/" + id,
            success: function (response) {
                // 使用模版引擎将数据和HTML字符串进行拼接
                var html = template("modifyTpl", response);
                // 将拼接好的字符串显示在页面中
                $("#modifyBox").html(html);
            }
        })
    })
});
// 通过事件委托的方式为修改表单添加表单提交onsubmit事件
$(function () {
    $("#modifyBox").on("submit", "#modifyForm", function () {
        // serialize()方法获取用户修改表单中输入的内容并且格式化成参数字符串
        var userModifyFormData = $(this).serialize();
        // 获取当前被修改的用户id
        var id = $(this).attr("data-id");
        // 向服务器端发送请求 修改用户信息
        $.ajax({
            type: "put",
            url: "/users/" + id,
            data: userModifyFormData,
            success: function (response) {
                // 当用户信息修改成功 页面重新加载
                location.reload();
            }
        })
    })
});

/* 删除单个用户 */
// 通过事件委托的方式为删除按钮添加onclick事件
$(function () {
    $("#userBox").on("click", ".delete", function () {
        // 判断是否要删除用户
        if (confirm("确认删除当前用户？")) {
            // 获取当前即将被删除的用户id
            var id = $(this).attr("data-id");
            // 向服务器端发送请求 删除用户
            $.ajax({
                type: "delete",
                url: "/users/" + id,
                success: function (response) {
                    location.reload();
                }
            })
        }
    })
});

/* 批量删除用户 */
// 获取全选按钮
var selectAll = $("#selectAll");
// 获取批量删除按钮
var batchDelete = $("#batchDelete");
// 当全选按钮复选框状态发生改变时
selectAll.on("change", function () {
    // 获取当前全选按钮的状态
    var selectAllStatus = $(this).prop("checked");
    // 如果全选按钮勾选 批量删除按钮显示
    if (selectAllStatus) {
        batchDelete.show();
    } else {
        // 否则隐藏
        batchDelete.hide();
    }
    // 获取到所有用户的状态并且与全选按钮状态保持一致
    $("#userBox").find("input").prop("checked", selectAllStatus);
});
// 当用户前面的复选框状态发生改变时 通过事件委托为其添加onchange事件
$("#userBox").on("change", ".userStatus", function () {
    // 思路：先获取所有用户 再在所有用户中过滤出选中的用户 判断两者数量是否一致
    var userInputs = $("#userBox").find("input");
    // 如果过滤得到的选中用户数量等于所有用户数量
    if (userInputs.length == userInputs.filter(":checked").length) {
        // 全选按钮状态勾选
        selectAll.prop("checked", true);
    } else {
        // 如果不相等 全选按钮状态不勾选
        selectAll.prop("checked", false);
    };
    // 如果过滤得到的选中用户数量大于0 批量删除按钮就显示
    if (userInputs.filter(":checked").length > 0) {
        batchDelete.show();
    } else {
        // 否则隐藏
        batchDelete.hide();
    }
});
// 为批量删除按钮添加onclick事件
batchDelete.on("click", function () {
    // 即将删除的用户id数组容器
    var userDeleteIds = [];
    // 获取所有选中的用户
    var checkedUser = $("#userBox").find("input").filter(":checked");
    // 循环选中用户 并把data-id属性值添加进数组容器
    checkedUser.each(function (index, element) {
        // 因为element是HTML标签形式 所以先获取data-id 再添加
        userDeleteIds.push($(element).attr("data-id"));
    });
    if (confirm("您确定删除选中的用户吗？")) {
        // 向服务器发送请求 批量删除用户
        $.ajax({
            type: "delete",
            // 数组join()方法 将数组元素由指定的分隔符分隔并作为字符串返回
            url: "/users/" + userDeleteIds.join("-"),
            success: function (response) {
                // 数据库删除成功之后重新加载页面
                location.reload();
            }
        })
    }
})