// 验证模块
const Joi = require('joi');
// 分类模块
const {
	Category
} = require('../../../model/Category');
// 文章模块
const {
	Post
} = require('../../../model/Post');

module.exports = async (req, res) => {
	// 获取用户id
	const id = req.params['id'];
	// 验证模型
	const schema = Joi.object({
		id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('分类id不符合格式'))
	});
	// 如果id中存在-
	// indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置
	// 如果要检索的字符串值没有出现，则该方法返回 -1
	if (id.indexOf('-') != -1) {
		/* 批量删除 */
		// 将字符串id分割为数组
		const ids = id.split('-');
		// 存储结果数组
		const result = [];
		// 验证
		for (const item of ids) {
			// 验证客户端传递过来的请求参数 
			try {
				// 实施验证 
				/* 此处req.params的值类似{ id: '6238809c89df61da12330e19-6238809089df61da12330e15' }
				所以需要将循环的item赋值给id */
				await schema.validateAsync({
					id: item
				});
				// 验证失败
			} catch (error) {
				// 将错误信息响应给客户端
				return res.status(400).send({
					message: error.message
				});
			};
		}
		// 通过验证
		for (const item of ids) {
			// 删除用户
			let category = await Category.findByIdAndDelete(item);
			// 将删除的用户存储在数组中
			result.push(category);
		}
		// 响应
		res.send(result);
	} else {
		/* 单个删除 */
		// 验证客户端传递过来的请求参数 
		try {
			// 实施验证
			await schema.validateAsync(req.params);
			// 验证失败
		} catch (error) {
			// 将错误信息响应给客户端
			return res.status(400).send({
				message: error.message
			});
		};
		// 通过验证 删除分类
		let category = await Category.findByIdAndDelete(id);
		// 删除分类下面的文章
		let post = await Post.deleteMany({
			category: id
		});
		// 响应
		res.send(category);
	}
};