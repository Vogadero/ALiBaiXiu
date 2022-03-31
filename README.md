# 项目简介

- 阿里百秀内容管理系统，分为后台内容管理和前台内容展示两大核心功能。
- 后台内置登录账户
  - 994019222@qq.com，密码：123456，角色：Admin
  - xiaohu@qq.com，密码：111111，角色：norma

# 遗留bug

1. mongoDB的Date类型字段在时间控件不选择时，后台获取值null而不是default值，导致后台文章编辑页面数据遗失；
2. 整体结构优化未完成

## 1. 功能模块

#### 1.1 后台内容管理

| 模块     | 功能                           |
| -------- | ------------------------------ |
| 用户     | 登录、退出、用户增删改查       |
| 文章     | 文章管理                       |
| 分类     | 分类管理                       |
| 评论     | 评论管理                       |
| 网站设置 | 关键字、描述、网站logo、轮播图 |

#### 1.2 前台内容展示

| 模块   | 功能                           |
| ------ | ------------------------------ |
| 首页   | 导航、文章数据展示             |
| 列表页 | 根据分类显示文章列表           |
| 详情页 | 文章详情数据展示、实现评论功能 |



## 2. 开发模式

#### 2.1 前后端混合开发模式

所有HTML代码和数据在服务器端拼接好，一次性将所有内容发送到客户端，浏览器执行代码，将内容呈现给用户

![](public/assets/img/02.png)

问题：

1. 前后端开发人员对互相的代码不是特别熟悉，混合开发使两者在处理互相的代码时非常困难
2. 在开发的过程中难免会出现代码互相覆盖，导致工作量倍增

#### 2.2 前后端分离开发模式

![](public/assets/img/03.png)

好处：职责、分工明确，独立开发，互不影响。



## 3. 项目架构

| 系统分层 | 使用技术                                  |
| -------- | ----------------------------------------- |
| 数据层   | mongoDB v4.0.28                           |
| 服务层   | node.js (express) v16.14.0                |
| 客户端   | art-template、jQuery、font-awesome、swipe |



## 4. 项目运行环境搭建

1. 安装node.js软件并测试其是否安装成功
   
   - win + R 开启windows系统中的运行程序，在运行程序中输入powershell回车，打开命令行程序
   
   - 输入`node -v`命令查看node.js的版本，在命令行程序中输出了版本号没有报错即说明安装成功
   
2. 安装mongodb、mongodb-compass软件

3. 数据库配置，为alibaixiu数据库创建普通账号

   - `mongo` 进入mongodb数据库操作环境
   - `use admin` 切换到admin数据库
   - `db.auth('root', 'root')` 登录admin数据库
   - `use alibaixiu` 切换到alibaixiu数据库
   - `db.createUser({user: 'itcast', pwd: 'itcast', roles: ['readWrite']})`  创建账号
   - `exit` 退出mongodb数据库操作环境

4. 在app.js中配置数据库账号密码

5. 将阿里百秀项目文件夹复制到硬盘中（服务器端程序）

4. 在命令行工具中进入到项目根目录中
   
   - 按住shift键，点击鼠标右键，选择在此处打开powershell窗口
   
7. 使用`npm install`命令安装项目所需依赖文件

8. 将阿里百秀静态页面复制到public文件夹中

9. 在命令行工具中输入node app.js开启项目

   

# 后台内容管理

## 登录功能

1. 为登录按钮添加点击事件

2. 获取用户在文本框中输入的用户名和密码

3. 验证用户是否输入了用户名和密码，如果没有输入，阻止程序向下执行，提示用户输入用户名和密码

4. 调用实现登录功能的接口，登录成功，跳转到数据管理的首页，登录失败，提示用户名或密码错误

   [^路径]: public/admin/login.html



## 登录角色判断

1. 对用户角色进行判断，如果是管理员就跳转到后台管理页面，如果是普通用户就跳转到网站首页

   [^路径]: public/admin/login.html



## 登录拦截

1. 不使用ajax请求是因为ajax请求是异步的，不会阻止代码向下执行，即使写在页面最上方，也达不到阻止页面加载的效果

2. 使用script标签加载服务器端提供的接口地址，因为script标签是同步的，在没有加载完script标签之前代码不会向下执行

3. 判断isLogin变量的值，如果值为false，跳转到登录页面

   [^调用路径]: public/admin/index.html
   [^调用路径]: public/admin/comments.html
   [^调用路径]: public/admin/categories.html
   [^调用路径]: public/admin/password-reset.html
   [^调用路径]: public/admin/post-add.html
   [^调用路径]: public/admin/posts.html
   [^调用路径]: public/admin/settings.html
   [^调用路径]: public/admin/slides.html
   [^调用路径]: public/admin/users.html
   [^封装路径]: public/assets/js/loginIntercept.js



## 退出登录

1. 为退出按钮添加点击事件

2. 添加confirm()方法防止用户误操作退出

3. 根据confirm()方法返回值判断退出操作

4. 调用退出登录接口，退出成功

5. 将退出登录脚本封装到公共js文件夹，方便调用

   [^调用路径]: public/admin/index.html
   [^调用路径]: public/admin/comments.html
   [^调用路径]: public/admin/categories.html
   [^调用路径]: public/admin/password-reset.html
   [^调用路径]: public/admin/post-add.html
   [^调用路径]: public/admin/posts.html
   [^调用路径]: public/admin/settings.html
   [^调用路径]: public/admin/slides.html
   [^调用路径]: public/admin/users.html
   [^封装路径]: public/assets/js/common.js
   
   

## 添加用户

1. 为添加用户功能的每一个表单项添加name属性，且name属性值需要和接口文档中要求的参数名称保持一致

2. 为表单绑定提交事件，在事件处理函数中阻止表单默认提交的行为

3. 在事件处理函数中获取到用户在表单中输入的内容

4. 调用添加用户接口，将获取到的内容通过接口发送给服务器端，操作成功刷新页面，操作失败给出用户提示

   [^调用路径]: public/admin/users.html
   [^封装路径]: public/assets/js/user.js

   

## 展示用户列表

1. 向服务器端发送Ajax请求，索要用户列表数据

2. 第二步，使用模板引擎将数据和html模板进行拼接

3. 第三步就是将拼接好的内容展示在页面中

   [^调用路径]: public/admin/users.html
   [^封装路径]: public/assets/js/user.js



## 用户头像上传

1. 为文件选择控件添加onchange事件，在事件处理函数中获取到用户选择到的文件

2. 创建formData对象用于实现图片文件上传

3. 调用图片文件上传接口，实现图片上传

4. 在添加新用户表单中新增一个隐藏域，将图片地址存储在隐藏域中

   [^调用路口]: public/admin/users.html
   [^封装路径]: public/assets/js/user.js



## 用户信息修改

1. 通过事件委托的形式为编辑按钮点击添加事件

2. 在事件处理函数中获取到当前点击用户的id值

3. 根据用户id获取用户的详细信息，并且通过模板引擎将用户的详细信息渲染到左侧的表单中

4. 为修改按钮添加点击事件，在事件处理函数中获取到用户在表单中输入的内容，调用修改用户信息接口实现用户信息修改功能

4. 注意文件选择控件也需要通过事件委托的方式添加onchange事件

   [^调用路径]: public/admin/users.html
   [^封装路径]: public/assets/js/user.js

   

## 删除用户

1. 为删除按钮添加点击事件

2. 确认用户是否要进行删除操作

3. 获取到当前被点击用户的id

4. 调用删除用户接口根据id删除用户，如果删除成功，刷新当前页面，让页面显示最新的内容

   [^调用路径]: public/admin/users.html
   [^封装路径]: public/assets/js/user.js



## 批量删除用户

1. 管理复选框的选中状态
   1. 当全选按钮被选中时，所有用户要被选中，当全选按钮取消选中时，所有用户要被取消选中
   2. 当用户前面的复选框按钮状态被改变时，要检查是否有用户处于未选中状态，如果有，取消全选按钮的选中状态，如果没有，就意味着所有用户都处于选中状态，此时将全选按钮设置为选中状态
   
2. 管理批量删除按钮的状态
   1. 当全选按钮被选中时，显示批量删除按钮，当全选按钮被取消选中时，隐藏批量删除按钮
   2. 当用户前面的复选框按钮状态改变时，检查所有用户的选中状态，如果有用户被选中，显示批量删除按钮，如果所有用户都没有处于选中状态，隐藏批量删除按钮
   
3. 实现批量删除用户功能
   1. 批量删除按钮添加点击事件，在点击事件处理函数中，将所有被选中的用户id执行存储在一个数组中
   2. 调用批量删除用户接口，实现批量删除用户功能
   
   [^调用路径]: public/admin/users.html
   [^封装路径]: public/assets/js/user.js
   
   

## 修改密码

1. 为修改密码表单中的每一个表单项添加name属性，name属性的值要和接口中的参数名称保持一致

2. 为修改密码表单添加表单提交事件，在事件处理函数中，阻止表单的默认提交行为

3. 获取到用户在表单中输入的内容

4. 调用修改密码接口，实现密码修改功能，如果密码修改成功，跳转到登录页面，让用户重新登录

   [^调用路径]: public/admin/password-reset.html
   [^封装路径]: public/assets/js/modifyPass.js

   

## 添加分类

1. 为表单中的每一个表单项添加name属性，name属性的值要和接口文档中要求的参数名称保持一致

2. 为表单添加表单提交事件，在事件处理函数中，阻止表单提交的默认行为

3. 获取到用户在表单中输入的内容

4. 调用分类添加接口，实现添加分类功能

   [^调用路径]: public/admin/categories.html
   [^封装路径]: public/assets/js/categories.js

   

## 分类数据展示

1. 向服务器端发送Ajax请求，索要分类页面数据

2. 使用模板引擎将服务器端返回的数据和HTML模板进行拼接

3. 将拼接好的内容展示在页面中

   [^调用路径]: public/admin/categories.html
   [^封装路径]: public/assets/js/categories.js



## 分类数据修改

1. 通过事件委托为编辑按钮添加点击事件，在事件处理函数中获取到要修改的分类数据id

2. 根据id调用接口，获取分类数据的详细信息

3. 利用模板引擎将分类数据和HTML字符进行拼接，拼接完成以后将内容渲染到页面中

4. 为修改按钮添加点击事件，在事件处理函数中获取到管理员在表单中输入的内容

5. 调用修改分类数据接口，实现分类数据修改功能。

   [^调用路径]: public/admin/categories.html
   [^封装路径]: public/assets/js/categories.js



## 分类数据删除

1. 通过事件委托的方式为删除按钮添加点击事件，在点击事件处理函数弹出删除确认框

2. 在用户点击了确认删除后，获取要删除的分类数据的id

3. 调用删除分类数据接口，实现删除分类数据功能，如果分类删除成功，刷新页面

   [^调用路径]: public/admin/categories.html
   [^封装路径]: public/assets/js/categories.js



## 分类数据批量删除

1. 管理复选框的选中状态

   1. 当全选按钮被选中时，所有文章分类要被选中，当全选按钮取消选中时，所有文章分类要被取消选中
   2. 当文章分类前面的复选框按钮状态被改变时，要检查是否有文章分类处于未选中状态，如果有，取消全选按钮的选中状态，如果没有，就意味着所有文章分类都处于选中状态，此时将全选按钮设置为选中状态

2. 管理批量删除按钮的状态

   1. 当全选按钮被选中时，显示批量删除按钮，当全选按钮被取消选中时，隐藏批量删除按钮
   2. 当文章分类前面的复选框按钮状态改变时，检查所有文章分类的选中状态，如果有文章分类被选中，显示批量删除按钮，如果所有文章分类都没有处于选中状态，隐藏批量删除按钮

3. 实现分类数据批量删除功能

   1. 批量删除按钮添加点击事件，在点击事件处理函数中，将所有被选中的文章分类id执行存储在一个数组中
   2. 调用分类数据批量删除接口，实现分类数据批量删除功能

   [^调用路径]: public/admin/categories.html
   [^封装路径]: public/assets/js/categories.js

   

## 添加文章

1. 获取文章分类数据，并将数据显示在所属分类的下拉列表中供管理员选择

2. 实现文章封面图片的上传，并将上传后的图片地址保存在一个隐藏域中

3. 为添加文章表单中的每一个表单项添加name属性，并且name属性值要和接口中要求的参数名称保持一致

4. 为添加文章表单绑定表单提交事件，在事件处理函数中阻止表单默认提交的行为

5. 获取到管理员在表单中输入的内容

6. 向服务器端发送添加文章的请求，实现文章添加功能，文章添加成功以后要跳转到文章列表页面

   [^调用路径]: public/admin/post-add.html
   [^封装路径]: public/assets/js/postAdd.js



## 文章列表数据展示

1. 在页面一上来的时候向服务器端发送请求索要文章列表数据

2. 通过模板引擎将文章列表数据和HTML进行拼接，拼接完成以后将内容显示在页面中

3. 根据分页数据实现列表数据分页功能

   [^调用路径]: public/admin/posts.html
   [^封装路径]: public/assets/js/post.js



## 文章数据列表筛选

1. 向服务器端发送请求，索要文章分类数据，并将数据显示在所属分类的下来列表中

2. 为筛选按钮添加点击事件，在事件处理函数中获取到用户选择到的内容

3. 向服务器端发送请求，索要管理员要求的文章列表数据，并将数据显示在页面中

   [^调用路径]: public/admin/posts.html
   [^封装路径]: public/assets/js/post.js



## 文章编辑

1. 为编辑按钮添加链接，并将文章id作为链接的查询参数传递到文章编辑页面

2. 在文章编辑页面获取地址栏中的id参数

3. 根据id获取文章详细信息，并将文章信息显示在文章编辑表单中

4. 为修改文章表单绑定表单提交事件，在事件处理函数中阻止表单默认提交的行为

5. 获取到用户在表单中输入的内容

6. 向服务器端发送请求，实现修改文章信息功能，如果文章信息修改成功，跳转到文章列表页面

   [^调用路径]: public/admin/post-add.html
   [^封装路径]: public/assets/js/postAdd.js



## 文章删除

1. 通过事件委托为删除按钮添加点击事件，在事件处理函数中弹出一个删除确认框，跟管理员确认删除操作

2. 在事件处理函数中获取要要删除的文章的id

3. 发送Ajax请求，执行删除操作，删除操作成功，刷新页面

   [^调用路径]: public/admin/posts.html
   [^封装路径]: public/assets/js/post.js



## 评论列表展示

1. 向服务器端发送请求，获取评论列表数据

2. 使用模板引擎将评论列表数据和HTML模板进行拼接，拼接完成以后再将内容展示在页面中

3. 根据分页数据实现分页功能

   [^调用路径]: public/admin/comments.html
   [^封装路径]: public/assets/js/comments.js



## 评论审核

1. 根据当前评论的状态更改审核按钮中的文字。如果当前评论是未审核状态，按钮中显示批准，如果当前评论是已审核状态，按钮中显示驳回

2. 通过事件委托的方式为审核按钮添加点击事件，在事件处理函数中获取到当前评论的状态

3. 向服务器端发送请求，告诉服务器端评论要更改为什么状态，如果修改成功，刷新页面，让页面中显示最新的数据

   [^调用路径]: public/admin/comments.html
   [^封装路径]: public/assets/js/comments.js



## 评论删除

1. 通过事件委托的方式为删除按钮添加点击事件，在事件处理函数中弹出删除确认框

2. 获取到管理员要删除的评论id值

3. 向服务器端发送请求，执行删除评论操作，评论如果删除成功，刷新页面

   [^调用路径]: public/admin/comments.html
   [^封装路径]: public/assets/js/comments.js



## 仪表盘数据展示

1. 向服务器端发送请求索要仪表盘数据

2. 使用模板引擎将数据和HTML模板进行拼接，拼接完成以后将内容展示在页面中

   [^调用路径]: public/admin/index.html
   [^封装路径]: public/assets/js/index.js



## 图片轮播数据添加

1. 实现图片上传功能，并且将上传后的图片地址保存在一个隐藏域中

2. 为图片轮播表单中的每一个表单项添加name属性，name属性的值要和接口中要求的参数名称保持一致

3. 为图片轮播表单绑定表单提交事件，在事件处理函数中阻止表单默认提交的行为

4. 获取到管理员在表单中输入的内容

5. 向服务器端发送请求，实现图片轮播数据添加功能，如果数据添加成功，刷新页面

   [^调用路径]: public/admin/slides.html
   [^封装路径]: public/assets/js/slides.js



## 轮播图数据展示

1. 向服务器端发送请求索要图片轮播列表数据

2. 使用模板引擎将图片轮播列表数据和HTML模板进行拼接，拼接完成以后将内容展示在页面中

   [^调用路径]: public/admin/slides.html
   [^封装路径]: public/assets/js/slides.js



## 图片轮播数据删除

1. 通过事件委托的方式为删除按钮添加点击事件

2. 在事件处理函数中弹出删除确认框

3. 获取到要删除的轮播图数据的id

4. 向服务器端发送请求，执行删除操作，删除操作成功，刷新页面

   [^调用路径]: public/admin/slides.html
   [^封装路径]: public/assets/js/slides.js



## 网站设置

1. 实现网站logo图片的上传，并且将上传后的图片地址保存在一个隐藏域中

2. 为表单中的每一个表单项添加name属性，name属性的值要和接口文档中要求的参数名称保持一致

3. 为表单绑定提交事件，在事件处理函数中阻止表单默认提交的行为

4. 获取到管理员在表单中输入的内容

5. 向服务器端发送请求，实现网站设置数据的添加功能

   [^调用路径]: public/admin/settings.html
   [^封装路径]: public/assets/js/settings.js



## 显示网站设置数据

1. 向服务器端发送请求，获取网站设置数据

2. 判断服务器端返回的数据是否为真，如果为真，将数据展示在表单中

   [^调用路径]: public/admin/settings.html
   [^封装路径]: public/assets/js/settings.js



## 展示登录用户信息

1. 根据userId变量的值，向服务器端获取当前登录用户的信息

2. 将用户头像和用户名显示在页面的左侧

   [^调用路径]: public/admin/index.html
   [^调用路径]: public/admin/comments.html
   [^调用路径]: public/admin/categories.html
   [^调用路径]: public/admin/password-reset.html
   [^调用路径]: public/admin/post-add.html
   [^调用路径]: public/admin/posts.html
   [^调用路径]: public/admin/settings.html
   [^调用路径]: public/admin/slides.html
   [^调用路径]: public/admin/users.html
   [^封装路径]: public/assets/js/common.js



# 前台内容展示

## 轮播图数据展示

1. 向服务器端发送请求索要轮播图数据

2. 使用模板引擎将数据和HTML字符串进行拼接，将拼接好的内容显示在页面中

3. 将原有的实现轮播图效果的JavaScript代码挪到ajax方法的success函数的最后面

   [^调用路径]: public/index.html
   [^封装路径]: public/assets/js/home.js



## 热门推荐

1. 向服务器端发送请求，索要热门推荐数据

2. 使用模板引擎将数据和html模板进行拼接，将拼接好的内容显示在页面中

   [^调用路径]: public/index.html
   [^调用路径]: public/detail.html
   [^封装路径]: public/assets/js/recommend.js
   
   ```javascript
   var strTpl = `<div>{{name}}</div>`;
   var obj = {name: '张三'};
   var html = template.render(strTpl, obj);
   ```

​	

## 最新发布

1. 向服务器端发送请求，索要最新发布文章数据

2. 使用模板引擎将数据和html模板进行拼接，将拼接好的内容显示在页面中

   [^调用路径]: public/index.html
   [^封装路径]: public/assets/js/home.js



## 随机推荐

1. 向服务器端发送请求，索要随机推荐数据

2. 使用模板引擎将数据和html模板进行拼接，将拼接好的内容显示在页面中

   [^调用路径]: public/index.html
   [^调用路径]: public/detail.html
   [^调用路径]: public/list.html
   [^封装路径]: public/assets/js/random.js

   ```javascript
   var strTpl = `<div>{{name}}</div>`;
   var obj = {name: '张三'};
   var html = template.render(strTpl, obj);
   ```



## 最新评论

1. 向服务器端发送请求，索要最新评论数据

2. 使用模板引擎将数据和html模板进行拼接，将拼接好的内容显示在页面中

   [^调用路径]: public/index.html
   [^调用路径]: public/detail.html
   [^调用路径]: public/list.html
   [^封装路径]: public/assets/js/lastedComment.js

   ```javascript
   var strTpl = `<div>{{name}}</div>`;
   var obj = {name: '张三'};
   var html = template.render(strTpl, obj);
   ```



## 导航栏

1. 向服务器端发送请求，索要分类列表数据

2. 使用模板引擎将数据和html模板进行拼接，将拼接好的内容显示在页面中

3. 注意这里有两处导航，.nav和.topnav

   [^调用路径]: public/index.html
   [^调用路径]: public/detail.html
   [^调用路径]: public/list.html
   [^封装路径]: public/assets/js/nav.js

   ```javascript
   var strTpl = `<div>{{name}}</div>`;
   var obj = {name: '张三'};
   var html = template.render(strTpl, obj);
   ```



## 文章列表信息

1. 获取地址栏中的categoryId参数

2. 向服务器端发送请求，根据categoryId获取文章列表数据

3. 使用模板引擎将数据和html模板进行拼接，将拼接好的内容显示在页面中

4. 列表页顶部categoryTitle内容通过向服务器端发送请求，根据categoryId查询分类

   [^调用路径]: public/list.html
   [^封装路径]: public/assets/js/list.js



## 文章详情信息

1. 获取地址栏中的postId参数

2. 向服务器端发送请求，根据postId获取文章数据

3. 使用模板引擎将数据和html模板进行拼接，将拼接好的内容显示在页面中

4. 通过事件委托形式为点赞按钮添加onclick事件，向服务器端发送请求，文章点赞

   [^调用路径]: public/detail.html
   [^封装路径]: public/assets/js/detail.js



## 文章点赞

1. 通过事件委托形式为点赞按钮添加onclick事件，向服务器端发送请求，文章点赞

   [^调用路径①]: public/detail.html
   [^封装路径①]: public/assets/js/detail.js
   [^调用路径②]: public/index.html
   [^封装路径②]: public/assets/js/home.js
   [^调用路径③]: public/list.html
   [^封装路径③]: public/assets/js/list.js
   [^调用路径④]: public/search.html
   [^封装路径④]: public/assets/js/search.js

   

## 搜索

1. 为搜索表单绑定表单提交事件

2. 在事件处理函数中阻止表单默认提交行为并且获取到用户输入的搜索关键字

3. 跳转到搜索结果页面并且将用户输入的搜索关键字传递到搜索结果页面

4. 在搜索结果页面中，从地址栏的查询参数中获取到用户输入的关键字

5. 根据用户输入的搜索关键字调用搜索接口，当服务器端返回数据以后，将搜索结果数据和HTML模板进行拼接，最终将拼接好的内容展示在页面中

   [^调用路径]: public/index.html
   [^调用路径]: public/detail.html
   [^调用路径]: public/list.html
   [^调用路径]: public/search.html
   [^封装路径]: public/assets/js/public.js
   [^public/search.html单独封装路径]:public/assets/js/search.js



## 获取网站设置信息（开启评论功能）

1. 向服务器端发送请求，获取网站配置

2. 根据服务器返回值中comment的值判断是否开启评论功能，使用模板引擎将数据和html模板进行拼接，将拼接好的内容显示在页面中

   [^调用路径]: public/detail.html
   [^封装路径]: public/assets/js/detail.js



## 获取网站设置信息（文章评论）

1. 通过事件委托形式为评论表单绑定onsubmit事件

2. 根据获取网站配置接口服务器返回值中review的值判断是否评论必须经人工审核，从而影响接口参数--评论状态state的值

3. 获取创建评论接口的各项参数，向服务器端发送请求，创建评论

4. 创建评论成功，刷新页面

   [^调用路径]: public/detail.html
   [^封装路径]: public/assets/js/detail.js


```
阿里百秀
├─ .gitignore
├─ app.js
├─ global.js
├─ model
│  ├─ Category.js
│  ├─ Comment.js
│  ├─ Post.js
│  ├─ Setting.js
│  ├─ Slide.js
│  └─ User.js
├─ MongoDB
│  ├─ CSV
│  │  ├─ categories.csv
│  │  ├─ comments.csv
│  │  ├─ posts.csv
│  │  ├─ settings.csv
│  │  ├─ slides.csv
│  │  └─ users.csv
│  └─ JSON
│     ├─ categories.json
│     ├─ comments.json
│     ├─ posts.json
│     ├─ settings.json
│     ├─ slides.json
│     └─ users.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ admin
│  │  ├─ categories.html
│  │  ├─ comments.html
│  │  ├─ index.html
│  │  ├─ login.html
│  │  ├─ password-reset.html
│  │  ├─ post-add.html
│  │  ├─ posts.html
│  │  ├─ settings.html
│  │  ├─ slides.html
│  │  └─ users.html
│  ├─ assets
│  │  ├─ css
│  │  │  ├─ admin.css
│  │  │  └─ style.css
│  │  ├─ img
│  │  │  ├─ 02.png
│  │  │  ├─ 03.png
│  │  │  ├─ default.png
│  │  │  └─ logo.png
│  │  ├─ js
│  │  │  ├─ categories.js
│  │  │  ├─ comments.js
│  │  │  ├─ common.js
│  │  │  ├─ detail.js
│  │  │  ├─ home.js
│  │  │  ├─ index.js
│  │  │  ├─ lastedComment.js
│  │  │  ├─ list.js
│  │  │  ├─ loginIntercept.js
│  │  │  ├─ modifyPass.js
│  │  │  ├─ nav.js
│  │  │  ├─ post.js
│  │  │  ├─ postAdd.js
│  │  │  ├─ public.js
│  │  │  ├─ random.js
│  │  │  ├─ recommend.js
│  │  │  ├─ search.js
│  │  │  ├─ settings.js
│  │  │  ├─ slides.js
│  │  │  └─ user.js
│  │  └─ vendors
│  │     ├─ art-template
│  │     │  └─ template-web.js
│  │     ├─ bootstrap
│  │     │  ├─ css
│  │     │  │  ├─ bootstrap-theme.css
│  │     │  │  ├─ bootstrap-theme.min.css
│  │     │  │  ├─ bootstrap.css
│  │     │  │  └─ bootstrap.min.css
│  │     │  └─ js
│  │     │     ├─ bootstrap.js
│  │     │     └─ bootstrap.min.js
│  │     ├─ font-awesome
│  │     │  ├─ css
│  │     │  │  ├─ font-awesome.css
│  │     │  │  └─ font-awesome.min.css
│  │     │  └─ fonts
│  │     │     ├─ fontawesome-webfont.eot
│  │     │     ├─ fontawesome-webfont.svg
│  │     │     ├─ fontawesome-webfont.ttf
│  │     │     ├─ fontawesome-webfont.woff
│  │     │     ├─ fontawesome-webfont.woff2
│  │     │     └─ FontAwesome.otf
│  │     ├─ jquery
│  │     │  ├─ jquery.js
│  │     │  └─ jquery.min.js
│  │     ├─ jsrender
│  │     │  ├─ jsrender.js
│  │     │  └─ jsrender.min.js
│  │     ├─ moment
│  │     │  ├─ moment-with-locales.js
│  │     │  └─ moment.js
│  │     ├─ nprogress
│  │     │  ├─ nprogress.css
│  │     │  └─ nprogress.js
│  │     ├─ require
│  │     │  ├─ require.js
│  │     │  └─ require.min.js
│  │     ├─ simplemde
│  │     │  ├─ simplemde.min.css
│  │     │  └─ simplemde.min.js
│  │     ├─ swipe
│  │     │  └─ swipe.js
│  │     └─ twbs-pagination
│  │        ├─ jquery.twbsPagination.js
│  │        └─ jquery.twbsPagination.min.js
│  ├─ detail.html
│  ├─ index.html
│  ├─ list.html
│  ├─ search.html
│  └─ uploads
│     ├─ avatar.jpg
│     ├─ avatar_1.jpg
│     ├─ avatar_2.jpg
│     ├─ hots_1.jpg
│     ├─ hots_2.jpg
│     ├─ hots_3.jpg
│     ├─ hots_4.jpg
│     ├─ hots_5.jpg
│     ├─ slide_1.jpg
│     ├─ slide_2.jpg
│     ├─ upload_036f0eefa849257918d37f71f8c858a6.png
│     ├─ upload_04a010f5cb0e60967c9d8179563c9fde.jpg
│     ├─ upload_04af1f918cfdf255ec8c262ba14267ce.jpeg
│     ├─ upload_0d1a2fea7f106c8568e0246a35f19e0d.jpg
│     ├─ upload_0ef9e124fee04f077025e67fc3f98260.jpg
│     ├─ upload_0f6e4b7e68007f2af2737ed873f6574e.png
│     ├─ upload_10f8479aed1401888401791fdb8518bc.jpg
│     ├─ upload_11d79977e62bd27cd03dba1380ca2579.jpg
│     ├─ upload_125e963dc59d8535cdbb8b4fb72044d3.jpg
│     ├─ upload_14f78cfce7745beb63c3f34e3af6a567.jpg
│     ├─ upload_175e7a4e358ecbbc8e86241f35cfd30e.jpg
│     ├─ upload_17cd6c70fd96152d1d6496dfc163e96f.jpg
│     ├─ upload_21e7c0e508bd0a5c97bd1caed2529f9c.jpg
│     ├─ upload_2385999a0878bc492f2f5632b04b8f15.jpg
│     ├─ upload_243676dafd1642961b0196fc95465831.png
│     ├─ upload_24f1ed8f49b18f1001d918e5188f3817.jpeg
│     ├─ upload_365fad32f40e2f15bd23faa781627851.jpg
│     ├─ upload_41b95628f6e920f6df5c90cf4e2ea83d.jpg
│     ├─ upload_42efd218d965e5358b2d0ae89e70a2eb.jpeg
│     ├─ upload_44bda8e364e082e01fab9ce83034be13.jpeg
│     ├─ upload_44f0c64bdf5c086a42e527b5708e17ed.jpg
│     ├─ upload_4544e254b62d470fda4cbc57c0e0791a.jpg
│     ├─ upload_4982a7f1ce646f4497179c9a6a2e7f24.jpg
│     ├─ upload_4e693dcf99ec053f0a7d5c342c4c3a09.jpg
│     ├─ upload_569f9bc4b04b4979c98a0264fbcff4de.jpg
│     ├─ upload_6198d25c8b71193f07679f929cf47801.jpg
│     ├─ upload_61edb25ce45b90abcd7820bf174ebfab.jpg
│     ├─ upload_61f0c48f5560a6aa8f519c5032999689.jpg
│     ├─ upload_6b0036f7192a77d96ea131a4a0dd9757.jpg
│     ├─ upload_6ddc2dbf3e23c0d62a89cd1b91093e30.jpg
│     ├─ upload_7b195f089b473d359cbe969d6310c0c6.jpeg
│     ├─ upload_7c044566d3a4b0d71f011cb612f0668f.png
│     ├─ upload_82558c8c1f34c6012f8a5654f69ba69d.jpg
│     ├─ upload_895028c976ff8f8eff08624c96a9fc1c.jpg
│     ├─ upload_89dd12d78f8a017e0ed8b86b0e8c184c.jpeg
│     ├─ upload_9635c76c5196776740af7c0d72ff7c8c.jpeg
│     ├─ upload_9adec2fa51c0970b22f5501cfefb1d31.jpg
│     ├─ upload_9b431eac8a7e111de96e622eb463f482.jpeg
│     ├─ upload_a1df676de28b99d03eb8d23c3a579652.jpeg
│     ├─ upload_a42740a4281d5237f9124f0da681a0c9.jpg
│     ├─ upload_aafe7ae983beb109a9e98072c6da80c2.jpg
│     ├─ upload_ab40caad9a545d864fdd506cfde82d95.jpg
│     ├─ upload_aed98a0121ae26b94b45a3c29deecfa5.png
│     ├─ upload_b08384c93e27bd36b6a222c90adbf488.jpeg
│     ├─ upload_b0ddba7976917ce9dbb439882eb41a68.jpg
│     ├─ upload_b538442fcc713f8b6c1f20ddf557a48b.jpeg
│     ├─ upload_b60d5f1a7f8b96419b1ab6239ea59208.jpeg
│     ├─ upload_b73e4e7f6ba81cdcf4fde1a1dcb4685f.jpeg
│     ├─ upload_b98c3c4c5f8985c18f0efceda766b474.jpeg
│     ├─ upload_bafcda6b16ad052e907af7a70b413ff3.jpg
│     ├─ upload_bb30490ca311d6b5d94fb00942abbe48.jpg
│     ├─ upload_bffe83e24de1373b6568f58c76da21e9.jpg
│     ├─ upload_c36f21e9acb1ceed4c2b22a59e157207.jpg
│     ├─ upload_ca531efbb2dd3ecebbe9b3954302661b.png
│     ├─ upload_cbaccf88cb206afe1168d21814c23ff3.jpg
│     ├─ upload_ccf557cd6608d5a46c542fe7b089cb44.jpg
│     ├─ upload_cd1a210df351203eaf5f8fe5037caae1.jpg
│     ├─ upload_d5d2e4efa5a275258b0f0cc5a44ba5a7.jpg
│     ├─ upload_d9bdd94e00d0e42b0a96c7699cc4376e.jpg
│     ├─ upload_d9cca9691ac708560bf213a8de246bed.jpg
│     ├─ upload_debd5ff6cbb33f64208a1b3d51f12a1e.jpg
│     ├─ upload_e12599b46cb37147428b44cb83aaacb0.jpg
│     ├─ upload_e3886e9983b462f08283a770c0c8b88f.jpg
│     ├─ upload_e4939066bf67dd658f49f69af41ab1c1.png
│     ├─ upload_eb0c7c1e18171261e4d93d9bb5c375e2.jpeg
│     ├─ upload_ed4d675583b1b57995f08705246ea72e.jpeg
│     ├─ upload_f00cdc26c8e253c56ec73b7919b9dac1.jpg
│     ├─ upload_f438d7e1ea0378fca08ded49762e516a.png
│     ├─ upload_f9cca3ef96f801bf7e4f6d11719b48da.jpg
│     ├─ upload_fa841850fa79c6dea8bafadc9301e227.png
│     ├─ upload_fae74ac9e5b593c2ef933c32bb6ede87.jpg
│     ├─ widget_1.jpg
│     ├─ widget_2.jpg
│     ├─ widget_3.jpg
│     ├─ widget_4.jpg
│     └─ widget_5.jpg
├─ README.md
├─ routes
│  ├─ actions
│  │  ├─ category
│  │  │  ├─ count.js
│  │  │  ├─ create.js
│  │  │  ├─ find.js
│  │  │  ├─ findById.js
│  │  │  ├─ findByIdAndDelete.js
│  │  │  └─ findByIdAndUpdate.js
│  │  ├─ comment
│  │  │  ├─ count.js
│  │  │  ├─ create.js
│  │  │  ├─ find.js
│  │  │  ├─ findByIdAndDelete.js
│  │  │  ├─ findByIdAndUpdate.js
│  │  │  └─ lasted.js
│  │  ├─ other
│  │  │  ├─ login.js
│  │  │  ├─ loginStatus.js
│  │  │  ├─ logout.js
│  │  │  └─ upload.js
│  │  ├─ post
│  │  │  ├─ category.js
│  │  │  ├─ count.js
│  │  │  ├─ create.js
│  │  │  ├─ fabulous.js
│  │  │  ├─ find.js
│  │  │  ├─ findById.js
│  │  │  ├─ findByIdAndDelete.js
│  │  │  ├─ findByIdAndUpdate.js
│  │  │  ├─ lasted.js
│  │  │  ├─ random.js
│  │  │  ├─ recommend.js
│  │  │  └─ search.js
│  │  ├─ settings
│  │  │  ├─ create.js
│  │  │  └─ find.js
│  │  ├─ slide
│  │  │  ├─ create.js
│  │  │  ├─ find.js
│  │  │  └─ findByIdAndDelete.js
│  │  └─ user
│  │     ├─ create.js
│  │     ├─ find.js
│  │     ├─ findById.js
│  │     ├─ findByIdAndDelete.js
│  │     ├─ findByIdAndUpdate.js
│  │     └─ password.js
│  ├─ category.js
│  ├─ comment.js
│  ├─ index.js
│  ├─ post.js
│  ├─ settings.js
│  ├─ slide.js
│  └─ user.js
└─ 接口文档.md

```
