/* 添加文章分类 */
$(function () {
    // 当添加分类表单触发onsubmit事件时
    $("#addCategories").on("submit", function () {
        // 获取用户在表单中输入的内容
        var articleFormData = $(this).serialize();
        //   向服务器发送请求 添加文章分类
        $.ajax({
            type: "post",
            url: "/categories",
            data: articleFormData,
            success: function (response) {
                location.reload();
            },
            error: function () {
                alert('文章分类添加失败！');
            }
        });
        // 阻止表单默认提交行为
        return false;
    })
});

/* 分类数据展示 */
// 向服务器端发送请求 展示文章分类列表
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        // 将服务器端返回的数据与HTML模版进行拼接
        var html = template("categoryListTpl", {
            data: response
        });
        // 将拼接好的内容放到页面中
        $("#categoryBox").html(html);
    }
});

/* 分类数据修改 */
// 通过事件委托为动态生成的编辑按钮添加onclick事件
$("#categoryBox").on("click", ".edit", function () {
    // 获取要修改的分类数据id
    var id = $(this).attr("data-id");
    // 向服务器端发送请求 根据id查询分类
    $.ajax({
        type: "get",
        url: "/categories/" + id,
        success: function (response) {
            // 将服务器端返回的数据与HTML模版进行拼接
            var html = template("modifyCategoryTpl", response);
            // 将拼接好的内容放到页面中
            $("#formBox").html(html);
        }
    })
});
// 通过事件委托为动态生成的分类表单修改按钮添加onsubmit事件
$("#formBox").on("submit", "#modifyCategories", function () {
    // 获取管理员在文章分类修改表单中输入的内容
    var formData = $(this).serialize();
    // 获取要修改的分类id
    var id = $(this).attr("data-id");
    // 向服务器端发送请求 根据id修改分类
    $.ajax({
        type: "put",
        url: "/categories/" + id,
        data: formData,
        success: function (response) {
            // 修改成功 重新加载页面
            location.reload();
        }
    });
    // 阻止表单默认提交行为
    return false;
});

/* 分类数据单条删除 */
// 通过事件委托为动态生成的删除按钮添加onclick事件
$("#categoryBox").on("click", ".delete", function () {
    // 获取要删除的分类数据id
    var id = $(this).attr("data-id");
    // 向服务器端发送请求 根据id删除分类
    if (confirm("您确认删除当前文章分类吗？")) {
        $.ajax({
            type: "delete",
            url: "/categories/" + id,
            success: function (response) {
                location.reload();
            }
        })
    }
});

/* 批量删除文章分类数据 */
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
    // 获取到所有文章分类数据的状态并且与全选按钮状态保持一致
    $("#categoryBox").find("input").prop("checked", selectAllStatus);
});
// 当文章分类数据前面的复选框状态发生改变时 通过事件委托为其添加onchange事件
$("#categoryBox").on("change", ".categoryStatus", function () {
    // 思路：先获取所有文章分类数据 再在所有文章分类数据中过滤出选中的文章分类数据 判断两者数量是否一致
    var categoryInputs = $("#categoryBox").find("input");
    // 如果过滤得到的选中文章分类数据等于所有文章分类数据
    if (categoryInputs.length == categoryInputs.filter(":checked").length) {
        // 全选按钮状态勾选
        selectAll.prop("checked", true);
    } else {
        // 如果不相等 全选按钮状态不勾选
        selectAll.prop("checked", false);
    };
    // 如果过滤得到的选中文章分类数据数量大于0 批量删除按钮就显示
    if (categoryInputs.filter(":checked").length > 0) {
        batchDelete.show();
    } else {
        // 否则隐藏
        batchDelete.hide();
    }
});
// 为批量删除按钮添加onclick事件
batchDelete.on("click", function () {
    // 即将删除的文章分类数据id数组容器
    var categoryDeleteIds = [];
    // 获取所有选中的文章分类数据
    var checkedCategory = $("#categoryBox").find("input").filter(":checked");
    // 循环选中文章分类数据 并把data-id属性值添加进数组容器
    checkedCategory.each(function (index, element) {
        // 因为element是HTML标签形式 所以先获取data-id 再添加
        categoryDeleteIds.push($(element).attr("data-id"));
    });
    if (confirm("您确定删除选中的文章分类吗？")) {
        // 向服务器发送请求 批量删除文章分类数据
        $.ajax({
            type: "delete",
            // 数组join()方法 将数组元素由指定的分隔符分隔并作为字符串返回
            url: "/categories/" + categoryDeleteIds.join("-"),
            success: function (response) {
                // 数据库删除成功之后重新加载页面
                location.reload();
            }
        })
    }
})